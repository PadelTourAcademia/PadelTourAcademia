import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  ArrowRight,
  Hotel,
  Trophy,
  Clock
} from "lucide-react";
import { tours } from "../data/mock";

const ToursSection = () => {
  const navigate = useNavigate();

  const handleTourClick = (tourId) => {
    navigate(`/tour/${tourId}`);
  };

  const handleBookingClick = () => {
    navigate('/booking');
  };

  return (
    <section id="tours" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-200">
            Ближайшие туры
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Выберите свой
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              {" "}идеальный тур
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Программы для игроков любого уровня — от новичков до профессионалов. 
            Выберите пакет, который идеально соответствует вашим потребностям.
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <Card 
              key={tour.id} 
              className="group cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden"
              onClick={() => handleTourClick(tour.id)}
            >
              <div className="relative">
                <img 
                  src={tour.image} 
                  alt={tour.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-gray-900 font-medium">
                    {tour.level}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center space-x-2 text-white">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-medium">{tour.subtitle}</span>
                  </div>
                </div>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold group-hover:text-amber-600 transition-colors">
                  {tour.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {tour.description}
                </p>

                {/* Tour Details */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4 text-amber-500" />
                    <span>{tour.dates}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Hotel className="h-4 w-4 text-amber-500" />
                    <span>{tour.accommodation}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Users className="h-4 w-4 text-amber-500" />
                    <span>{tour.groupSize}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2">
                  {tour.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full" />
                      <span className="text-xs text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-left">
                    <div className="text-2xl font-bold text-gray-900">
                      {tour.price} <span className="text-sm font-normal text-gray-500">{tour.currency}</span>
                    </div>
                    <div className="text-xs text-gray-500">на человека</div>
                  </div>
                  <Button 
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white group-hover:scale-105 transition-transform"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTourClick(tour.id);
                    }}
                  >
                    Подробнее
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-left mb-4 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">
                  Группы от 8 до 12 человек
                </h3>
                <p className="text-amber-100">
                  Количество мест ограничено. Бронируйте сейчас!
                </p>
              </div>
              <div className="flex space-x-4">
                <Button 
                  onClick={handleBookingClick}
                  className="bg-white text-amber-600 hover:bg-gray-50 font-medium px-8 py-3 transform hover:scale-105 transition-all"
                >
                  Забронировать место
                </Button>
                <Button 
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-3 transform hover:scale-105 transition-all"
                  onClick={() => {
                    const element = document.getElementById("about");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Узнать больше
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToursSection;