/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../../Models/Typeorm/User.entity';

const verifyUserStatus = async (req: Request, res: Response) => {
  try {
    const list = await await getRepository(User).find({
      where: { registrationKey: req.params.code },
    });

    const { aid, firstName } = list[0];

    const body = {
      aid,
      firstName,
    };

    if (list.length === 0) res.status(404).send('Not Found');
    else if (list[0].isActive === false) res.status(200).send(body);
    else if (list[0].isActive === true) res.status(200).send(false);
  } catch (error) {
    res.sendStatus(501);
  }
};

const addFaceMappings = async (req: Request, res: Response) => {
  // try {

  // } catch (error) {

  // }
};

const identifyUser = async (req: Request, res: Response) => {
  // try {

  // } catch (error) {

  // }
};

export { verifyUserStatus, addFaceMappings, identifyUser };
