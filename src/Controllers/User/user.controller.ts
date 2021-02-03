/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import pino from 'pino';
import User from '../../Models/Typeorm/User.entity';
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
  }
};

//MAKE EMAIL UNIQUE SO CANT MAKE MORE THAN ONE
const createUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const userAID = await createPerson(req.body.first_name);
    req.body.aid = userAID.personId;
    console.log('user aid', userAID);
    console.log(req.body.aid);
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
  } catch (error) {}
};

const deleteUser = async (
  req: Request,
  res: Response,
) => {
  try {
    await getRepository(User).delete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
  }
};

export {
  getUsers, createUser, deleteUser, updateUser,
};
