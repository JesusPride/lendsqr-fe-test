import mockAuthData from './data/mockAuth.json';
import mockUsersData from './data/mockUsers.json';
import type { LoginCredentials, User as AuthUser, AuthResponse } from './api/auth';
import type { User, UsersResponse, UserFilters, UsersPaginationParams } from './api/users';

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock authentication API
export const mockAuthAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay();

    const user = mockAuthData.users.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const token = mockAuthData.tokens[credentials.email as keyof typeof mockAuthData.tokens];

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatar: user.avatar,
      },
      token,
    };
  },

  logout: async (): Promise<void> => {
    await delay(200);
    // Mock logout - in real app this would invalidate the token
  },

  getCurrentUser: async (): Promise<AuthUser> => {
    await delay();

    // In a real app, this would decode the JWT token
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found');
    }

    // For mock, just return the stored user
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      throw new Error('No user found');
    }

    return JSON.parse(userStr);
  },

  refreshToken: async (): Promise<AuthResponse> => {
    await delay();

    const userStr = localStorage.getItem('user');
    if (!userStr) {
      throw new Error('No user found');
    }

    const user = JSON.parse(userStr);
    const token = mockAuthData.tokens[user.email as keyof typeof mockAuthData.tokens];

    return { user, token };
  },
};

// Mock users API
export const mockUsersAPI = {
  getUsers: async (
    filters?: UserFilters,
    pagination?: UsersPaginationParams
  ): Promise<UsersResponse> => {
    await delay();

    let users = [...mockUsersData.users] as User[];

    // Apply filters
    if (filters) {
      if (filters.organization) {
        users = users.filter(user =>
          user.organization.toLowerCase().includes(filters.organization!.toLowerCase())
        );
      }
      if (filters.username) {
        users = users.filter(user =>
          user.username.toLowerCase().includes(filters.username!.toLowerCase())
        );
      }
      if (filters.email) {
        users = users.filter(user =>
          user.email.toLowerCase().includes(filters.email!.toLowerCase())
        );
      }
      if (filters.phoneNumber) {
        users = users.filter(user =>
          user.phoneNumber.includes(filters.phoneNumber!)
        );
      }
      if (filters.status) {
        users = users.filter(user => user.status === filters.status);
      }
      if (filters.dateJoined) {
        users = users.filter(user =>
          user.dateJoined.includes(filters.dateJoined!)
        );
      }
    }

    const total = users.length;
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 100;
    const totalPages = Math.ceil(total / limit);

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = users.slice(startIndex, endIndex);

    return {
      users: paginatedUsers,
      total,
      page,
      limit,
      totalPages,
    };
  },

  getUserById: async (id: string): Promise<User> => {
    await delay();

    const user = mockUsersData.users.find(u => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }

    return user as User;
  },

  updateUserStatus: async (id: string, status: User['status']): Promise<User> => {
    await delay();

    const userIndex = mockUsersData.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    // Update the user status in mock data
    mockUsersData.users[userIndex].status = status;

    return mockUsersData.users[userIndex] as User;
  },

  blacklistUser: async (id: string): Promise<User> => {
    return mockUsersAPI.updateUserStatus(id, 'Blacklisted');
  },

  activateUser: async (id: string): Promise<User> => {
    return mockUsersAPI.updateUserStatus(id, 'Active');
  },

  getUserStats: async () => {
    await delay();

    // Calculate stats dynamically from current user data
    const users = mockUsersData.users as User[];
    const totalUsers = users.length;
    const activeUsers = users.filter(user => user.status === 'Active').length;
    const usersWithLoans = users.filter(user =>
      user.educationAndEmployment?.loanRepayment &&
      user.educationAndEmployment.loanRepayment !== '₦0'
    ).length;
    const usersWithSavings = Math.floor(totalUsers * 0.7); // Assume 70% have savings

    return {
      totalUsers,
      activeUsers,
      usersWithLoans,
      usersWithSavings,
    };
  },
};

// Override the real API with mock API for development
export const enableMockAPI = () => {
  // This would be used to switch between real and mock APIs
  console.log('Mock API enabled for development');
};
