import api from '../axios';
import { mockUsersAPI } from '../mockAPI';

// Use mock API in development
const USE_MOCK_API = true; // Always use mock API for now

export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
  personalInfo?: {
    fullName: string;
    bvn: string;
    gender: string;
    maritalStatus: string;
    children: string;
    typeOfResidence: string;
  };
  educationAndEmployment?: {
    levelOfEducation: string;
    employmentStatus: string;
    sectorOfEmployment: string;
    durationOfEmployment: string;
    officeEmail: string;
    monthlyIncome: string;
    loanRepayment: string;
  };
  socials?: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantor?: {
    fullName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
  };
}

export interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserFilters {
  organization?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  status?: string;
  dateJoined?: string;
}

export interface UsersPaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const usersAPI = {
  // Get all users with pagination and filters
  getUsers: async (
    filters?: UserFilters,
    pagination?: UsersPaginationParams
  ): Promise<UsersResponse> => {
    if (USE_MOCK_API) {
      return mockUsersAPI.getUsers(filters, pagination);
    }

    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }

    if (pagination) {
      Object.entries(pagination).forEach(([key, value]) => {
        if (value) params.append(key, value.toString());
      });
    }

    const response = await api.get(`/users?${params.toString()}`);
    return response.data;
  },

  // Get user by ID
  getUserById: async (id: string): Promise<User> => {
    if (USE_MOCK_API) {
      return mockUsersAPI.getUserById(id);
    }
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Update user status
  updateUserStatus: async (id: string, status: User['status']): Promise<User> => {
    if (USE_MOCK_API) {
      return mockUsersAPI.updateUserStatus(id, status);
    }
    const response = await api.patch(`/users/${id}/status`, { status });
    return response.data;
  },

  // Blacklist user
  blacklistUser: async (id: string): Promise<User> => {
    if (USE_MOCK_API) {
      return mockUsersAPI.blacklistUser(id);
    }
    const response = await api.patch(`/users/${id}/blacklist`);
    return response.data;
  },

  // Activate user
  activateUser: async (id: string): Promise<User> => {
    if (USE_MOCK_API) {
      return mockUsersAPI.activateUser(id);
    }
    const response = await api.patch(`/users/${id}/activate`);
    return response.data;
  },

  // Get user statistics
  getUserStats: async () => {
    if (USE_MOCK_API) {
      return mockUsersAPI.getUserStats();
    }
    const response = await api.get('/users/stats');
    return response.data;
  },
};
