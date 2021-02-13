/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import fetch from 'node-fetch';
import pino from 'pino';
import { getRepository } from 'typeorm';
import Door from '../../Models/Typeorm/Door.entity';

const logger = pino({
  prettyPrint: true,
});

const getDoors = async (req: Request, res: Response) => {
  try {
    const doors = await getRepository(Door).find({
      relations: ['groups'],
    });
    res.send(doors);
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};

const updateDoor = async (req: Request, res: Response) => {
  try {
    const did = Number(req.params.id);
    await getRepository(Door).update({ did }, req.body);
    const newDoor = await getRepository(Door).findOne(did, {
      relations: ['groups'],
    });
    res.send(newDoor);
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};

const createDoor = async (req: Request, res: Response) => {
  try {
    const newDoor = await getRepository(Door).create(req.body);
    await getRepository(Door).save(newDoor);
    res.send(newDoor);
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};

const deleteDoor = async (req: Request, res: Response) => {
  try {
    const deletedDoor = getRepository(Door).findOne(req.params.id, {
      relations: ['groups'],
    });
    await getRepository(Door).delete(req.params.id);
    res.send(deletedDoor);
  } catch (error) {
    logger.error(error);
    res.status(500);
    res.send(error);
  }
};

const openDoor = async (code: number) => {
  try {
    fetch('https://door.codeworks.me/api/key/open', {
      method: 'POST',
      headers: {
        code: `${code}`,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

export {
  getDoors, updateDoor, createDoor, deleteDoor, openDoor,
};
