import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { PrismaModule } from '../../prisma/prisma.module'
import { StudentResolver } from './student.resolver'
import { StudentService } from './student.service'

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', '12345678'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION_TIME', '15m')
        }
      }),
      inject: [ConfigService]
    }),
    PrismaModule
  ],
  providers: [StudentResolver, StudentService],
  exports: [StudentService]
})
export class StudentModule {}
