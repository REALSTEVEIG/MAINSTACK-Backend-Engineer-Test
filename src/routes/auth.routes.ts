/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

/* Middlewares */
import * as authValidators from '@/middlewares/req-validators/auth.validators';
import authorizationMiddleware from '@/middlewares/auth/authorization';

/* Controllers */
import {
  destroySessionController,
  loginController,
  sessionController,
  signupController,
  logoutController,
} from '@/controllers/auth/auth.controller';

const router = Router();

router.post('/login', authValidators.login, loginController);
router.post('/signup', authValidators.signup, signupController);
router.post('/session', authorizationMiddleware, sessionController);
router.post(
  '/session/reset',
  authorizationMiddleware,
  authValidators.resetSession,
  destroySessionController,
);

router.post('/logout', authorizationMiddleware, logoutController);

export default router;
