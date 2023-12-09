import { type Request, type Response, type NextFunction } from 'express';
import errors from '@/constants/errors';
import { isUserExist } from '@/services/users/user.service';
import { verifyToken } from '@/utils/jwt';
import BlackListedTokensModel from '@/models/blacklisted-tokens.model';

const authorizationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decoded = verifyToken(token);

      // check if token is blacklisted
      const isBlackListed = await BlackListedTokensModel.findOne({
        token,
      });

      if (isBlackListed) {
        res.status(401).json({
          success: false,
          message: 'Token is blacklisted, please login again',
        });
        return;
      }

      // Check if the token has expired
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        res.status(401).json({ success: false, message: 'Token has expired' });
        return;
      }

      const user = await isUserExist(decoded.email);

      if (user != null) {
        next();
        return;
      }

      res.status(404).json(errors.userNotFound);
    } catch (error) {
      // Token verification failed
      res.status(401).json({
        success: false,
        message: 'Token is invalid, please login again!',
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Token is required',
    });
  }
};

export default authorizationMiddleware;
