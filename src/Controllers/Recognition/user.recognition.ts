/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../../Models/Typeorm/User.entity';
import logsController from '../IssueAndLogs/log.controller';
import checkAccess from '../../Middleware/checkAccess';
import { addFace } from '../../Recognition/user.crud';
import identify from '../../Recognition/identify';
import detect from '../../Recognition/detect';

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
  try {
    console.log(req.body);
    console.log(req.params.UID);
    const { images } = req.body;

    images.forEach(async (face: ArrayBuffer) => {
      console.log(face);
      const status = await addFace(req.params.code, face);
      console.log(status);
    });

    res.send('ok');
  } catch (error) {
    res.sendStatus(500);
  }
};

const identifyUser = async (req: Request, res: Response) => {
  try {
    const { faceID, DID } = req.params;
    const azureResponse: any = await identify(faceID);
    const { personId } = azureResponse[0].candidates[0];
    console.log(personId, DID);
    if (checkAccess(personId, Number(DID))) {
      logsController.internalLogCreation({
        enteredBy: personId,
        enteredDoor: DID,
      });
      res.send(true);
    } else res.status(404).send(false);
  } catch (error) {
    res.sendStatus(500);
  }
};

export {
  verifyUserStatus,
  addFaceMappings,
  identifyUser,
};
