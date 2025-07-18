from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from ..models import Tour, TourCreate, TourUpdate, MessageResponse
from ..database import tours_crud
import logging

router = APIRouter(prefix="/tours", tags=["tours"])
logger = logging.getLogger(__name__)

@router.get("/", response_model=List[Tour])
async def get_tours(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    level: Optional[str] = None
):
    """Get all tours with optional level filter"""
    try:
        if level:
            tours = await tours_crud.get_by_level(level)
        else:
            tours = await tours_crud.get_all(skip=skip, limit=limit)
        return tours
    except Exception as e:
        logger.error(f"Error getting tours: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/{tour_id}", response_model=Tour)
async def get_tour(tour_id: str):
    """Get tour by ID"""
    try:
        tour = await tours_crud.get_by_id(tour_id)
        if not tour:
            raise HTTPException(status_code=404, detail="Tour not found")
        return tour
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting tour {tour_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/", response_model=Tour)
async def create_tour(tour: TourCreate):
    """Create new tour"""
    try:
        tour_data = tour.dict()
        created_tour = await tours_crud.create(tour_data)
        return created_tour
    except Exception as e:
        logger.error(f"Error creating tour: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.put("/{tour_id}", response_model=Tour)
async def update_tour(tour_id: str, tour: TourUpdate):
    """Update tour"""
    try:
        # Check if tour exists
        existing_tour = await tours_crud.get_by_id(tour_id)
        if not existing_tour:
            raise HTTPException(status_code=404, detail="Tour not found")
        
        tour_data = tour.dict(exclude_unset=True)
        updated_tour = await tours_crud.update(tour_id, tour_data)
        return updated_tour
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating tour {tour_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.delete("/{tour_id}", response_model=MessageResponse)
async def delete_tour(tour_id: str):
    """Delete tour"""
    try:
        # Check if tour exists
        existing_tour = await tours_crud.get_by_id(tour_id)
        if not existing_tour:
            raise HTTPException(status_code=404, detail="Tour not found")
        
        # TODO: Check if tour has bookings before deletion
        
        success = await tours_crud.delete(tour_id)
        if not success:
            raise HTTPException(status_code=500, detail="Failed to delete tour")
        
        return MessageResponse(message="Tour deleted successfully")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting tour {tour_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")