from fastapi import APIRouter, HTTPException, Query
from typing import List
from ..models import Testimonial, TestimonialCreate, TestimonialUpdate, MessageResponse
from ..database import testimonials_crud
import logging

router = APIRouter(prefix="/testimonials", tags=["testimonials"])
logger = logging.getLogger(__name__)

@router.get("/", response_model=List[Testimonial])
async def get_testimonials(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    approved_only: bool = Query(True, description="Get only approved testimonials")
):
    """Get all testimonials"""
    try:
        if approved_only:
            testimonials = await testimonials_crud.get_approved()
        else:
            testimonials = await testimonials_crud.get_all(skip=skip, limit=limit)
        return testimonials
    except Exception as e:
        logger.error(f"Error getting testimonials: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/{testimonial_id}", response_model=Testimonial)
async def get_testimonial(testimonial_id: str):
    """Get testimonial by ID"""
    try:
        testimonial = await testimonials_crud.get_by_id(testimonial_id)
        if not testimonial:
            raise HTTPException(status_code=404, detail="Testimonial not found")
        return testimonial
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting testimonial {testimonial_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/", response_model=Testimonial)
async def create_testimonial(testimonial: TestimonialCreate):
    """Create new testimonial"""
    try:
        testimonial_data = testimonial.dict()
        # New testimonials need approval by default
        testimonial_data["approved"] = False
        created_testimonial = await testimonials_crud.create(testimonial_data)
        return created_testimonial
    except Exception as e:
        logger.error(f"Error creating testimonial: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.put("/{testimonial_id}", response_model=Testimonial)
async def update_testimonial(testimonial_id: str, testimonial: TestimonialUpdate):
    """Update testimonial"""
    try:
        # Check if testimonial exists
        existing_testimonial = await testimonials_crud.get_by_id(testimonial_id)
        if not existing_testimonial:
            raise HTTPException(status_code=404, detail="Testimonial not found")
        
        testimonial_data = testimonial.dict(exclude_unset=True)
        updated_testimonial = await testimonials_crud.update(testimonial_id, testimonial_data)
        return updated_testimonial
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating testimonial {testimonial_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.delete("/{testimonial_id}", response_model=MessageResponse)
async def delete_testimonial(testimonial_id: str):
    """Delete testimonial"""
    try:
        # Check if testimonial exists
        existing_testimonial = await testimonials_crud.get_by_id(testimonial_id)
        if not existing_testimonial:
            raise HTTPException(status_code=404, detail="Testimonial not found")
        
        success = await testimonials_crud.delete(testimonial_id)
        if not success:
            raise HTTPException(status_code=500, detail="Failed to delete testimonial")
        
        return MessageResponse(message="Testimonial deleted successfully")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting testimonial {testimonial_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")