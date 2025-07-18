from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum
import uuid

# Enums
class TourLevel(str, Enum):
    BEGINNER = "начинающие"
    INTERMEDIATE = "любители"
    ADVANCED = "продвинутые"
    BEGINNER_INTERMEDIATE = "начинающие-любители"
    INTERMEDIATE_ADVANCED = "любители-продвинутые"

class BookingStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"

class GalleryCategory(str, Enum):
    ACCOMMODATION = "accommodation"
    TRAINING = "training"
    LANDSCAPE = "landscape"

# Base Models
class BaseDBModel(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Tour Models
class TourBase(BaseModel):
    title: str
    subtitle: str
    dates: str
    level: TourLevel
    accommodation: str
    price: str
    currency: str = "Euro"
    description: str
    image: str
    features: List[str]
    group_size: str

class TourCreate(TourBase):
    pass

class TourUpdate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    dates: Optional[str] = None
    level: Optional[TourLevel] = None
    accommodation: Optional[str] = None
    price: Optional[str] = None
    currency: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    features: Optional[List[str]] = None
    group_size: Optional[str] = None

class Tour(TourBase, BaseDBModel):
    pass

# Coach Models
class CoachBase(BaseModel):
    name: str
    title: str
    experience: str
    description: str
    image: str
    specializations: List[str] = []

class CoachCreate(CoachBase):
    pass

class CoachUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    experience: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    specializations: Optional[List[str]] = None

class Coach(CoachBase, BaseDBModel):
    pass

# Testimonial Models
class TestimonialBase(BaseModel):
    name: str
    role: str
    content: str
    rating: int = Field(ge=1, le=5)
    image: str
    approved: bool = True

class TestimonialCreate(TestimonialBase):
    pass

class TestimonialUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    content: Optional[str] = None
    rating: Optional[int] = Field(None, ge=1, le=5)
    image: Optional[str] = None
    approved: Optional[bool] = None

class Testimonial(TestimonialBase, BaseDBModel):
    pass

# Gallery Models
class GalleryItemBase(BaseModel):
    image: str
    title: str
    category: GalleryCategory

class GalleryItemCreate(GalleryItemBase):
    pass

class GalleryItemUpdate(BaseModel):
    image: Optional[str] = None
    title: Optional[str] = None
    category: Optional[GalleryCategory] = None

class GalleryItem(GalleryItemBase, BaseDBModel):
    pass

# Booking Models
class BookingBase(BaseModel):
    tour_id: str
    first_name: str
    last_name: str
    email: str
    phone: str
    country: str
    participants: int = Field(ge=1, le=10)
    special_requests: str = ""
    total_price: float = 0.0

class BookingCreate(BookingBase):
    pass

class BookingUpdate(BaseModel):
    tour_id: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    country: Optional[str] = None
    participants: Optional[int] = Field(None, ge=1, le=10)
    special_requests: Optional[str] = None
    total_price: Optional[float] = None

class BookingStatusUpdate(BaseModel):
    status: BookingStatus

class Booking(BookingBase, BaseDBModel):
    status: BookingStatus = BookingStatus.PENDING

# Contact Models
class ContactBase(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    subject: str
    message: str

class ContactCreate(ContactBase):
    pass

class ContactMessage(ContactBase, BaseDBModel):
    read: bool = False

# Company Settings Models
class SocialLinks(BaseModel):
    telegram: str
    whatsapp: str
    instagram: str

class CompanySettingsBase(BaseModel):
    name: str
    tagline: str
    description: str
    email: str
    phone: str
    location: str
    social_links: SocialLinks

class CompanySettingsUpdate(BaseModel):
    name: Optional[str] = None
    tagline: Optional[str] = None
    description: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    social_links: Optional[SocialLinks] = None

class CompanySettings(CompanySettingsBase, BaseDBModel):
    pass

# Response Models
class MessageResponse(BaseModel):
    message: str

class ListResponse(BaseModel):
    items: List[Any]
    total: int
    page: int = 1
    per_page: int = 50

# Statistics Models
class BookingStats(BaseModel):
    total_bookings: int
    pending_bookings: int
    confirmed_bookings: int
    cancelled_bookings: int

class DashboardStats(BaseModel):
    total_tours: int
    total_coaches: int
    total_testimonials: int
    total_gallery_items: int
    booking_stats: BookingStats