from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from ..models import GalleryItem, GalleryItemCreate, GalleryItemUpdate, MessageResponse
from ..database import gallery_crud
import logging

router = APIRouter(prefix="/gallery", tags=["gallery"])
logger = logging.getLogger(__name__)

@router.get("/", response_model=List[GalleryItem])
async def get_gallery_items(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    category: Optional[str] = None
):
    """Get all gallery items with optional category filter"""
    try:
        if category:
            items = await gallery_crud.get_by_category(category)
        else:
            items = await gallery_crud.get_all(skip=skip, limit=limit)
        return items
    except Exception as e:
        logger.error(f"Error getting gallery items: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/{item_id}", response_model=GalleryItem)
async def get_gallery_item(item_id: str):
    """Get gallery item by ID"""
    try:
        item = await gallery_crud.get_by_id(item_id)
        if not item:
            raise HTTPException(status_code=404, detail="Gallery item not found")
        return item
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting gallery item {item_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/", response_model=GalleryItem)
async def create_gallery_item(item: GalleryItemCreate):
    """Create new gallery item"""
    try:
        item_data = item.dict()
        created_item = await gallery_crud.create(item_data)
        return created_item
    except Exception as e:
        logger.error(f"Error creating gallery item: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.put("/{item_id}", response_model=GalleryItem)
async def update_gallery_item(item_id: str, item: GalleryItemUpdate):
    """Update gallery item"""
    try:
        # Check if item exists
        existing_item = await gallery_crud.get_by_id(item_id)
        if not existing_item:
            raise HTTPException(status_code=404, detail="Gallery item not found")
        
        item_data = item.dict(exclude_unset=True)
        updated_item = await gallery_crud.update(item_id, item_data)
        return updated_item
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating gallery item {item_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.delete("/{item_id}", response_model=MessageResponse)
async def delete_gallery_item(item_id: str):
    """Delete gallery item"""
    try:
        # Check if item exists
        existing_item = await gallery_crud.get_by_id(item_id)
        if not existing_item:
            raise HTTPException(status_code=404, detail="Gallery item not found")
        
        success = await gallery_crud.delete(item_id)
        if not success:
            raise HTTPException(status_code=500, detail="Failed to delete gallery item")
        
        return MessageResponse(message="Gallery item deleted successfully")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting gallery item {item_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")