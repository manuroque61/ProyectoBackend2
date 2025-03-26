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
  createProduct = async (req, res) => {
    try {
      const productData = req.body;
      const user = req.user; // Obtenido del middleware de autenticación

      // Solo admin puede crear productos sin dueño
      if (user.role !== 'admin' && !productData.owner) {
        productData.owner = user.email;
      }

      const newProduct = await this.service.createProduct(productData, user.email);
      
      res.status(201).json({
        status: 'success',
        payload: newProduct
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        error: error.message
      });
    }
  };
}