import { Injectable } from '@nestjs/common'

import { CreateUserInput } from './input/create-user.input'
import { UpdateUserInput } from './input/update-user.input'

@Injectable()
export class UserService {
  createUser(data: CreateUserInput) {
    return 'This action adds a new user'
  }

  findAll() {
    return `This action returns all user`
  }

  findOne(id: string) {
    return `This action returns a #${id} user`
  }

  updateUser(id: string, data: UpdateUserInput) {
    return `This action updates a #${id} user`
  }

  removeUser(id: string) {
    return `This action removes a #${id} user`
  }
}
