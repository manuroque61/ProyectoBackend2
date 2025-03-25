import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller.js';
import { passportCall } from '../utils/passport.utils.js';
import { authorization } from '../middlewares/auth.middleware.js';

const router = Router();
const controller = new ProductsController();

router.get('/:id', controller.getProduct);
router.put(
  '/:id', 
  passportCall('jwt'), 
  authorization(['admin']),
  controller.updateProduct
);

export default router;