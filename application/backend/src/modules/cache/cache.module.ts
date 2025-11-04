import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const url = configService.get<string>('REDIS_URL');
        const client = createClient({ url });
        await client.connect();
        return client;
      },
      inject: [ConfigService],
    },
    CacheService,
  ],
  exports: [CacheService],
})
export class CacheModule {}
