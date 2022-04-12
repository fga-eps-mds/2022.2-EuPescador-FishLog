import { FishLog } from '../models/fishLog';
import { DataSource } from 'typeorm';

export const connection = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5434,
  username: 'root',
  password: 'admin',
  database: 'log',
  entities: [FishLog],
  synchronize: true,
  logging: false,
});
