import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../../common/decorator/current-user.decorator'
import { User } from '../user/user.entity'
import { UpdateMeInput } from './input/update-me.input'
import { MeService } from './me.service'

@Resolver('me')
export class MeResolver {
  constructor(private readonly meService: MeService) {}

  @Query(() => User, { name: 'me' })
  findOne(@CurrentUser() user: User) {
    return this.meService.findOne(user.id)
  }

  @Mutation(() => User)
  updateMe(@Args('data') data: UpdateMeInput, @CurrentUser() user: User) {
    return this.meService.update(user.id, data)
  }
}
