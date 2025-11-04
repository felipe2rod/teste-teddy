import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientsRepository } from './clients.repository';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from '../../database/entities/client.entity';
import { PaginateClientDto } from './dto/paginate-client.dto';
import { ProducerService } from '../queue/producer.service';
import { CacheService } from '../cache/cache.service';
import { LokiLogger } from 'src/common/logger/loki-logger.service';
import { DeleteResult } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    private readonly logger: LokiLogger,
    private readonly clientsRepository: ClientsRepository,
    private readonly producer: ProducerService,
    private readonly cache: CacheService,
  ) {}

  create(dto: CreateClientDto): void {
    //return this.clientsRepository.createClient(dto);
    this.logger.log(
      `sending client to queue ${JSON.stringify(dto)}`,
      ClientsService.name,
    );
    this.producer.sendClientCreate(dto);
  }

  async save(dto: CreateClientDto): Promise<Client> {
    this.logger.log(
      `saving client ${JSON.stringify(dto)}`,
      ClientsService.name,
    );
    await this.cache.del('clients:all');
    return this.clientsRepository.createClient(dto);
  }

  async findAll(): Promise<Client[]> {
    this.logger.log(`finding all clients`, ClientsService.name);
    return this.clientsRepository.findAll();
  }

  async findById(id: number): Promise<Client> {
    this.logger.log(`Searching client ${id}`, ClientsService.name);
    const client = await this.clientsRepository.findById(id);
    if (!client) throw new NotFoundException('Cliente não encontrado');
    return client;
  }

  async update(id: number, dto: UpdateClientDto): Promise<Client> {
    this.logger.log(`updating client ${id}`, ClientsService.name);
    await this.findById(id);
    const updated = await this.clientsRepository.updateClient(id, dto);
    await this.cache.del('clients:all');
    return updated;
  }

  async remove(id: number): Promise<DeleteResult> {
    this.logger.log(`deleting client`, ClientsService.name);
    return await this.clientsRepository.remove(id);
  }

  async paginate(params: PaginateClientDto) {
    const cacheKey = `clients:page:${params.page}:limit:${params.limit}`;
    const cached = await this.cache.get(cacheKey);
    if (cached) {
      this.logger.log(`returning cached data`, ClientsService.name);
      return cached;
    }
    this.logger.log(`returning fresh data and caching`, ClientsService.name);
    const result = await this.clientsRepository.paginate(params);
    await this.cache.set(cacheKey, result);
    return result;
  }
}
