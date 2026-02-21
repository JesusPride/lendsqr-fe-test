import React from "react";
import { useNavigate } from "react-router-dom";
import "./UnderDevelopment.scss";

interface UnderDevelopmentProps {
  pageName: string;
  description?: string;
}

const UnderDevelopment: React.FC<UnderDevelopmentProps> = ({
  pageName,
  description = "We're crafting an amazing experience for you. This feature is coming soon!",
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  const handleGoToUsers = () => {
    navigate("/users");
  };

  return (
    <div className="under-development">
      <div className="bg-pattern"></div>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="under-development-card">
        <div className="card-glow"></div>

        <div className="icon-container">
          <div className="pulse-ring"></div>
          <div className="main-icon">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <path
                d="M40 15L50 30H70L54 40L60 60L40 48L20 60L26 40L10 30H30L40 15Z"
                fill="url(#grad1)"
              />
              <circle cx="40" cy="40" r="8" fill="white" />
              <defs>
                <linearGradient
                  id="grad1"
                  x1="10"
                  y1="15"
                  x2="70"
                  y2="60"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#39CDCD" />
                  <stop offset="1" stopColor="#213F7D" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className="badge">COMING SOON</div>

        <h1 className="page-name">{pageName}</h1>

        <p className="description">{description}</p>

        <div className="progress-section">
          <div className="progress-header">
            <span>Development Progress</span>
            <span className="progress-percent">75%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <p className="progress-note">We're almost there!</p>
        </div>

        <div className="feature-preview">
          <h3>What to Expect</h3>
          <div className="feature-grid">
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span>Faster Performance</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎨</span>
              <span>Modern UI</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <span>Deep Analytics</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <span>Enhanced Security</span>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn-dashboard" onClick={handleGoBack}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M11 14L6 9L11 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Dashboard
          </button>
          <button className="btn-users" onClick={handleGoToUsers}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 9C10.6569 9 12 7.65685 12 6C12 4.34315 10.6569 3 9 3C7.34315 3 6 4.34315 6 6C6 7.65685 7.34315 9 9 9Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M15 15C15 13.3431 13.6569 12 12 12M3 15C3 13.3431 4.34315 12 6 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            View Users
          </button>
        </div>

        <div className="notify-me">
          <p>Want to be notified when this launches?</p>
          <div className="email-input">
            <input type="email" placeholder="Enter your email" />
            <button className="notify-btn">Notify Me</button>
          </div>
        </div>
      </div>

      <div className="footer-links">
        <span className="copyright">© 2024 Lendsqr. All rights reserved.</span>
        <div className="links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Support</a>
        </div>
      </div>
    </div>
  );
};

export default UnderDevelopment;
