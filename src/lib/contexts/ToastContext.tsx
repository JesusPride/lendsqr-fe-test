import React, { type ReactNode } from "react";
import { useToast } from "../hooks/useToast";
import ToastContainer from "../../components/UI/ToastContainer";
import { ToastContext, type ToastContextType } from "./ToastContextDefinition";

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const {
    toasts,
    removeToast,
    clearAllToasts,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  } = useToast();

  const contextValue: ToastContextType = {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeToast,
    clearAllToasts,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </ToastContext.Provider>
  );
};

// Note: useToastContext hook is now in a separate file for better React Fast Refresh support
