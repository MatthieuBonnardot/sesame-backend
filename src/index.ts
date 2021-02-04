/* eslint-disable @typescript-eslint/no-shadow */
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
import { trainPersonsGroup, getTrainingStatus } from './Recognition/group.crud';

const logger = pino({
  prettyPrint: true,
});

const app = express();

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

// const rawBodySaver = (req: any, res: any, buf: any, encoding: any) => {
//   if (buf && buf.length) {
//     req.rawBody = buf.toString(encoding || 'utf8');
//   }
// };

// app.use((req, res, next) => {
//   if (req.method === 'POST' || req.method === 'PUT') {
//     const body: any[] = [];
//     req.on('data', (data: any) => {
//       body.push(data);
//     });

//     req.on('end', () => {
//       req.body = JSON.stringify(body.concat());
//       next();
//     });
//   } else next();
// });

app.use(bodyParser.json());
app.use((req, res, next) => {
  if (req.url.match(/azure\/dni/) && req.method === 'POST') {
    console.log('hello');
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

/* Parse the request */
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(bodyParser.raw());

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
    trainPersonsGroup();
    getTrainingStatus();
    app.listen(env.server.port, async () => {
      logger.info(
        `Listening at http://${env.server.hostname}:${env.server.port}/`,
      );
    });
  } catch (error) {
    logger.error(error.message);
  }
})();
