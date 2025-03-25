import { Router } from 'express';
import { TicketsController } from '../controllers/tickets.controller.js';
import { passportCall } from '../utils/passport.utils.js';

const router = Router();
const controller = new TicketsController();

router.get(
  '/:tid', 
  passportCall('jwt'),
  controller.getTicket
);

export default router;