/* eslint-disable import/no-extraneous-dependencies */
import pino from 'pino';
import { Request, Response } from 'express';

const logger = pino({
  prettyPrint: true,
});

const verifyUserStatus = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

const addFaceMappings = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

const identifyUser = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

export { verifyUserStatus, addFaceMappings, identifyUser };
