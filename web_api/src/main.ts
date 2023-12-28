import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger();
const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: "*"
    }
  });
  await app.listen(PORT);
  logger.log(`App running on port ${PORT}...`, AppModule.name);
}
bootstrap();
