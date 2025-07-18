from fastapi import APIRouter, HTTPException
from ..models import CompanySettings, CompanySettingsUpdate
from ..database import settings_crud
import logging

router = APIRouter(prefix="/settings", tags=["settings"])
logger = logging.getLogger(__name__)

@router.get("/", response_model=CompanySettings)
async def get_company_settings():
    """Get company settings"""
    try:
        settings = await settings_crud.get_settings()
        if not settings:
            # Return default settings if none exist
            default_settings = {
                "name": "Padel Tour Academia",
                "tagline": "Твоя премиум неделя Pádel на лучших курортах Испании",
                "description": "Добро пожаловать в Pádel Tour Academia — уникальное сочетание тренировок с профессионалами, уютного отдыха и незабываемых эмоций!",
                "email": "padeltouracademia@gmail.com",
                "phone": "+34 123 456 789",
                "location": "Santa Cruz de Tenerife, España",
                "social_links": {
                    "telegram": "https://t.me/padeltouracademia",
                    "whatsapp": "https://wa.me/34123456789",
                    "instagram": "https://instagram.com/padeltouracademia"
                }
            }
            settings = await settings_crud.update_settings(default_settings)
        return settings
    except Exception as e:
        logger.error(f"Error getting company settings: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.put("/", response_model=CompanySettings)
async def update_company_settings(settings: CompanySettingsUpdate):
    """Update company settings"""
    try:
        settings_data = settings.dict(exclude_unset=True)
        updated_settings = await settings_crud.update_settings(settings_data)
        return updated_settings
    except Exception as e:
        logger.error(f"Error updating company settings: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")