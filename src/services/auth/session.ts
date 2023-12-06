import { type Request } from 'express';
import mongoose from 'mongoose';
import { type SingleUser } from '@/types';
import ApiError from '@/utils/api-error';
import errors from '@/constants/errors';

interface DestroySessionResult {
  success: boolean;
}

const createSession = (
  req: Request,
  user: Omit<SingleUser, 'password'>,
): void => {
  req.session.user = user as SingleUser;
};

const destroySession = async (
  req: Request<any, any, any, { logoutOfAllDevices?: boolean }>,
): Promise<DestroySessionResult> => {
  if (req.query.logoutOfAllDevices ?? false) {
    const result: DestroySessionResult = await new Promise(
      (resolve, reject) => {
        const uid = req.session.user?._id;
        req.session.destroy((err: any) => {
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          if (err) {
            reject(new ApiError(errors.unexpectedError));
          }
          const SessionsModel = mongoose.connection.db.collection('sessions');
          SessionsModel.deleteMany({
            'session.user._id': uid,
          })
            .then(() => {
              resolve({ success: true });
            })
            .catch((qerr: any) => {
              throw qerr;
            });
        });
      },
    );
    return result;
  }
  const result: DestroySessionResult = await new Promise((resolve, reject) => {
    req.session.destroy((err: any) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (err) {
        reject(new ApiError(errors.unexpectedError));
      }
      resolve({ success: true });
    });
  });
  return result;
};

export { createSession, destroySession };
