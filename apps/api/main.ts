import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/AppModule';
import * as helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as rTracer from '@procontacto/cls-rtracer';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
    // cors: {
    //   origin: 'http://localhost:3000',
    //   credentials: true,
    // },
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(helmet());
  app.use(json({ limit: '5mb' }));
  app.use(urlencoded({ extended: true, limit: '5mb' }));
  app.use(
    rTracer.expressMiddleware({
      useHeader: true,
      headerName: 'x-trace-id',
    }),
  );

  app.setGlobalPrefix('innovak-integration/api/v1.0');

  const options = new DocumentBuilder()
    .setTitle('Innovak Integration')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('tag')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('innovak-integration/api/v1.0/docs', app, document);

  const configService = app.get(ConfigService);
  console.log(process.env.SEED_ENV);
  await app.listen(configService.get('PORT'));

  console.log(`Listen to port: ` + configService.get('PORT'));
}

bootstrap();
