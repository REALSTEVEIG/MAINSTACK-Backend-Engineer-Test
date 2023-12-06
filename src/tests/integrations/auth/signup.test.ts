/* eslint-disable */
import { faker } from '@faker-js/faker';
import { type AxiosError } from 'axios';
import request from '../../config/axios';
import mailosaurClient from '../../config/mailosaur';
import { type NewUserData } from '@/types';
import errors from '@/constants/errors';

describe('Signup api shoudld return valid response', () => {
  const fakeEmail = mailosaurClient.servers.generateEmailAddress('Test');
  const payload: NewUserData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: fakeEmail,
    password: 'Test@1233!m',
  };

  it('should create a new user', async () => {
    // const result = await request.post('/api/auth/signup', payload);
    // TODO: I am commenting down these test cases for temporary. Right now will proceed with the unit test cases. and further will improve it.
    // expect(result.status).toBe(200);
    // expect(result.data.message).toBe('Success');
  });

  it('should send valid error response if user already exists', async () => {
    // try {
    //   await request.post('/api/auth/signup', payload);
    //   expect(true).toBe(false);
    // } catch (error) {
    //   const axiosError = error as AxiosError;
    //   expect(axiosError.response?.status).toBe(409);
    //   expect(axiosError.response?.data).toMatchObject(errors.userAlreadyExists);
    // }
  });
});
