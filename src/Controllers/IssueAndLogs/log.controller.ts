/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import Logs from '../../Models/Mongoose/Logs';

const getLogs = async (_: Request, res: Response) => {
  try {
    const logs = await Logs.find();
    res.send(logs);
  } catch (error) {
    res.sendStatus(500);
  }
};

const internalLogCreation = async (body: any) => Logs.create(body);

const createLog = async (req: Request, res: Response) => {
  try {
    const log = await Logs.create(req.body);
    res.send(log);
  } catch (error) {
    res.sendStatus(500);
  }
};

const findLogsById = async (req: Request, res: Response) => {
  try {
    const logs = await Logs.find({ enteredBy: req.params.id });
    res.send(logs);
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
