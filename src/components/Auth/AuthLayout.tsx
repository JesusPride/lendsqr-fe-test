import React from 'react';
import './AuthLayout.scss';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="auth-left">
        <img src="/lendsqr-logo.svg" alt="Lendsqr" className="auth-logo" />
        <div className="auth-illustration">
          <img src="/auth-illustration.svg" alt="Authentication" />
        </div>
      </div>
      <div className="auth-right">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;