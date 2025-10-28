from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import engine, Base, get_db
from .model.models import Employee
from .schemas import EmployeeResponse, LoginRequest, LoginResponse
import json

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",
    "localhost:5173",
    "http://localhost:3000",
    "localhost:3000",
    "http://frontend",
    "http://frontend:80"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to the Employee Profile API."}


@app.post("/api/login", response_model=LoginResponse, tags=["auth"])
async def login(credentials: LoginRequest, db: Session = Depends(get_db)):
    """Simple login endpoint - checks email and password"""
    employee = db.query(Employee).filter(Employee.email == credentials.email).first()
    print(db.query(Employee).all())
    if not employee:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if employee.password != credentials.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return LoginResponse(
        id=employee.id,
        name=employee.name,
        email=employee.email,
        message="Login successful"
    )


@app.get("/api/employee/{employee_id}", response_model=EmployeeResponse, tags=["employees"])
async def get_employee(employee_id: int, db: Session = Depends(get_db)):
    """Get employee profile by ID"""
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    #Parse skills from JSON string to list
    skills = json.loads(employee.skills) if isinstance(employee.skills, str) else employee.skills
    
    return EmployeeResponse(
        id=employee.id,
        name=employee.name,
        email=employee.email,
        position=employee.position,
        avatar=employee.avatar,
        skills=skills
    )


@app.get("/api/employees", tags=["employees"])
async def get_all_employees(db: Session = Depends(get_db)):
    """Get all employees (for testing/debugging)"""
    employees = db.query(Employee).all()
    result = []
    for emp in employees:
        skills = json.loads(emp.skills) if isinstance(emp.skills, str) else emp.skills
        result.append({
            "id": emp.id,
            "name": emp.name,
            "email": emp.email,
            "position": emp.position,
            "avatar": emp.avatar,
            "skills": skills
        })
    return result