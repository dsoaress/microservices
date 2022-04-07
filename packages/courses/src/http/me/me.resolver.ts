import { Query, Resolver } from '@nestjs/graphql'

import { CurrentStudent } from '../../common/decorator/current-student.decorator'
import { Student } from '../student/student.entity'
import { MeService } from './me.service'

@Resolver('me')
export class MeResolver {
  constructor(private readonly meService: MeService) {}

  @Query(() => Student, { name: 'me' })
  findOne(@CurrentStudent() student: Student) {
    return this.meService.findOne(student.userId)
  }
}
