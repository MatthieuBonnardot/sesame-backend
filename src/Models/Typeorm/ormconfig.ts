import { ConnectionOptions } from 'typeorm';
import path from 'path';
import env from '../../config/config';

const config: ConnectionOptions = {
  type: 'postgres',
  url: env.postgres.uri_admin,
  entities: [
    path.join(__dirname, '/*.entity{.ts,.js}'),
  ],
  synchronize: true,
  logging: false,
};

export default config;
