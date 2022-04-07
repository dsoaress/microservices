import { Args, Query, Resolver } from '@nestjs/graphql'

import { Role, Roles } from '../../common/decorator/roles.decorator'
import { Student } from './student.entity'
import { StudentService } from './student.service'

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Roles(Role.ADMIN)
  @Query(() => [Student], { name: 'students' })
  findAll() {
    return this.studentService.findAll()
  }

  @Roles(Role.ADMIN)
  @Query(() => Student, { name: 'student' })
  findOne(@Args('id') id: string) {
    return this.studentService.findOne(id)
  }
}
