import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { getRepository } from 'typeorm';
import User from '../../Models/Typeorm/User.entity';

const sendActivationEmail = async (userObject: any) => {
  const { firstName, email, aid } = userObject;
  const token = String(Math.floor(Math.random() * 100000));
  const dirPath = path.join(__dirname, '/EmailTemplate/emailTemplate.html');

  let data = fs.readFileSync(dirPath, {
    encoding: 'utf8', flag: 'r',
  });

  data = data.replace(/{%firstname%}/g, firstName);
  data = data.replace(/{%token%}/g, token);

  const transporter = nodemailer.createTransport({
    name: 'playground-area.com',
    host: 'smtp.coresender.com',
    port: 587,
    secure: false,
    auth: {
      user: 'c9b2a30b-37b0-44dc-8eb7-aaaf52951a7b',
      pass: '4f7b17fb-ae63-4daf-9e26-e989f62aa7f6',
    },
  });

  const updatedUser = await getRepository(User).update(aid, { registrationKey: token });
  const send = await transporter.sendMail({
    from: 'info@playground-area.com',
    to: email,
    subject: 'Your invitation to sesame',
    text: 'Your invitation to sesame',
    html: data,
  });

  if (send.rejected.length || updatedUser.affected === 0) return false;
  return true;
};

export default sendActivationEmail;
