# Transact

**Transact** is a simple web application that demonstrates the basic logic of creating and managing accounts in different currencies (`EUR`, `USD`, `JPY`), user authentication, viewing accounts, performing transactions between accounts, and automatic currency conversion during transactions.

The project is developed using:
- **Frontend:** [Next.js 15.2.1](https://nextjs.org/)
- **Backend:** [AdonisJS 6.17.2](https://adonisjs.com/)

🚀 **This project is still in development.** More details about the libraries used can be found in the `README.md` files inside the `frontend` and `backend` directories.

---

## ✨ Features

The application currently includes the following features:
- **Localization** (English, German, French)
- **Themes** (System, Light, Dark)
- **Live Exchange Rates** (Test data generated on the backend)
- **User Authentication**
  - Registration
  - Login
- **Dashboard** (User account overview)
  - **Accounts**
    - View a list of all user accounts.
    - Create a new account in a selected currency. *(For testing purposes, when an account is created, an automatic transfer of 100 units in the selected currency is made from a system-generated "Bank" user. This transaction will be visible on the Transactions page or in the account details.)*
    - View details of a specific account by its ID.
  - **Transactions**
    - View all incoming and outgoing transactions related to user accounts.
    - **Create Transactions** (Transfer money to another account, either the user’s own or another user’s account. If the selected accounts have different currencies, automatic conversion will be performed.)

📌 **New features and improvements are planned in future updates.**

---

## ⚙️ Installation & Setup

Since the project uses the latest versions of Next.js and AdonisJS, you must have **Node.js v22.14.0 or later** installed.

### **1️⃣ Check your Node.js version**
```sh
node -v
```
If you have a different version, you can install and switch using nvm:
```sh
nvm install v22.14.0
nvm use v22.14.0
node -v
```
### **2️⃣ Clone the repository**
```sh
git clone https://github.com/kolotao/transact.git
cd transact
```
### **3️⃣ Install dependencies and setup the database**
The project follows a monorepo structure with automated setup scripts.
To install dependencies, set up the backend, and prepare the database, simply run:
```sh
npm install
```
**This will:**
- Install all dependencies for both the frontend and backend.
- Automatically create the SQLite database and run migrations.
- Seed the database with a test Bank user and test exchange rates.

### **4️⃣ Start the development server**
To start both the backend and frontend simultaneously, run:

```sh
npm run dev
```
**This will:**
- Start the backend (AdonisJS) on **localhost:5438**
- Start the frontend (Next.js) on **localhost:4836**

### **🛠 Tech Stackr**
**Frontend**: Next.js, TypeScript, Tailwind CSS, Redux, shadcn
**Backend**: AdonisJS, SQLite, Lucid ORM
**Development Tools**: ESLint, Prettier, Concurrently