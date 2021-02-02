/* eslint-disable import/no-extraneous-dependencies */
import {Request, Response} from 'express';
import pino from 'pino';

const logger = pino({
  prettyPrint: true,
});

const getDoors = async (
  req: Request,
  res: Response,
) => {
  try {
  } catch (err) {}
};

const updateDoor = async (
  req: Request,
  res: Response,
) => {
  try {
  } catch (err) {}
};

const createDoor = async (
  req: Request,
  res: Response,
) => {
  try {
  } catch (err) {}
};

const deleteDoor = async (
  req: Request,
  res: Response,
) => {
  try {
  } catch (err) {}
};

export { getDoors, updateDoor, createDoor, deleteDoor };
