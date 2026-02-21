import { useState, useEffect, useCallback } from 'react';
import { usersAPI } from '../api/users';

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
}

interface StatsState {
  stats: UserStats | null;
  isLoading: boolean;
  error: string | null;
}

export const useStats = (autoFetch: boolean = true) => {
  const [statsState, setStatsState] = useState<StatsState>({
    stats: null,
    isLoading: false,
    error: null,
  });

  // Fetch stats function
  const fetchStats = useCallback(async (): Promise<void> => {
    try {
      setStatsState(prev => ({ ...prev, isLoading: true, error: null }));

      const response = await usersAPI.getUserStats();

      setStatsState({
        stats: response,
        isLoading: false,
        error: null,
      });
    } catch (error: unknown) {
      const errorMessage = (error as Error)?.message || 'Failed to fetch statistics';
      setStatsState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setStatsState(prev => ({ ...prev, error: null }));
  }, []);

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch) {
      fetchStats();
    }
  }, [fetchStats, autoFetch]);

  return {
    ...statsState,
    fetchStats,
    clearError,
  };
};
