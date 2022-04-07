import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from './app.module'

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn']
  })

  const config: ConfigService = app.get(ConfigService)
  const port = config.get<number>('PORT', 3020)

  console.log(`Courses service is listening on port ${port}`)
  await app.listen(port)
}

bootstrap()
