# Employee Profile System

A full-stack web application for managing and viewing employee profiles with skill visualization. Built with FastAPI (Python) backend and React (TypeScript) frontend.


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

## Running with Docker

If you prefer to use Docker, it's much simpler:

### Prerequisites

- Docker installed
- Docker Compose installed

### Start Everything

From the project root directory, run:

```bash
docker-compose up
```

This single command will:

- Build both backend and frontend containers
- Start both services
- Create the network between them
- The backend will be on `http://localhost:8000`
- The frontend will be on `http://localhost:5173`

### Stop Everything

```bash
docker-compose down
```

That's it! No need to install Python, Node.js, or any dependencies manually.

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

## Running the Application (alternative)

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

## Available User Accounts

All sample accounts use the same password: `password123`

1. **Sara Perez** - Senior Data Scientist

   - Email: `sara123@factored.com`
   - Skills: Python, SQL, Machine Learning, Spark, TensorFlow, AWS, Statistics

2. **Mariana Garcia** - Data Engineer

   - Email: `mariana123@factored.com`
   - Skills: Python, SQL, Spark, Airflow, Docker, Kubernetes, GCP

3. **Juana Lopez** - Machine Learning Engineer
   - Email: `juana123@factored.com`
   - Skills: Python, PyTorch, TensorFlow, MLOps, Docker, FastAPI, Java

---

## Docker Deployment

### Prerequisites for Docker

- Docker Desktop installed (includes Docker Compose)
- At least 2GB of free disk space

### Quick Start with Docker

The easiest way to run the entire application is using Docker Compose.

#### Option 1: Using Start Scripts (Recommended)

**Windows:**

```bash
docker-start.bat
```

**Linux/Mac:**

```bash
chmod +x docker-start.sh
./docker-start.sh
```

These scripts will automatically check if Docker is installed and running, then build and start the application.

#### Option 2: Using Makefile (Linux/Mac/Windows with Make)

```bash
make up      # Start services in background
make logs    # View logs
make down    # Stop services
make help    # See all available commands
```

#### Option 3: Manual Docker Compose

**1. Build and start all services:**

```bash
docker-compose up --build
```

This single command will:

- Build the backend container
- Build the frontend container
- Create a network for inter-container communication
- Initialize the database with seed data
- Start both services

**2. Access the application:**

- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:8000`
- **API Documentation:** `http://localhost:8000/docs`

**3. Stop the application:**

```bash
docker-compose down
```

**4. Stop and remove volumes (delete database):**

```bash
docker-compose down -v
```

### Additional Docker Commands

**Run in detached mode (background):**

```bash
docker-compose up -d
```

**View logs:**

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

**Rebuild containers after code changes:**

```bash
docker-compose up --build --force-recreate
```

**Check running containers:**

```bash
docker-compose ps
```

**Access container shell:**

```bash
# Backend
docker exec -it employee-backend sh

# Frontend
docker exec -it employee-frontend sh
```

### Docker Architecture

The application uses a multi-container setup orchestrated by Docker Compose:

#### Backend Container

- **Base Image:** Python 3.13 slim
- **Framework:** FastAPI + Uvicorn server
- **Port:** 8000 (mapped to host 8000)
- **Database:** SQLite with persistent volume
- **Features:**
  - Automatic database seeding on startup
  - Health check endpoint
  - CORS configured for frontend

#### Frontend Container

- **Build Strategy:** Multi-stage build
  - Stage 1: Node.js 20 for building React app
  - Stage 2: Nginx Alpine for serving static files
- **Port:** 80 (mapped to host 3000)
- **Features:**
  - Production-optimized Vite build
  - Nginx with compression and caching
  - React Router support with fallback to index.html
  - Security headers

#### Network

- **Type:** Bridge network (`app-network`)
- **Purpose:** Enables inter-container communication
- **Configuration:** Frontend can reach backend via service name

#### Volumes

- **backend-data:** Persists SQLite database between container restarts

### Environment Variables

You can customize the application by modifying environment variables in `docker-compose.yml`:

**Backend variables:**

```yaml
environment:
  - PYTHONUNBUFFERED=1 # Enable real-time logging
```

**Frontend variables:**

```yaml
environment:
  - VITE_API_URL=http://localhost:8000 # Backend API URL
```

### Troubleshooting Docker

**Port already in use:**

```bash
# Change ports in docker-compose.yml
# For backend: "8001:8000" instead of "8000:8000"
# For frontend: "3001:80" instead of "3000:80"
```

**Database not seeding:**

```bash
# Remove the volume and restart
docker-compose down -v
docker-compose up --build
```

**Cannot connect to backend:**

```bash
# Check if backend is healthy
docker-compose ps
docker-compose logs backend
```

**Frontend shows blank page:**

```bash
# Check nginx logs
docker-compose logs frontend

# Rebuild frontend
docker-compose up --build frontend
```
