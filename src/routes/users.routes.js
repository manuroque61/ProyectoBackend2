import { Router } from 'express';
import { UsersController } from '../controllers/users.controller.js';
import { passportCall } from '../utils/passport.utils.js';
import { authorization } from '../middlewares/auth.middleware.js';

const router = Router();
const controller = new UsersController();

router.get('/current', passportCall('jwt'), controller.getCurrentUser);
router.put(
  '/:uid/role',
  passportCall('jwt'),
  authorization(['admin']),
  controller.updateUserRole
);
router.delete(
  '/inactive',
  passportCall('jwt'),
  authorization(['admin']),
  controller.deleteInactiveUsers
);

export default router;