import { type Request, type Response } from 'express';
import * as config from '@config/index';

interface ApiResponse {
  NODE_ENV: string;
  version: string;
}

const appVersionController = (req: Request, res: Response): void => {
  const response: ApiResponse = {
    NODE_ENV: config.NODE_ENV,
    version: 'preview-cors-fix',
  };
  res.send(response);
};

export { appVersionController };
