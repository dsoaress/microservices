import { Injectable } from '@nestjs/common'

import { StudentService } from '../student/student.service'

@Injectable()
export class MeService {
  constructor(private readonly studentService: StudentService) {}

  async findOne(id: string) {
    return await this.studentService.findOneByUserId(id, { withError: true })
  }
}
