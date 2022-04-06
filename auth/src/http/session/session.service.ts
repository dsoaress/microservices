import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Role } from '@prisma/client'
import { compare } from 'bcrypt'
import dayjs from 'dayjs'

import { PrismaService } from '../../prisma/prisma.service'
import { User } from '../user/user.entity'
import { UserService } from '../user/user.service'
import { CreateSessionInput } from './input/create-session.input'

@Injectable()
export class SessionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email)
    const checkPasswords = await compare(password, user.password)

    if (!checkPasswords) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return user
  }

  async create({ email, password }: CreateSessionInput) {
    const user = await this.userService.findOneByEmail(email)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const checkPasswords = await compare(password, user.password)

    if (!checkPasswords) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const session = await this.prismaService.session.create({
      data: {
        userId: user.id,
        expiresAt: dayjs().add(30, 'days').toDate()
      }
    })

    const payload = { sub: user.id, role: user.role }
    const accessToken = this.jwtService.sign(payload)
    const { refreshToken } = session

    return { user, accessToken, refreshToken }
  }

  update(refreshToken: string) {
    return `This action update token`
  }

  async validateAccessToken(accessToken: string) {
    const { sub } = this.jwtService.verify(accessToken) as { sub: string }
    const user = await this.userService.findOne(sub)

    if (!user) {
      return { isValid: false }
    }

    return { user, isValid: true }
  }
}
