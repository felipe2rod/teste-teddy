import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WorkerModule } from './worker.module';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    WorkerModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbit:5672'],
        queue: process.env.RABBITMQ_QUEUE || 'clients_queue',
        queueOptions: { durable: true },
      },
    },
  );

  const dataSource = app.get(DataSource);
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  await app
    .listen()
    .then(() => console.log('Worker conectado ao RabbitMQ'))
    .catch((err) => console.error(err));
}

void bootstrap();
