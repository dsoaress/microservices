import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateSessionInput } from './input/create-session.input'
import { Session } from './session.entity'
import { SessionService } from './session.service'

@Resolver(() => Session)
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Mutation(() => Session)
  createSession(@Args('data') data: CreateSessionInput) {
    return this.sessionService.create(data)
  }

  @Mutation(() => Session)
  updateSession(@Args('refreshToken') refreshToken: string) {
    return this.sessionService.update(refreshToken)
  }
}
