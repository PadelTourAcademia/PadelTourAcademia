# API Contracts - Padel Tour Academia

## Mock Data Analysis

### Current Mock Data (frontend/src/data/mock.js):
- **tours**: 3 туры с полной информацией (id, title, dates, level, accommodation, price, description, features, image, groupSize)
- **coaches**: 3 тренера с профилями (id, name, title, experience, description, image)
- **testimonials**: 3 отзыва клиентов (id, name, role, content, rating, image)
- **gallery**: 5 изображений галереи (id, image, title, category)
- **services**: 6 услуг (hardcoded in ServicesSection component)
- **companyInfo**: Информация о компании (name, tagline, description, contact details)

## Backend API Endpoints

### 1. Tours Management
```
GET /api/tours
- Получить все туры
- Response: Array<Tour>

GET /api/tours/:id
- Получить тур по ID
- Response: Tour

POST /api/tours
- Создать новый тур (admin only)
- Body: TourCreate
- Response: Tour

PUT /api/tours/:id
- Обновить тур (admin only)
- Body: TourUpdate
- Response: Tour

DELETE /api/tours/:id
- Удалить тур (admin only)
- Response: {message: "Tour deleted"}
```

### 2. Coaches Management
```
GET /api/coaches
- Получить всех тренеров
- Response: Array<Coach>

GET /api/coaches/:id
- Получить тренера по ID
- Response: Coach

POST /api/coaches
- Создать тренера (admin only)
- Body: CoachCreate
- Response: Coach

PUT /api/coaches/:id
- Обновить тренера (admin only)
- Body: CoachUpdate
- Response: Coach

DELETE /api/coaches/:id
- Удалить тренера (admin only)
- Response: {message: "Coach deleted"}
```

### 3. Testimonials Management
```
GET /api/testimonials
- Получить все отзывы
- Response: Array<Testimonial>

POST /api/testimonials
- Создать отзыв
- Body: TestimonialCreate
- Response: Testimonial

PUT /api/testimonials/:id
- Обновить отзыв (admin only)
- Body: TestimonialUpdate
- Response: Testimonial

DELETE /api/testimonials/:id
- Удалить отзыв (admin only)
- Response: {message: "Testimonial deleted"}
```

### 4. Gallery Management
```
GET /api/gallery
- Получить все изображения
- Response: Array<GalleryItem>

GET /api/gallery?category=:category
- Получить изображения по категории
- Response: Array<GalleryItem>

POST /api/gallery
- Добавить изображение (admin only)
- Body: GalleryItemCreate
- Response: GalleryItem

DELETE /api/gallery/:id
- Удалить изображение (admin only)
- Response: {message: "Gallery item deleted"}
```

### 5. Bookings Management
```
GET /api/bookings
- Получить все бронирования (admin only)
- Response: Array<Booking>

POST /api/bookings
- Создать бронирование
- Body: BookingCreate
- Response: Booking

GET /api/bookings/:id
- Получить бронирование по ID
- Response: Booking

PUT /api/bookings/:id/status
- Обновить статус бронирования (admin only)
- Body: {status: "confirmed" | "cancelled" | "pending"}
- Response: Booking
```

### 6. Contact Forms
```
POST /api/contact
- Отправить контактную форму
- Body: ContactForm
- Response: {message: "Message sent successfully"}

GET /api/contact
- Получить все сообщения (admin only)
- Response: Array<ContactMessage>
```

### 7. Settings/Company Info
```
GET /api/settings
- Получить настройки компании
- Response: CompanySettings

PUT /api/settings
- Обновить настройки (admin only)
- Body: CompanySettingsUpdate
- Response: CompanySettings
```

## Data Models

### Tour Model
```typescript
{
  id: string
  title: string
  subtitle: string
  dates: string
  level: string
  accommodation: string
  price: string
  currency: string
  description: string
  image: string
  features: string[]
  groupSize: string
  createdAt: Date
  updatedAt: Date
}
```

### Coach Model
```typescript
{
  id: string
  name: string
  title: string
  experience: string
  description: string
  image: string
  specializations: string[]
  createdAt: Date
  updatedAt: Date
}
```

### Testimonial Model
```typescript
{
  id: string
  name: string
  role: string
  content: string
  rating: number
  image: string
  approved: boolean
  createdAt: Date
  updatedAt: Date
}
```

### Gallery Item Model
```typescript
{
  id: string
  image: string
  title: string
  category: "accommodation" | "training" | "landscape"
  createdAt: Date
  updatedAt: Date
}
```

### Booking Model
```typescript
{
  id: string
  tourId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  participants: number
  specialRequests: string
  status: "pending" | "confirmed" | "cancelled"
  totalPrice: number
  createdAt: Date
  updatedAt: Date
}
```

### Contact Message Model
```typescript
{
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  read: boolean
  createdAt: Date
  updatedAt: Date
}
```

### Company Settings Model
```typescript
{
  id: string
  name: string
  tagline: string
  description: string
  email: string
  phone: string
  location: string
  socialLinks: {
    telegram: string
    whatsapp: string
    instagram: string
  }
  updatedAt: Date
}
```

## Frontend Integration Plan

### 1. Create API Service Layer
- Create `frontend/src/services/api.js` with axios client
- Implement all API methods
- Handle error responses and loading states

### 2. Replace Mock Data
- Remove mock.js imports
- Replace with API calls in components
- Add loading states and error handling

### 3. State Management
- Add React Context for global state (tours, coaches, etc.)
- Implement caching for frequently used data
- Add optimistic updates for better UX

### 4. Forms Integration
- Connect booking form to POST /api/bookings
- Connect contact form to POST /api/contact
- Add form validation and success messages

### 5. Admin Features (Future)
- Add admin authentication
- Create admin dashboard for content management
- Add CRUD operations for all entities

## Error Handling Strategy

### Backend:
- Consistent error response format
- Input validation with detailed messages
- Proper HTTP status codes

### Frontend:
- Global error handler with toast notifications
- Loading states during API calls
- Retry mechanisms for failed requests
- Fallback UI for critical errors

## Security Considerations

### Backend:
- Input sanitization
- Rate limiting
- CORS configuration
- Basic admin authentication for protected routes

### Frontend:
- Client-side validation
- Secure form handling
- XSS prevention

## Performance Optimization

### Backend:
- Database indexes for frequent queries
- Pagination for large datasets
- Caching frequently accessed data

### Frontend:
- Lazy loading for images
- Component memoization
- API response caching
- Optimistic updates

## Deployment Considerations

### Database:
- MongoDB indexes for performance
- Backup strategy
- Environment-specific configurations

### API:
- Environment variables for configuration
- Logging for debugging
- Health check endpoints

### Frontend:
- Environment-specific API URLs
- Error boundaries
- Performance monitoring