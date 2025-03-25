import { UsersDAO } from '../dao/users.dao.js';

export class UsersRepository {
  constructor() {
    this.dao = new UsersDAO();
  }

  async getUserById(id) {
    return await this.dao.getUserById(id);
  }

  async getUserByEmail(email) {
    return await this.dao.getUserByEmail(email);
  }

  async createUser(userData) {
    // Validaciones adicionales de negocio
    if (!userData.email.includes('@')) {
      throw new Error('Invalid email format');
    }
    return await this.dao.createUser(userData);
  }
  async updateUser(id, updateData) {
    return await this.dao.updateUser(id, updateData);
  }

  async deleteUsers(filter) {
    return await this.dao.deleteUsers(filter);
  }
}