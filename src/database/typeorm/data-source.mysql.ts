import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import options = require('./ormconfig.mysql');

const dataSource = options as DataSourceOptions;
export const AppDataSource = new DataSource({
  ...dataSource,
  entities: ['src/entities/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.{ts,js}'],
});
