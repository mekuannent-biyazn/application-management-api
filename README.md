# Internship Applicant Management API

Backend Internship Practical Challenge for **INFNOVA Technologies**.

A RESTful API built with **NestJS**, **Prisma ORM**, and **PostgreSQL** for managing internship applications. The application provides secure JWT authentication, applicant management, search, filtering, sorting, pagination, dashboard statistics, and interactive API documentation using Swagger.

---

# Features

## Authentication

- JWT Bearer Authentication
- Secure password hashing using bcrypt
- Role-Based Authorization (Administrator)

## Applicant Management

- Create Applicant
- Get All Applicants
- Get Applicant By ID
- Update Applicant
- Soft Delete Applicant
- Update Applicant Status
- Update Internal Notes

## Search & Filtering

- Search by applicant name
- Search by email
- Filter by status
- Filter by internship track
- Sort results
- Pagination

## Dashboard

Dashboard summary returns:

- Total Applicants
- Pending Applicants
- Shortlisted Applicants
- Accepted Applicants
- Rejected Applicants

## Validation & Security

- DTO Validation
- Global Validation Pipe
- Global Exception Filter
- UUID Validation
- Unique Email Validation
- Soft Delete

## Documentation

- Swagger / OpenAPI Documentation

---

# Technology Stack

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT
- Passport
- bcrypt
- Swagger
- class-validator
- class-transformer

---

# Project Structure

```text
prisma
|
├── migrations
src
│
├── applicants
|     ├── dto
├── auth
|     ├── decorators
|     ├── dto
|     ├── guards
|     |     ├── jwt-auth.guard
|     ├── interfaces
|     ├── strategies
|     |     ├── jwt.strategy
├── common
│   ├── filters
│   ├── guards
├── dashboard
├── prisma
├── users
│
├── app.module.ts
└── main.ts
test
|
├── app.e2e-spec.ts
└── jest-ete.json
```

---

# Prerequisites

Before running the project, make sure the following are installed:

- Node.js (v22 or later)
- npm
- PostgreSQL
- Git

---

# Installation

## 1. Clone the repository

```bash
git clone https://github.com/mekuannent-biyazn/application-management-api.git

cd application-management-api
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Create PostgreSQL Database

Create a database named:

```text
internship_applicant_db
```

or use any database name and update the connection string accordingly.

---

## 4. Configure Environment Variables

Copy the example file.

```bash
cp .env.example .env
```

If you're on Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Update the values.

```env
PORT=3000

NODE_ENV=development

DATABASE_URL=postgresql://postgres:password@localhost:5432/internship_applicant_db?schema=public

JWT_SECRET=your_super_secret_key

JWT_EXPIRES_IN=1d
```

---

## 5. Generate Prisma Client

```bash
npx prisma generate
```

---

## 6. Run Database Migrations

```bash
npx prisma migrate dev
```

---

## 7. Seed the Database

```bash
npx prisma db seed
```

This command creates the default administrator account.

**Administrator Credentials**

```text
Email:
admin@infnova.com

Password:
Admin@123
```

---

## 8. Start the Application

Development

```bash
npm run start:dev
```

Production

```bash
npm run build
npm run start:prod
```

The API will be available at:

```text
http://localhost:3000/api
```

Swagger Documentation:

```text
http://localhost:3000/docs
```

---

# Authentication

Login endpoint

```http
POST /api/auth/login
```

Example request

```json
{
  "email": "admin@infnova.com",
  "password": "Admin@123"
}
```

After login, copy the returned JWT access token.

Click the **Authorize** button in Swagger and enter:

```text
Bearer YOUR_ACCESS_TOKEN
```

---

# API Endpoints

## Authentication

| Method | Endpoint        |
| ------ | --------------- |
| POST   | /api/auth/login |
| GET    | /api/auth/me    |

---

## Applicants

| Method | Endpoint                   |
| ------ | -------------------------- |
| POST   | /api/applicants            |
| GET    | /api/applicants            |
| GET    | /api/applicants/:id        |
| PATCH  | /api/applicants/:id        |
| DELETE | /api/applicants/:id        |
| PATCH  | /api/applicants/:id/status |
| PATCH  | /api/applicants/:id/notes  |

---

## Dashboard

| Method | Endpoint               |
| ------ | ---------------------- |
| GET    | /api/dashboard/summary |

---

# Query Parameters

The applicant list endpoint supports the following query parameters.

```text
GET /api/applicants
```

| Parameter | Description             |
| --------- | ----------------------- |
| page      | Current page            |
| limit     | Items per page          |
| search    | Search by name or email |
| status    | Applicant status        |
| track     | Internship track        |
| sortBy    | Field to sort           |
| order     | asc or desc             |

Example:

```http
GET /api/applicants?page=1&limit=10&search=abel&status=PENDING&track=BACKEND&sortBy=createdAt&order=desc
```

---

# Business Rules

- Applicant email addresses must be unique.
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

```text
Controller
      │
Validation
      │
Authentication Guard
      │
Authorization Guard
      │
Service
      │
Prisma ORM
      │
PostgreSQL
```

Authentication Flow

```text
Administrator Login
        │
Generate JWT
        │
Bearer Token
        │
JWT Guard
        │
Roles Guard
        │
Protected Endpoint
```

---

# Assumptions

- Only administrators can manage applicants.
- Applicants submit applications without authentication.
- Soft deleted applicants remain in the database for auditing purposes.
- UUID is used as the primary key for all entities.

---

# Future Improvements

- Applicant authentication
- Email notifications
- Refresh tokens
- File upload (CV)
- Docker Compose
- CI/CD pipeline

---

# Author

**Mekuannent Biyazn**

Backend Developer

Built as part of the **INFNOVA Technologies Backend Internship Practical Challenge**.

---

# License

This project is provided for educational and recruitment evaluation purposes.
