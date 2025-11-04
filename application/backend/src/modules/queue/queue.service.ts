import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class QueueService {
  constructor(@Inject('RABBIT_CLIENT') private readonly client: ClientProxy) {}

  send(pattern: string, data: any) {
    this.client.emit(pattern, data);
  }
}
