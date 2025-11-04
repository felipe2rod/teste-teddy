import { registerAs } from '@nestjs/config';

export default registerAs('rabbitmq', () => ({
  url: process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbit:5672',
  queue: process.env.RABBITMQ_QUEUE || 'clients_queue',
}));
