import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateSessionInput {
  @Field(() => String)
  email: string

  @Field(() => String)
  password: string
}
