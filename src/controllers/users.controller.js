import { UsersService } from '../services/users.service.js';
import { UserDTO } from '../dtos/user.dto.js';

export class UsersController {
  constructor() {
    this.service = new UsersService();
  }

  /**
   * Obtiene los datos del usuario actual (sin información sensible)
   */
  getCurrentUser = async (req, res) => {
    try {
      // Convertimos el usuario a DTO para eliminar datos sensibles
      const userDTO = new UserDTO(req.user);
      
      res.json({
        status: 'success',
        payload: userDTO
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        error: error.message
      });
    }
  };


   // Actualiza el rol de un usuario (solo admin)

  updateUserRole = async (req, res) => {
    try {
      const { uid } = req.params;
      const { role } = req.body;

      // Validación básica
      if (!['user', 'premium', 'admin'].includes(role)) {
        throw new Error('Invalid role');
      }

      // Verificar permisos (solo admin puede cambiar roles)
      if (req.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }

      const updatedUser = await this.service.updateUserRole(uid, role);
      const userDTO = new UserDTO(updatedUser);

      res.json({
        status: 'success',
        payload: userDTO
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        error: error.message
      });
    }
  };


  deleteInactiveUsers = async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }

      const cutoffDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 días
      const result = await this.service.deleteInactiveUsers(cutoffDate);

      res.json({
        status: 'success',
        payload: {
          deletedCount: result.deletedCount
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        error: error.message
      });
    }
  };
}