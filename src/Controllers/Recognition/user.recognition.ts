/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../../Models/Typeorm/User.entity';
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
      // const status = await addFace(req.params.code, face);
      // console.log(status);
    });

    res.send('ok');
  } catch (error) {
    res.sendStatus(500);
  }
};

const identifyUser = async (req: Request, res: Response) => {
  try {
    const start = Date.now();
    const azureResponse: any = await identify(req.params.faceID);
    const aid = azureResponse[0].candidates[0].personId;
    const user = await getRepository(User).find({ where: { aid } });
    console.log(Date.now() - start);
    res.send(user);
  } catch (error) {
    res.sendStatus(500);
  }
};

const detectAndIdentifyUser = async (req: any, res: Response) => {
  try {
    const start = Date.now();
    console.log(req.body);
    const response: any = await detect(req.body);
    console.log(response[0]?.faceId);
    const faceID = response[0]?.faceId;
    const azureResponse: any = await identify(faceID);
    console.log(azureResponse);
    const aid = azureResponse[0]?.candidates[0]?.personId;
    const user = await getRepository(User).find({ where: { aid } });
    console.log(Date.now() - start);
    console.log(user);
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
};

export {
  verifyUserStatus,
  addFaceMappings,
  identifyUser,
  detectAndIdentifyUser,
};
