/* eslint-disable import/no-extraneous-dependencies */
import pino from 'pino';
import Logs from '../../Models/Mongoose/Logs';

const logger = pino({
  prettyPrint: true,
});

const getLogs: Function = async (_: any, res: Response) => {
  Logs.find({}, (err: Error, docs: Array<any>) => {
    if (err) {
      logger.error(`Error: ${err}`);
    } else if (docs.length === 0) {
      logger.info('The list of issues is empty');
      res.status(200).send('The list of issues is empty');
    } else {
      res.send(docs);
    }
  });
};

module.exports = { getLogs };
