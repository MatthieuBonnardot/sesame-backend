import { getRepository } from 'typeorm';
import User from '../Models/Typeorm/User.entity';

const checkAccess = async (userId: string, doorId: number) => {
  let hasAccess = false;
  try {
    const user = await getRepository(User).findOne(userId, {
      relations: ['group', 'group.doors'],
    });
    console.log(user);
    console.log('logging', user.firstName);
    user.group.doors.forEach((door) => {
      if (door.did === doorId) hasAccess = true;
    });
    console.log(hasAccess);
    return ({
      firstName: user.firstName,
      access: hasAccess,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default checkAccess;
