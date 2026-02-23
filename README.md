# Lendsqr Frontend Engineering Test

A React TypeScript application built for Lendsqr's frontend engineering assessment, featuring an admin dashboard for managing lending operations.

## 🚀 Live Demo

**Deployed Application:** [https://adewunmi-esther-lendsqr-fe-test.vercel.app](https://adewunmi-esther-lendsqr-fe-test.vercel.app)

This project implements Lendsqr's admin console design with the following features:

- **Authentication**: Login page with protected routes
- **Dashboard Analytics**: Overview with loan disbursement and interest charts
- **User Management**: List view with filtering, sorting, and pagination
- **User Details**: Comprehensive user profile pages
- **Responsive Design**: Mobile-first approach, works on all screen sizes
- **Unit Testing**: Comprehensive test coverage with Jest and React Testing Library

## 🛠️ Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **SCSS** for styling
- **React Router DOM** for navigation
- **Recharts** for data visualization
- **Axios** for API calls
- **Jest** + **React Testing Library** for unit testing

## 📁 Project Structure

```
src/
├── __mocks__/                     # Jest mocks
│   └── fileMock.js                # File import mock
├── assets/                        # Static assets
│   └── react.svg
├── components/
│   ├── Auth/                      # Authentication components
│   │   ├── AuthLayout.scss
│   │   ├── AuthLayout.tsx
│   │   └── ProtectedRoute.tsx
│   ├── Dashboard/                 # Dashboard components
│   │   ├── Dashboard.scss
│   │   ├── DashboardCharts.tsx
│   │   └── DashboardPage.tsx
│   ├── Sidebar/                   # Navigation sidebar
│   │   ├── Sidebar.scss
│   │   └── Sidebar.tsx
│   ├── Topbar/                    # Header component
│   │   ├── Header.scss
│   │   └── Header.tsx
│   ├── UI/                        # Reusable UI components
│   │   ├── LoadingSpinner.scss
│   │   ├── LoadingSpinner.tsx
│   │   ├── Toast.scss
│   │   ├── Toast.tsx
│   │   ├── ToastContainer.tsx
│   │   ├── UnderDevelopment.scss
│   │   └── UnderDevelopment.tsx
│   └── Users/                     # User management components
│       ├── ActionMenu.scss
│       ├── ActionMenu.tsx
│       ├── mockData.ts
│       ├── Pagination.scss
│       ├── Pagination.tsx
│       ├── StatsCards.scss
│       ├── StatsCards.tsx
│       ├── StatusBadge.scss
│       ├── StatusBadge.test.tsx   # Unit tests
│       ├── StatusBadge.tsx
│       ├── TableFilter.scss
│       ├── TableFilter.tsx
│       ├── UserDetailsPage.scss
│       ├── UserDetailsPage.tsx
│       ├── UsersPage.scss
│       ├── UsersPage.tsx
│       ├── UsersTable.scss
│       └── UsersTable.tsx
├── lib/                           # Core library code
│   ├── axios.ts                   # Axios instance
│   ├── mockAPI.ts                 # Mock API handlers
│   ├── api/
│   │   ├── auth.ts                # Authentication API
│   │   └── users.ts               # Users API
│   ├── contexts/
│   │   ├── ToastContext.tsx       # Toast provider
│   │   └── ToastContextDefinition.ts
│   ├── data/
│   │   ├── generateMockUsers.js   # Mock data generator
│   │   ├── mockAuth.json          # Mock auth data
│   │   └── mockUsers.json         # 500 user records
│   ├── hooks/
│   │   ├── useAuth.ts             # Auth hook
│   │   ├── useStats.ts            # Stats hook
│   │   ├── useToast.ts            # Toast hook
│   │   ├── useToastContext.ts     # Toast context hook
│   │   └── useUsers.ts            # Users hook
│   └── storage/
│       ├── userStorage.test.ts    # Unit tests
│       └── userStorage.ts         # LocalStorage utilities
├── pages/
│   └── Login/
│       ├── LoginPage.scss
│       ├── LoginPage.test.tsx     # Unit tests
│       └── LoginPage.tsx
├── styles/
│   ├── global.scss                # Global styles
│   └── variables.scss             # SCSS variables
├── App.css
├── App.tsx                        # Main app component
├── index.css
├── main.tsx                       # Entry point
└── vite-env.d.ts

# Configuration Files
├── jest.config.ts                 # Jest configuration
├── jest.setup.ts                  # Jest setup
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── vite.config.ts                 # Vite config
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js v18 or higher** (v20 recommended)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/JesusPride/lendsqr-fe-test.git
cd lendsqr-fe-test
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Open your browser at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

### Run Tests

```bash
# Install test dependencies first (if needed)
npm install --save-dev jest@29 @types/jest@29 ts-jest@29

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 🔐 Demo Credentials

Use these credentials to test the application:

- **Email**: admin@lendsqr.com
- **Password**: password123

## ✨ Key Features

### Dashboard

- **Statistics Cards**: Total users, active users, loans, and savings metrics
- **Loan Disbursement Chart**: Bar chart showing monthly loan amounts with year filter
- **Interest Earned Chart**: Area chart tracking interest over time
- **Year Filter**: Toggle between 2020, 2021, and 2022 data

### User Management

- **User Table**: Displays 500+ users from mock API
- **Filtering**: Filter by organization, username, email, date, phone, and status
- **Pagination**: Navigate through user records efficiently
- **Actions**: View details, blacklist, or activate users

### User Details

- **Complete Profile**: Personal, education, employment, and financial information
- **Persistent Storage**: User details saved to localStorage
- **Responsive Layout**: Optimized for all screen sizes

## 📱 Responsive Design

- **Mobile** (320px - 768px): Stacked layouts, collapsible sidebar
- **Tablet** (769px - 1024px): Hybrid layout with toggle sidebar
- **Desktop** (1025px+): Full layout with permanent sidebar

## 🧪 Testing

The project includes comprehensive unit tests:

- **LoginPage.test.tsx**: 15 tests covering form validation, rendering, and interactions
- **StatusBadge.test.tsx**: 9 tests covering status rendering and CSS classes
- **userStorage.test.ts**: 18 tests covering localStorage operations, caching, and error handling

### Test Categories

| Component   | Positive Tests | Negative Tests | Total |
| ----------- | -------------- | -------------- | ----- |
| LoginPage   | 4              | 4              | 8     |
| StatusBadge | 4              | 1              | 5     |
| userStorage | 8              | 5              | 13    |

## 🎯 Assessment Requirements

- ✅ Login, Dashboard, Users List, and User Details pages
- ✅ Mock API integration with 500+ user records
- ✅ LocalStorage for user details persistence
- ✅ Fully responsive across all devices
- ✅ TypeScript implementation
- ✅ SCSS with variables and mixins
- ✅ Unit testing with positive and negative scenarios

## 👨‍💻 Author

**Adewunmi Esther Opeyemi**

- GitHub: [@JesusPride](https://github.com/JesusPride)
- Email: adewunmiopeyemi171@gmail.com
- Live Demo: [https://adewunmi-esther-lendsqr-fe-test.vercel.app](https://adewunmi-esther-lendsqr-fe-test.vercel.app)

## 📄 License

This project was created for Lendsqr's frontend engineering assessment.

---

**Built with React 19, TypeScript, SCSS, and Jest**
