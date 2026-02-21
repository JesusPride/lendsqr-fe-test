import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/hooks/useAuth";
import { useToastContext } from "../../lib/hooks/useToastContext";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import "./LoginPage.scss";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useAuth();
  const { showSuccess, showError } = useToastContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login({ email, password });

      // Show success notification
      showSuccess(
        "Login Successful!",
        "Welcome back! Redirecting to dashboard...",
        2000
      );

      // Small delay to show the success message before redirecting
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error: unknown) {
      // Show error notification
      const errorMessage = (error as Error)?.message || "Login failed";
      showError("Login Failed", errorMessage, 5000);
      console.error("Login failed:", error);
    }
  };

  return (
    <div className={`login-page ${isLoading ? "loading" : ""}`}>
      {isLoading && (
        <div className="login-loading-overlay">
          <div className="loading-content">
            <LoadingSpinner size="large" color="primary" />
            <p>Authenticating...</p>
          </div>
        </div>
      )}

      <div className="login-left">
        <img src="/lendsqr_logo.svg" alt="Lendsqr" className="login-logo" />
        <div className="login-illustration">
          <img src="/pablo_signin.png" alt="Login Illustration" />
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-container">
          <div className="login-header">
            <h1>Welcome!</h1>
            <p>Enter details to login.</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            <div className="forgot-password">
              <a href="#" className="forgot-link">
                FORGOT PASSWORD?
              </a>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              type="submit"
              className={`login-button ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="small" color="white" />
                  <span>LOGGING IN...</span>
                </>
              ) : (
                "LOG IN"
              )}
            </button>
          </form>

          <div className="demo-credentials">
            <p>
              <strong>Demo Credentials:</strong>
            </p>
            <p>Email: admin@lendsqr.com</p>
            <p>Password: password123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
