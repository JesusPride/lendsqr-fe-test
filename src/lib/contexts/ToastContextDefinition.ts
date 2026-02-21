import { createContext } from 'react';

interface ToastContextType {
  showSuccess: (title: string, message?: string, duration?: number) => string;
  showError: (title: string, message?: string, duration?: number) => string;
  showWarning: (title: string, message?: string, duration?: number) => string;
  showInfo: (title: string, message?: string, duration?: number) => string;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
export type { ToastContextType };
