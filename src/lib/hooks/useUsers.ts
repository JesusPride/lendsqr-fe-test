import { useState, useEffect, useCallback } from 'react';
import { usersAPI } from '../api/users';
import type { User, UsersResponse, UserFilters, UsersPaginationParams } from '../api/users';
import { userStorage } from '../storage/userStorage';

interface UsersState {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
}

interface UseUsersOptions {
  initialFilters?: UserFilters;
  initialPagination?: UsersPaginationParams;
  autoFetch?: boolean;
}

export const useUsers = (options: UseUsersOptions = {}) => {
  const { initialFilters = {}, initialPagination = { page: 1, limit: 10 }, autoFetch = true } = options;

  // Initialize state with stored values
  const [usersState, setUsersState] = useState<UsersState>({
    users: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    isLoading: false,
    error: null,
  });

  const [filters, setFilters] = useState<UserFilters>(() => ({
    ...initialFilters,
    ...userStorage.getUserFilters(),
  }));

  const [pagination, setPagination] = useState<UsersPaginationParams>(() => ({
    ...initialPagination,
    ...userStorage.getUserPagination(),
  }));

  // Fetch users function
  const fetchUsers = useCallback(async (
    customFilters?: UserFilters,
    customPagination?: UsersPaginationParams
  ): Promise<void> => {
    try {
      setUsersState(prev => ({ ...prev, isLoading: true, error: null }));

      const response: UsersResponse = await usersAPI.getUsers(
        customFilters || filters,
        customPagination || pagination
      );

      setUsersState({
        users: response.users,
        total: response.total,
        page: response.page,
        limit: response.limit,
        totalPages: response.totalPages,
        isLoading: false,
        error: null,
      });
    } catch (error: unknown) {
      const errorMessage = (error as Error)?.message || 'Failed to fetch users';
      setUsersState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    }
  }, [filters, pagination]);

  // Update filters
  const updateFilters = useCallback((newFilters: UserFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page when filtering
    userStorage.saveUserFilters(newFilters);
  }, []);

  // Update pagination
  const updatePagination = useCallback((newPagination: UsersPaginationParams) => {
    const updatedPagination = { ...pagination, ...newPagination };
    setPagination(updatedPagination);
    userStorage.saveUserPagination(updatedPagination);
  }, [pagination]);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters({});
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setUsersState(prev => ({ ...prev, error: null }));
  }, []);

  // Auto-fetch on mount and when filters/pagination change
  useEffect(() => {
    if (autoFetch) {
      fetchUsers();
    }
  }, [fetchUsers, autoFetch]);

  return {
    ...usersState,
    filters,
    pagination,
    fetchUsers,
    updateFilters,
    updatePagination,
    clearFilters,
    clearError,
  };
};

// Hook for individual user operations
export const useUser = (userId?: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user by ID
  const fetchUser = useCallback(async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // Try to get from cache first
      const cachedUser = userStorage.getCachedUser(id);
      if (cachedUser) {
        setUser(cachedUser);
        setIsLoading(false);
        return;
      }

      const userData = await usersAPI.getUserById(id);
      setUser(userData);

      // Cache the user data
      userStorage.cacheUser(userData);
      userStorage.saveLastViewedUser(id);
    } catch (error: unknown) {
      const errorMessage = (error as Error)?.message || 'Failed to fetch user';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update user status
  const updateUserStatus = useCallback(async (id: string, status: User['status']): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedUser = await usersAPI.updateUserStatus(id, status);
      setUser(updatedUser);
    } catch (error: unknown) {
      const errorMessage = (error as Error)?.message || 'Failed to update user status';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Blacklist user
  const blacklistUser = useCallback(async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedUser = await usersAPI.blacklistUser(id);
      setUser(updatedUser);
    } catch (error: unknown) {
      const errorMessage = (error as Error)?.message || 'Failed to blacklist user';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Activate user
  const activateUser = useCallback(async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedUser = await usersAPI.activateUser(id);
      setUser(updatedUser);
    } catch (error: unknown) {
      const errorMessage = (error as Error)?.message || 'Failed to activate user';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-fetch user on mount if userId is provided
  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId, fetchUser]);

  return {
    user,
    isLoading,
    error,
    fetchUser,
    updateUserStatus,
    blacklistUser,
    activateUser,
    clearError: () => setError(null),
  };
};
