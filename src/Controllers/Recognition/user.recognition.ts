/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import pino from 'pino';
import { getRepository } from 'typeorm';
import User from '../../Models/Typeorm/User.entity';
import logsController from '../IssueAndLogs/log.controller';
import checkAccess from '../../Middleware/checkAccess';
import {
  trainPersonsGroup,
  getTrainingStatus,
} from '../../Recognition/group.crud';
import { addFace } from '../../Recognition/user.crud';
import identify from '../../Recognition/identify';

const logger = pino({
  prettyPrint: true,
});

interface AccessControl {
  firstName: string;
  access: boolean;
}

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
    const response = await addFace(req.params.UID, req.body);
    res.send(response);
  } catch (error) {
    res.sendStatus(500);
  }
};

const identifyUser = async (req: Request, res: Response) => {
  try {
    const { faceID, DID } = req.params;
    const azureResponse: any = await identify(faceID);
    if (azureResponse[0].candidates.length <= 0) {
      res.send({
        arg: 'User is unknown',
      });
    } else {
      console.log(azureResponse);
      const { personId } = azureResponse[0].candidates[0];
      const checked: AccessControl = await checkAccess(personId, Number(DID));
      if (checked.access) {
        logsController.internalLogCreation({
          enteredBy: personId,
          enteredDoor: DID,
        });
        res.send(checked);
      } else {
        res.send(checked);
      }
    }
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};

export { verifyUserStatus, addFaceMappings, identifyUser };
