import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateCourseInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
