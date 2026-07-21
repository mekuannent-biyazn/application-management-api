# Internship Applicant Management API

Backend Internship Practical Challenge for **INFNOVA Technologies**.

A RESTful API built with **NestJS**, **Prisma ORM**, and **PostgreSQL** for managing internship applications. The system provides secure JWT authentication, applicant management, search, filtering, pagination, dashboard statistics, and interactive API documentation using Swagger.

---

## Features

### Authentication

- JWT Authentication
- Secure password hashing using bcrypt
- Bearer Token Authorization
- Role-Based Access Control (Admin)

### Applicant Management

- Create Applicant
- Get All Applicants
- Get Applicant By ID
- Update Applicant
- Soft Delete Applicant
- Update Applicant Status
- Update Internal Notes

### Search & Filtering

- Search by Name
- Search by Email
- Filter by Status
- Filter by Internship Track
- Sorting
- Pagination

### Dashboard

Returns:

- Total Applicants
- Pending Applicants
- Shortlisted Applicants
- Accepted Applicants
- Rejected Applicants

### Validation & Security

- DTO Validation
- Global Validation Pipe
- Global Exception Filter
- UUID Validation
- Soft Delete
- Unique Email Validation

### Documentation

- Swagger / OpenAPI Documentation

---

# Technologies

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT
- Passport
- bcrypt
- Swagger
- Class Validator
- Class Transformer

---

# Project Structure

```
src
│
├── auth
├── users
├── applicants
├── dashboard
├── prisma
├── common
│   ├── decorators
│   ├── filters
│   ├── guards
│   └── interceptors
│
├── app.module.ts
└── main.ts
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/internship-applicant-management-api.git
```

Move into the project

```bash
cd internship-applicant-management-api
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file.

Example:

```env
PORT=3000

NODE_ENV=development

DATABASE_URL=postgresql://postgres:password@localhost:5432/internship_applicant_db?schema=public

JWT_SECRET=your_super_secret_key

JWT_EXPIRES_IN=1d
```

---

# Database

Generate Prisma Client

```bash
npx prisma generate
```

Run Migrations

```bash
npx prisma migrate dev
```

Seed Database

```bash
npx prisma db seed
```

---

# Running the Project

Development

```bash
npm run start:dev
```

Production

```bash
npm run build

npm run start:prod
```

---

# Swagger Documentation

Open

```
http://localhost:3000/docs
```

Use the **Authorize** button and paste your JWT token.

Example

```
Bearer eyJhbGciOiJIUzI1NiIs...
```

---

# Authentication

Login

```
POST /api/v1/auth/login
```

Example

```json
{
  "email": "admin@infnova.com",
  "password": "Admin@123"
}
```

---

# API Endpoints

## Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/v1/auth/login |
| GET    | /api/v1/auth/me    |

## Applicants

| Method | Endpoint                      |
| ------ | ----------------------------- |
| POST   | /api/v1/applicants            |
| GET    | /api/v1/applicants            |
| GET    | /api/v1/applicants/:id        |
| PATCH  | /api/v1/applicants/:id        |
| DELETE | /api/v1/applicants/:id        |
| PATCH  | /api/v1/applicants/:id/status |
| PATCH  | /api/v1/applicants/:id/notes  |

## Dashboard

| Method | Endpoint                  |
| ------ | ------------------------- |
| GET    | /api/v1/dashboard/summary |

---

# Business Rules

- Applicant email must be unique.
- Notes cannot exceed 1000 characters.
- Applicants cannot move directly from Rejected to Accepted.
- Only authenticated administrators can update or delete applicants.
- Applicants are soft deleted.
- Deleted applicants are excluded from dashboard statistics.

---

# Testing

Run Unit Tests

```bash
npm run test
```

Run End-to-End Tests

```bash
npm run test:e2e
```

---

# Architecture

The project follows NestJS best practices.

```
Controller
      │
      ▼
Service
      │
      ▼
Prisma ORM
      │
      ▼
PostgreSQL
```

Authentication Flow

```
Login

↓

JWT Generated

↓

Bearer Token

↓

JWT Guard

↓

Roles Guard

↓

Protected Endpoint
```

---

# Assumptions

- Only administrators can access management endpoints.
- Applicants submit applications without authentication.
- Soft deleted applicants remain in the database for auditing.
- UUID is used as the primary key for all entities.

---

# Future Improvements

- Email Notifications
- Refresh Tokens
- Applicant Portal
- File Upload (CV)
- Docker Support
- CI/CD Pipeline

---

# Author

**Mekuannent Biyazn**

Backend Developer

Built as part of the **INFNOVA Technologies Backend Internship Practical Challenge**.
