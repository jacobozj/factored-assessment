"""
Seed script to populate the database with sample employee data
Run this script once to create initial data
"""
import json
from app.database import SessionLocal, engine, Base
from app.model.models import Employee

# Create tables
Base.metadata.create_all(bind=engine)

def seed_data():
    db = SessionLocal()
    
    # Check if data already exists
    existing = db.query(Employee).first()
    if existing:
        print("Database already contains data. Skipping seed.")
        db.close()
        return
    
    # Sample employees with at least 5 skills each
    employees = [
        {
            "name": "Sara Perez",
            "email": "sara123@factored.com",
            "password": "password123",
            "avatar": "https://api.dicebear.com/9.x/avataaars/svg?seed=Felix",
            "position": "Senior Data Scientist",
            "skills": json.dumps(["Python", "SQL", "Machine Learning", "Spark", "TensorFlow", "AWS", "Statistics"])
        },
        {
            "name": "Mariana Garcia",
            "email": "mariana123@factored.com",
            "password": "password123",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
            "position": "Data Engineer",
            "skills": json.dumps(["Python", "SQL", "Spark", "Airflow", "Docker", "Kubernetes", "GCP"])
        },
        {
            "name": "Juana Lopez",
            "email": "juana123@factored.com",
            "password": "password123",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
            "position": "Machine Learning Engineer",
            "skills": json.dumps(["Python", "PyTorch", "TensorFlow", "MLOps", "Docker", "FastAPI", "Java"])
        }
    ]
    
    # Add employees to database
    for emp_data in employees:
        employee = Employee(**emp_data)
        db.add(employee)
    
    db.commit()
    print(f"Successfully seeded {len(employees)} employees to the database!")
    print("\nSample login credentials:")
    for emp_data in employees:
        print(f"  Email: {emp_data['email']} | Password: {emp_data['password']}")
    
    db.close()

if __name__ == "__main__":
    seed_data()

