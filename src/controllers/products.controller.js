import { ProductsService } from '../services/products.service.js';

export class ProductsController {
  constructor() {
    this.service = new ProductsService();
  }

  getProduct = async (req, res) => {
    try {
      const product = await this.service.getProduct(req.params.id);
      res.json({ status: 'success', payload: product });
    } catch (error) {
      res.status(404).json({ status: 'error', error: error.message });
    }
  };

  updateProduct = async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      const updated = await this.service.updateProductStock(
        req.params.id, 
        req.body.stock
      );
      res.json({ status: 'success', payload: updated });
    } catch (error) {
      res.status(400).json({ status: 'error', error: error.message });
    }
  };
}