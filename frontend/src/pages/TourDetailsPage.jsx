import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Users, 
  Hotel, 
  Star,
  Clock,
  Trophy,
  Utensils,
  Car,
  Camera,
  CheckCircle
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { tours } from "../data/mock";

const TourDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const tour = tours.find(t => t.id === parseInt(id));

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Тур не найден</h1>
          <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
        </div>
      </div>
    );
  }

  const schedule = [
    { day: "День 1", activities: ["Прибытие и размещение", "Знакомство с группой", "Обзорная экскурсия отеля"] },
    { day: "День 2", activities: ["Утренняя тренировка (основы)", "Обед", "Вечерняя игра"] },
    { day: "День 3", activities: ["Техническая тренировка", "Экскурсия по острову", "Ужин в местном ресторане"] },
    { day: "День 4", activities: ["Тактическая тренировка", "Свободное время", "Групповая игра"] },
    { day: "День 5", activities: ["Интенсивная тренировка", "Спа-процедуры", "Подготовка к турниру"] },
    { day: "День 6", activities: ["Финальный турнир", "Церемония награждения", "Прощальный ужин"] },
    { day: "День 7", activities: ["Завтрак", "Трансфер в аэропорт", "Вылет"] }
  ];

  const included = [
    "Проживание в отеле 5★",
    "Завтраки и ужины",
    "Ежедневные тренировки",
    "Профессиональные тренеры",
    "Все оборудование",
    "Трансфер из аэропорта",
    "Экскурсии",
    "Финальный турнир",
    "Сертификат участника",
    "Фото и видеосъемка"
  ];

  const notIncluded = [
    "Авиабилеты",
    "Медицинская страховка",
    "Обеды (кроме экскурсий)",
    "Личные расходы",
    "Дополнительные экскурсии",
    "Алкогольные напитки"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 hover:bg-amber-50 text-amber-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Вернуться к турам
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-amber-100 text-amber-800">
                {tour.level}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                {tour.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {tour.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-amber-500" />
                  <span className="text-gray-700">{tour.subtitle}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-amber-500" />
                  <span className="text-gray-700">{tour.dates}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Hotel className="h-5 w-5 text-amber-500" />
                  <span className="text-gray-700">{tour.accommodation}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-amber-500" />
                  <span className="text-gray-700">{tour.groupSize}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mb-8">
                <div className="text-3xl font-bold text-gray-900">
                  {tour.price} <span className="text-lg font-normal text-gray-500">{tour.currency}</span>
                </div>
                <div className="text-sm text-gray-500">на человека</div>
              </div>
              
              <Button 
                onClick={() => navigate('/booking')}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
              >
                Забронировать тур
              </Button>
            </div>
            
            <div>
              <img 
                src={tour.image} 
                alt={tour.title}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tour Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-amber-500" />
                    <span>Программа тура</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {schedule.map((day, index) => (
                      <div key={index} className="border-l-4 border-amber-200 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{day.day}</h4>
                        <ul className="space-y-1">
                          {day.activities.map((activity, idx) => (
                            <li key={idx} className="text-gray-600 text-sm flex items-start space-x-2">
                              <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5 flex-shrink-0" />
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-amber-500" />
                    <span>Особенности тура</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tour.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <Card className="sticky top-6">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {tour.price} {tour.currency}
                  </CardTitle>
                  <p className="text-gray-600">на человека</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={() => navigate('/booking')}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium py-3"
                  >
                    Забронировать
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full border-amber-300 text-amber-600 hover:bg-amber-50"
                    onClick={() => navigate('/contact')}
                  >
                    Задать вопрос
                  </Button>
                </CardContent>
              </Card>

              {/* Included/Not Included */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Что включено</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {included.map((item, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Не включено</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {notIncluded.map((item, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-4 h-4 border-2 border-red-300 rounded-full mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TourDetailsPage;