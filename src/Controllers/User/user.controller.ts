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
    const users = await getRepository(User).find();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.send(500);
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
    await getRepository(User).save(newUser);
    if (group) {
      const groupEntity = await getRepository(Group).findOne(group);
      const userEntity = await getRepository(User).findOne(personId);
      userEntity.group = groupEntity;
    }
    res.send(newUser);
  } catch (error) {
    console.log('this is the error 🐷', error);
    res.send(500);
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
    console.log('ಠ_ಠ', error);
    res.send(500);
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
    console.log(error);
    res.send(500);
  }
};

export {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
};
