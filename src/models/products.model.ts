import mongoose from 'mongoose';
import type { IProduct } from '@/types';
import { toJSON } from './plugin/toJSON';

const { Schema } = mongoose;

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: String,
  price: Number,
  createdAt: Date,
  updatedAt: Date,
});

productSchema.plugin(toJSON);

const ProductsModel = mongoose.model<IProduct>('products', productSchema);

export default ProductsModel;
