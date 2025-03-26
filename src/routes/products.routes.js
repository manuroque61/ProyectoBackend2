import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller.js';
import { passportCall } from '../utils/passport.utils.js';
import { authorization } from '../middlewares/auth.middleware.js';
import { uploader } from '../utils/multer.utils.js'; 


const router = Router();
const controller = new ProductsController();

router.post(
  '/',
  passportCall('jwt'),
  authorization(['admin', 'premium']),
  uploader.array('thumbnails', 3), // Middleware opcional para subir imágenes
  controller.createProduct
);

router.get('/:id', controller.getProduct);
router.put(
  '/:id', 
  passportCall('jwt'), 
  authorization(['admin']),
  controller.updateProduct
);

export default router;