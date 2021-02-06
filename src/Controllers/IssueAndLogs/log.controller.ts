/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import Logs from '../../Models/Mongoose/Logs';

const getLogs = async (_: Request, res: Response) => {
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

const createLog = async (req: Request, res: Response) => {
  try {
    const newLog: typeof Logs = req.body;

    const createLog = new Logs(newLog);
    createLog.save().then((savedLog) => {
      res.status(200).send(savedLog);
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'an error occurred', errorMessage: error.message });
  }
};

const internalLogCreation = async (body: any) => {
  try {
    console.log(body);
    Logs.create(body);
  } catch (error) {
    console.error(error);
  }
};

const findLogsById = async (req: Request, res: Response) => {
  const userId: string = req.params.id;
  Logs.find({ enteredBy: userId }, (err: Error, docs: Array<any>) => {
    if (err) {
      res.status(501).json({
        error: err.message,
      });
    } else if (docs.length === 0) {
      res.status(200).send(`The list of log for ${userId} is empty`);
    } else {
      res.status(200).send(docs);
    }
  });
};

export default {
  getLogs, createLog, findLogsById, internalLogCreation,
};
