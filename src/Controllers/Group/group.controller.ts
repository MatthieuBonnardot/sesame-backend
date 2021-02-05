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
    res.status(500);
    res.send(error);
  }
};

/*
I have changed the update group to update the params first (assuming it wont update
  props that it doesnt contain). I then check if doors were passes, if yes, remove
  all previous doors and pass in the door array of doors. This means admin will have
  to pass ALL the doors that group has access to each time they want to update it.
*/
const updateGroup = async (req: Request, res: Response) => {
  const gid: number = Number(req.params.id);
  const {
    doors,
    groupName,
    description,
    accessFromHour,
    accessToHour,
  } = req.body;
  const formattedBody = {
    gid,
    groupName,
    description,
    accessFromHour,
    accessToHour,
  };
  try {
    // await getRepository(Group).update({ gid }, formattedBody);
    const updatedGroup: Group = await getRepository(Group).findOne(gid);
    updatedGroup
    if (doors.length) {
      updatedGroup.doors = [];
      const doorEntity = await getRepository(Door).findByIds(doors);
      updatedGroup.doors = doorEntity;
    }
    getRepository(Group).save(updatedGroup);
    updatedGroup.doors = doors;
    res.send(updatedGroup);
  } catch (error) {
    logger.error(error);
    res.status(500);
    res.send(error);
  }
};

const createGroup = async (req: Request, res: Response) => {
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
  try {
    const newGroup: Group = getRepository(Group).create(formattedBody);
    if (doors.length) {
      const doorEntities: Door[] = await getRepository(Door).findByIds(doors);
      newGroup.doors = doorEntities;
    }
    await getRepository(Group).save(newGroup);
    newGroup.doors = doors;
    res.send(newGroup);
  } catch (error) {
    logger.error(error);
    res.status(500);
    res.send(error);
  }
};

const deleteGroup = async (req: Request, res: Response) => {
  try {
    const deletedGroup = getRepository(Group).findOne(req.params.id);
    await getRepository(Group).delete(req.params.id);
    res.send(deletedGroup);
  } catch (error) {
    logger.error(error);
    res.status(500);
    res.send(error);
  }
};

export {
  createGroup,
  getGroups,
  deleteGroup,
  updateGroup,
};
