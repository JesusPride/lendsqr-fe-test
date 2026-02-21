import { useState, useEffect, useCallback, useRef } from 'react';
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

  // Track if fetch has been called
  const fetchUsersCalled = useRef(false);

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

  const [filters, setFilters] = useState<UserFilters>(() => {
    // Get stored filters and filter out empty values
    const storedFilters = userStorage.getUserFilters();
    const cleanFilters: UserFilters = {};

    Object.entries(storedFilters).forEach(([key, value]) => {
      if (value && value !== '') {
        cleanFilters[key as keyof UserFilters] = value;
      }
    });

    return {
      ...initialFilters,
      ...cleanFilters,
    };
  });

  const [pagination, setPagination] = useState<UsersPaginationParams>(() => {
    const storedPagination = userStorage.getUserPagination();

    // Ensure pagination values are valid
    const validPagination: UsersPaginationParams = {
      page: storedPagination.page && storedPagination.page > 0 ? storedPagination.page : 1,
      limit: storedPagination.limit && storedPagination.limit > 0 ? storedPagination.limit : 10,
    };

    return {
      ...initialPagination,
      ...validPagination,
    };
  });

  // Fetch users function
  const fetchUsers = useCallback(async (
    customFilters?: UserFilters,
    customPagination?: UsersPaginationParams,
    forceClearFilters: boolean = false
  ): Promise<void> => {
    try {
      setUsersState(prev => ({ ...prev, isLoading: true, error: null }));

      // Determine filters to use - use clean filters on initial fetch or if forceClearFilters is true
      const effectiveFilters = (forceClearFilters || fetchUsersCalled.current === false)
        ? {}
        : (customFilters || filters);

      // Mark that we've called fetch at least once
      fetchUsersCalled.current = true;

      const response: UsersResponse = await usersAPI.getUsers(
        effectiveFilters,
        customPagination || pagination
      );

      // Validate pagination against response total
      let adjustedPage = response.page;

      // If the page is greater than totalPages, adjust it
      if (response.totalPages > 0 && response.page > response.totalPages) {
        adjustedPage = response.totalPages;
      }

      setUsersState({
        users: response.users,
        total: response.total,
        page: adjustedPage,
        limit: response.limit,
        totalPages: response.totalPages,
        isLoading: false,
        error: null,
      });

      // Update pagination if it was adjusted
      if (adjustedPage !== response.page) {
        setPagination(prev => ({ ...prev, page: adjustedPage }));
        userStorage.saveUserPagination({ ...pagination, page: adjustedPage });
      }

      // If no users returned and there are filters, clear them to show all users
      if (response.users.length === 0 && Object.keys(effectiveFilters).length > 0) {
        setFilters({});
        setPagination(prev => ({ ...prev, page: 1 }));
        userStorage.saveUserFilters({});
        userStorage.saveUserPagination({ ...pagination, page: 1 });
        // Re-fetch with cleared filters
        const retryResponse = await usersAPI.getUsers(
          {},
          { ...pagination, page: 1 }
        );
        setUsersState({
          users: retryResponse.users,
          total: retryResponse.total,
          page: 1,
          limit: retryResponse.limit,
          totalPages: retryResponse.totalPages,
          isLoading: false,
          error: null,
        });
        return;
      }
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
