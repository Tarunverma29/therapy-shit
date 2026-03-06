from sqlalchemy import Column, Integer, String, Boolean, Enum
import enum
from .database import Base

class ProfessionType(enum.Enum):
    THERAPIST = "therapist"
    PSYCHIATRIST = "psychiatrist"
    COUNSELOR = "counselor"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    mobile = Column(String, nullable=True)
    profession = Column(Enum(ProfessionType), nullable=True)
    is_active = Column(Boolean, default=True)
