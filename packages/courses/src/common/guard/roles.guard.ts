import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'

import { Role, ROLES_KEY } from '../decorator/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req
    return { req, ctx }
  }

  canActivate(context: ExecutionContext): boolean {
    const { ctx, req } = this.getRequest(context)
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass()
    ])

    if (!requiredRoles) return true

    const { student } = req

    return requiredRoles.some(role => student.role?.includes(role))
  }
}
