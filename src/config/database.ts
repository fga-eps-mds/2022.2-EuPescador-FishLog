import 'reflect-metadata';
import { FishLog } from '../models/fishLog';
import { DataSource } from 'typeorm';

export const connection = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'db',
  port: Number(process.env.POSTGRES_PORT) || 5434,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [FishLog],
  synchronize: true,
  logging: false,
  extra: process.env.POSTGRES_HOST
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {ssl: false},
});
