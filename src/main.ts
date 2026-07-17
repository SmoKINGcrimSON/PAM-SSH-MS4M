import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //calling app module to create the application instance
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove properties that do not have any decorators in the DTO
  })); // UsePipes decorator is used to apply validation pipes to the incoming request data.
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();