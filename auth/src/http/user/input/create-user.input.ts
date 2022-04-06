import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { Role } from '@prisma/client'

registerEnumType(Role, {
  name: 'Role',
  description: 'Role of the user'
})

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string

  @Field(() => String)
  email: string

  @Field(() => String)
  password: string

  @Field(() => Role, { nullable: true })
  role: Role
}
