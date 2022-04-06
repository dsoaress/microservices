import { Injectable } from '@nestjs/common'

import { CreateSessionInput } from './input/create-session.input'

@Injectable()
export class SessionService {
  create(data: CreateSessionInput) {
    return 'This action adds a new session'
  }

  update(refreshToken: string) {
    return `This action update token`
  }
}
