# Lendsqr Frontend Engineering Test

A React TypeScript application built for Lendsqr's frontend engineering assessment, featuring an admin dashboard for managing lending operations.

## 🚀 Live Demo

**Deployed Application:** [https://chukwudi-nwafor-lendsqr-fe-test.onrender.com](https://chukwudi-nwafor-lendsqr-fe-test.onrender.com/)

## 📋 Overview

This project implements Lendsqr's admin console design with the following features:

- **Authentication**: Login page with protected routes
- **Dashboard Analytics**: Overview with loan disbursement and interest charts
- **User Management**: List view with filtering, sorting, and pagination
- **User Details**: Comprehensive user profile pages
- **Responsive Design**: Mobile-first approach, works on all screen sizes

## 🛠️ Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **SCSS** for styling
- **React Router DOM** for navigation
- **Recharts** for data visualization
- **Axios** for API calls

## 📁 Project Structure

```
src/
├── components/
│   ├── Auth/              # Login and authentication
│   ├── Dashboard/         # Dashboard with analytics charts
│   ├── Layout/            # Header, Sidebar, Layout wrapper
│   ├── Users/             # User list and details pages
│   └── UI/                # Reusable components (Toast, Spinner, etc.)
├── lib/
│   ├── api/              # API integration
│   ├── hooks/            # Custom React hooks
│   ├── contexts/         # React contexts
│   └── types/            # TypeScript types
├── styles/               # Global SCSS variables and styles
└── assets/               # Images and icons
```

## 🚀 Getting Started

### Prerequisites

- **Node.js v20 or higher** (required)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/chukwudi34/lendsqr-fe-test.git
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

## 🎯 Assessment Requirements

- ✅ Login, Dashboard, Users List, and User Details pages
- ✅ Mock API integration with 500+ user records
- ✅ LocalStorage for user details persistence
- ✅ Fully responsive across all devices
- ✅ TypeScript implementation
- ✅ SCSS with variables and mixins

## 👨‍💻 Author

**Chukwudi Nwafor**

- GitHub: [@chukwudi34](https://github.com/chukwudi34)
- Email: chukwudinwafor34@gmail.com
- Live Demo: [https://chukwudi-nwafor-lendsqr-fe-test.onrender.com/](https://chukwudi-nwafor-lendsqr-fe-test.onrender.com/)

## 📄 License

This project was created for Lendsqr's frontend engineering assessment.

---

**Built with React 19, TypeScript, and SCSS**
