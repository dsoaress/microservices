import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Role } from '@prisma/client'
import { ExtractJwt, Strategy } from 'passport-jwt'

interface Payload {
  sub: string
  role: Role
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET', '12345678'),
      ignoreExpiration: false
    })
  }

  async validate({ sub, role }: Payload) {
    return { id: sub, role }
  }
}
