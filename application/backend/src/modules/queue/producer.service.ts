import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateClientDto } from '../clients/dto/create-client.dto';
import { LokiLogger } from 'src/common/logger/loki-logger.service';

@Injectable()
export class ProducerService {
  constructor(
    @Inject('RABBIT_CLIENT') private readonly client: ClientProxy,
    @Inject(LokiLogger) private readonly logger: LokiLogger,
  ) {}

  sendClientCreate(dto: CreateClientDto) {
    this.logger.log(
      `Enviando cliente para fila: ${JSON.stringify(dto)}`,
      ProducerService.name,
    );
    return this.client.emit('client.create', dto);
  }
}
