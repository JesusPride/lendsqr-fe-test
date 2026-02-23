// Import the storage module to test
import { userStorage, storage } from './userStorage';
import type { User } from '../api/users';

// Create a complete mock user
const createMockUser = (id: string): User => ({
    id,
    organization: 'TestOrg',
    username: `testuser${id}`,
    email: `test${id}@example.com`,
    phoneNumber: '08012345678',
    dateJoined: 'Jan 1, 2024',
    status: 'Active',
    personalInfo: {
        fullName: `Test User ${id}`,
        bvn: '12345678901',
        gender: 'Male',
        maritalStatus: 'Single',
        children: '0',
        typeOfResidence: 'Rented Apartment',
    },
    educationAndEmployment: {
        levelOfEducation: 'B.Sc',
        employmentStatus: 'Employed',
        sectorOfEmployment: 'Technology',
        durationOfEmployment: '2 years',
        officeEmail: `office${id}@example.com`,
        monthlyIncome: '₦100,000.00 - ₦200,000.00',
        loanRepayment: '₦50,000',
    },
    socials: {
        twitter: `@testuser${id}`,
        facebook: `Test User ${id}`,
        instagram: `@testuser${id}`,
    },
    guarantor: {
        fullName: `Guarantor ${id}`,
        phoneNumber: '08012345678',
        email: `guarantor${id}@example.com`,
        relationship: 'Friend',
    },
});

// Store for mock localStorage
let mockStore: Record<string, string> = {};

// Setup mock localStorage before each test
beforeEach(() => {
    mockStore = {};

    // Override localStorage for these tests
    Object.defineProperty(window, 'localStorage', {
        value: {
            getItem: (key: string) => mockStore[key] || null,
            setItem: (key: string, value: string) => { mockStore[key] = value; },
            removeItem: (key: string) => { delete mockStore[key]; },
            clear: () => { mockStore = {}; },
            key: (i: number) => Object.keys(mockStore)[i] || null,
            get length() { return Object.keys(mockStore).length; },
        },
        writable: true,
    });
});

describe('userStorage', () => {
    describe('Positive Test Cases', () => {
        test('caches users successfully', () => {
            const mockUsers = [createMockUser('1'), createMockUser('2')];

            userStorage.cacheUsers(mockUsers);

            const cached = mockStore['lendsqr_users'];
            expect(cached).toBeTruthy();
            const parsed = JSON.parse(cached);
            expect(parsed.users).toEqual(mockUsers);
        });

        test('retrieves cached users within expiration time', () => {
            const mockUsers = [createMockUser('1')];

            userStorage.cacheUsers(mockUsers);
            const result = userStorage.getCachedUsers(5 * 60 * 1000);

            expect(result).toEqual(mockUsers);
        });

        test('saves and retrieves user filters', () => {
            const filters = {
                organization: 'TestOrg',
                username: 'testuser',
                status: 'Active',
            };

            userStorage.saveUserFilters(filters);
            const result = userStorage.getUserFilters();

            expect(result).toEqual(filters);
        });

        test('saves and retrieves pagination settings', () => {
            const pagination = {
                page: 2,
                limit: 20,
                sortBy: 'username',
                sortOrder: 'asc' as const,
            };

            userStorage.saveUserPagination(pagination);
            const result = userStorage.getUserPagination();

            expect(result).toEqual(pagination);
        });

        test('saves and retrieves last viewed user', () => {
            userStorage.saveLastViewedUser('123');
            const result = userStorage.getLastViewedUser();

            expect(result).toBe('123');
        });

        test('caches individual user', () => {
            const mockUser = createMockUser('1');

            userStorage.cacheUser(mockUser);

            const cached = mockStore['user_1'];
            expect(cached).toBeTruthy();
        });

        test('clears all user storage', () => {
            userStorage.saveLastViewedUser('123');
            userStorage.cacheUsers([createMockUser('1')]);

            userStorage.clearUserStorage();

            expect(mockStore['lendsqr_last_viewed_user']).toBeUndefined();
            expect(mockStore['lendsqr_users']).toBeUndefined();
        });

        test('returns default pagination when none saved', () => {
            const result = userStorage.getUserPagination();

            expect(result).toEqual({ page: 1, limit: 10 });
        });
    });

    describe('Negative Test Cases', () => {
        test('returns null when cache is expired', () => {
            const mockUsers = [createMockUser('1')];

            userStorage.cacheUsers(mockUsers);

            // Manually set timestamp to past
            const cached = JSON.parse(mockStore['lendsqr_users']);
            cached.timestamp = Date.now() - (10 * 60 * 1000); // 10 minutes ago
            mockStore['lendsqr_users'] = JSON.stringify(cached);

            const result = userStorage.getCachedUsers(5 * 60 * 1000); // 5 min max age

            expect(result).toBeNull();
        });

        test('returns null when no cache exists', () => {
            const result = userStorage.getCachedUsers();

            expect(result).toBeNull();
        });

        test('returns null for non-existent last viewed user', () => {
            const result = userStorage.getLastViewedUser();

            expect(result).toBeNull();
        });

        test('returns null for non-existent cached user', () => {
            const result = userStorage.getCachedUser('999');

            expect(result).toBeNull();
        });

        test('handles corrupted JSON in localStorage gracefully', () => {
            mockStore['lendsqr_users'] = 'invalid-json';

            const result = userStorage.getCachedUsers();

            expect(result).toBeNull();
        });
    });

    describe('Storage Info', () => {
        test('returns storage usage information', () => {
            userStorage.cacheUsers([createMockUser('1')]);
            userStorage.saveLastViewedUser('1');

            const info = userStorage.getStorageInfo();

            expect(info.totalKeys).toBeGreaterThan(0);
            expect(info.userKeys).toBeGreaterThan(0);
            expect(info.estimatedSize).toBeGreaterThan(0);
        });
    });
});

describe('storage utilities', () => {
    beforeEach(() => {
        mockStore = {};
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: (key: string) => mockStore[key] || null,
                setItem: (key: string, value: string) => { mockStore[key] = value; },
                removeItem: (key: string) => { delete mockStore[key]; },
                clear: () => { mockStore = {}; },
                key: (i: number) => Object.keys(mockStore)[i] || null,
                get length() { return Object.keys(mockStore).length; },
            },
            writable: true,
        });
    });

    test('get returns default value when key not found', () => {
        const result = storage.get('nonexistent', 'default');
        expect(result).toBe('default');
    });

    test('set and get work correctly', () => {
        storage.set('testKey', 'testValue');
        const result = storage.get('testKey', '');
        expect(result).toBe('testValue');
    });

    test('remove deletes the key', () => {
        storage.set('testKey', 'testValue');
        storage.remove('testKey');
        const result = storage.get('testKey', null);
        expect(result).toBeNull();
    });

    test('clear removes all keys', () => {
        storage.set('key1', 'value1');
        storage.set('key2', 'value2');
        storage.clear();

        // After clear, should return defaults
        expect(storage.get('key1', 'default')).toBe('default');
        expect(storage.get('key2', 'default')).toBe('default');
    });
});
