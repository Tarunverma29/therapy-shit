from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional
from .models import ProfessionType


class UserBase(BaseModel):
    email: EmailStr
    name: str
    mobile: Optional[str] = None
    profession: Optional[ProfessionType] = None


class UserCreate(UserBase):
    password: str

    @field_validator("profession", mode="before")
    @classmethod
    def empty_string_to_none(cls, v):
        # Frontend sends "" when no profession selected - convert to None
        if v == "" or v is None:
            return None
        return v


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
