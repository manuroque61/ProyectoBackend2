import Product from '../models/product.model.js';
import { ProductDTO } from '../dtos/product.dto.js';

export class ProductsDAO {
  async getProductById(id) {
    const product = await Product.findById(id).lean();
    return product ? new ProductDTO(product) : null;
  }

  async updateProduct(id, updateData) {
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true }).lean();
    return new ProductDTO(updatedProduct);
  }

  async getProducts(filter = {}) {
    const products = await Product.find(filter).lean();
    return products.map(p => new ProductDTO(p));
  }
  async createProduct(productData) {
    const newProduct = await Product.create(productData);
    return new ProductDTO(newProduct.toObject());
  }
}