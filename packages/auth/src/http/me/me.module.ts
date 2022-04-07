import { Module } from '@nestjs/common'

import { PrismaModule } from '../../prisma/prisma.module'
import { UserModule } from '../user/user.module'
import { MeResolver } from './me.resolver'
import { MeService } from './me.service'

@Module({
  imports: [PrismaModule, UserModule],
  providers: [MeResolver, MeService]
})
export class MeModule {}
