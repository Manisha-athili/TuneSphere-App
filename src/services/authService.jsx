import api from './api';
import Storage from '../utils/storage';
import { ENDPOINTS } from '../utils/constants';

class AuthService {
  async register(name, email, password) {
    try {
      const response = await api.post(ENDPOINTS.REGISTER, {
        name,
        email,
        password,
      });

      const { token, user } = response.data;

      // Save to storage
      await Storage.saveToken(token);
      await Storage.saveUser(user);

      return {
        success: true,
        data: { token, user },
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  }

  async login(email, password) {
    try {
      const response = await api.post(ENDPOINTS.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      // Save to storage
      await Storage.saveToken(token);
      await Storage.saveUser(user);

      return {
        success: true,
        data: { token, user },
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  }

  async adminLogin(email, password) {
    try {
      const response = await api.post(ENDPOINTS.ADMIN_LOGIN, {
        email,
        password,
      });

      const { token, admin } = response.data;
      const adminUser = { ...admin, isAdmin: true };

      // Save to storage
      await Storage.saveToken(token);
      await Storage.saveUser(adminUser);

      return {
        success: true,
        data: { token, user: adminUser },
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Admin login failed',
      };
    }
  }

  async logout() {
    try {
      await Storage.removeToken();
      await Storage.removeUser();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: 'Logout failed',
      };
    }
  }

  async getCurrentUser() {
    try {
      const token = await Storage.getToken();
      const user = await Storage.getUser();

      if (token && user) {
        return {
          success: true,
          data: { token, user },
        };
      }

      return {
        success: false,
        message: 'No user found',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error getting current user',
      };
    }
  }

  async isAuthenticated() {
    const token = await Storage.getToken();
    return !!token;
  }
}

export default new AuthService();