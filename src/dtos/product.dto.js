import Joi from 'joi';

export class ProductDTO {
  constructor(product) {
    this.id = product._id;
    this.title = product.title;
    this.description = product.description;
    this.price = product.price;
    this.stock = product.stock;
    this.category = product.category;
    this.owner = product.owner;
  }

  static createSchema = Joi.object({
    title: Joi.string().required().min(3).max(50),
    description: Joi.string().required().min(10),
    price: Joi.number().required().min(0),
    stock: Joi.number().integer().min(0),
    category: Joi.string().required(),
    owner: Joi.string().email().default('admin'),
    thumbnails: Joi.array().items(Joi.string().uri())
  });
}