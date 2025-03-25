import { Router } from 'express';
import { CartsController } from '../controllers/carts.controller.js';
import { passportCall } from '../utils/passport.utils.js';
import { authorization } from '../middlewares/auth.middleware.js';

const router = Router();
const controller = new CartsController();

router.post(
  '/:cid/purchase',
  passportCall('jwt'),
  authorization(['user', 'premium']),
  controller.purchaseCart
);

export default router;