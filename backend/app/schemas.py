from pydantic import BaseModel, EmailStr
from typing import Optional
from .models import ProfessionType

class UserBase(BaseModel):
    email: EmailStr
    name: str
    mobile: Optional[str] = None
    profession: Optional[ProfessionType] = None

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
