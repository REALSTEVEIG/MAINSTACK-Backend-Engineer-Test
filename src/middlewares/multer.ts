/* eslint-disable import/no-extraneous-dependencies */
import multer from 'multer';
import path from 'path';
import { type Request } from 'express';

type FileFilterCallback = (error: Error | null, acceptFile: boolean) => void;

const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
): any => {
  const ext = path.extname(file.originalname);
  const allowedExtensions = ['.png', '.jpg', '.jpeg'];

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    const uploadError = new Error('Invalid image type');
    cb(uploadError, false);
  }
};

const multerMiddleware = multer({
  storage,
  fileFilter: fileFilter as any,
});

export default multerMiddleware;
