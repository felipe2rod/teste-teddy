import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QueueService } from './queue.service';
import { ProducerService } from './producer.service';
import { ClientsModule as AppClientsModule } from '../clients/clients.module';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => AppClientsModule), // evita circular dependency
    ClientsModule.registerAsync([
      {
        name: 'RABBIT_CLIENT',
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.getOrThrow<string>('RABBITMQ_URL')],
            queue: config.getOrThrow<string>('RABBITMQ_QUEUE'),
            queueOptions: { durable: true },
          },
        }),
      },
    ]),
  ],
  providers: [QueueService, ProducerService],
  exports: [ProducerService, QueueService],
})
export class QueueModule {}
