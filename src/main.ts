import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // bez tego nie moglibysmy walidowac naszych obiektow
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
