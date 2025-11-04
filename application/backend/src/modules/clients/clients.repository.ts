import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Client } from '../../database/entities/client.entity';
import { PaginateClientDto } from './dto/paginate-client.dto';

@Injectable()
export class ClientsRepository {
  constructor(
    @InjectRepository(Client)
    private readonly repository: Repository<Client>,
  ) {}

  async createClient(data: Partial<Client>): Promise<Client> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async findAll(): Promise<Client[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Client | null> {
    return this.repository.findOne({ where: { id } });
  }

  async updateClient(id: number, data: Partial<Client>): Promise<Client> {
    const existingClient = await this.findById(id);

    if (!existingClient) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    const updatedClient = this.repository.merge(existingClient, data);
    return this.repository.save(updatedClient);
  }

  async remove(id: number) {
    return this.repository.delete(id);
  }

  async paginate(params: PaginateClientDto) {
    const { page, limit, name } = params;

    const where = name ? { name: Like(`%${name}%`) } : {};

    const [items, total] = await this.repository.findAndCount({
      where,
      order: { id: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      items,
      meta: {
        total,
        page,
        limit,
        last_page: Math.ceil(total / limit),
      },
    };
  }
}
