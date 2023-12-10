import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from '@/services/products/products.service';
import { ProductsModel } from '@/models/index';
import ApiError from '@/utils/api-error';

jest.mock('@/models/index');

describe('Product Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('createProduct should create a new product', async () => {
    const payload = {
      name: 'Test Product',
      description: 'Test Description',
      price: 10,
    };

    const mockSave = jest.fn().mockResolvedValue(payload);
    ProductsModel.prototype.save = mockSave;

    const result = await createProduct(payload);

    expect(mockSave).toHaveBeenCalled();
    expect(result).toEqual(payload);
  });

  test('getAllProducts should return all products', async () => {
    const payload = [
      {
        id: '6574dddff0f10441236af541',
        name: 'Test Product',
        description: 'Test Description',
        price: 10,
      },
      {
        id: '6574dddff0f10441236af542',
        name: 'Test Product 2',
        description: 'Test Description 2',
        price: 20,
      },
    ];

    const mockFind = jest.fn().mockResolvedValue(payload);
    ProductsModel.find = mockFind;

    const result = await getAllProducts();

    expect(mockFind).toHaveBeenCalled();
    expect(result).toEqual(payload);
  });

  test('getProductById should return a product', async () => {
    const payload = {
      id: '6574dddff0f10441236af541',
      name: 'Test Product',
      description: 'Test Description',
      price: 10,
    };

    const mockFindById = jest.fn().mockResolvedValue(payload);
    ProductsModel.findById = mockFindById;

    const result = await getProductById('6574dddff0f10441236af541');

    expect(mockFindById).toHaveBeenCalled();
    expect(result).toEqual(payload);
  });

  test('updateProductById should update a product', async () => {
    const productId = '6574dddff0f10441236af541';
    const payload = {
      name: 'Updated Product',
      description: 'Updated Description',
      price: 15,
    };

    // Mock the product that findById will return
    const mockProduct = {
      _id: productId,
      name: 'Original Product',
      description: 'Original Description',
      price: 10,
    };

    // Mock the findById method to return the existing product
    const mockFindById = jest.fn().mockResolvedValue(mockProduct);
    ProductsModel.findById = mockFindById;

    // Mock the findByIdAndUpdate method to return the updated product
    const mockFindAndUpdate = jest.fn().mockResolvedValue(payload);
    ProductsModel.findByIdAndUpdate = mockFindAndUpdate;

    const result = await updateProductById(productId, payload);

    expect(mockFindById).toHaveBeenCalledWith(productId);
    expect(mockFindAndUpdate).toHaveBeenCalledWith(productId, payload, {
      new: true,
    });
    expect(result).toEqual(payload);
  });

  test('updateProductById should throw ApiError if product is not found', async () => {
    const productId = '6574dddff0f10441236af541';
    const payload = {
      name: 'Updated Product',
      description: 'Updated Description',
      price: 15,
    };

    // Mock the findById method to return null (product not found)
    const mockFindById = jest.fn().mockResolvedValue(null);
    ProductsModel.findById = mockFindById;

    try {
      await updateProductById(productId, payload);
      // If updateProductById doesn't throw an error, fail the test
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
    }
  });

  test('deleteProductById should delete a product', async () => {
    const productId = '6574dddff0f10441236af541';

    // Mock the product that findByIdAndDelete will return
    const mockProduct = {
      _id: productId,
      name: 'Test Product',
      description: 'Test Description',
      price: 10,
    };

    // Mock the findByIdAndDelete method to return the deleted product
    const mockFindAndDelete = jest.fn().mockResolvedValue(mockProduct);
    ProductsModel.findByIdAndDelete = mockFindAndDelete;

    await deleteProductById(productId);

    expect(mockFindAndDelete).toHaveBeenCalledWith(productId);
  });

  test('deleteProductById should throw ApiError if product is not found', async () => {
    const productId = '6574dddff0f10441236af541';

    // Mock the findByIdAndDelete method to return null (product not found)
    const mockFindAndDelete = jest.fn().mockResolvedValue(null);
    ProductsModel.findByIdAndDelete = mockFindAndDelete;

    try {
      await deleteProductById(productId);
      // If deleteProductById doesn't throw an error, fail the test
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
    }
  });
});
