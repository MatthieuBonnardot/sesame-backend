/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import pino from 'pino';
import Logs from '../../Models/Mongoose/Logs';

const logger = pino({
  prettyPrint: true,
});

const getLogs = async (_: Request, res: Response) => {
  logger.info('GetLogs');
  Logs.find({}, (err: Error, docs: Array<any>) => {
    if (err) {
      res.status(501).json({
        error: err.message,
      });
    } else if (docs.length === 0) {
      res.status(200).send('The list of issues is empty');
    } else {
      res.status(200).send(docs);
    }
  });
};

export default { getLogs };
