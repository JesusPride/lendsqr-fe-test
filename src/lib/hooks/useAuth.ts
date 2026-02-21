import { useState, useEffect, useCallback } from 'react';
import { authAPI, type LoginCredentials, type User, type AuthResponse } from '../api/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem('authToken');
        const userStr = localStorage.getItem('user');

        if (token && userStr) {
          const user = JSON.parse(userStr);
          setAuthState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState(prev => ({
            ...prev,
            isLoading: false,
          }));
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to initialize authentication',
        }));
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      const response: AuthResponse = await authAPI.login(credentials);

      // Store in localStorage
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      setAuthState({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: unknown) {
      const errorMessage = (error as Error)?.message || 'Login failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  // Logout function
  const logout = useCallback(async (): Promise<void> => {
    // Set loading state immediately
    setAuthState(prev => ({ ...prev, isLoading: true }));

    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with logout even if API call fails
    }

    // Clear localStorage and state
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    // Clear any other auth-related data
    localStorage.removeItem('refreshToken');

    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  // Get current user
  const getCurrentUser = useCallback(async (): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      const user = await authAPI.getCurrentUser();

      localStorage.setItem('user', JSON.stringify(user));
      setAuthState(prev => ({
        ...prev,
        user,
        isLoading: false,
      }));
    } catch (error: unknown) {
      const errorMessage = (error as Error)?.message || 'Failed to get user';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    }
  }, []);

  return {
    ...authState,
    login,
    logout,
    clearError,
    getCurrentUser,
  };
};
