import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import path from 'node:path'

import { JwtAuthGuard } from '../common/guard/jwt-auth.guard'
import { RolesGuard } from '../common/guard/roles.guard'
import { CourseModule } from './course/course.module'
import { StudentModule } from './student/student.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver
    }),
    StudentModule,
    CourseModule
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard }
  ]
})
export class HttpModule {}
