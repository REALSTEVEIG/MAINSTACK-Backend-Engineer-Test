import { type Response } from 'express';
import {
  type ApiErrorOpts,
  type ErrorResponse,
  type ErrorData,
} from '@/types/index';
import { getEnvironmentVariable } from '.';

class ApiError extends Error {
  statusCode: number;

  errorCode: string;

  stack?: string;

  constructor(
    { message, statusCode, errorCode }: ErrorData,
    customMessage?: string,
  ) {
    super(customMessage ? `${message} ${customMessage}` : message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;

    // Capture the stack trace
    Error.captureStackTrace(this, this.constructor);

    // Ensure the stack is included in the serialized JSON
    Object.defineProperty(this, 'stack', {
      enumerable: false,
    });
  }
}

export const handleError = (res: Response, err: ApiErrorOpts | any): void => {
  const isDevEnv = getEnvironmentVariable('NODE_ENV') === 'development';

  const errorResponse: ErrorResponse = {
    message: err.message,
    statusCode: err.statusCode,
    errorCode: err.errorCode,
    stack: isDevEnv ? err.stack : undefined,
  };

  if (!err.statusCode) {
    errorResponse.statusCode = 500;
    errorResponse.message = 'Internal Server Error';
    errorResponse.errorCode = 'INTERNAL_ERROR';
    errorResponse.stack = isDevEnv ? err.stack : undefined;
  }

  res.status(err.statusCode || 500).send(errorResponse);
};

export default ApiError;
