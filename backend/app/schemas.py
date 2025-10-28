from pydantic import BaseModel
from typing import List, Optional


class EmployeeBase(BaseModel):
    name: str
    email: str
    position: str
    avatar: str
    skills: List[str]


class EmployeeCreate(EmployeeBase):
    password: str


class EmployeeResponse(EmployeeBase):
    id: int

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    email: str
    password: str


class LoginResponse(BaseModel):
    id: int
    name: str
    email: str
    message: str

