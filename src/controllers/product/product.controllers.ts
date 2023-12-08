import { type Request, type Response } from 'express';
import { handleError } from '@/utils/api-error';
import { type IProduct } from '@/types';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from '@/services/products/products.service';

export const createProductController = async (
  req: Request<any, any, IProduct>,
  res: Response,
): Promise<void> => {
  try {
    const { name, description, price } = req.body;
    const result = await createProduct({ name, description, price });
    res.send(result);
  } catch (err) {
    handleError(res, err);
  }
};

export const getAllProductsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await getAllProducts();
    res.send(result);
  } catch (err) {
    handleError(res, err);
  }
};

export const getProductByIdController = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await getProductById(id);
    res.send(result);
  } catch (err) {
    handleError(res, err);
  }
};

export const updateProductByIdController = async (
  req: Request<{ id: string }, any, IProduct>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const result = await updateProductById(id, { name, description, price });
    res.send(result);
  } catch (err) {
    handleError(res, err);
  }
};

export const deleteProductByIdController = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    await deleteProductById(id);
    res.send({
      message: 'Product deleted successfully',
    });
  } catch (err) {
    handleError(res, err);
  }
};
