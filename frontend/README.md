# Harry's Diner Frontend

This is the **frontend** of the Harry's Diner project. This package is built using **React** with **Vite** as the build tool. This application provides a user interface for customers, staff, and managers to interact with the restaurant's system.

## **Project Structure**

The frontend project is structured in the default way by Vite, the build tool, to help with maintainability. Below is an overview of the directories and why they exist.

### `/src`

The src directory contains the main source code for the application.

### `/public`

The public directory contains files that will be served from the main directory in the distribution after building.

### `/prisma`

The prisma directory contains the structure of the database defined by the Prisma ORM that is necessary in order to generate the Prisma Client for frontend typing database operations.

## **Scripts**

The `package.json` file contains a couple of scripts to manage and build the project.

- `npm run dev`: Starts the development server at `http://localhost:5173`
- `npm run build`: Builds the project for production in the `/dist` directory.

## Setup

### **Prerequisites**

- Install Node.js

### **Steps**

1. Navigate to the `frontend` directory:
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

4. Open your browser and navigate to the URL shown in the terminal. This will default to `http://localhost:5173`.
