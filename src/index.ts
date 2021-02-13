/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import bodyParser from 'body-parser';
import pino from 'pino';
import { createConnection } from 'typeorm';
import cors from 'cors';
import env from './config/config';
import 'reflect-metadata';
import router from './Routes/router';
import config from './Models/Typeorm/ormconfig';
import MongoConnection from './Databases/Mongo/connection';
import azureService from './Recognition/azure.method';

const logger = pino({
  prettyPrint: true,
});

const app = express();
app.use(cors());

/* Logging the request */
app.use((req, res, next) => {
  logger.info(`[${req.method}] [${req.url}] [${req.hostname}]`);

  res.on('finish', () => {
    logger.info(
      `[${req.method}] [${req.url}] [${req.hostname}] ==> [${res.statusCode}]`,
    );
  });

  next();
});

/* Parse the request */
app.use(bodyParser.json());
app.use((req, res, next) => {
  if (req.url.match(/azure\/register/) && req.method === 'PUT') {
    const body: any = [];
    req
      .on('data', (chunk) => body.push(chunk))
      .on('end', () => {
        req.body = Buffer.concat(body);
        console.log(req.body);
        next();
      });
  } else next();
});

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

  next();
});

/* Routing */
app.use(router);

/* Error handling */
app.use((req: express.Request, res: express.Response) => {
  const error = new Error('not found');
  return res.status(404).json({
    message: error.message,
  });
});

/* Create the server */
(async () => {
  try {
    await MongoConnection();
    await createConnection(config);
    logger.info('Connected to SQL DB');
    await azureService('GROUP', 'TRAIN', {});
    await azureService('GROUP', 'STATUS', {});
    app.listen(env.server.port, async () => {
      logger.info(
        `Listening at http://${env.server.hostname}:${env.server.port}/`,
      );
    });
  } catch (error) {
    logger.error(error.message);
  }
})();
