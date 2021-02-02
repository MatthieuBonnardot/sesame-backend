/* eslint-disable import/no-extraneous-dependencies */
import {Request, Response} from 'express';
import pino from 'pino';

const logger = pino({
  prettyPrint: true,
});

const getGroups = async (req: Request, res: Response) => {
  try {
    console.log(req);
  } catch (error) {}
};

const updateGroup = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

const createGroup = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

const deleteGroup = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

export {
  createGroup,
  getGroups,
  deleteGroup,
  updateGroup,
};
