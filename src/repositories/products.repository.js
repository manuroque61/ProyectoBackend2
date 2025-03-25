import { ProductsDAO } from '../dao/products.dao.js';

export class ProductsRepository {
  constructor() {
    this.dao = new ProductsDAO();
  }

  async getProductById(id) {
    return await this.dao.getProductById(id);
  }

  async updateProduct(id, updateData) {
    return await this.dao.updateProduct(id, updateData);
  }

  async getProducts(filter) {
    return await this.dao.getProducts(filter);
  }
}