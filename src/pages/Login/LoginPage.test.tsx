import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPage";
import { ToastProvider } from "../../lib/contexts/ToastContext";

// Wrapper component to provide context
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ToastProvider>{ui}</ToastProvider>
    </BrowserRouter>
  );
};

describe("LoginPage", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe("Positive Test Cases", () => {
    test("renders login page with all required elements", () => {
      renderWithProviders(<LoginPage />);

      // Check for logo
      expect(screen.getByAltText("Lendsqr")).toBeInTheDocument();

      // Check for login illustration
      expect(screen.getByAltText("Login Illustration")).toBeInTheDocument();

      // Check for heading
      expect(screen.getByText("Welcome!")).toBeInTheDocument();

      // Check for subheading
      expect(screen.getByText("Enter details to login.")).toBeInTheDocument();

      // Check for form inputs
      expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();

      // Check for login button
      expect(
        screen.getByRole("button", { name: /log in/i })
      ).toBeInTheDocument();

      // Check for forgot password link
      expect(screen.getByText("FORGOT PASSWORD?")).toBeInTheDocument();
    });

    test("allows entering email and password", () => {
      renderWithProviders(<LoginPage />);

      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });

      expect(emailInput).toHaveValue("test@example.com");
      expect(passwordInput).toHaveValue("password123");
    });

    test("toggles password visibility", () => {
      renderWithProviders(<LoginPage />);

      const passwordInput = screen.getByPlaceholderText("Password");
      const toggleButton = screen.getByRole("button", { name: /show/i });

      // Initially password should be hidden
      expect(passwordInput).toHaveAttribute("type", "password");

      // Click toggle to show password
      fireEvent.click(toggleButton);

      // After clicking, it should show text
      const hideButton = screen.getByRole("button", { name: /hide/i });
      expect(hideButton).toBeInTheDocument();
    });

    test("displays demo credentials", () => {
      renderWithProviders(<LoginPage />);

      expect(screen.getByText(/Demo Credentials:/)).toBeInTheDocument();
      expect(screen.getByText("Email: admin@lendsqr.com")).toBeInTheDocument();
      expect(screen.getByText("Password: password123")).toBeInTheDocument();
    });
  });

  describe("Negative Test Cases", () => {
    test("shows validation error for empty email", async () => {
      renderWithProviders(<LoginPage />);

      const loginButton = screen.getByRole("button", { name: /log in/i });
      fireEvent.click(loginButton);

      // Email input should have required attribute and browser validation should trigger
      const emailInput = screen.getByPlaceholderText("Email");
      expect(emailInput).toBeInvalid();
    });

    test("shows validation error for empty password", async () => {
      renderWithProviders(<LoginPage />);

      const emailInput = screen.getByPlaceholderText("Email");
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });

      const loginButton = screen.getByRole("button", { name: /log in/i });
      fireEvent.click(loginButton);

      // Password input should have required attribute
      const passwordInput = screen.getByPlaceholderText("Password");
      expect(passwordInput).toBeInvalid();
    });

    test("shows validation error for invalid email format", async () => {
      renderWithProviders(<LoginPage />);

      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");

      fireEvent.change(emailInput, { target: { value: "invalid-email" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });

      const loginButton = screen.getByRole("button", { name: /log in/i });
      fireEvent.submit(loginButton);

      // Email should be invalid
      expect(emailInput).toBeInvalid();
    });

    test("prevents login when form is submitted with empty fields", () => {
      renderWithProviders(<LoginPage />);

      const form = document.querySelector("form");
      if (form) {
        fireEvent.submit(form);
      }

      // Login button should still be enabled and there should be validation errors
      const emailInput = screen.getByPlaceholderText("Email");
      expect(emailInput).toBeInvalid();
    });
  });

  describe("UI/UX Tests", () => {
    test("login button has correct styling classes", () => {
      renderWithProviders(<LoginPage />);

      const loginButton = screen.getByRole("button", { name: /log in/i });
      expect(loginButton).toHaveClass("login-button");
    });

    test("password toggle button is accessible", () => {
      renderWithProviders(<LoginPage />);

      const toggleButton = screen.getByRole("button", { name: /show/i });
      expect(toggleButton).toHaveAttribute("type", "button");
    });

    test("form has proper structure", () => {
      renderWithProviders(<LoginPage />);

      const form = document.querySelector("form");
      expect(form).toBeInTheDocument();
      expect(form).toHaveClass("login-form");
    });
  });
});
