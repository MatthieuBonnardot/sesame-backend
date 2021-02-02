/* eslint-disable import/no-extraneous-dependencies */
import pino from 'pino';
import express from 'express';
import Issues from '../../Models/Mongoose/Issues';

const logger = pino({
  prettyPrint: true,
});

const getIssues: Function = async (_: any, res: express.Response) => {
  Issues.find({}, (err: Error, docs: Array<any>) => {
    if (err) {
      logger.error(`Error: ${err}`);
    } else if (docs.length === 0) {
      logger.info('Empty list of issues');
    } else {
      res.send(docs);
    }
  });
};

const toggleIssueStatus: Function = async (req: express.Request, res: express.Response) => {
  Issues.findOneAndUpdate(
    {
      _id: req.params.UID,
    },
    {
      active: false,
    },
    (err: Error, doc: Array<any>) => {
      if (err) {
        logger.error(`Error: ${err}`);
      } else {
        res.send(doc);
      }
    },
  );
};

module.exports = {
  getIssues,
  toggleIssueStatus,
};
