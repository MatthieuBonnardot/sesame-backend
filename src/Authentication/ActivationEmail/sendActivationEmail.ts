import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { getRepository } from 'typeorm';
import User from '../../Models/Typeorm/User.entity';
import env from '../../config/config';

const dirPath = path.join(__dirname, '/EmailTemplate/emailTemplate.html');
let data = fs.readFileSync(dirPath, {
  encoding: 'utf8', flag: 'r',
});

const sendActivationEmail = async (userObject: any) => {
  const { firstName, email, aid } = userObject;
  const token = String(Math.floor(Math.random() * 100000));

  data = data.replace(/{%firstname%}/g, firstName);
  data = data.replace(/{%token%}/g, token);

  const updatedUser = await getRepository(User).update(aid, { registrationKey: token });

  const transporter = nodemailer.createTransport({
    name: 'playground-area.com',
    host: 'smtp.coresender.com',
    port: 587,
    secure: false,
    auth: {
      user: env.email.user,
      pass: env.email.password,
    },
  });

  const send = await transporter.sendMail({
    from: 'info@playground-area.com',
    to: email,
    subject: 'Your invitation to sesame',
    text: 'Your invitation to sesame',
    html: data,
  });

  if (send.rejected.length || updatedUser.affected === 0) return false;
  console.log(userObject);

  return true;
};

export default sendActivationEmail;
