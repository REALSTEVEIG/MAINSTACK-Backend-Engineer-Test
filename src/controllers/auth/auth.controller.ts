import { type Request, type Response } from 'express';
import { handleError } from '@/utils/api-error';
import { createSession, destroySession } from '@/services/auth/session';
import {
  type Request as Requests,
  type Response as Responses,
  type SingleUser,
} from '@/types';
import { login, signup, logout } from '@/services/auth/auth.service';

interface ApiRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface ApiRequest {
  email: string;
  password: string;
}

export const signupController = async (
  req: Request<any, any, ApiRequest>,
  res: Response,
): Promise<void> => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const result = await signup({
      firstName,
      lastName,
      email,
      password,
    });

    res.send(result);
  } catch (err) {
    handleError(res, err);
  }
};

export const loginController = async (
  req: Request<any, any, ApiRequest>,
  res: Response,
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await login({ email, password });
    createSession(req, result);
    res.send(result);
  } catch (err) {
    handleError(res, err);
  }
};

export const destroySessionController = async (
  req: Request<any, any, any, { logoutOfAllDevices?: boolean }>,
  res: Response,
): Promise<void> => {
  const result = await destroySession(req);
  res.send(result);
};

export const logoutController = async (
  req: Request<any, any, any, { logoutOfAllDevices?: boolean }>,
  res: Response,
): Promise<void> => {
  const token = req.headers.authorization as string;

  const result = await logout(token);

  res.send({
    success: true,
    message: 'Logged out successfully!',
    data: result,
  });
};

export const sessionController = (
  req: Request<any, any, { user: SingleUser }>,
  res: Response,
): void => {
  const result = req.session.user;
  res.send(result);
};

export const verifyTokenController = (
  req: Requests<{ token: string }, { tokenPayload: any }, { token: string }>,
  res: Responses<any>,
): void => {
  const response = req.ctx.tokenPayload;
  res.send({ ...response });
};

export default verifyTokenController;
