from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
import logging
from pathlib import Path
from dotenv import load_dotenv

# Import database functions
from database import connect_to_mongo, close_mongo_connection

# Import route modules
from routes import tours, coaches, testimonials, gallery, bookings, contact, settings
from data_seeder import seed_database

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Lifespan manager for startup and shutdown events
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting up...")
    await connect_to_mongo()
    
    # Seed database with initial data
    try:
        await seed_database()
    except Exception as e:
        logger.warning(f"Database seeding failed: {e}")
    
    yield
    
    # Shutdown
    logger.info("Shutting down...")
    await close_mongo_connection()

# Create FastAPI app
app = FastAPI(
    title="Padel Tour Academia API",
    description="API for Padel Tour Academia booking system",
    version="1.0.0",
    lifespan=lifespan
)

# Create API router
api_router = APIRouter(prefix="/api")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Padel Tour Academia API is running"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Padel Tour Academia API"}

# Include route modules
api_router.include_router(tours.router)
api_router.include_router(coaches.router)
api_router.include_router(testimonials.router)
api_router.include_router(gallery.router)
api_router.include_router(bookings.router)
api_router.include_router(contact.router)
api_router.include_router(settings.router)

# Include the API router in the main app
app.include_router(api_router)

# Error handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return {"error": "Not found", "message": "The requested resource was not found"}

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    logger.error(f"Internal server error: {exc}")
    return {"error": "Internal server error", "message": "Something went wrong"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)