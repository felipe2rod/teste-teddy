import { Controller, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ClientsService } from '../clients/clients.service';
import { CreateClientDto } from '../clients/dto/create-client.dto';
import { LokiLogger } from 'src/common/logger/loki-logger.service';

@Controller()
@Injectable()
export class ConsumerService implements OnModuleInit {
  constructor(
    private readonly clientsService: ClientsService,
    @Inject(LokiLogger) private readonly logger: LokiLogger,
  ) {}

  onModuleInit() {
    this.logger.log('!! ConsumerService iniciado e ouvindo RabbitMQ...');
  }

  @EventPattern('client.create')
  async handleClientCreate(@Payload() data: CreateClientDto) {
    this.logger.log(
      `Mensagem recebida: ${JSON.stringify(data)}`,
      ConsumerService.name,
    );

    try {
      await this.clientsService.save(data);
      this.logger.log(
        `Cliente ${data.name} criado com sucesso`,
        ConsumerService.name,
      );
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : JSON.stringify(error);
      this.logger.error(
        `Falha ao processar cliente: ${errorMessage}`,
        ConsumerService.name,
      );
    }
  }
}
