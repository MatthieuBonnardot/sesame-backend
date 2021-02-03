/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import pino from 'pino';
import { getRepository } from 'typeorm';
import Group from '../../Models/Typeorm/Group.entity';

const logger = pino({
  prettyPrint: true,
});

const getGroups = async (req: Request, res: Response) => {
  try {
    const groups = await getRepository(Group).find();
    res.send(groups);
  } catch (error) {
    console.log();
  }
};

const updateGroup = async (req: Request, res: Response) => {
  try {

  } catch (error) {}
};

const createGroup = async (req: Request, res: Response) => {
  try {
    const newGroup = await getRepository(Group).create(req.body);
    await getRepository(Group).save(newGroup);
    res.status(200).send(newGroup);
  } catch (error) {
    console.log(error);
    res.send(500);
  }
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
