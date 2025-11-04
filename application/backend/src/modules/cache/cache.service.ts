import { Inject, Injectable } from '@nestjs/common';
import type { RedisClientType } from 'redis';
import { ConfigService } from '@nestjs/config';
import { LokiLogger } from 'src/common/logger/loki-logger.service';

@Injectable()
export class CacheService {
  private readonly ttl: number;

  constructor(
    @Inject('REDIS_CLIENT') private readonly client: RedisClientType,
    private readonly logger: LokiLogger,
    private readonly configService: ConfigService,
  ) {
    this.ttl = this.configService.get<number>('REDIS_TTL', 60);
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async set(key: string, value: any, ttlSeconds = this.ttl): Promise<void> {
    await this.client.set(key, JSON.stringify(value), { EX: ttlSeconds });
    this.logger.debug(`Cache salvo: ${key}`, CacheService.name);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
    this.logger.debug(`Cache removido: ${key}`, CacheService.name);
  }
}
