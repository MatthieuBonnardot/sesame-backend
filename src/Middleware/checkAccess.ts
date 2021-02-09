import { getRepository } from 'typeorm';
import User from '../Models/Typeorm/User.entity';

const checkAccess = async (userId: string, doorId: number) => {
  try {
    const { group, firstName, doorKey } = await getRepository(User).findOne(userId, {
      relations: ['group', 'group.doors'],
    });
    const hasAccess = group.doors.some((door) => door.did === doorId);
    return ({
      firstName,
      doorKey,
      access: hasAccess,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default checkAccess;
