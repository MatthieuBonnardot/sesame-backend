/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import pino from 'pino';
import { getRepository } from 'typeorm';
import Group from '../../Models/Typeorm/Group.entity';
import Door from '../../Models/Typeorm/Door.entity';

const logger = pino({
  prettyPrint: true,
});

const getGroups = async (req: Request, res: Response) => {
  try {
    const groups = await getRepository(Group).find({
      relations: ['doors'],
    });
    res.send(groups);
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};

const updateGroup = async (req: Request, res: Response) => {
  const gid: number = Number(req.params.id);
  const { doors, ...formattedBody } = req.body;
  const groupTable = getRepository(Group);
  try {
    if (Object.keys(formattedBody).length !== 0) {
      await groupTable.update({ gid }, formattedBody);
    }
    const updatedGroup: Group = await groupTable.findOne(gid);
    if (doors) {
      const doorEntity = await getRepository(Door).findByIds(doors);
      updatedGroup.doors = doorEntity;
    }
    await groupTable.save(updatedGroup);
    updatedGroup.doors = doors;
    res.send(updatedGroup);
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};

const createGroup = async (req: Request, res: Response) => {
  const groupTable = getRepository(Group);
  const {
    doors,
    groupName,
    description,
    accessFromHour,
    accessToHour,
  } = req.body;
  const formattedBody = {
    groupName,
    description,
    accessFromHour,
    accessToHour,
  };
  // const { doors, ...formattedBody } = req.body;
  try {
    const newGroup: Group = groupTable.create(formattedBody);
    if (doors.length) {
      const doorEntities: Door[] = await getRepository(Door).findByIds(doors);
      newGroup.doors = doorEntities;
    }
    await groupTable.save(newGroup);
    newGroup.doors = doors;
    res.send(newGroup);
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};

const deleteGroup = async (req: Request, res: Response) => {
  const groupTable = getRepository(Group);
  try {
    const deletedGroup = await groupTable.findOne(req.params.id);
    await groupTable.delete(req.params.id);
    res.send(deletedGroup);
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};

export {
  createGroup,
  getGroups,
  deleteGroup,
  updateGroup,
};
