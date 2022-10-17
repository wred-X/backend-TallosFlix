import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .addServer('/')
    .addServer('/we')
    .setTitle('Documentação com Swagger - Desafio movie API')
    .setDescription('Api mflix, com os cruds pedidos.')
    .setVersion('1.0')
    .addTag('users')
    .addTag('theaters')
    .addTag('movies')
    .addTag('comments')
    .addTag('login')
    .addTag('sessions')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Pipes
  // app.useGlobalPipes(new ValidationPipe({}));
  // useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(4000);
}

bootstrap();
