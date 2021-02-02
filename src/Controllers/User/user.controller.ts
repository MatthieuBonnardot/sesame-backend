/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../../Models/Typeorm/User.entity';
import pino from 'pino';

const mockUser = 	{
  firstname: "Matthieu",
  lastname: "Bonnardot",
  email: "matthieu.bonnardot@gmail.com",
  isActive: true,
  group: "Student"
}
const req = {
  body: mockUser,
}

const logger = pino({
  prettyPrint: true,
});

const getUsers = async (req: Request, res: Response) => {
  try {
    return getRepository(User).find();
  } catch (error) {}
};

const createUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const newUser = await getRepository(User).create(req.body);
    return getRepository(User).save(newUser);
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
