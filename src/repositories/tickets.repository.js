import { TicketsDAO } from '../dao/tickets.dao.js';

export class TicketsRepository {
  constructor() {
    this.dao = new TicketsDAO();
  }

  async createTicket(ticketData) {
    return await this.dao.createTicket(ticketData);
  }

  async getTicketById(id) {
    return await this.dao.getTicketById(id);
  }
}