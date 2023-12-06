import { type AxiosError } from 'axios';
import { faker } from '@faker-js/faker';
import mockedUsers from '../../mocks/users.json';
import { type NewUserData } from '@/types';
import errors from '@/constants/errors';
import request from '../../config/axios';

describe('Login API should return valid responses', () => {
  const defaultUser: Pick<NewUserData, 'email' | 'password'> = {
    email: mockedUsers[0].email,
    password: mockedUsers[0].password,
  };
  const deactivatedUser = {
    email: mockedUsers[2].email,
    password: mockedUsers[2].password,
    isDeactivated: mockedUsers[2].isDeactivated,
  };
  it('should return login valid login response', async () => {
    const result = await request.post('/api/auth/login', defaultUser);
    expect(result.status).toBe(200);
  });
  it('should return error response for invalid email or password for wrong password case', async () => {
    try {
      await request.post('/api/auth/login', {
        ...defaultUser,
        password: faker.internet.password(),
      });
      // If request succeeds, force the test to fail, because we expect it to throw an error.
      expect(true).toBe(false);
    } catch (error) {
      const axiosError = error as AxiosError;
      expect(axiosError.response?.status).toBe(401);
      expect(axiosError.response?.data).toMatchObject(
        errors.invalidEmailOrPassword,
      );
    }
  });
  it('should return error response for invalid user for wrong email case', async () => {
    try {
      await request.post('/api/auth/login', {
        ...defaultUser,
        email: faker.internet.email(),
      });
      // If request succeeds, force the test to fail, because we expect it to throw an error.
      expect(true).toBe(false);
    } catch (error) {
      const axiosError = error as AxiosError;
      expect(axiosError.response?.status).toBe(404);
      expect(axiosError.response?.data).toMatchObject(errors.userNotFound);
    }
  });
  it('should return error response for deactivated user', async () => {
    try {
      await request.post('/api/auth/login', deactivatedUser);
    } catch (error) {
      const axiosError = error as AxiosError;
      expect(axiosError.response?.status).toBe(403);
      expect(axiosError.response?.data).toMatchObject(errors.userDeactivated);
    }
  });
});
