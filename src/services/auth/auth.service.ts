/* eslint-disable new-cap */
import errors from '@constants/errors';
import _ from 'lodash';
import { type NewUserData } from '@/types';
import ApiError from '@/utils/api-error';
import { isUserExist } from '../users/user.service';

import { UsersModel } from '@/models/index';
import { encryptString, compareString } from '@/utils/bcrypt';

import { signToken } from '@/utils/jwt';

import BlackListedTokensModel from '@/models/blacklisted-tokens.model';

interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (payload: LoginPayload): Promise<any> => {
  const user = await isUserExist(payload.email);
  if (user == null) {
    throw new ApiError(errors.userNotFound);
  }
  if (user.isDeactivated) {
    throw new ApiError(errors.userDeactivated);
  }

  if (user.authType === 'google') {
    throw new ApiError(errors.invalidEmailLogin);
  }

  const isPasswordMatched: boolean = await compareString(
    payload.password,
    user.password,
  );
  if (!isPasswordMatched) {
    throw new ApiError(errors.invalidEmailOrPassword);
  }
  const result = _.omit(user, ['password']);

  const token = signToken({ id: result._id, email: result.email });

  return {
    result,
    token,
  };
};

export const signup = async (payload: NewUserData): Promise<any> => {
  const isUser = await isUserExist(payload.email);
  if (isUser?._id != null) {
    throw new ApiError(errors.userAlreadyExists);
  }

  const hashedPassword =
    payload.password !== undefined ? await encryptString(payload.password) : '';

  const newUserData: NewUserData & {
    isSignupProcessCompleted: boolean;
    isEmailVerified: boolean;
    authType: string;
  } = {
    ...payload,
    password: hashedPassword,
    isSignupProcessCompleted: true,
    isEmailVerified: false,
    authType: 'local',
  };
  const newUser = (await new UsersModel(newUserData).save()).toJSON();

  const token = signToken({ id: newUser._id, email: newUser.email });

  return {
    newUser,
    token,
  };
};

export const verify = async (
  payload: any,
): Promise<{
  success: boolean;
}> => {
  if (payload?.allowedAction !== 'email-verification') {
    throw new ApiError(errors.accessDenied);
  }
  await isUserExist(payload?.email);
  await UsersModel.updateOne(
    { email: payload.email },
    { $set: { isEmailVerified: true } },
  );
  return { success: true };
};

export const logout = async (token: string): Promise<any> => {
  await new BlackListedTokensModel({ token }).save();
};
