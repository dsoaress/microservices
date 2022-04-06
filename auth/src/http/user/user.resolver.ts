import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateUserInput } from './input/create-user.input'
import { UpdateUserInput } from './input/update-user.input'
import { User } from './user.entity'
import { UserService } from './user.service'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('data') data: CreateUserInput) {
    return this.userService.createUser(data)
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll()
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id)
  }

  @Mutation(() => User)
  updateUser(@Args('data') data: UpdateUserInput) {
    return this.userService.updateUser('1', data)
  }

  @Mutation(() => User)
  removeUser(@Args('id') id: string) {
    return this.userService.removeUser(id)
  }
}
