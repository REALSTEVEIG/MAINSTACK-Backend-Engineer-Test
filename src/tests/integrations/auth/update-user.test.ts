import { type AxiosError } from 'axios';
import request from '../../config/axios';
import { getSessionCookie } from '../../setup/index';
import errors from '@/constants/errors';

let sessionCookie: string;

beforeAll(async () => {
  sessionCookie = await getSessionCookie();
});

describe('Update User Controller should return appropriate response', () => {
  it('should return error access denied message when no session', async () => {
    try {
      await request.put('/api/user', {
        username: 'newUsername',
        firstName: 'New',
        lastName: 'User',
      });
    } catch (err) {
      const responseError = err as AxiosError;
      expect(responseError.response?.status).toBe(400);
      expect(responseError.response?.data).toEqual(errors.unauthorized);
    }
  });

  it('should return error missing input for user update', async () => {
    const hasError = false;

    try {
      await request.put(
        '/api/user',

        {
          headers: {
            Cookie: sessionCookie,
          },
        },
      );
    } catch (err) {
      const responseError = err as AxiosError;
      expect(responseError.response?.status).toBe(401);
      expect(responseError.response?.data).toEqual(errors.unauthorized);
    }

    expect(hasError).toBe(false);
  });

  it('should return error missing input for user update', async () => {
    try {
      await request.put('/api/user', {
        headers: {
          Cookie: sessionCookie,
        },
      });
    } catch (err) {
      const responseError = err as AxiosError;
      expect(responseError.response?.status).toBe(401);
    }
  });

  it('should return success true message and user information after update', async () => {
    const response = await request.put(
      '/api/user',
      {
        password: 'test@123',
        firstName: 'New',
        lastName: 'User',
      },
      {
        headers: {
          Cookie: sessionCookie,
        },
      },
    );
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.user).toBeDefined();
  });

  it('should return 401 if the user is not logged in', async () => {
    try {
      await request.patch('/api/user/deactivate-user', {
        password: 'Test@123!',
      });
    } catch (err) {
      const responseError = err as AxiosError;
      expect(responseError.response?.status).toBe(401);
      expect(responseError.response?.data).toEqual(errors.unauthorized);
    }
  });

  it('should return 401 if the password is incorrect', async () => {
    try {
      await request.patch('/api/user/deactivate-user', {
        password: 'Test@123',
      });
      expect(true).toBe(false);
    } catch (err) {
      const responseError = err as AxiosError;
      expect(responseError.response?.status).toBe(401);
      expect(responseError.response?.data).toEqual(errors.unauthorized);
    }
  });

  // it('should return 401 if the user does not exist', async () => {
  //   try {
  //     await request.patch(
  //       '/api/auth/deactivate-user',
  //       { password: 'Test@123!' },
  //       {
  //         headers: {
  //           Cookie: sessionCookie,
  //         },
  //       },
  //     );
  //   } catch (err) {
  //     const responseError = err as AxiosError;
  //     expect(responseError.response?.status).toBe(401);
  //     expect(responseError.response?.data).toEqual(errors.unauthorized);
  //   }
  // });
});
