import { ConnectionOptions } from 'typeorm';
import path from 'path';

const dbSocketAddr = '35.189.255.98:5432'.split(':'); // e.g. '127.0.0.1:5432'


const config: ConnectionOptions = {
  type: 'postgres',
  url: 'postgres://qngwzcmp:ABXT8VBgH4hYRuyqx0VbceNPOZhclYQt@kandula.db.elephantsql.com:5432/qngwzcmp',
  entities: [
    path.join(__dirname, '/*.entity{.ts,.js}'),
  ],
  synchronize: true,
};

export default config;
