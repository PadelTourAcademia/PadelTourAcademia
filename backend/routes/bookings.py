from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from ..models import Booking, BookingCreate, BookingUpdate, BookingStatusUpdate, MessageResponse, BookingStats
from ..database import bookings_crud, tours_crud
import logging

router = APIRouter(prefix="/bookings", tags=["bookings"])
logger = logging.getLogger(__name__)

@router.get("/", response_model=List[Booking])
async def get_bookings(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    status: Optional[str] = None,
    tour_id: Optional[str] = None
):
    """Get all bookings with optional filters"""
    try:
        if status:
            bookings = await bookings_crud.get_by_status(status)
        elif tour_id:
            bookings = await bookings_crud.get_by_tour(tour_id)
        else:
            bookings = await bookings_crud.get_all(skip=skip, limit=limit)
        return bookings
    except Exception as e:
        logger.error(f"Error getting bookings: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/stats", response_model=BookingStats)
async def get_booking_stats():
    """Get booking statistics"""
    try:
        stats = await bookings_crud.get_stats()
        return stats
    except Exception as e:
        logger.error(f"Error getting booking stats: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/{booking_id}", response_model=Booking)
async def get_booking(booking_id: str):
    """Get booking by ID"""
    try:
        booking = await bookings_crud.get_by_id(booking_id)
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        return booking
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting booking {booking_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/", response_model=Booking)
async def create_booking(booking: BookingCreate):
    """Create new booking"""
    try:
        # Validate tour exists
        tour = await tours_crud.get_by_id(booking.tour_id)
        if not tour:
            raise HTTPException(status_code=404, detail="Tour not found")
        
        # Calculate total price
        base_price = float(tour["price"].replace("от ", ""))
        total_price = base_price * booking.participants
        
        booking_data = booking.dict()
        booking_data["total_price"] = total_price
        
        created_booking = await bookings_crud.create(booking_data)
        return created_booking
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating booking: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.put("/{booking_id}", response_model=Booking)
async def update_booking(booking_id: str, booking: BookingUpdate):
    """Update booking"""
    try:
        # Check if booking exists
        existing_booking = await bookings_crud.get_by_id(booking_id)
        if not existing_booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        booking_data = booking.dict(exclude_unset=True)
        
        # Recalculate total price if participants or tour changed
        if "participants" in booking_data or "tour_id" in booking_data:
            tour_id = booking_data.get("tour_id", existing_booking["tour_id"])
            participants = booking_data.get("participants", existing_booking["participants"])
            
            tour = await tours_crud.get_by_id(tour_id)
            if not tour:
                raise HTTPException(status_code=404, detail="Tour not found")
            
            base_price = float(tour["price"].replace("от ", ""))
            booking_data["total_price"] = base_price * participants
        
        updated_booking = await bookings_crud.update(booking_id, booking_data)
        return updated_booking
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating booking {booking_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.put("/{booking_id}/status", response_model=Booking)
async def update_booking_status(booking_id: str, status_update: BookingStatusUpdate):
    """Update booking status"""
    try:
        # Check if booking exists
        existing_booking = await bookings_crud.get_by_id(booking_id)
        if not existing_booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        updated_booking = await bookings_crud.update(booking_id, {"status": status_update.status})
        return updated_booking
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating booking status {booking_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.delete("/{booking_id}", response_model=MessageResponse)
async def delete_booking(booking_id: str):
    """Delete booking"""
    try:
        # Check if booking exists
        existing_booking = await bookings_crud.get_by_id(booking_id)
        if not existing_booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        success = await bookings_crud.delete(booking_id)
        if not success:
            raise HTTPException(status_code=500, detail="Failed to delete booking")
        
        return MessageResponse(message="Booking deleted successfully")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting booking {booking_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")