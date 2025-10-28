from sqlalchemy import Column, Integer, String, JSON
from ..database import Base

class Employee(Base):
    __tablename__ = "employees"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    avatar = Column(String, index=True)
    position = Column(String, index=True)
    skills = Column(JSON) #JSON is a list of strings, used because of practicality and ease of use