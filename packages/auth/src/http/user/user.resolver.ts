import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Role } from '@prisma/client'

import { Public } from '../../common/decorator/public-route.decorator'
import { Roles } from '../../common/decorator/roles.decorator'
import { CreateUserInput } from './input/create-user.input'
import { UpdateUserInput } from './input/update-user.input'
import { User } from './user.entity'
import { UserService } from './user.service'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Mutation(() => User)
  createUser(@Args('data') data: CreateUserInput) {
    return this.userService.createUser(data)
  }

  @Roles(Role.ADMIN)
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll()
  }

  @Roles(Role.ADMIN)
  @Query(() => User, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id)
  }

  @Roles(Role.ADMIN)
  @Mutation(() => User)
  updateUser(@Args('data') data: UpdateUserInput) {
    return this.userService.updateUser(data)
  }

  @Roles(Role.ADMIN)
  @Mutation(() => User)
  removeUser(@Args('id') id: string) {
    return this.userService.removeUser(id)
  }
}
