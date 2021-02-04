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
    const groups = await getRepository(Group).find();
    res.status(200).send(groups);
  } catch (error) {
    console.log(error);
    res.send(500);
  }
};

const updateGroup = async (req: Request, res: Response) => {
  try {
    const gid: number = Number(req.params.id);
    await getRepository(Group).update({ gid }, req.body);
    const updatedGroup: Group = await getRepository(Group).findOne(req.params.id);
    res.send(updatedGroup);
  } catch (error) {
    console.log(error);
    res.send(500);
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
    const newGroup: Group = await getRepository(Group).create(formattedBody);
    // const doorEntities: Door[] = await Promise.all(doors.map(async (did: Door) => {
    //   const doorEntity = await getRepository(Door).findOne({ where: { did } });
    //   return doorEntity;
    // }));
    const doorEntities: Door[] = await getRepository(Door).findByIds(doors);
    newGroup.doors = doorEntities;
    await getRepository(Group).save(newGroup);
    res.status(200).send(newGroup);
  } catch (error) {
    console.log(error);
    res.send(500);
  }
};

const deleteGroup = async (req: Request, res: Response) => {
  try {
    const deletedGroup = getRepository(Group).findOne(req.params.id);
    await getRepository(Group).delete(req.params.id);
    res.send(deletedGroup);
  } catch (error) {
    console.log(error);
    res.send(500);
  }
};

export {
  createGroup,
  getGroups,
  deleteGroup,
  updateGroup,
};
