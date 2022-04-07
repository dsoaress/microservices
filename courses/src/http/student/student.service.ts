import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { Role } from '../../common/decorator/roles.decorator'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class StudentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async create(userId: string) {
    const studentExists = await this.prismaService.student.findUnique({
      where: { id: userId }
    })

    if (studentExists) {
      throw new BadRequestException('Student already exists')
    }

    return await this.prismaService.student.create({
      data: { userId }
    })
  }

  async findAll() {
    return await this.prismaService.student.findMany()
  }

  async findOne(id: string, options: { withError?: boolean } = {}) {
    const student = await this.prismaService.student.findUnique({
      where: { id }
    })

    if (!student && options.withError) {
      throw new NotFoundException('Student not found')
    }

    return student
  }

  async findOneByUserId(userId: string, options: { withError?: boolean } = {}) {
    const student = await this.prismaService.student.findUnique({
      where: { userId }
    })

    if (!student && options.withError) {
      throw new NotFoundException('Student not found')
    }

    return student
  }

  async validateAccessToken(accessToken: string) {
    const { sub, role } = this.jwtService.verify(accessToken) as { sub: string; role: Role }
    const student = await this.findOneByUserId(sub)

    if (!student) {
      return { isValid: false }
    }

    return { student, role, isValid: true }
  }
}
