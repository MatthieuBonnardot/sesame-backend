/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import pino from 'pino';

const logger = pino({
  prettyPrint: true,
});


const getUsers: Function = async (req: express.Request, res: express.Response) => {
  try {
  } catch (error) {}
};

const createUser: Function = async (req: express.Request, res: express.Response) => {
  try {
  } catch (error) {}
};

const updateUser: Function = async (req: express.Request, res: express.Response) => {
  try {
  } catch (error) {}
};

const deleteUser: Function = async (req: express.Request, res: express.Response) => {
  try {
  } catch (error) {}
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
};
