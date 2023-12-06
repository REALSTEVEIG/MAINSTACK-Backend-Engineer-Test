import { validationResult } from 'express-validator';
import { type Request, type Response, type NextFunction } from 'express';
import errors from '@/constants/errors';

const validationHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errorMessages = result
      .array()
      .map((err) => err.msg)
      .join(', ');
    const errorResponse = { ...errors.validationError, message: errorMessages };
    res.status(400).json(errorResponse);
    return;
  }
  next();
};

export default validationHandler;
