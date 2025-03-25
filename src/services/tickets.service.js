import { TicketsRepository } from '../repositories/tickets.repository.js';

export class TicketsService {
  constructor() {
    this.repository = new TicketsRepository();
  }

  async generateTicket(purchaseData) {
    if (!purchaseData.amount || purchaseData.amount <= 0) {
      throw new Error('Invalid ticket amount');
    }
    return await this.repository.createTicket(purchaseData);
  }

  async getTicketDetails(ticketId) {
    return await this.repository.getTicketById(ticketId);
  }
}