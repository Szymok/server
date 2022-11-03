import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('MasterClazz API')
    .setDescription('MasterClazz API Description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT || 8080;
  
  await app.listen(PORT).then(() => {
    console.log(`Server running on port ${PORT}`)
  });
}

bootstrap();