import { type NewUserData } from '@/types';
import mockedUsers from '../mocks/users.json';
import request from '../config/axios';
import errors from '@/constants/errors';
import ApiError from '@/utils/api-error';

const getSessionCookie = async (
  userEmail?: string,
  userPassword?: string,
): Promise<string> => {
  try {
    const loginCreds: Pick<NewUserData, 'email' | 'password'> = {
      email: typeof userEmail === 'string' ? userEmail : mockedUsers[0].email,
      password:
        typeof userPassword === 'string'
          ? userPassword
          : mockedUsers[0].password,
    };
    const res = await request.post('/api/auth/login', loginCreds);
    const cookies = res.headers['set-cookie'];
    if (cookies != null && cookies.length > 0) {
      return cookies[0];
    }
    return '';
  } catch (error) {
    throw new ApiError(errors.unauthorized, 'Cannot get session cookie');
  }
};

export { getSessionCookie };
