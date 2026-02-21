import type { User } from '../api/users';

// Types for storage data
interface UserFilters {
  organization?: string;
  username?: string;
  email?: string;
  date?: string;
  phoneNumber?: string;
  status?: string;
}

interface UserPagination {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

const STORAGE_KEYS = {
  USERS: 'lendsqr_users',
  USER_FILTERS: 'lendsqr_user_filters',
  USER_PAGINATION: 'lendsqr_user_pagination',
  LAST_VIEWED_USER: 'lendsqr_last_viewed_user',
} as const;

// Generic storage utilities
const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Failed to get item from localStorage: ${key}`, error);
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Failed to set item in localStorage: ${key}`, error);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Failed to remove item from localStorage: ${key}`, error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn('Failed to clear localStorage', error);
    }
  },
};

// User-specific storage functions
export const userStorage = {
  // Cache users list
  cacheUsers: (users: User[], timestamp?: number): void => {
    const cacheData = {
      users,
      timestamp: timestamp || Date.now(),
    };
    storage.set(STORAGE_KEYS.USERS, cacheData);
  },

  getCachedUsers: (maxAge: number = 5 * 60 * 1000): User[] | null => {
    const cached = storage.get<{ users: User[]; timestamp: number } | null>(STORAGE_KEYS.USERS, null);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > maxAge;
    if (isExpired) {
      storage.remove(STORAGE_KEYS.USERS);
      return null;
    }

    return cached.users;
  },

  // Store user filters
  saveUserFilters: (filters: UserFilters): void => {
    storage.set(STORAGE_KEYS.USER_FILTERS, filters);
  },

  getUserFilters: (): UserFilters => {
    return storage.get(STORAGE_KEYS.USER_FILTERS, {});
  },

  // Store pagination settings
  saveUserPagination: (pagination: UserPagination): void => {
    storage.set(STORAGE_KEYS.USER_PAGINATION, pagination);
  },

  getUserPagination: (): UserPagination => {
    return storage.get(STORAGE_KEYS.USER_PAGINATION, { page: 1, limit: 10 });
  },

  // Store last viewed user
  saveLastViewedUser: (userId: string): void => {
    storage.set(STORAGE_KEYS.LAST_VIEWED_USER, userId);
  },

  getLastViewedUser: (): string | null => {
    return storage.get(STORAGE_KEYS.LAST_VIEWED_USER, null);
  },

  // Individual user caching
  cacheUser: (user: User): void => {
    const userKey = `user_${user.id}`;
    const cacheData = {
      user,
      timestamp: Date.now(),
    };
    storage.set(userKey, cacheData);
  },

  getCachedUser: (userId: string, maxAge: number = 10 * 60 * 1000): User | null => {
    const userKey = `user_${userId}`;
    const cached = storage.get<{ user: User; timestamp: number } | null>(userKey, null);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > maxAge;
    if (isExpired) {
      storage.remove(userKey);
      return null;
    }

    return cached.user;
  },

  // Clear all user-related storage
  clearUserStorage: (): void => {
    Object.values(STORAGE_KEYS).forEach(key => {
      storage.remove(key);
    });

    // Also clear individual user caches
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('user_')) {
        storage.remove(key);
      }
    });
  },

  // Get storage usage info
  getStorageInfo: () => {
    const info = {
      totalKeys: 0,
      userKeys: 0,
      estimatedSize: 0,
    };

    try {
      const keys = Object.keys(localStorage);
      info.totalKeys = keys.length;

      keys.forEach(key => {
        if (key.startsWith('lendsqr_') || key.startsWith('user_')) {
          info.userKeys++;
        }

        const value = localStorage.getItem(key);
        if (value) {
          info.estimatedSize += key.length + value.length;
        }
      });
    } catch (error) {
      console.warn('Failed to get storage info', error);
    }

    return info;
  },
};

// Export storage utilities for general use
export { storage };

// Storage event listener for cross-tab synchronization
export const setupStorageSync = (callback: (key: string, newValue: unknown) => void) => {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key && event.newValue) {
      try {
        const newValue = JSON.parse(event.newValue);
        callback(event.key, newValue);
      } catch (error) {
        console.warn('Failed to parse storage event value', error);
      }
    }
  };

  window.addEventListener('storage', handleStorageChange);

  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
};

export default userStorage;
