import { Router } from 'express';
import * as authValidators from '@/middlewares/req-validators/auth.validators';
import authorizationMiddleware from '@/middlewares/auth/authorization';
import imageUpload from '@/middlewares/multer';

const router = Router();

router.get('/', authorizationMiddleware as any);
router.patch(
  '/deactivate-user',
  authValidators.deactivateUserValidator,
  authorizationMiddleware as any,
);
router.put(
  '/',
  authValidators.updateUserValidator,
  authorizationMiddleware as any,
  imageUpload.single('file'),
);

export default router;
