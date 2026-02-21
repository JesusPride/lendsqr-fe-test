import api from '../axios';
import { mockAuthAPI } from '../mockAPI';

// Use mock API in development
const USE_MOCK_API = true; // Always use mock API for now

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authAPI = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    if (USE_MOCK_API) {
      return mockAuthAPI.login(credentials);
    }
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Logout user
  logout: async (): Promise<void> => {
    if (USE_MOCK_API) {
      return mockAuthAPI.logout();
    }
    await api.post('/auth/logout');
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    if (USE_MOCK_API) {
      return mockAuthAPI.getCurrentUser();
    }
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Refresh token
  refreshToken: async (): Promise<AuthResponse> => {
    if (USE_MOCK_API) {
      return mockAuthAPI.refreshToken();
    }
    const response = await api.post('/auth/refresh');
    return response.data;
  },
};
