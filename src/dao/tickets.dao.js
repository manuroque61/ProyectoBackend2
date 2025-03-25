import Ticket from '../models/ticket.model.js';
import { TicketDTO } from '../dtos/ticket.dto.js';

export class TicketsDAO {
  async createTicket(ticketData) {
    const newTicket = await Ticket.create(ticketData);
    return new TicketDTO(newTicket.toObject());
  }

  async getTicketById(id) {
    const ticket = await Ticket.findById(id).lean();
    return ticket ? new TicketDTO(ticket) : null;
  }
}