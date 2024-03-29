import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as basicAuth from 'express-basic-auth';
import { Connection } from 'typeorm';
import Seeder from './database/seeds/seeder.seeder';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Documentação com Swagger')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        ['root']: 'root',
      },
    }),
  );


  SwaggerModule.setup('api', app, document);
  app.enableCors({ origin: 'http://localhost:3000' });

   //Seeder
   const connection = app.get(Connection);
   await connection.synchronize();
   await Seeder.run(connection);

  await app.listen(3000);
}

bootstrap();
