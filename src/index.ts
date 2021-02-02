/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import bodyParser from 'body-parser';
import pino from 'pino';
import { createConnection } from 'typeorm';
import env from './config/config';
import 'reflect-metadata';
import router from './Routes/index';
import config from './Models/Typeorm/ormconfig';
import MongoConnection from './Databases/Mongo/connection';

const logger = pino({
  prettyPrint: true,
});

const app = express();

/* Logging the request */
app.use((req, res, next) => {
  logger.info(
    `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`,
  );

  res.on('finish', () => {
    logger.info(
      `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`,
    );
  });

  next();
});

/* Parse the request */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Rules of our API */
app.use((req, res, next) => {
  res.header('Acces-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET POST PUT DELETE');
    return res.status(200).json({});
  }
  console.log('so far');

  next();
});

app.use(router);

/* Error handling */
app.use((_:any, res: any, __: any, err: any): void => {
  console.log(err);
  const error = new Error('not found');
  res.status(404).json({
    message: error.message,
  });
});

/* Create the server */
app.listen(env.server.port, async () => {
  try {
    await MongoConnection;
    logger.info('Connected to Mongo DB');
    await createConnection(config);
    logger.info('Connected to SQL DB');
    logger.info(
      `Listening at http://${env.server.hostname}:${env.server.port}/`,
    );
  } catch (error) {
    logger.error(error.message);
  }
});

// (async () => {
//   [...]
// })()
