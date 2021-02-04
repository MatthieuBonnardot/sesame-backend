/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import pino from 'pino';
import User from '../../Models/Typeorm/User.entity';
import { createPerson } from '../../Recognition/user.crud';

const logger = pino({
  prettyPrint: true,
});

const getUserDoors = async (req: Request, res: Response) => {
  try {
    const users: User = await getRepository(User).findOne(req.params.id, {
      relations: [
        'group',
        'group.doors',
      ],
    });
    console.log(users);

    res.send(users);
  } catch (error) {
    console.log(error);
    res.send(500);
  }
};

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
  try {
    const userAID = await createPerson(req.body.firstName);
    req.body.aid = userAID.personId;
    const newUser = await getRepository(User).create(req.body);
    await getRepository(User).save(newUser);
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
  getUserDoors,
};
