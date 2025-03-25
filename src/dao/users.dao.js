import User from '../models/user.model.js';
import { UserDTO } from '../dtos/user.dto.js';

export class UsersDAO {
  async getUserById(id) {
    const user = await User.findById(id).lean();
    return user ? new UserDTO(user) : null;
  }

  async getUserByEmail(email) {
    const user = await User.findOne({ email }).lean();
    return user ? new UserDTO(user) : null;
  }

  async createUser(userData) {
    const newUser = await User.create(userData);
    return new UserDTO(newUser.toObject());
  }
  async updateUser(id, updateData) {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).lean();
    return updatedUser ? new UserDTO(updatedUser) : null;
  }
  
  async deleteUsers(filter) {
    const result = await User.deleteMany(filter);
    return result;
  }
}