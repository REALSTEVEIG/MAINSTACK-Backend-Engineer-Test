import jwt from 'jsonwebtoken';
// import { type ActionTokenPayload } from '@/types';

const privateKey = 'asas';

const signToken = (payload: object): string => {
  const token = jwt.sign({ ...payload }, privateKey, {
    expiresIn: '30d',
  });
  return token;
};
const verifyToken = <P = any>(token: string): P => {
  const payload = jwt.verify(token, privateKey) as P;
  return payload;
};
/**
 * @deprecated - will remove after confirming the usage
 */
// const decodeToken = (payload: string): ActionTokenPayload => {
//   const tokenFields = jwt.decode(payload) as ActionTokenPayload;
//   return tokenFields;
// };

export {
  signToken,
  verifyToken,
  // decodeToken,
};
