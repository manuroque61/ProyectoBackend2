import { CartsService } from '../services/carts.service.js';

export class CartsController {
  constructor() {
    this.service = new CartsService();
  }

  purchaseCart = async (req, res) => {
    try {
      const { cid } = req.params;
      const user = req.user;
      
      const { ticket, unprocessedItems } = await this.service.purchaseCart(cid, user.email);
      
      res.json({
        status: 'success',
        payload: {
          ticket,
          unprocessedProducts: unprocessedItems.map(item => ({
            product: item.product,
            reason: 'Insufficient stock'
          }))
        }
      });
    } catch (error) {
      res.status(400).json({ status: 'error', error: error.message });
    }
  };
}