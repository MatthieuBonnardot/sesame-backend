/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import pino from 'pino';

const logger = pino({
  prettyPrint: true,
});

const getDoors: Function = async (req: express.Request, res: express.Response) => {
  try {
  } catch (err) {}
};

const createDoor: Function = async (req: express.Request, res: express.Response) => {
  try {
  } catch (err) {}
};

const deleteDoor: Function = async (req: express.Request, res: express.Response) => {
  try {
  } catch (err) {}
};

module.exports = {
  getDoors,
  createDoor,
  deleteDoor,
};
