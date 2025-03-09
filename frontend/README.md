# 🚀 Transact Frontend

This is the **frontend** of the **Transact** project, a web application that allows users to create accounts in different currencies (`EUR`, `USD`, `JPY`), manage transactions, and automatically convert between currencies.

The frontend is built using **Next.js 15.2.1**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Redux Toolkit**.

---

## 📌 Features

- **Localization** (English, German, French)
- **Dark / Light / System theme support**
- **Authentication**
  - User Registration
  - User Login
- **Dashboard**
  - View **accounts** (list & details)
  - Create a new **account** in a selected currency
- **Transactions**
  - View transaction history
  - Create new transactions (with automatic currency conversion)
- **Live Exchange Rates** (Test data from backend)
- **State Management** using **Redux Toolkit**
- **Responsive UI** with **Tailwind CSS** and **ShadCN components**
- **Role-based authentication & protected routes**
- **Testing with Jest & React Testing Library**

---

## ⚙️ Tech Stack

| Technology       | Purpose                                    |
|-----------------|--------------------------------------------|
| **Next.js** 15.2.1 | React framework for SSR & static generation |
| **React** 19 | Component-based UI library |
| **TypeScript** | Strongly typed JavaScript |
| **Redux Toolkit** | State management for global app state |
| **React Hook Form** | Form validation & handling |
| **Zod** | Form validation schema |
| **ShadCN** | UI components using Radix & Tailwind |
| **Lucide React** | Icon library for UI elements |
| **i18next** | Multi-language support (i18n) |
| **Next Themes** | Dark/Light mode support |
| **Jest & React Testing Library** | Unit & integration testing |

---

## 🏗️ Project Structure

```
frontend/
├── app/                    # Next.js App Router structure
│   ├── i18n/               # Localization logic (i18next)
│   ├── [lng]/              # Dynamic language-based routing
│   │   ├── auth/           # Authentication pages (login, register)
│   │   ├── dashboard/      # Main user dashboard
│   │   │   ├── accounts/   # Accounts list, creation & details
│   │   │   ├── transactions/ # Transactions list & creation
│   │   │   ├── profile/    # User profile page
│   ├── layout.tsx          # Main layout file
│   ├── page.tsx            # Root index page
│   ├── globals.css         # Global Tailwind styles
│   └── middleware.ts       # Middleware for authentication
│
├── components/             # Reusable UI components
│   ├── layouts/            # Sidebar, Header, Navigation
│   ├── ui/                 # Buttons, Inputs, Forms, Tables
│   ├── headers/            # Page headers
│   ├── user/               # User-related components
│   ├── data/               # Data display components
│
├── hooks/                  # Custom React hooks
│
├── lib/                    # Utility functions & config
│   ├── config.client.ts    # Frontend-specific configs
│   ├── utils.ts            # Helper utility functions
│
├── providers/              # Global Providers (Theme, Redux)
│
├── public/                 # Static assets (logos, icons)
│
├── store/                  # Redux Toolkit state management
│   ├── features/           # Slice-based feature organization
│   │   ├── auth/           # Authentication state
│   │   ├── accounts/       # Accounts state
│   │   ├── transactions/   # Transactions state
│   │   ├── exchangeRates/  # Exchange rate state
│   │   ├── stats/          # Dashboard stats state
│   ├── store.ts            # Redux store setup
│
├── tests/                  # Jest & RTL test files
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies & scripts
├── tsconfig.json           # TypeScript configuration
```

---

## 📦 Installation & Setup

### **1️⃣ Prerequisites**
- **Node.js v22.14.0 or later** (check with `node -v`)
- **npm** package manager

If needed, install the correct Node.js version using `nvm`:
```sh
nvm install v22.14.0
nvm use v22.14.0
```

### **2️⃣ Install Dependencies**
```sh
npm install
```
This will install all frontend dependencies.

### **3️⃣ Run Development Server**
```sh
npm run dev
```
This starts the Next.js app on `http://localhost:4836`.

### **4️⃣ Run Linter**
```sh
npm run lint
```

### **5️⃣ Run Tests**
```sh
npm run test
```

---

## 🔐 Authentication & Authorization

- **Session-based authentication**: Users need to log in to access their accounts and transactions.

---

## 🌍 Localization (i18n)

- The project supports **English (en)**, **German (de)**, and **French (fr)**.
- Translations are stored in `app/i18n/locales/`.
- The app automatically detects the user's language.

---

## 🛠️ Environment Variables

The frontend can be configured using environment variables in a `.env.local` file (not included in the repo). Example:
```
NEXT_PUBLIC_API_BASE_URL="http://localhost:5438/api"
```

---
