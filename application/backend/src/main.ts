import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { LokiLogger } from './common/logger/loki-logger.service';
import { LoggingInterceptor } from './common/interceptors/logger/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LokiLogger(),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new LoggingInterceptor(app.get(LokiLogger)));

  const config = new DocumentBuilder()
    .setTitle('API - Teddy')
    .setDescription('Documentação da API do sistema')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  app.enableCors();
  await app.listen(3000);

  const logger = app.get(LokiLogger);
  logger.log(`Application is running on: ${await app.getUrl()}`, 'Bootstrap');
}
void bootstrap();
