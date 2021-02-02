/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import * as http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import pino from 'pino';
import statusRoutes from './Routes/status';
import doorRoutes from './Routes/door';
import groupRoutes from './Routes/group';
import userRoutes from './Routes/user';
import azureRoutes from './Routes/azure';
import MongoConnection from './Databases/Mongo/connection';

const logger = pino({
  prettyPrint: true,
});

const router = express();

/* Logging the request */
router.use((req, res, next) => {
  logger.info(
    `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`,
  );

  res.on('finish', () => {
    logger.info(
      `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${req.statusCode}]`,
    );
  });

  next();
});

/* Parse the request */
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/* Rules of our API */
router.use((req, res, next): express.Response<any> => {
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

/* Routes */
router.use('/status', statusRoutes);
router.use('/door', doorRoutes);
router.use('/group', groupRoutes);
router.use('/user', userRoutes);
router.use('/azure', azureRoutes);

/* Error handling */
router.use((req, res):express.Response<any> => {
  const error = new Error('not found');
  return res.status(404).json({
    message: error.message,
  });
});

/* Create the server */
const httpServer = http.createServer(router);
httpServer.listen(5000, async () => {
  try {
    await MongoConnection;
    logger.info('Connected to Mongo DB');
    logger.info('Connected to SQL DB');
    logger.info(`Listening at http://localhost:${5000}/`);
  } catch (error) {
    logger.error(error.message);
  }
});
