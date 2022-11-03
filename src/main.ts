import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType, ValidationPipe } from '@nestjs/common'
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('MasterClazz API')
    .setDescription('MasterClazz API Description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT || 8080;

  app.use(compression());
  app.use(cookieParser());
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(PORT).then(() => {
    console.log(`Server running on port ${PORT}`)
  });
}

bootstrap();