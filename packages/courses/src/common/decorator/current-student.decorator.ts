import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import { Student } from '../../http/student/student.entity'
import { Role } from './roles.decorator'

export const CurrentStudent = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context)
  return ctx.getContext().req.student as Student & { role: Role }
})
