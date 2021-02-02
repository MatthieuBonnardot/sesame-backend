/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import pino from 'pino';

const logger = pino({
  prettyPrint: true,
});

const getUsers = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

const createUser = async (
  req: Request,
  res: Response,
) => {
  try {
  } catch (error) {}
};

const updateUser = async (
  req: Request,
  res: Response,
) => {
  try {
  } catch (error) {}
};

const deleteUser = async (
  req: Request,
  res: Response,
) => {
  try {
  } catch (error) {}
};

export {
  getUsers, createUser, deleteUser, updateUser,
};
