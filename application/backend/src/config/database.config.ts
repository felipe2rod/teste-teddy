import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions & DataSourceOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    migrationsRun: true,
    //migrations: ['src/database/migrations/*.ts'],
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrationsTableName: 'migrations_history',
    logging: process.env.NODE_ENV === 'development',
  }),
);
