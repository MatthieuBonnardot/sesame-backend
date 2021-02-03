/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import pino from 'pino';
import { getRepository } from 'typeorm';
import Door from '../../Models/Typeorm/Door.entity';

const logger = pino({
  prettyPrint: true,
});

const getDoors = async (
  req: Request,
  res: Response,
) => {
  try {
    const doors = await getRepository(Door).find();
    res.send(doors);
  } catch (error) {
    console.log(error);
    res.send(500);
  }
};

const updateDoor = async (
  req: Request,
  res: Response,
) => {
  try {
    const did = Number(req.params.id);
    await getRepository(Door).update({ did }, req.body);
    const newDoor = await getRepository(Door).findOne(did);
    res.send(newDoor);
  } catch (error) {
    console.log(error);
    res.send(500);
  }
};

const createDoor = async (
  req: Request,
  res: Response,
) => {
  try {
    const newDoor = await getRepository(Door).create(req.body);
    console.log('new door', newDoor);

    await getRepository(Door).save(newDoor);
    res.status(200).send(newDoor);
  } catch (error) {
    console.log(error);
    res.send(500);
  }
};

const deleteDoor = async (
  req: Request,
  res: Response,
) => {
  try {
    const deletedDoor = getRepository(Door).findOne(req.params.id);
    await getRepository(Door).delete(req.params.id);
    res.send(deletedDoor);
  } catch (error) {
    console.log(error);
    res.send(500);
  }
};

export {
  getDoors,
  updateDoor,
  createDoor,
  deleteDoor,
};
