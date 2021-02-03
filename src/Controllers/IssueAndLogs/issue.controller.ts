/* eslint-disable import/no-extraneous-dependencies */
import pino from 'pino';
import { Request, Response } from 'express';
import Issues from '../../Models/Mongoose/Issues';

const logger = pino({
  prettyPrint: true,
});

const createIssue = (req: Request, res: Response) => {
<<<<<<< HEAD
  Issues.create([req.body]).then((docs) => {
    console.log(docs);
    res.status(200).send(docs);
  });
=======
  // Issues.create([req.body]).then((docs, err) => {
  //   if (err) res.status(err.status).send(err.message);
  //   console.log(docs);
  //   res.status(200).send(docs);
  // });
>>>>>>> feat: make email unique
};

const getIssues = async (_: any, res: Response) => {
  try {
    Issues.find({}, (err, docs) => {
      if (err) {
        logger.info(`Error: ${err}`);
      } else if (docs.length === 0) {
        logger.info('message');
      } else {
        res.status(200).send(docs);
      }
    });
  } catch (error) {
    res.status(501).send(error.message);
  }
};

const toggleIssueStatus = async (req: Request, res: Response) => {};

export { createIssue, getIssues, toggleIssueStatus };
