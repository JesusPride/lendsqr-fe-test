/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom';

// Use Node's built-in TextEncoder/TextDecoder
import { TextEncoder, TextDecoder } from 'util';

Object.defineProperty(global, 'TextEncoder', {
    writable: true,
    value: TextEncoder,
});

Object.defineProperty(global, 'TextDecoder', {
    writable: true,
    value: TextDecoder,
});

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    key: jest.fn(),
    length: 0,
};

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

// Mock sessionStorage
const sessionStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    key: jest.fn(),
    length: 0,
};

Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

// Mock window.alert
window.alert = jest.fn();

// Mock console.error to fail tests on unexpected errors
const originalError = console.error;
beforeAll(() => {
    console.error = (...args: unknown[]) => {
        if (
            typeof args[0] === 'string' &&
            (args[0].includes('Warning:') || args[0].includes('React Router'))
        ) {
            return;
        }
        originalError.call(console, ...args);
    };
});

afterAll(() => {
    console.error = originalError;
});
