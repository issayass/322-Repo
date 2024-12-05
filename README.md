# Harry's Diner

Welcome to Harry's Diner, a web application designed to manage restaurant operations efficiently. This project includes two packages in a monolithic structure: frontend and backend. These packages provide functionality for managing orders, customers, inventory, and more.

## **Live Demo**

- **Frontend URL**: https://github.com/issayass/HarrysDiner.github.io/new/main?filename=README.md
- **Backend URL**: 3.145.154.168

## **About the Project**

Harry's Diner is a full-stack web application that is designed for managing restaurants. The project is built using a combination of modern technologies, featuring but not limited to: React, Node.js and Express.

## **Repository Structure**

### `/frontend`

Contains the code for the frontend application.

### `/backend`

Contains the code for the backend API.

- `src/server.js`: Main entry point for the backend server.
- `src/routes/`: Defines all of the routes for the API.
- `prisma/`: Defines the database schema, written using the Prisma ORM.

### `.github/workflows/`

Contains the GitHub Actions that are used in our CI/CD workflow.

## **Installation and Setup**

Follow these steps to get the project up and running on your local machine!

### Frontend

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

4. Open your browser and navigate to `http://localhost:5173`.

### Backend

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up the database using Prisma:
    ```bash
    npx prisma migrate dev
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

5. The API will be available at `http://localhost:3002`.
