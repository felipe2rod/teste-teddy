import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format } from 'winston';
import LokiTransport from 'winston-loki';

@Injectable()
export class LokiLogger implements LoggerService {
  private logger;

  constructor() {
    const lokiHost = process.env.LOKI_HOST || 'loki';
    const lokiPort = process.env.LOKI_PORT || '3100';
    const appName = process.env.APP_NAME || 'nest-api';

    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.json(),
      ),
      defaultMeta: { service: appName },
      transports: [
        // Transport para Loki
        new LokiTransport({
          host: `http://${lokiHost}:${lokiPort}`,
          labels: {
            app: appName,
            environment: process.env.NODE_ENV || 'development',
          },
          json: true,
          format: format.json(),
          replaceTimestamp: true,
          onConnectionError: (err) => console.error(err),
        }),
      ],
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, {
      context,
      stack: trace,
    });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context });
  }
}
