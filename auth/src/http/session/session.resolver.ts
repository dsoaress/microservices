import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { Public } from '../../common/decorator/public-route.decorator'
import { CreateSessionInput } from './input/create-session.input'
import { Session } from './session.entity'
import { SessionService } from './session.service'

@Resolver(() => Session)
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Public()
  @Mutation(() => Session)
  createSession(@Args('data') data: CreateSessionInput) {
    return this.sessionService.create(data)
  }

  @Public()
  @Mutation(() => Session)
  updateSession(@Args('refreshToken') refreshToken: string) {
    return this.sessionService.update(refreshToken)
  }
}
