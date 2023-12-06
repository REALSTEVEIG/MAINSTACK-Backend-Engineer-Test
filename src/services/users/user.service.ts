import { type Types } from 'mongoose';
import errors from '@/constants/errors';
import { UsersModel } from '@/models';
import { type UsersDocument, type IUser } from '@/types';
import ApiError from '@/utils/api-error';
import { compareString, encryptString } from '@/utils/bcrypt';

interface UpdateUserPayload {
  email: string;
  newEmail?: string;
  password?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  newPassword?: string;
}

interface ResetPasswordPayload {
  email: string;
  password: string;
}

const isUserExist = async (email: string): Promise<IUser | null> => {
  const result = await UsersModel.findOne({ email });
  if (result?._id != null) return result;
  return null;
};

const validatePasswordRequired = (password: string | undefined): string => {
  if (!password) {
    throw new ApiError(errors.passwordRequired);
  }
  return password;
};

export const validatePassword = async (
  password: string,
  userPassword: string,
): Promise<boolean> => {
  const isPasswordMatched: boolean = await compareString(
    password,
    userPassword,
  );
  if (!isPasswordMatched) {
    throw new ApiError(errors.invalidCredentials);
  }
  return true;
};

const buildPayload = (
  basePayload: Partial<UsersDocument>,
  username: string | undefined,
  firstName: string | undefined,
  lastName: string | undefined,
): any => {
  const payload = { ...basePayload };
  if (username) payload.username = username;
  if (firstName) payload.firstName = firstName;
  if (lastName) payload.lastName = lastName;

  return payload;
};

const updateUserByEmail = async (
  email: string,
  payload: Partial<UsersDocument>,
): Promise<UsersDocument | null> => {
  const result = await UsersModel.findOneAndUpdate(
    { email },
    { $set: payload },
    { new: true },
  );
  return result?._id != null ? (result as UsersDocument) : null;
};

const updateUser = async (
  params: UpdateUserPayload,
): Promise<UsersDocument | null> => {
  const {
    newEmail,
    email,
    password,
    username,
    firstName,
    lastName,
    newPassword,
  } = params;

  const user = await isUserExist(email);

  if (!user) {
    throw new ApiError(errors.userNotFound);
  }

  if (newEmail) {
    validatePasswordRequired(password);
    await validatePassword(password as string, user.password);
    const payload = buildPayload(
      { email: newEmail, isEmailVerified: false },
      username,
      firstName,
      lastName,
    );
    return updateUserByEmail(email, payload);
  }

  if (newPassword) {
    validatePasswordRequired(password);
    await validatePassword(password as string, user.password);
    const hashedPassword = await encryptString(newPassword);
    const payload = buildPayload(
      { password: hashedPassword },
      username,
      firstName,
      lastName,
    );
    return updateUserByEmail(email, payload);
  }

  const payload = buildPayload(
    { username, firstName, lastName },
    username,
    firstName,
    lastName,
  );
  return updateUserByEmail(email, payload);
};

const resetPassword = async (
  params: ResetPasswordPayload,
): Promise<IUser | null> => {
  const updatedDoc = await UsersModel.findOneAndUpdate(
    { email: params.email },
    { $set: { password: params.password } },
  );

  if (updatedDoc === null) return null;

  return updatedDoc as IUser;
};

const getUser = async (id: Types.ObjectId): Promise<IUser | null> => {
  const user = await UsersModel.findById(id);
  if (!user) return null;
  return user;
};

const deactivateUser = async (
  id: string,
  password: string,
): Promise<IUser | null> => {
  const user = await UsersModel.findById(id);
  if (!user) {
    return null;
  }
  await validatePassword(password, user.password);
  const result = await UsersModel.findByIdAndUpdate(
    id,
    { $set: { isDeactivated: true } },
    { new: true },
  );
  return result?._id != null ? (result as IUser) : null;
};

export { resetPassword, updateUser, isUserExist, getUser, deactivateUser };
