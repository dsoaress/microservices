import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Session {
  @Field(() => String)
  accessToken: string

  @Field(() => String)
  refreshToken: string
}
