# Employee Profile System

A full-stack web application for managing and viewing employee profiles with skill visualization. Built with FastAPI (Python) backend and React (TypeScript) frontend.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [How It Works](#how-it-works)
- [API Documentation](#api-documentation)
- [Database Structure](#database-structure)
- [Testing the Connection](#testing-the-connection)
- [Available User Accounts](#available-user-accounts)

## Overview

This application provides a simple employee profile management system where users can log in and view detailed employee information including name, position, email, avatar, and a visual representation of their skills using a spider/radar chart.

## Features

- User Login with email and password
- Employee profile page with personal information
- Spider chart showing skill proficiency levels
- Avatar generation using DiceBear API
- Custom 404 error page
- Material-UI modern interface
- SQLite database with SQLAlchemy ORM
- RESTful API with FastAPI

## Technology Stack

### Backend

- **Python 3.13**: Programming language
- **FastAPI**: Modern web framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM
- **SQLite**: Lightweight database
- **Uvicorn**: ASGI server
- **Pydantic**: Data validation using Python type hints

### Frontend

- **React**: JavaScript library for building user interfaces
- **TypeScript**: Typed superset of JavaScript
- **Material-UI (MUI) v7**: React component library
- **React Router**: Declarative routing for React
- **Recharts**: Charting library for React
- **Axios**: HTTP client for API requests
- **Vite**: Build tool and development server

## Project Structure

```
factored-assessment/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── api.py              #FastAPI routes and endpoints
│   │   ├── database.py         #Database configuration
│   │   ├── schemas.py          #Pydantic models for validation
│   │   └── model/
│   │       └── models.py       #SQLAlchemy ORM models
│   ├── main.py                 #Application entry point
│   ├── seed_db.py              #Database seeding script
│   ├── test_connection.py      #Database connection test script
│   ├── requirements.txt        #Python dependencies
│   └── employees.db            #SQLite database (created after seed)
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.tsx       #Login page component
│   │   │   ├── Profile.tsx     #Profile page with spider chart
│   │   │   └── NotFound.tsx    #404 error page
│   │   ├── api.ts              #API client configuration
│   │   ├── types.ts            #TypeScript type definitions
│   │   ├── App.tsx             #Main application with routing
│   │   ├── main.tsx            #Application entry point
│   │   └── index.css           #Global styles
│   ├── package.json            #Node.js dependencies
│   └── index.html              #HTML template
│
└── README.md                   #This file
```

## Installation

### Prerequisites

- Python 3.13 or higher
- Node.js 18 or higher
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Activate the virtual environment:

**Windows PowerShell:**

```powershell
.\env\Scripts\Activate.ps1
```

**Linux/Mac:**

```bash
source env/bin/activate
```

3. Install Python dependencies:

```bash
pip install -r requirements.txt
```

4. Initialize the database with sample data:

```bash
python seed_db.py
```

This will create an `employees.db` file with 3 sample employees, each having 7 skills.

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install Node.js dependencies:

```bash
npm install
```

## Running the Application

You need to run both backend and frontend servers simultaneously.

### Start the Backend Server

Open a terminal and run:

```bash
cd backend
.\env\Scripts\Activate.ps1  #Windows
python main.py
```

The backend server will start on: `http://localhost:8000`

You should see:

```
INFO:     Uvicorn running on http://localhost:8000
INFO:     Application startup complete.
```

### Start the Frontend Server

Open a new terminal and run:

```bash
cd frontend
npm run dev
```

The frontend server will start on: `http://localhost:5173`

You should see:

```
VITE ready in XXX ms
Local: http://localhost:5173/
```

### Access the Application

Open your web browser and navigate to: `http://localhost:5173`

## How It Works

### Application Flow

1. **User Access**: User opens the application in their browser
2. **Login Page**: User sees a Material-UI login form
3. **Authentication**: User enters email and password
4. **Backend Validation**: Frontend sends credentials to backend API
5. **Database Query**: Backend checks credentials against SQLite database
6. **Session Storage**: On success, user ID is stored in localStorage
7. **Redirect**: User is redirected to their profile page
8. **Data Fetching**: Profile page fetches employee data from API
9. **Visualization**: Data is displayed with personal info and spider chart

<!-- ### Architecture

#### Backend Architecture

The backend follows a layered architecture:

**1. Entry Point (main.py)**

- Starts the Uvicorn server
- Loads the FastAPI application
- Enables hot reload for development

**2. API Layer (app/api.py)**

- Defines HTTP endpoints
- Handles request/response logic
- Implements CORS middleware for cross-origin requests
- Routes:
  - `POST /api/login`: Authenticate user
  - `GET /api/employee/{id}`: Get employee by ID
  - `GET /api/employees`: Get all employees

**3. Schema Layer (app/schemas.py)**

- Pydantic models for data validation
- Request/response type definitions
- Ensures type safety and automatic validation

**4. Database Layer (app/database.py)**

- SQLAlchemy engine configuration
- Session management
- Database connection dependency injection

**5. Model Layer (app/model/models.py)**

- SQLAlchemy ORM models
- Database table definitions
- Employee model with all fields

#### Frontend Architecture

The frontend follows a component-based architecture:

**1. Entry Point (main.tsx)**

- Renders the root React component
- Mounts the application to the DOM

**2. App Component (App.tsx)**

- Sets up Material-UI theme
- Configures React Router
- Defines application routes

**3. Pages**

- **Login.tsx**: Handles user authentication
- **Profile.tsx**: Displays employee information and skills chart
- **NotFound.tsx**: Shows 404 error for invalid routes

**4. API Client (api.ts)**

- Axios configuration
- API endpoint functions
- Centralized API communication

**5. Types (types.ts)**

- TypeScript interfaces
- Type definitions for Employee, Login, etc. -->

### Authentication Flow

1. User enters email and password in Login form
2. Frontend validates form inputs
3. Frontend sends POST request to `/api/login`
4. Backend queries database for matching email
5. Backend compares password (plain text for demo)
6. Backend returns user ID, name, and email if valid
7. Frontend stores user ID in localStorage
8. Frontend navigates to `/profile/{id}`
9. Profile page fetches full employee data
10. Data is rendered with Material-UI components

Note: This is a simplified authentication for demonstration. Production systems should use password hashing and JWT tokens.

### Spider Chart Implementation

The spider chart visualizes employee skills using the Recharts library:

1. Employee skills are stored as JSON array in database
2. Backend parses and returns skills as array
3. Frontend transforms skills into chart data format
4. Each skill gets a random proficiency value (80-100)
5. Recharts renders interactive radar chart
6. Chart shows skill names on radial axis
7. Proficiency levels shown on radius axis

## API Documentation

### Interactive Documentation

FastAPI provides automatic interactive API documentation:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### Endpoints

#### POST /api/login

Authenticate a user with email and password.

**Request Body:**

```json
{
	"email": "sara123@factored.com",
	"password": "password123"
}
```

**Response (200 OK):**

```json
{
	"id": 1,
	"name": "Sara Perez",
	"email": "sara123@factored.com",
	"message": "Login successful"
}
```

**Response (401 Unauthorized):**

```json
{
	"detail": "Invalid credentials"
}
```

#### GET /api/employee/{id}

Get employee information by ID.

**Path Parameters:**

- `id` (integer): Employee ID

**Response (200 OK):**

```json
{
	"id": 1,
	"name": "Sara Perez",
	"email": "sara1@factored.com",
	"position": "Senior Data Scientist",
	"avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
	"skills": [
		"Python",
		"SQL",
		"Machine Learning",
		"Spark",
		"TensorFlow",
		"AWS",
		"Statistics"
	]
}
```

**Response (404 Not Found):**

```json
{
	"detail": "Employee not found"
}
```

#### GET /api/employees

Get all employees (for testing/debugging).

**Response (200 OK):**

```json
[
	{
		"id": 1,
		"name": "Sara Perez",
		"email": "sara123@factored.com",
		"position": "Senior Data Scientist",
		"avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
		"skills": [
			"Python",
			"SQL",
			"Machine Learning",
			"Spark",
			"TensorFlow",
			"AWS",
			"Statistics"
		]
	}
]
```

## Database Structure

### Employee Table

The database uses SQLite with a single `employees` table:

| Column   | Type    | Description                    |
| -------- | ------- | ------------------------------ |
| id       | INTEGER | Primary key, auto-increment    |
| name     | VARCHAR | Employee full name             |
| email    | VARCHAR | Employee email (unique)        |
| password | VARCHAR | Password (plain text for demo) |
| avatar   | VARCHAR | URL to avatar image            |
| position | VARCHAR | Job title/position             |
| skills   | JSON    | Array of skill strings         |

### Sample Data

The database is seeded with 3 employees:

1. Sara Perez - Senior Data Scientist (7 skills)
2. Mariana Garcia - Data Engineer (7 skills)
3. Juana Lopez - Machine Learning Engineer (7 skills)

Each employee has at least 5 skills as required, with all having 7 skills.

## Testing the Connection

To verify the database connection is working:

```bash
cd backend
python test_connection.py
```

This script will:

1. Verify SQLAlchemy engine creation
2. Test database connection
3. Check if tables exist
4. Query and display employee data
5. Show table structure

Expected output:

```
[OK] Engine created: sqlite:///./employees.db
[OK] Connection successful!
[OK] Tables found: employees
[OK] Found 3 employee(s)
```
