/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import authorizationMiddleware from '@/middlewares/auth/authorization';
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductByIdController,
  deleteProductByIdController,
} from '@/controllers/product/product.controllers';
import {
  createValidator,
  getIdValidator,
} from '@/middlewares/req-validators/product.validators';

const router = Router();

router.post(
  '/',
  authorizationMiddleware as any,
  createValidator,
  createProductController,
);

router.get('/', authorizationMiddleware as any, getAllProductsController);

router.get(
  '/:id',
  authorizationMiddleware as any,
  getIdValidator,
  getProductByIdController,
);

router.put(
  '/:id',
  authorizationMiddleware as any,
  getIdValidator,
  updateProductByIdController,
);

router.delete(
  '/:id',
  authorizationMiddleware as any,
  getIdValidator,
  deleteProductByIdController,
);

export default router;
