import { ProductsRepository } from '../repositories/products.repository.js';
import { ProductDTO } from '../dtos/product.dto.js';


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
  async createProduct(productData, userEmail) {
    const { error } = ProductDTO.createSchema.validate(productData);
    if (error) throw new Error(`Validation error: ${error.details[0].message}`);

    const productToCreate = {
      ...productData,
      owner: userEmail // Asignar el dueño del producto
    };

    return await this.repository.createProduct(productToCreate);
  }
}