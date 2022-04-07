import { ForbiddenException, Injectable } from '@nestjs/common'

import { PrismaService } from '../../prisma/prisma.service'
import { UserService } from '../user/user.service'
import { UpdateMeInput } from './input/update-me.input'

@Injectable()
export class MeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService
  ) {}

  async findOne(id: string) {
    return await this.userService.findOne(id, { withError: true })
  }

  async update(id: string, data: UpdateMeInput) {
    const user = await this.userService.findOne(id, { withError: true })
    const isAdmin = user.role === 'ADMIN'

    if (isAdmin && data.role) {
      throw new ForbiddenException('Admin role cannot be changed')
    }

    if (!isAdmin && data.role) {
      throw new ForbiddenException('Only admin can change role')
    }

    return await this.userService.updateUser({ ...data, id })
  }
}
