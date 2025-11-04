import { Global, Module } from '@nestjs/common';
import { LokiLogger } from './loki-logger.service';

@Global()
@Module({
  providers: [LokiLogger],
  exports: [LokiLogger],
})
export class LoggerModule {}
