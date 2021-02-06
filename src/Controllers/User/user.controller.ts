/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import pino from 'pino';
import User from '../../Models/Typeorm/User.entity';
import Group from '../../Models/Typeorm/Group.entity';
import { createPerson, deletePerson } from '../../Recognition/user.crud';

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
    res.status(500);
    res.send(error);
  }
};

const createUser = async (
  req: Request,
  res: Response,
) => {
  const { group, ...formattedBody } = req.body;
  const userTable = getRepository(User);
  try {
    const { personId } = await createPerson(formattedBody.email);
    formattedBody.aid = personId;
    const newUser = userTable.create(formattedBody);
    await userTable.save(newUser);
    if (group) {
      const groupEntity = await getRepository(Group).findOne(group);
      const userEntity = await userTable.findOne(personId);
      userEntity.group = groupEntity;
      await userTable.save(userEntity);
    }
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
  const aid: string = req.params.id;
  const { group, ...formattedBody } = req.body;
  const userTable = getRepository(User);
  try {
    if (Object.keys(formattedBody).length) await userTable.update({ aid }, formattedBody);
    const updatedUser: User = await userTable.findOne(aid);
    if (group) {
      const groupEntity = await getRepository(Group).findOne(group);
      updatedUser.group = groupEntity;
    }
    userTable.save(updatedUser);
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
  const userTable = getRepository(User);
  try {
    const deletedUser = userTable.findOne(req.params.id);
    await userTable.delete(req.params.id);
    await deletePerson(req.params.id);
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
