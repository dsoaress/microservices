import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Course {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
