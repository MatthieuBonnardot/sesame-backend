/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import pino from 'pino';
import config from './Models/Typeorm/ormconfig';
import MongoConnection from './Databases/Mongo/connection';
import PostController from './post/post.controller';
import validateEnv from './utils/validateEnv';
// import SQLconnection from './Databases/sql/connection';

dotenv.config();
validateEnv();
const logger = pino({
  prettyPrint: true,
});

const app: express.Application = express();
const port: any = process.env.PORT || 4001;

app.listen(port, async () => {
  try {
    await MongoConnection;
    await createConnection(config);
    logger.info('Connected to Mongo DB');
    // await SQLconnection;
    logger.info('Connected to typeOrm');
    logger.info(`Listening at http://localhost:${port}/`);
  } catch (e) {
    console.log(e);
  }
});
