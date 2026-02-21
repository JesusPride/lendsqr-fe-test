// React import removed as it's not needed in React 17+
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./components/Dashboard/DashboardPage";
import UsersPage from "./components/Users/UsersPage";
import UserDetailsPage from "./components/Users/UserDetailsPage";
import LoginPage from "./pages/Login/LoginPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import UnderDevelopment from "./components/UI/UnderDevelopment";
import { ToastProvider } from "./lib/contexts/ToastContext";
import "./styles/global.scss";

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <DashboardPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UsersPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UserDetailsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Under Development Pages */}
          <Route
            path="/guarantors"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UnderDevelopment pageName="Guarantors" />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/loans"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UnderDevelopment pageName="Loans" />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/decision-models"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UnderDevelopment pageName="Decision Models" />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/savings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UnderDevelopment pageName="Savings" />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/loan-requests"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UnderDevelopment pageName="Loan Requests" />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/whitelist"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UnderDevelopment pageName="Whitelist" />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/karma"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UnderDevelopment pageName="Karma" />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/organization"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UnderDevelopment pageName="Organization" />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/loan-products"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UnderDevelopment pageName="Loan Products" />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/savings-products"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UnderDevelopment pageName="Savings Products" />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/fees-and-charges"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UnderDevelopment pageName="Fees and Charges" />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UnderDevelopment pageName="Transactions" />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/services"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UnderDevelopment pageName="Services" />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/service-account"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UnderDevelopment pageName="Service Account" />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settlements"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UnderDevelopment pageName="Settlements" />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UnderDevelopment pageName="Reports" />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/preferences"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UnderDevelopment pageName="Preferences" />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/fees-and-pricing"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UnderDevelopment pageName="Fees and Pricing" />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/audit-logs"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UnderDevelopment pageName="Audit Logs" />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
