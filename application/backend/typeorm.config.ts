import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as dotenv from 'dotenv';
import databaseConfig from './src/config/database.config';

dotenv.config();

export default new DataSource(databaseConfig() as PostgresConnectionOptions);
