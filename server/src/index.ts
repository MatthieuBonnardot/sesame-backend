/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import * as dotenv from 'dotenv';
import pino from 'pino';

dotenv.config();
const logger = pino({
  prettyPrint: true,
});
const app: express.Application = express();
const port: any = process.env.PORT || 5000;

app.listen(port, () => {
  logger.info(`Listening at http://localhost:${port}/`);
});
