import { InputType, PartialType } from '@nestjs/graphql'

import { CreateUserInput } from '../../user/input/create-user.input'

@InputType()
export class UpdateMeInput extends PartialType(CreateUserInput) {}
