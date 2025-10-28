"""
Script to verify the connection to the database
"""
from app.database import SessionLocal, engine
from app.model.models import Employee
from sqlalchemy import inspect, text
import json

def test_database_connection():
    print("=" * 60)
    print("VERIFY DATABASE CONNECTION")
    print("=" * 60)
    
    #1. Verify that the engine exists
    print("\n1. Verifying SQLAlchemy engine...")
    try:
        print(f"   [OK] Engine created: {engine.url}")
    except Exception as e:
        print(f"   [ERROR] Error with engine: {e}")
        return
    
    #2. Verify connection
    print("\n2. Testing database connection...")
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            print(f"   [OK] Connection successful!")
    except Exception as e:
        print(f"   [ERROR] Error with connection: {e}")
        return
    
    #3. Verify that the tables exist
    print("\n3. Verifying tables in the database...")
    try:
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        if tables:
            print(f"   [OK] Tables found: {', '.join(tables)}")
        else:
            print(f"   [WARNING] No tables found")
    except Exception as e:
        print(f"   [ERROR] Error verifying tables: {e}")
    
    #4. Verify that there are data
    print("\n4. Consulting employee data...")
    db = SessionLocal()
    try:
        employees = db.query(Employee).all()
        
        if not employees:
            print("   [WARNING] No employees in the database")
            print("   --> Run: python seed_db.py")
        else:
            print(f"   [OK] Found {len(employees)} employee(s):\n")
            
            for emp in employees:
                skills = json.loads(emp.skills) if isinstance(emp.skills, str) else emp.skills
                print(f"   ID: {emp.id}")
                print(f"   Name: {emp.name}")
                print(f"   Email: {emp.email}")
                print(f"   Position: {emp.position}")
                print(f"   Avatar: {emp.avatar}")
                print(f"   Skills ({len(skills)}): {', '.join(skills)}")
                print(f"   Password: {'*' * len(emp.password)}")
                print()
    
    except Exception as e:
        print(f"   [ERROR] Error consulting data: {e}")
    finally:
        db.close()
    
    #5. Verify table structure
    print("\n5. Verifying table structure of 'employees'...")
    try:
        inspector = inspect(engine)
        columns = inspector.get_columns('employees')
        print(f"   [OK] Columns of the table:")
        for col in columns:
            print(f"      - {col['name']}: {col['type']}")
    except Exception as e:
        print(f"   [ERROR] Error: {e}")
    
    print("\n" + "=" * 60)
    print("VERIFICATION COMPLETED")
    print("=" * 60)
    print("\nIf everything is [OK], your database is working correctly!")
    print("\nTo test the API, run:")
    print("  1. python main.py")
    print("  2. Open: http://localhost:8000/docs")
    print("  3. Test the endpoint: GET /api/employees")
    print()

if __name__ == "__main__":
    test_database_connection()

