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
    - [Complaint Endpoints](#complaint-endpoints)
    - [Dashboard Endpoints](#dashboard-endpoints)
    - [Role-Based Permissions](#role-based-permissions)
      - [Permission Restrictions:](#permission-restrictions)
  - [Contributing](#contributing)

## Overview

The Janatar Obhijog Backend provides a comprehensive API for managing user accounts, authentication, and public complaints. It follows a modular architecture with TypeScript for type safety and MongoDB for data persistence.

## Features

- **User Management**: Create, read, update, and delete user accounts
- **Authentication**: Secure login with JWT, refresh tokens, and password management
- **Complaint Management**: Submit, view, and manage public complaints
- **Location-based Organization**: Complaints organized by division, district, thana, and postal code
- **Media Support**: Upload and attach images/videos to complaints
- **Voting System**: Users can vote on complaints to show support
- **Comment System**: Users can comment on complaints for discussion
- **Complaint Resolution**: Admins can resolve complaints with status tracking
- **AI-Powered Analysis**: Gemini AI integration for complaint analysis and insights
- **Dashboard Analytics**: Role-based dashboards for citizens, admins, and super admins
- **Role-based Access Control**: Different permissions for users, admins, and superadmins
- **Email Notifications**: Sends welcome emails and password reset links
- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes
- **Input Validation**: Request validation using Zod schemas
- **Database Transactions**: Ensures data consistency with MongoDB transactions
- **Query Builder**: Advanced filtering, sorting, and pagination capabilities

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Email**: nodemailer
- **Validation**: Zod
- **AI Integration**: Google Gemini AI (@google/generative-ai)
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
│       │   ├── index.d.ts
│       │   └── query.ts
│       ├── middlewares/       # Express middlewares
│       │   ├── auth.ts
│       │   ├── globalErrorHandler.ts
│       │   ├── notFound.ts
│       │   └── validateRequest.ts
│       ├── modules/           # Feature modules
│       │   ├── ai/            # AI analysis module
│       │   │   ├── ai.controller.ts
│       │   │   ├── ai.gemini.ts
│       │   │   ├── ai.interface.ts
│       │   │   ├── ai.route.ts
│       │   │   ├── ai.service.ts
│       │   │   └── ai.validation.ts
│       │   ├── complaint/     # Complaint module
│       │   │   ├── complaint.constant.ts
│       │   │   ├── complaint.controller.ts
│       │   │   ├── complaint.dashboard.service.ts
│       │   │   ├── complaint.interface.ts
│       │   │   ├── complaint.model.ts
│       │   │   ├── complaint.route.ts
│       │   │   ├── complaint.service.ts
│       │   │   └── complaint.validation.ts
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
│           ├── QueryBuilder.ts
│           ├── sendEmail.ts
│           └── sendResponse.ts
├── .env                       # Environment variables (create from example.env)
├── .eslintrc                  # ESLint configuration
├── .gitignore                 # Git ignore file
├── example.env               # Environment variables template
├── eslint.config.mjs         # ESLint configuration
├── package.json              # Package configuration
├── pnpm-lock.yaml           # PNPM lock file
├── tsconfig.json            # TypeScript configuration
├── vercel.json              # Vercel deployment configuration
├── ComplaintServices.postman_collection.json  # Postman collection for testing
├── JanatarObhijog.postman_collection.json     # Complete API Postman collection
└── README.md                # Project documentation
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
# Database Configuration
DATABASE_URL=mongodb://localhost:27017/janatar-obhijog

# Security Configuration
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=your_access_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key_here
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=7d

# Application Configuration
NODE_ENV=development
PORT=5000

# Email Configuration
EMAIL_SEND_USER_EMAIL=your-email@gmail.com
EMAIL_SEND_USER_PASS=your_app_password_not_regular_password

# Frontend URL for password reset
RESET_PASS_UI_LINK=http://localhost:5173/reset-password

# AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here
```

### Important Notes:

- **EMAIL_SEND_USER_PASS**: Use an app-specific password, not your regular email password
- **GEMINI_API_KEY**: Required for AI-powered complaint analysis features
- **JWT Secrets**: Use strong, unique secrets for production
- **DATABASE_URL**: Update with your MongoDB connection string

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

The API is accessible at `http://localhost:5000/api/v1` by default. All endpoints return JSON responses with a standardized format:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation successful",
  "data": {
    /* response data */
  }
}
```

### Base URL

```
http://localhost:5000/api/v1
```

### Authentication

Most endpoints require authentication via JWT tokens. Include the access token in the Authorization header:

```
Authorization: Bearer <your_access_token>
```

### Authentication Endpoints

#### **POST /auth/login**

Login with email and password.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "needsPasswordChange": false
  }
}
```

#### **POST /auth/refresh-token**

Refresh access token using refresh token.

**Request Body:**

```json
{
  "refreshToken": "your_refresh_token_here"
}
```

#### **POST /auth/change-password**

Change user password (requires authentication).

**Request Body:**

```json
{
  "oldPassword": "oldPassword123",
  "newPassword": "newPassword123"
}
```

#### **POST /auth/forget-password**

Request password reset email.

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

#### **POST /auth/reset-password**

Reset password using token from email.

**Request Body:**

```json
{
  "email": "user@example.com",
  "newPassword": "newPassword123",
  "token": "reset_token_from_email"
}
```

### User Endpoints

#### **POST /users/signup**

Create a new user account.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+8801234567890",
  "role": "user"
}
```

#### **GET /users** (superAdmin only)

Get all users with pagination and filtering.

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Number of items per page (default: 10)
- `searchTerm`: Search by name or email
- `sort`: Sort field and order (e.g., "name", "-createdAt")

#### **GET /users/me** (authenticated users)

Get current user's profile.

#### **PATCH /users/me** (authenticated users)

Update current user's profile.

**Request Body:**

```json
{
  "name": "Updated Name",
  "phone": "+8801234567890"
}
```

#### **GET /users/:id** (superAdmin only)

Get a specific user by ID.

#### **PATCH /users/:id** (superAdmin only)

Update a user by ID.

#### **DELETE /users/:id** (superAdmin only)

Soft delete a user by ID.

### Complaint Endpoints

#### **GET /complaints/public**

Get public complaints (no authentication required).

**Query Parameters:**

- `page`: Page number
- `limit`: Items per page
- `searchTerm`: Search complaints
- `sort`: Sort order
- `district`: Filter by district
- `thana`: Filter by thana
- `status`: Filter by status (pending, inProgress, resolved)

#### **POST /complaints** (authenticated users)

Create a new complaint.

**Request Body:**

```json
{
  "title": "Street Light Not Working",
  "description": "The street light on Main Road has been out for 3 days",
  "category": "infrastructure",
  "location": {
    "postCode": "1000",
    "thana": "Dhanmondi",
    "district": "Dhaka",
    "division": "Dhaka",
    "address": "123 Main Road, Dhanmondi"
  },
  "media": "https://example.com/image.jpg"
}
```

#### **GET /complaints** (authenticated users)

Get complaints based on user role.

#### **PUT /complaints/:id/resolve** (admin/superAdmin only)

Resolve a complaint.

**Request Body:**

```json
{
  "resolutionNote": "Street light has been fixed",
  "resolvedBy": "Public Works Department"
}
```

#### **POST /complaints/:id/vote** (authenticated users)

Vote on a complaint (upvote/downvote).

**Request Body:**

```json
{
  "voteType": "upvote"
}
```

#### **POST /complaints/:id/comment** (authenticated users)

Add a comment to a complaint.

**Request Body:**

```json
{
  "comment": "I have the same issue in my area"
}
```

### Dashboard Endpoints

#### **GET /complaints/dashboard/citizen** (authenticated users)

Get citizen dashboard data including user's complaints and statistics.

#### **GET /complaints/dashboard/admin** (admin only)

Get admin dashboard data including all complaints and management statistics.

#### **GET /complaints/dashboard/super** (superAdmin only)

Get super admin dashboard data with comprehensive system statistics.

### AI Endpoints

#### **POST /ai/analyze-batch** (admin/superAdmin only)

Analyze a batch of complaints using AI.

**Request Body:**

```json
{
  "complaintIds": ["complaint_id_1", "complaint_id_2", "complaint_id_3"]
}
```

#### **POST /ai/analyze-location** (admin/superAdmin only)

Analyze complaints by location using AI.

**Request Body:**

```json
{
  "location": {
    "district": "Dhaka",
    "thana": "Dhanmondi"
  },
  "dateRange": {
    "startDate": "2024-01-01",
    "endDate": "2024-12-31"
  }
}
```

### Role-Based Permissions

The API implements role-based access control with the following user roles:

- **User**: Regular end users of the application
- **Admin**: Administrative users with elevated permissions
- **SuperAdmin**: Highest level administrators with full system access

#### Permission Restrictions:

- Only superAdmins can view, update, or delete other users
- Regular users and admins can only view and update their own profiles
- Department and designation fields can only be changed by superAdmins
- User roles can only be changed by superAdmins
- Account status fields (isDeleted, isBanned) can only be modified by superAdmins

## Usage Examples

### 1. Complete User Registration and Login Flow

```bash
# 1. Register a new user
curl -X POST http://localhost:5000/api/v1/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+8801234567890"
  }'

# 2. Login to get access token
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# 3. Use the access token for authenticated requests
curl -X GET http://localhost:5000/api/v1/users/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 2. Creating and Managing Complaints

```bash
# Create a new complaint
curl -X POST http://localhost:5000/api/v1/complaints \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "title": "Broken Street Light",
    "description": "The street light at the corner has been broken for weeks",
    "category": "infrastructure",
    "location": {
      "postCode": "1000",
      "thana": "Dhanmondi",
      "district": "Dhaka",
      "division": "Dhaka",
      "address": "Corner of Road 15 and 27, Dhanmondi"
    },
    "media": "https://example.com/streetlight-image.jpg"
  }'

# Vote on a complaint
curl -X POST http://localhost:5000/api/v1/complaints/COMPLAINT_ID/vote \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{"voteType": "upvote"}'

# Add a comment
curl -X POST http://localhost:5000/api/v1/complaints/COMPLAINT_ID/comment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{"comment": "I have the same issue in my neighborhood"}'
```

### 3. Admin Operations

```bash
# Resolve a complaint (admin/superAdmin only)
curl -X PUT http://localhost:5000/api/v1/complaints/COMPLAINT_ID/resolve \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_ACCESS_TOKEN" \
  -d '{
    "resolutionNote": "Street light has been repaired by city maintenance",
    "resolvedBy": "City Maintenance Department"
  }'

# Get admin dashboard
curl -X GET http://localhost:5000/api/v1/complaints/dashboard/admin \
  -H "Authorization: Bearer ADMIN_ACCESS_TOKEN"

# Analyze complaints using AI
curl -X POST http://localhost:5000/api/v1/ai/analyze-batch \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_ACCESS_TOKEN" \
  -d '{
    "complaintIds": ["complaint_id_1", "complaint_id_2", "complaint_id_3"]
  }'
```

## Error Handling

The API uses standard HTTP status codes and returns errors in a consistent format:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation error",
  "errorSources": [
    {
      "path": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### Common Error Codes:

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error

## Testing with Postman

Import the provided Postman collections for comprehensive API testing:

1. **ComplaintServices.postman_collection.json** - Complete complaint-related endpoints
2. **JanatarObhijog.postman_collection.json** - Full API collection

### Setting up Postman Environment:

1. Create a new environment in Postman
2. Add the following variables:
   - `baseUrl`: `http://localhost:5000/api/v1`
   - `accessToken`: (will be set automatically after login)
   - `refreshToken`: (will be set automatically after login)

The collections include automated scripts to save tokens after successful authentication.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
