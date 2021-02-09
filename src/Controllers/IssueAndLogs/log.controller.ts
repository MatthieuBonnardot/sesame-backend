/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import Logs from '../../Models/Mongoose/Logs';

const getLogs = async (_: Request, res: Response) => {
  try {
    Logs.find().then((logs) => {
      if (logs.length > 0) res.send(logs);
      else res.send('No logs found');
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

const createLog = async (req: Request, res: Response) => {
  try {
    const createLog = new Logs(req.body);
    createLog.save().then((savedLog) => {
      res.status(200).send(savedLog);
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

const internalLogCreation = async (body: any) => {
  Logs.create(body).then((savedLog) => {
    console.log(savedLog);
  });
};

const findLogsById = async (req: Request, res: Response) => {
  try {
    Logs.find({ enteredBy: req.params.id }).then((logs) => {
      if (logs.length > 0) res.send(logs);
      else res.send(`No logs found for ${req.params.id}`);
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

export default {
  getLogs,
  createLog,
  findLogsById,
  internalLogCreation,
};
