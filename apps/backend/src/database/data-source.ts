import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '3306', 10),
  username: process.env.DATABASE_USERNAME || 'app',
  password: process.env.DATABASE_PASSWORD || 'app',
  database: process.env.DATABASE_NAME || 'app',
  entities: ['apps/backend/src/**/*.entity{.ts,.js}'],
  migrations: ['apps/backend/src/database/migrations/**/*.js'],
  synchronize: false,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;