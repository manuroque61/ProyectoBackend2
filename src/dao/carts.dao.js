import Cart from '../models/cart.model.js';
import { CartDTO } from '../dtos/cart.dto.js';

export class CartsDAO {
  async getCartById(id) {
    const cart = await Cart.findById(id).populate('products.product').lean();
    return cart ? new CartDTO(cart) : null;
  }

  async createCart() {
    const newCart = await Cart.create({ products: [] });
    return new CartDTO(newCart.toObject());
  }

  async updateCart(id, updateData) {
    const updatedCart = await Cart.findByIdAndUpdate(id, updateData, { new: true }).lean();
    return new CartDTO(updatedCart);
  }
}