# 🚀 Transact Backend

This is the **backend** of the **Transact** project, built with **AdonisJS 6.17.2**.  
It provides a RESTful API for managing **users**, **accounts**, **transactions**, and **currency exchange rates**.

---

## 📌 Features

- **Authentication** (Session-based login & registration)
- **User Management** (Create, fetch users)
- **Account Management** (Create accounts in different currencies)
- **Transactions** (Transfer funds between accounts, including currency conversion)
- **Exchange Rates** (Simulated exchange rates for transactions)
- **Middleware & Validation** (Auth guards, input validation)
- **Database Integration** (SQLite, Adonis Lucid ORM)
- **Seeders & Migrations** (Prepopulate database with test data)

---

## ⚙️ Tech Stack

| Technology         | Purpose                                   |
|-------------------|-------------------------------------------|
| **AdonisJS** 6.17.2 | Backend framework |
| **TypeScript** 5.7 | Typed JavaScript for reliability |
| **SQLite** | Embedded database for simplicity |
| **Adonis Lucid ORM** | Database interactions |
| **Adonis Auth** | User authentication system |
| **Adonis Middleware** | Request validation & security |
| **UUID** | Unique identifiers for database entities |
| **Luxon** | Date & time handling |

---

## 🏗️ Project Structure

```
backend/
├── app/                      # Application core
│   ├── controllers/          # API Controllers
│   │   ├── accounts_controller.ts
│   │   ├── auth_controller.ts
│   │   ├── exchange_rates_controller.ts
│   │   ├── stats_controller.ts
│   │   ├── transactions_controller.ts
│   │   └── users_controller.ts
│   ├── middleware/           # Custom middleware (Auth, CORS, JSON response)
│   ├── models/               # Database models (Lucid ORM)
│   ├── validators/           # Input validation rules
│   ├── exceptions/           # Global exception handling
│   └── services/             # Business logic & utility functions (planned)
│
├── config/                   # App configuration (auth, cors, database, etc.)
├── database/                 # Migrations & Seeders
│   ├── migrations/           # Database schema definition
│   ├── seeders/              # Prepopulate data (bank user, exchange rates)
│   └── tmp/db.sqlite3        # SQLite database file
│
├── start/                    # Kernel & Routes
│   ├── env.ts                # Environment variables
│   ├── kernel.ts             # Global middleware
│   ├── routes.ts             # API endpoints definition
│
├── tests/                    # Unit & integration tests
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript config
├── .env                      # Environment variables
├── ace.js                    # CLI commands (migrations, seeds, etc.)
└── README.md                 # Project documentation
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
This will install all backend dependencies.

### **3️⃣ Database Setup**
The project uses **SQLite** by default.  
Run the following command to apply migrations and seed the database:
```sh
node ace migration:run && node ace db:seed
```

### **4️⃣ Run Development Server**
```sh
npm run dev
```
This starts the AdonisJS backend on `http://localhost:5438`.

### **5️⃣ Run Linter**
```sh
npm run lint
```

### **6️⃣ Run Tests**
```sh
npm run test
```

---

## 🔑 Authentication & Middleware

The backend uses **session-based authentication** with cookies.  
Middleware is used for:
- **AuthMiddleware**: Protects private routes
- **GuestMiddleware**: Restricts access for logged-in users
- **CORS Middleware**: Allows frontend communication
- **JSON Middleware**: Ensures JSON responses

---

## 🛠️ Environment Variables

All configuration is stored in `.env`:

```
TZ=UTC
PORT=5438
HOST=localhost
LOG_LEVEL=info
APP_KEY=your-secret-key
NODE_ENV=development
SESSION_DRIVER=cookie

CORS_HOST=http://localhost:4836
CORS_ENABLED=true
```

> **Note:** `APP_KEY` is auto-generated during installation.

---

## 🔄 Database & ORM

The backend uses **Lucid ORM** for database interactions.  
By default, **SQLite** is used, but it can be replaced with **PostgreSQL** or **MySQL**.

- **Migrations**: Define database schema
- **Seeders**: Populate database with test data

Example commands:
```sh
node ace migration:run   # Run migrations
node ace migration:rollback   # Undo migrations
node ace db:seed   # Populate database with test data
```

---

## 📢 API Endpoints

| Method | Endpoint                          | Description                                 | Auth Required |
|--------|-----------------------------------|---------------------------------------------|--------------|
| `GET`  | `/api/`                           | Check if the server is running             | No           |
| `POST` | `/api/register`                   | Register a new user                        | No           |
| `POST` | `/api/login`                      | Login & create session                     | No           |
| `DELETE` | `/api/logout`                   | Logout user & destroy session              | No           |
| `GET`  | `/api/exchange-rates`             | Get current exchange rates                 | No           |
| `GET`  | `/api/users`                      | Get a list of all users                    | No           |
| `GET`  | `/api/stats`                      | Get application statistics                 | No           |
| `GET`  | `/api/me`                         | Get authenticated user profile             | ✅ Yes       |
| `GET`  | `/api/accounts`                   | List all accounts of the authenticated user| ✅ Yes       |
| `POST` | `/api/accounts`                   | Create a new account                       | ✅ Yes       |
| `GET`  | `/api/accounts/:id`               | Get details of a specific account          | ✅ Yes       |
| `PUT`  | `/api/accounts/:id`               | Update account details                     | ✅ Yes       |
| `GET`  | `/api/transactions`               | List all transactions of the user          | ✅ Yes       |
| `GET`  | `/api/transactions/:id`           | Get details of a specific transaction      | ✅ Yes       |
| `GET`  | `/api/transactions/get-by-user/:id` | Get transactions related to a specific user| ✅ Yes       |
| `POST` | `/api/transactions/transfer`      | Transfer money between accounts            | ✅ Yes       |

---
