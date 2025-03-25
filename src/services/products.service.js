import { ProductsRepository } from '../repositories/products.repository.js';

export class ProductsService {
  constructor() {
    this.repository = new ProductsRepository();
  }

  async getProduct(id) {
    return await this.repository.getProductById(id);
  }

  async updateProductStock(id, newStock) {
    if (newStock < 0) throw new Error('Stock cannot be negative');
    return await this.repository.updateProduct(id, { stock: newStock });
  }

  async getAvailableProducts() {
    return await this.repository.getProducts({ stock: { $gt: 0 } });
  }
}