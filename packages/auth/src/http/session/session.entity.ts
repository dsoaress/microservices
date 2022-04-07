import { Field, ID, ObjectType } from '@nestjs/graphql'

import { User } from '../user/user.entity'

@ObjectType()
export class Session {
  @Field(() => ID)
  accessToken: string

  @Field(() => String)
  refreshToken: string

  @Field(() => User)
  user: User
}
