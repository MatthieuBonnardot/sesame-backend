import { ConnectionOptions } from 'typeorm';
import path from 'path';

const config: ConnectionOptions = {
  type: 'postgres',
  url: 'postgres://qngwzcmp:ABXT8VBgH4hYRuyqx0VbceNPOZhclYQt@kandula.db.elephantsql.com:5432/qngwzcmp',
  entities: [
    path.join(__dirname, '/*.entity{.ts,.js}'),
  ],
  synchronize: true,
};

export default config;
