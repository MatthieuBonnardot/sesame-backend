/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import pino from 'pino';
import User from '../../Models/Typeorm/User.entity';
import Group from '../../Models/Typeorm/Group.entity';
import { createPerson } from '../../Recognition/user.crud';

const logger = pino({
  prettyPrint: true,
});

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getRepository(User).find({
      relations: ['group'],
    });
    res.send(users);
  } catch (error) {
    logger.error(error);
<<<<<<< HEAD
    res.send(500);
=======
    res.status(500);
    res.send(error);
>>>>>>> refactor: refactored group and door controllers
  }
};

const createUser = async (
  req: Request,
  res: Response,
) => {
  const {
    firstName,
    lastName,
    email,
    group,
  } = req.body;
  try {
    const { personId } = await createPerson(firstName);
    const formattedBody: User = {
      firstName,
      lastName,
      email,
      aid: personId,
      doorKey: null,
      registrationKey: null,
      isActive: false,
      group: null,
    };
    const newUser = getRepository(User).create(formattedBody);
    if (group) {
      const groupEntity = await getRepository(Group).findOne(group);
      newUser.group = groupEntity;
    }
    await getRepository(User).save(newUser);
    res.send(newUser);
  } catch (error) {
    logger.error(error);
    res.status(500);
    res.send(error);
  }
};

const updateUser = async (
  req: Request,
  res: Response,
) => {
  try {
    await getRepository(User).update({ aid: req.params.id }, req.body);
    const updatedUser = await getRepository(User).findOne(req.params.id);
    res.send(updatedUser);
  } catch (error) {
    logger.error(error);
    res.status(500);
    res.send(error);
  }
};

const deleteUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const deletedUser = getRepository(User).findOne(req.params.id);
    await getRepository(User).delete(req.params.id);
    res.send(deletedUser);
  } catch (error) {
    logger.error(error);
    res.status(500);
    res.send(error);
  }
};

export {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
};
