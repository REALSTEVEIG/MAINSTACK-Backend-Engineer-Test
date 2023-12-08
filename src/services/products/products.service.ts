import type { NewProductData, IProduct } from '@/types';
import { ProductsModel } from '@/models/index';
import errors from '@/constants/errors';
import ApiError from '@/utils/api-error';

export const createProduct = async (
  payload: NewProductData,
): Promise<IProduct> => {
  const newProduct = new ProductsModel(payload);
  const result = await newProduct.save();
  return result;
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  const result = await ProductsModel.find();

  if (result.length === 0) {
    throw new ApiError(errors.productNotFound);
  }

  return result;
};

export const getProductById = async (id: string): Promise<IProduct> => {
  const result = await ProductsModel.findById(id);
  if (!result) {
    throw new ApiError(errors.productNotFound);
  }
  return result;
};

export const updateProductById = async (
  id: string,
  payload: NewProductData,
): Promise<IProduct | null> => {
  const product = await ProductsModel.findById(id);
  if (!product) {
    throw new ApiError(errors.productNotFound);
  }
  const result = await ProductsModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

export const deleteProductById = async (id: string): Promise<void> => {
  const result = await ProductsModel.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(errors.productNotFound);
  }
};
