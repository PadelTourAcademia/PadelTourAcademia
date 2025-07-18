from fastapi import APIRouter, HTTPException, Query
from typing import List
from ..models import ContactMessage, ContactCreate, MessageResponse
from ..database import contacts_crud
import logging

router = APIRouter(prefix="/contact", tags=["contact"])
logger = logging.getLogger(__name__)

@router.post("/", response_model=MessageResponse)
async def create_contact_message(contact: ContactCreate):
    """Create new contact message"""
    try:
        contact_data = contact.dict()
        await contacts_crud.create(contact_data)
        return MessageResponse(message="Message sent successfully")
    except Exception as e:
        logger.error(f"Error creating contact message: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/", response_model=List[ContactMessage])
async def get_contact_messages(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    unread_only: bool = Query(False, description="Get only unread messages")
):
    """Get all contact messages (admin only)"""
    try:
        if unread_only:
            messages = await contacts_crud.get_unread()
        else:
            messages = await contacts_crud.get_all(skip=skip, limit=limit)
        return messages
    except Exception as e:
        logger.error(f"Error getting contact messages: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/{message_id}", response_model=ContactMessage)
async def get_contact_message(message_id: str):
    """Get contact message by ID"""
    try:
        message = await contacts_crud.get_by_id(message_id)
        if not message:
            raise HTTPException(status_code=404, detail="Message not found")
        return message
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting contact message {message_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.put("/{message_id}/read", response_model=MessageResponse)
async def mark_message_as_read(message_id: str):
    """Mark message as read"""
    try:
        # Check if message exists
        existing_message = await contacts_crud.get_by_id(message_id)
        if not existing_message:
            raise HTTPException(status_code=404, detail="Message not found")
        
        success = await contacts_crud.mark_as_read(message_id)
        if not success:
            raise HTTPException(status_code=500, detail="Failed to mark message as read")
        
        return MessageResponse(message="Message marked as read")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error marking message as read {message_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.delete("/{message_id}", response_model=MessageResponse)
async def delete_contact_message(message_id: str):
    """Delete contact message"""
    try:
        # Check if message exists
        existing_message = await contacts_crud.get_by_id(message_id)
        if not existing_message:
            raise HTTPException(status_code=404, detail="Message not found")
        
        success = await contacts_crud.delete(message_id)
        if not success:
            raise HTTPException(status_code=500, detail="Failed to delete message")
        
        return MessageResponse(message="Message deleted successfully")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting contact message {message_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")