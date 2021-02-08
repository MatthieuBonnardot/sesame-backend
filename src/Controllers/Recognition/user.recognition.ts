/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import pino from 'pino';
import { getRepository } from 'typeorm';
import User from '../../Models/Typeorm/User.entity';
import logsController from '../IssueAndLogs/log.controller';
import checkAccess from '../../Middleware/checkAccess';
import azureService from '../../Recognition/azure.method';

const logger = pino({
  prettyPrint: true,
});

interface AccessControl {
  firstName: string;
  access: boolean;
}

const verifyUserStatus = async (req: Request, res: Response) => {
  try {
    const list = await getRepository(User).find({
      where: { registrationKey: req.params.code },
    });

    if (list.length === 0) res.status(404).send('Not Found');
    else if (list[0].isActive === true) res.status(200).send(false);
    else if (list[0].isActive === false) {
      res.status(200).send({
        aid: list[0].aid,
        firstName: list[0].firstName,
      });
    }
  } catch (error) {
    res.sendStatus(501);
  }
};

const addFaceMappings = async (req: Request, res: Response) => {
  try {
    const user = await getRepository(User).findOne(req.params.UID);
    const response = await azureService('USER', 'FACE', {
      personId: req.params.UID,
      octetStream: req.body,
    });

    if (user && response) {
      await getRepository(User).update(req.params.UID, { isActive: true });
      res.send({
        message: response,
        doorkey: user.doorKey,
      });
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

const identifyUser = async (req: Request, res: Response) => {
  try {
    const { faceID, DID } = req.params;
    const azureResponse: any = await azureService('IDENTIFY', '', {
      personId: faceID,
    });

    if (azureResponse[0].candidates.length <= 0) {
      res.send({
        arg: 'User is unknown',
      });
    } else {
      const checked: AccessControl = await checkAccess(
        azureResponse[0].candidates[0],
        Number(DID),
      );
      if (checked.access) {
        logsController.internalLogCreation({
          enteredBy: azureResponse[0].candidates[0],
          enteredDoor: DID,
        });
      }
      res.send(checked);
    }
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};

export { verifyUserStatus, addFaceMappings, identifyUser };
