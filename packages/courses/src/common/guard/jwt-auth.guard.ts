import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

import { StudentService } from '../../http/student/student.service'
import { IS_PUBLIC_KEY } from '../decorator/public-route.decorator'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly studentService: StudentService
  ) {
    super()
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req
    return { req, ctx }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req, ctx } = this.getRequest(context)
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass()
    ])

    if (isPublic) return true

    const authHeader = req.headers.authorization as string

    if (!authHeader) {
      throw new BadRequestException('Authorization header not found.')
    }

    const [type, accessToken] = authHeader.split(' ')

    if (type !== 'Bearer') {
      throw new BadRequestException(`Authentication type 'Bearer' required. Found '${type}'`)
    }

    const { isValid, student, role } = await this.studentService.validateAccessToken(accessToken)

    if (!isValid) {
      throw new UnauthorizedException('Token not valid')
    }

    req.student = { ...student, role }

    return true
  }
}
