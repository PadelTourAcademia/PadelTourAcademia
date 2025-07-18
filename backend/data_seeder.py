"""
Data seeder to populate the database with initial data from mock.js
"""
import asyncio
from database import (
    tours_crud, coaches_crud, testimonials_crud, 
    gallery_crud, settings_crud, connect_to_mongo
)
import logging

logger = logging.getLogger(__name__)

# Tours data
TOURS_DATA = [
    {
        "id": "1",
        "title": "Начни с нуля",
        "subtitle": "Тенерифе, Испания",
        "dates": "04.06.25 - 11.06.25",
        "level": "начинающие-любители",
        "accommodation": "Abama Hotels ★★★★★",
        "price": "от 1900",
        "currency": "Euro",
        "description": "Идеально для тех, кто только открывает для себя падель. Узнайте основы техники и тактики с нашими тренерами",
        "image": "https://images.unsplash.com/photo-1689942963385-f5bd03f3b270?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxwYWRlbCUyMGNvdXJ0fGVufDB8fHx8MTc1Mjg0MjA2OXww&ixlib=rb-4.1.0&q=85",
        "features": ["Ежедневные тренировки", "Проживание 5★", "Культурная программа", "Профессиональные тренеры"],
        "group_size": "8-12 человек"
    },
    {
        "id": "2",
        "title": "Повышай уровень",
        "subtitle": "Тенерифе, Испания",
        "dates": "11.06.25 - 18.06.25",
        "level": "любители-продвинутые",
        "accommodation": "Abama Hotels ★★★★★",
        "price": "от 1900",
        "currency": "Euro",
        "description": "Для игроков среднего уровня. Работайте над техникой, улучшайте удары и развивайте стратегическое мышление.",
        "image": "https://images.unsplash.com/photo-1673253408773-5b620b1d6b8f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxwYWRlbCUyMGNvdXJ0fGVufDB8fHx8MTc1Mjg0MjA2OXww&ixlib=rb-4.1.0&q=85",
        "features": ["Интенсивные тренировки", "Тактическое мышление", "Улучшение техники", "Турнирная игра"],
        "group_size": "8-12 человек"
    },
    {
        "id": "3",
        "title": "Только Padel",
        "subtitle": "Тенерифе, Испания",
        "dates": "04.06.25 - 18.06.25",
        "level": "любители-продвинутые",
        "accommodation": "Без размещения",
        "price": "от 890",
        "currency": "Euro",
        "description": "Если вы предпочитаете самостоятельно путешествовать и при этом хотите начать играть или повысить свой уровень игры с профессионалами.",
        "image": "https://images.pexels.com/photos/1103833/pexels-photo-1103833.jpeg",
        "features": ["Профессиональные тренировки", "Гибкий график", "Самостоятельное размещение", "Персональный подход"],
        "group_size": "8-12 человек"
    }
]

# Coaches data
COACHES_DATA = [
    {
        "id": "1",
        "name": "Карлос Родригес",
        "title": "Главный тренер",
        "experience": "15 лет опыта",
        "description": "Профессиональный игрок с международным опытом. Специализируется на работе с игроками всех уровней.",
        "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        "specializations": ["Техника", "Стратегия"]
    },
    {
        "id": "2",
        "name": "Изабелла Мартинес",
        "title": "Тренер по технике",
        "experience": "10 лет опыта",
        "description": "Эксперт по технике ударов и тактике. Помогает игрокам развивать правильную технику с самого начала.",
        "image": "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400&h=400&fit=crop&crop=face",
        "specializations": ["Основы", "Удары"]
    },
    {
        "id": "3",
        "name": "Алехандро Гонсалес",
        "title": "Тренер по стратегии",
        "experience": "12 лет опыта",
        "description": "Специалист по игровой стратегии и психологии. Помогает игрокам развивать тактическое мышление.",
        "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        "specializations": ["Тактика", "Психология"]
    }
]

# Testimonials data
TESTIMONIALS_DATA = [
    {
        "id": "1",
        "name": "Анна Петрова",
        "role": "Предприниматель",
        "content": "Невероятные 7 дней! Профессиональные тренировки, роскошный отель и потрясающие виды Тенерифе. Padel Tour Academia превзошла все ожидания.",
        "rating": 5,
        "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        "approved": True
    },
    {
        "id": "2",
        "name": "Михаил Соколов",
        "role": "Инвестор",
        "content": "Отличная организация, индивидуальный подход и высочайший уровень сервиса. Буду рекомендовать друзьям и обязательно вернусь снова.",
        "rating": 5,
        "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
        "approved": True
    },
    {
        "id": "3",
        "name": "Елена Волкова",
        "role": "Руководитель",
        "content": "Идеальное сочетание активного отдыха и релаксации. Тренеры - настоящие профессионалы, а отель просто великолепен!",
        "rating": 5,
        "image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
        "approved": True
    }
]

# Gallery data
GALLERY_DATA = [
    {
        "id": "1",
        "image": "https://images.unsplash.com/photo-1673746214893-42c6c126391f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxUZW5lcmlmZSUyMHJlc29ydHxlbnwwfHx8fDE3NTI4NDIwODB8MA&ixlib=rb-4.1.0&q=85",
        "title": "Luxury Resort Pool",
        "category": "accommodation"
    },
    {
        "id": "2",
        "image": "https://images.unsplash.com/photo-1614634495973-216b0bbd464e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxUZW5lcmlmZSUyMHJlc29ydHxlbnwwfHx8fDE3NTI4NDIwODB8MA&ixlib=rb-4.1.0&q=85",
        "title": "Resort Aerial View",
        "category": "accommodation"
    },
    {
        "id": "3",
        "image": "https://images.unsplash.com/photo-1637519472672-1ac18adda76b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxUZW5lcmlmZSUyMGxhbmRzY2FwZXxlbnwwfHx8fDE3NTI4NDIwODh8MA&ixlib=rb-4.1.0&q=85",
        "title": "Tenerife Mountains",
        "category": "landscape"
    },
    {
        "id": "4",
        "image": "https://images.unsplash.com/photo-1685726265084-a660a9085353?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxUZW5lcmlmZSUyMGxhbmRzY2FwZXxlbnwwfHx8fDE3NTI4NDIwODh8MA&ixlib=rb-4.1.0&q=85",
        "title": "Mountain Road",
        "category": "landscape"
    },
    {
        "id": "5",
        "image": "https://images.pexels.com/photos/1103829/pexels-photo-1103829.jpeg",
        "title": "Padel Training",
        "category": "training"
    }
]

# Settings data
SETTINGS_DATA = {
    "id": "1",
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

async def seed_database():
    """Seed the database with initial data"""
    try:
        await connect_to_mongo()
        logger.info("Starting database seeding...")
        
        # Check if data already exists
        existing_tours = await tours_crud.get_all()
        if existing_tours:
            logger.info("Database already has data, skipping seeding")
            return
        
        # Seed tours
        logger.info("Seeding tours...")
        for tour_data in TOURS_DATA:
            await tours_crud.create(tour_data)
        
        # Seed coaches
        logger.info("Seeding coaches...")
        for coach_data in COACHES_DATA:
            await coaches_crud.create(coach_data)
        
        # Seed testimonials
        logger.info("Seeding testimonials...")
        for testimonial_data in TESTIMONIALS_DATA:
            await testimonials_crud.create(testimonial_data)
        
        # Seed gallery
        logger.info("Seeding gallery...")
        for gallery_data in GALLERY_DATA:
            await gallery_crud.create(gallery_data)
        
        # Seed settings
        logger.info("Seeding settings...")
        await settings_crud.update_settings(SETTINGS_DATA)
        
        logger.info("Database seeding completed successfully!")
        
    except Exception as e:
        logger.error(f"Error seeding database: {e}")
        raise

if __name__ == "__main__":
    asyncio.run(seed_database())