import { CartsDAO } from '../dao/carts.dao.js';

export class CartsRepository {
  constructor() {
    this.dao = new CartsDAO();
  }

  async getCartById(id) {
    return await this.dao.getCartById(id);
  }

  async createCart() {
    return await this.dao.createCart();
  }

  async updateCart(id, updateData) {
    return await this.dao.updateCart(id, updateData);
  }
}