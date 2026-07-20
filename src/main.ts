import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //calling app module to create the application instance

  //Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });
  //

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove properties that do not have any decorators in the DTO
  })); // UsePipes decorator is used to apply validation pipes to the incoming request data.
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();