from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional, List, Dict, Any
import os
import uuid
from datetime import datetime

class Database:
    client: Optional[AsyncIOMotorClient] = None
    db = None

# Database connection
def get_database() -> AsyncIOMotorClient:
    return Database.db

async def connect_to_mongo():
    """Create database connection"""
    Database.client = AsyncIOMotorClient(os.environ['MONGO_URL'])
    Database.db = Database.client[os.environ['DB_NAME']]
    print("Connected to MongoDB")

async def close_mongo_connection():
    """Close database connection"""
    if Database.client:
        Database.client.close()
        print("Disconnected from MongoDB")

# Base CRUD operations
class BaseCRUD:
    def __init__(self, collection_name: str):
        self.collection_name = collection_name
        
    @property
    def collection(self):
        return get_database()[self.collection_name]
    
    async def create(self, data: dict) -> dict:
        """Create a new document"""
        data['created_at'] = datetime.utcnow()
        data['updated_at'] = datetime.utcnow()
        result = await self.collection.insert_one(data)
        created_doc = await self.collection.find_one({"_id": result.inserted_id})
        created_doc['id'] = str(created_doc['_id'])
        del created_doc['_id']
        return created_doc
    
    async def get_by_id(self, id: str) -> Optional[dict]:
        """Get document by ID"""
        doc = await self.collection.find_one({"id": id})
        if doc:
            doc['id'] = str(doc['_id']) if 'id' not in doc else doc['id']
            if '_id' in doc:
                del doc['_id']
        return doc
    
    async def get_all(self, skip: int = 0, limit: int = 100, filters: dict = None) -> List[dict]:
        """Get all documents with optional filters"""
        query = filters or {}
        cursor = self.collection.find(query).skip(skip).limit(limit)
        docs = await cursor.to_list(length=limit)
        for doc in docs:
            doc['id'] = str(doc['_id']) if 'id' not in doc else doc['id']
            if '_id' in doc:
                del doc['_id']
        return docs
    
    async def update(self, id: str, data: dict) -> Optional[dict]:
        """Update document by ID"""
        data['updated_at'] = datetime.utcnow()
        # Remove None values
        data = {k: v for k, v in data.items() if v is not None}
        
        result = await self.collection.update_one(
            {"id": id},
            {"$set": data}
        )
        
        if result.matched_count:
            return await self.get_by_id(id)
        return None
    
    async def delete(self, id: str) -> bool:
        """Delete document by ID"""
        result = await self.collection.delete_one({"id": id})
        return result.deleted_count > 0
    
    async def count(self, filters: dict = None) -> int:
        """Count documents with optional filters"""
        query = filters or {}
        return await self.collection.count_documents(query)

# Specific CRUD classes
class TourCRUD(BaseCRUD):
    def __init__(self):
        super().__init__("tours")
    
    async def get_by_level(self, level: str) -> List[dict]:
        """Get tours by level"""
        return await self.get_all(filters={"level": level})

class CoachCRUD(BaseCRUD):
    def __init__(self):
        super().__init__("coaches")

class TestimonialCRUD(BaseCRUD):
    def __init__(self):
        super().__init__("testimonials")
    
    async def get_approved(self) -> List[dict]:
        """Get approved testimonials only"""
        return await self.get_all(filters={"approved": True})

class GalleryCRUD(BaseCRUD):
    def __init__(self):
        super().__init__("gallery")
    
    async def get_by_category(self, category: str) -> List[dict]:
        """Get gallery items by category"""
        return await self.get_all(filters={"category": category})

class BookingCRUD(BaseCRUD):
    def __init__(self):
        super().__init__("bookings")
    
    async def get_by_status(self, status: str) -> List[dict]:
        """Get bookings by status"""
        return await self.get_all(filters={"status": status})
    
    async def get_by_tour(self, tour_id: str) -> List[dict]:
        """Get bookings for specific tour"""
        return await self.get_all(filters={"tour_id": tour_id})
    
    async def get_stats(self) -> dict:
        """Get booking statistics"""
        pipeline = [
            {
                "$group": {
                    "_id": "$status",
                    "count": {"$sum": 1}
                }
            }
        ]
        
        cursor = self.collection.aggregate(pipeline)
        results = await cursor.to_list(length=None)
        
        stats = {
            "total_bookings": 0,
            "pending_bookings": 0,
            "confirmed_bookings": 0,
            "cancelled_bookings": 0
        }
        
        for result in results:
            status = result["_id"]
            count = result["count"]
            stats["total_bookings"] += count
            if status == "pending":
                stats["pending_bookings"] = count
            elif status == "confirmed":
                stats["confirmed_bookings"] = count
            elif status == "cancelled":
                stats["cancelled_bookings"] = count
        
        return stats

class ContactCRUD(BaseCRUD):
    def __init__(self):
        super().__init__("contacts")
    
    async def get_unread(self) -> List[dict]:
        """Get unread contact messages"""
        return await self.get_all(filters={"read": False})
    
    async def mark_as_read(self, id: str) -> bool:
        """Mark message as read"""
        result = await self.collection.update_one(
            {"id": id},
            {"$set": {"read": True, "updated_at": datetime.utcnow()}}
        )
        return result.matched_count > 0

class SettingsCRUD(BaseCRUD):
    def __init__(self):
        super().__init__("settings")
    
    async def get_settings(self) -> Optional[dict]:
        """Get company settings (should be only one document)"""
        settings = await self.collection.find_one()
        if settings:
            settings['id'] = str(settings['_id']) if 'id' not in settings else settings['id']
            if '_id' in settings:
                del settings['_id']
        return settings
    
    async def update_settings(self, data: dict) -> dict:
        """Update or create company settings"""
        data['updated_at'] = datetime.utcnow()
        
        # Remove None values
        data = {k: v for k, v in data.items() if v is not None}
        
        existing = await self.get_settings()
        if existing:
            await self.collection.update_one(
                {"id": existing["id"]},
                {"$set": data}
            )
            return await self.get_settings()
        else:
            # Create new settings
            data['id'] = str(uuid.uuid4())
            data['created_at'] = datetime.utcnow()
            return await self.create(data)

# Initialize CRUD instances
tours_crud = TourCRUD()
coaches_crud = CoachCRUD()
testimonials_crud = TestimonialCRUD()
gallery_crud = GalleryCRUD()
bookings_crud = BookingCRUD()
contacts_crud = ContactCRUD()
settings_crud = SettingsCRUD()