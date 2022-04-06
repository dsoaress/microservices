import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '../../prisma/prisma.service'
import { CreateUserInput } from './input/create-user.input'
import { UpdateUserInput } from './input/update-user.input'

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: CreateUserInput) {
    const emailExists = await this.prismaService.user.findUnique({
      where: { email: data.email }
    })

    if (emailExists) {
      throw new BadRequestException('Email already exists')
    }

    return await this.prismaService.user.create({ data })
  }

  async findAll() {
    return await this.prismaService.user.findMany()
  }

  async findOne(id: string, options: { withError?: boolean } = {}) {
    const user = await this.prismaService.user.findUnique({
      where: { id }
    })

    if (!user && options.withError) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  async findOneByEmail(email: string, options: { withError?: boolean } = {}) {
    const user = await this.prismaService.user.findUnique({
      where: { email }
    })

    if (!user && options.withError) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  async updateUser(data: UpdateUserInput) {
    await this.findOne(data.id, { withError: true })

    return await this.prismaService.user.update({
      where: { id: data.id },
      data
    })
  }

  async removeUser(id: string) {
    return await this.prismaService.user.delete({ where: { id } })
  }
}
