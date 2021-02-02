import { ConnectionOptions } from 'typeorm';
import path from 'path';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  // username: process.env.POSTGRES_USER,
  username: 'postgres',
  // password: process.env.POSTGRES_PASSWORD,
  password: 'password',
  database: process.env.POSTGRES_DB,
  entities: [
    path.join(__dirname, '/*.entity{.ts,.js}'),
  ],
  synchronize: true,
};

export default config;