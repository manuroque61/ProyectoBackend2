import { UsersRepository } from '../repositories/users.repository.js';

export class UsersService {
    constructor() {
        this.repository = new UsersRepository();
    }

    async getUserById(id) {
        return await this.repository.getUserById(id);
    }

    async getUserByEmail(email) {
        return await this.repository.getUserByEmail(email);
    }

    async createUser(userData) {
        if (!userData.email || !userData.password) {
            throw new Error('Missing required fields');
        }
        return await this.repository.createUser(userData);
    }
    async updateUserRole(id, newRole) {
        const updatedUser = await this.repository.updateUser(id, { role: newRole });
        if (!updatedUser) throw new Error('User not found');
        return updatedUser;
    }

    async deleteInactiveUsers(cutoffDate) {
        return await this.repository.deleteUsers({
            last_connection: { $lt: cutoffDate },
            role: { $ne: 'admin' }
        });
    }
}

