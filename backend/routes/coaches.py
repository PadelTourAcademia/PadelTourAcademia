from fastapi import APIRouter, HTTPException, Query
from typing import List
from ..models import Coach, CoachCreate, CoachUpdate, MessageResponse
from ..database import coaches_crud
import logging

router = APIRouter(prefix="/coaches", tags=["coaches"])
logger = logging.getLogger(__name__)

@router.get("/", response_model=List[Coach])
async def get_coaches(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100)
):
    """Get all coaches"""
    try:
        coaches = await coaches_crud.get_all(skip=skip, limit=limit)
        return coaches
    except Exception as e:
        logger.error(f"Error getting coaches: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/{coach_id}", response_model=Coach)
async def get_coach(coach_id: str):
    """Get coach by ID"""
    try:
        coach = await coaches_crud.get_by_id(coach_id)
        if not coach:
            raise HTTPException(status_code=404, detail="Coach not found")
        return coach
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting coach {coach_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/", response_model=Coach)
async def create_coach(coach: CoachCreate):
    """Create new coach"""
    try:
        coach_data = coach.dict()
        created_coach = await coaches_crud.create(coach_data)
        return created_coach
    except Exception as e:
        logger.error(f"Error creating coach: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.put("/{coach_id}", response_model=Coach)
async def update_coach(coach_id: str, coach: CoachUpdate):
    """Update coach"""
    try:
        # Check if coach exists
        existing_coach = await coaches_crud.get_by_id(coach_id)
        if not existing_coach:
            raise HTTPException(status_code=404, detail="Coach not found")
        
        coach_data = coach.dict(exclude_unset=True)
        updated_coach = await coaches_crud.update(coach_id, coach_data)
        return updated_coach
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating coach {coach_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.delete("/{coach_id}", response_model=MessageResponse)
async def delete_coach(coach_id: str):
    """Delete coach"""
    try:
        # Check if coach exists
        existing_coach = await coaches_crud.get_by_id(coach_id)
        if not existing_coach:
            raise HTTPException(status_code=404, detail="Coach not found")
        
        success = await coaches_crud.delete(coach_id)
        if not success:
            raise HTTPException(status_code=500, detail="Failed to delete coach")
        
        return MessageResponse(message="Coach deleted successfully")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting coach {coach_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")