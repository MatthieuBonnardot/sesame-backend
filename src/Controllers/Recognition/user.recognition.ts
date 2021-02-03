/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../../Models/Typeorm/User.entity';

const verifyUserStatus = async (req: Request, res: Response) => {
  try {
    const firstUser = await getRepository(User).findOne({
      registrationKey: req.params.code,
    });
    if (!firstUser) res.send(404);
    else if (firstUser.isActive === true) {
      res.status(200).send('ACTIVE');
    } else {
      res.status(200).send('NOT ACTIVE');
    }
  } catch (error) {
    res.sendStatus(501);
  }
};

const addFaceMappings = async (req: Request, res: Response) => {
  try {
    
  } catch (error) {}
};

const identifyUser = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

export { verifyUserStatus, addFaceMappings, identifyUser };
