/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import pino from 'pino';

const logger = pino({
  prettyPrint: true,
});

const getGroups: Function = async (req: express.Request, res: express.Response) => {
  try {
  } catch (error) {}
};

const updateGroup: Function = async (req: express.Request, res: express.Response) => {
  try {
  } catch (error) {}
};

const createGroup: Function = async (req: express.Request, res: express.Response) => {
  try {
  } catch (error) {}
};

const deleteGroup: Function = async (req: express.Request, res: express.Response) => {
  try {
  } catch (error) {}
};

module.exports = {
  createGroup,
  getGroups,
  deleteGroup,
  updateGroup,
};
