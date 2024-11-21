# Backend for Harry's Diner

## Overview

This repository contains the backend for our application. It is structured to ensure scalability, maintainability, and simplicity. The backend is built using [Node.js](https://nodejs.org/) and leverages [Prisma](https://www.prisma.io/) for database management and ORM.

---

## Project Structure

The project follows a modular architecture for clarity and maintainability:

prisma/ \
├── schema/ \
│ └── (model).prisma # Prisma schema files for defining models and database structure

src/ \
├── controllers/ # Contains logic for handling API requests \
├── middleware/ # Custom middleware for request handling \
├── models/ # Database models (via Prisma or manual definitions) \
├── routes/ # API route definitions \
├── services/ # Business logic and reusable application services \
├── types/ # TypeScript type definitions \
├── utils/ # Utility functions and helpers \
├── app.ts # Main application setup (middlewares, routing, etc.) \
├── server.ts # Server initialization and configuration

.env # Environment variables configuration

---

## Environment Variables

The application requires a `.env` file for environment-specific configurations. Below are the required variables:

- `DATABASE_URL`: The URL for connecting to the database.
- `PORT`: The port number on which the server will run.
- `JWT_SECRET`: The secret key for signing and verifying JSON Web Tokens (JWT).

Example `.env` file:

    DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase
    PORT=3000
    JWT_SECRET=myverysecuresecret

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

(1). Clone the repository:

```bash
git clone https://github.com/issayass/322-Repo.git
cd backend
```

(2). Install dependencies:

```bash
npm install
```

(3). Configure the environment:

&nbsp;&nbsp; Create a .env file in the /backend directory and provide the environment variables shown above.

(4). Set up the database:

```bash
npx prisma generate
npx prisma migrate dev
```

(5). Start the development server:

```bash
npm run dev
```
