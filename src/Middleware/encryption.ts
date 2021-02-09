import bcrypt from 'bcrypt';

const saltRounds = 10;

const encrypt = async (password: string) => bcrypt.hash(password, saltRounds).then((hash) => hash);

const compare = async (password: string, hash: string) => {
  if (await bcrypt.compare(password, hash)) return true;
  return false;
};

export { encrypt, compare };
