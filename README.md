# Janatar Obhijog Backend

A robust backend API for the Janatar Obhijog (Public Complaint System) built with Express.js, TypeScript, and MongoDB.

## Table of Contents

- [Janatar Obhijog Backend](#janatar-obhijog-backend)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Technology Stack](#technology-stack)
  - [Folder Structure](#folder-structure)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Running the Application](#running-the-application)
    - [Development Mode](#development-mode)
    - [Build for Production](#build-for-production)
    - [Run in Production Mode](#run-in-production-mode)
    - [Code Linting and Formatting](#code-linting-and-formatting)
  - [API Documentation](#api-documentation)
    - [Authentication Endpoints](#authentication-endpoints)
    - [User Endpoints](#user-endpoints)
  - [Contributing](#contributing)

## Overview

The Janatar Obhijog Backend provides a comprehensive API for managing user accounts, authentication, and public complaints. It follows a modular architecture with TypeScript for type safety and MongoDB for data persistence.

## Features

- **User Management**: Create, read, update, and delete user accounts
- **Authentication**: Secure login with JWT, refresh tokens, and password management
- **Role-based Access Control**: Different permissions for users, admins, and superadmins
- **Email Notifications**: Sends welcome emails and password reset links
- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes
- **Input Validation**: Request validation using Zod schemas
- **Database Transactions**: Ensures data consistency with MongoDB transactions

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Email**: nodemailer
- **Validation**: Zod
- **Development Tools**:
  - ESLint for linting
  - Prettier for code formatting
  - ts-node-dev for development server

## Folder Structure

```
janatar-obhijog-backend/
├── src/
│   ├── app.ts                 # Express application setup
│   ├── server.ts              # Server startup
│   └── app/
│       ├── auth/              # Authentication related files
│       │   ├── auth.controller.ts
│       │   ├── auth.interface.ts
│       │   ├── auth.route.ts
│       │   ├── auth.service.ts
│       │   ├── auth.utils.ts
│       │   └── auth.validation.ts
│       ├── config/            # Configuration settings
│       │   └── index.ts
│       ├── DB/                # Database connection
│       │   └── index.ts
│       ├── errors/            # Error handling
│       │   ├── AppError.ts
│       │   ├── handleCatchError.ts
│       │   ├── handleDuplicateError.ts
│       │   ├── handleValidationError.ts
│       │   └── handleZodError.ts
│       ├── interface/         # TypeScript interfaces
│       │   ├── error.ts
│       │   └── index.d.ts
│       ├── middlewares/       # Express middlewares
│       │   ├── auth.ts
│       │   ├── globalErrorHandler.ts
│       │   ├── notFound.ts
│       │   └── validateRequest.ts
│       ├── modules/           # Feature modules
│       │   └── user/          # User module
│       │       ├── user.constant.ts
│       │       ├── user.controller.ts
│       │       ├── user.interface.ts
│       │       ├── user.model.ts
│       │       ├── user.route.ts
│       │       ├── user.service.ts
│       │       └── user.validation.ts
│       ├── routes/            # API routes
│       │   └── index.ts
│       └── utils/             # Utility functions
│           ├── catchAsync.ts
│           ├── emailTemplate.ts
│           ├── sendEmail.ts
│           └── sendResponse.ts
├── .env                       # Environment variables (create from example.env)
├── .eslintrc                  # ESLint configuration
├── .gitignore                 # Git ignore file
├── package.json               # Package configuration
├── pnpm-lock.yaml            # PNPM lock file
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/janatar-obhijog-backend.git
cd janatar-obhijog-backend
```

2. **Install dependencies**

Using npm:

```bash
npm install
```

Using pnpm (recommended):

```bash
pnpm install
```

## Environment Setup

1. **Create a .env file**

Copy the example.env file to .env:

```bash
cp example.env .env
```

2. **Configure your environment variables**

Edit the .env file with your specific configuration:

```env
DATABASE_URL=mongodb://localhost:27017/janatar-obhijog
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=your_access_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=7d
NODE_ENV=development
PORT=5000
EMAIL_SEND_USER_EMAIL=your-email@example.com
EMAIL_SEND_USER_PASS=your-email-password
RESET_PASS_UI_LINK=https://janatarObhijog.com/reset-password
```

## Running the Application

### Development Mode

```bash
# Using npm
npm run start:dev

# Using pnpm
pnpm run start:dev
```

This will start the server with hot-reloading enabled.

### Build for Production

```bash
# Using npm
npm run build

# Using pnpm
pnpm run build
```

### Run in Production Mode

```bash
# Using npm
npm run start:prod

# Using pnpm
pnpm run start:prod
```

### Code Linting and Formatting

```bash
# Lint code
pnpm run lint

# Fix linting issues
pnpm run lint:fix

# Format code with Prettier
pnpm run prettier:fix
```

## API Documentation

### Authentication Endpoints

- **POST /api/auth/login**: User login
- **POST /api/auth/refresh-token**: Refresh access token
- **POST /api/auth/change-password**: Change user password
- **POST /api/auth/forget-password**: Request password reset
- **POST /api/auth/reset-password**: Reset password with token

### User Endpoints

- **POST /api/users/signup**: Create a new user
- **GET /api/users**: Get all users (admin only)
- **GET /api/users/:id**: Get a specific user
- **PATCH /api/users/:id**: Update a user
- **DELETE /api/users/:id**: Delete a user

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
