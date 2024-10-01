# Graduation Project - ITI Mean Stack

This repository contains the code for my graduation project developed using the MEAN stack (MongoDB, Express, Angular, Node.js).

## Backend Setup

### Configuration

Before running the backend server, ensure that you have a `config.env` file in the root of the backend folder with the following variables.

```bash
DATABASE=
DATABASE_PASSWORD=
NODE_ENV=development
```

### Installation

You need to install the required packages for both the backend and frontend. Run the following command in both folders:

```bash
cd backend
npm install
```

The backend server runs on **port 3000**. There are two ways to run the server:

1. **Development Mode**:

   ```bash
   npm start
   ```

2. **Production Mode**:
   ```bash
   npm run start:prod
   ```

## Frontend Setup

The frontend application runs on **port 4200**.

### Installation

You need to install the required packages for both the backend and frontend. Run the following command in both folders:

```bash
cd frontend
npm install
```

Start the frontend application with the Angular CLI command:

```bash
ng serve -o
```
