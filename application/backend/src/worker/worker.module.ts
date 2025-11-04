import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../modules/database/database.module';
import { ClientsModule } from '../modules/clients/clients.module';
import { ConsumerService } from '../modules/queue/consumer.service';
import databaseConfig from '../config/database.config';
import { LoggerModule } from 'src/common/logger/logger.module';
//import { ClientsService } from 'src/modules/clients/clients.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    LoggerModule,
    DatabaseModule,
    ClientsModule,
  ],
  controllers: [ConsumerService],
})
export class WorkerModule {}
