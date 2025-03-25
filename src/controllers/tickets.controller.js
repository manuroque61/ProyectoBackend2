import { TicketsService } from '../services/tickets.service.js';

export class TicketsController {
  constructor() {
    this.service = new TicketsService();
  }

  getTicket = async (req, res) => {
    try {
      const ticket = await this.service.getTicketDetails(req.params.tid);
      res.json({ status: 'success', payload: ticket });
    } catch (error) {
      res.status(404).json({ status: 'error', error: error.message });
    }
  };
}