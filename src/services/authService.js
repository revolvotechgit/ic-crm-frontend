import axiosInstance from '../utils/axiosInterceptor';
import { decodeToken } from 'react-jwt';

const authService = {
  login: async (username, password) => {
    try {
      const response = await axiosInstance.post('/login', { username, password });

      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        const decodedToken = decodeToken(response.data.data.token);
        localStorage.setItem('user', JSON.stringify(decodedToken));
        return { success: true, data: decodedToken };
      }

      return { success: false, error: response.data.details };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.details || 'Network error occurred',
      };
    }
  },

  register: async (username, password, role) => {
    try {
      const response = await axiosInstance.post('/register', {
        username,
        password,
        role,
      });

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.details || 'Registration failed',
      };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/auth/login';
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = decodeToken(token);
      return user;
    }
    return null;
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decodedToken = decodeToken(token);
    if (!decodedToken) return false;

    // Check if token is expired
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  },
};

export default authService;
