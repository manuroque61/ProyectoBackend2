import { CartsRepository } from '../repositories/carts.repository.js';
import { ProductsRepository } from '../repositories/products.repository.js';
import { TicketsRepository } from '../repositories/tickets.repository.js';

export class CartsService {
  constructor() {
    this.cartsRepo = new CartsRepository();
    this.productsRepo = new ProductsRepository();
    this.ticketsRepo = new TicketsRepository();
  }

  async purchaseCart(cartId, userEmail) {
    const cart = await this.cartsRepo.getCartById(cartId);
    const unprocessedItems = [];
    let totalAmount = 0;

    // Procesar cada item del carrito
    for (const item of cart.products) {
      const product = await this.productsRepo.getProductById(item.product);
      
      if (product.stock >= item.quantity) {
        // Actualizar stock
        product.stock -= item.quantity;
        await this.productsRepo.updateProduct(product._id, { stock: product.stock });
        
        // Calcular monto
        totalAmount += product.price * item.quantity;
      } else {
        unprocessedItems.push(item);
      }
    }

    // Generar ticket si hay productos procesados
    let ticket = null;
    if (totalAmount > 0) {
      ticket = await this.ticketsRepo.createTicket({
        amount: totalAmount,
        purchaser: userEmail,
        products: cart.products.filter(item => 
          !unprocessedItems.some(u => u.product.equals(item.product))
      });
    }

    // Actualizar carrito con productos no procesados
    await this.cartsRepo.updateCart(cartId, { products: unprocessedItems });

    return { ticket, unprocessedItems };
  }
}