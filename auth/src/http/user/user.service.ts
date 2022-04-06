import { BadRequestException, Injectable } from '@nestjs/common'

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

  async findOne(id: string) {
    return await this.prismaService.user.findUnique({ where: { id } })
  }

  async updateUser(id: string, data: UpdateUserInput) {
    return await this.prismaService.user.update({
      where: { id },
      data
    })
  }

  async removeUser(id: string) {
    return await this.prismaService.user.delete({ where: { id } })
  }
}
