/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import pino from 'pino';
import User from '../../Models/Typeorm/User.entity';
import { createPerson } from '../../Recognition/user.crud';
import { getTrainingStatus } from '../../Recognition/group.crud';
import { create } from 'domain';

const logger = pino({
  prettyPrint: true,
});

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getRepository(User).find();
    // res.json(users);
    res.send(users);
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const userAID = await createPerson(req.body.first_name);
    console.log('returned from azure', userAID);
    req.body.aid = userAID.personId;
    const newUser = await getRepository(User).create(req.body);
    await getRepository(User).save(newUser);
    res.send(newUser);
  } catch (error) {
    console.log(error);
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
  } catch (error) {}
};

export {
  getUsers, createUser, deleteUser, updateUser,
};
