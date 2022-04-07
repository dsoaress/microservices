import { Module } from '@nestjs/common'

import { StudentModule } from '../student/student.module'
import { MeResolver } from './me.resolver'
import { MeService } from './me.service'

@Module({
  imports: [StudentModule],
  providers: [MeResolver, MeService]
})
export class MeModule {}
