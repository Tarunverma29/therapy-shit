from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from pydantic import BaseModel

router = APIRouter(prefix="/therapists", tags=["therapists"])

class TherapistMock(BaseModel):
    id: int
    name: str
    type: str # 'psychiatrist', 'counselor', 'therapist'
    rating: float
    reviews: int
    pricing: str
    slots: int
    location: str # 'local' or continent/country
    lat: Optional[float] = None
    lng: Optional[float] = None

MOCK_THERAPISTS = [
    TherapistMock(id=1, name="Dr. Emily Chen", type="psychiatrist", rating=4.9, reviews=120, pricing="$150/hr", slots=3, location="local", lat=40.7128, lng=-74.0060),
    TherapistMock(id=2, name="Mark Johnson", type="counselor", rating=4.7, reviews=85, pricing="$90/hr", slots=5, location="local", lat=40.7300, lng=-73.9900),
    TherapistMock(id=3, name="Dr. Sarah Smith", type="therapist", rating=4.8, reviews=200, pricing="$120/hr", slots=1, location="Europe", lat=51.5074, lng=-0.1278),
    TherapistMock(id=4, name="Dr. Akira Tanaka", type="psychiatrist", rating=5.0, reviews=310, pricing="$200/hr", slots=2, location="Asia", lat=35.6895, lng=139.6917),
]

@router.get("/local", response_model=List[TherapistMock])
def get_local_therapists(lat: Optional[float] = None, lng: Optional[float] = None):
    # Mock filtering by local geographic proximity
    return [t for t in MOCK_THERAPISTS if t.location == "local"]

@router.get("/global", response_model=List[TherapistMock])
def get_global_therapists(continent: Optional[str] = None, country: Optional[str] = None):
    # Mock filtering by continent or country
    return [t for t in MOCK_THERAPISTS if t.location not in ["local"]]
