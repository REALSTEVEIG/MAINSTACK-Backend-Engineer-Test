import bcrypt from 'bcrypt';

const encryptString = async (str: string, saltRounds = 10): Promise<string> => {
  const hashedValue = await bcrypt.hash(str, saltRounds);
  return hashedValue;
};

const compareString = async (str: string, hash: string): Promise<boolean> => {
  const isMatched = await bcrypt.compare(str, hash);
  return isMatched;
};

export { encryptString, compareString };
