/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import * as dotenv from 'dotenv';
import pino from 'pino';
import MongoConnection from './Databases/Mongo/connection';

dotenv.config();
const logger = pino({
  prettyPrint: true,
});

const app: express.Application = express();
const port: any = process.env.PORT || 4001;

app.listen(port, async () => {
  await MongoConnection;
  logger.info('Connected to Mongo DB');
  logger.info('Connected to SQL DB');
  logger.info(`Listening at http://localhost:${port}/`);
});
