import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Documentação com Swagger')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));


  SwaggerModule.setup('api', app, document);
  app.enableCors();

  await app.listen(3000);
}

bootstrap();
