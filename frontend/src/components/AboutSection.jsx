import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  CheckCircle, 
  Users, 
  Trophy, 
  Star, 
  MapPin,
  Clock,
  Award,
  Heart
} from "lucide-react";

const AboutSection = () => {
  const stats = [
    {
      number: "500+",
      label: "Довольных клиентов",
      icon: Users
    },
    {
      number: "50+",
      label: "Проведенных туров",
      icon: Trophy
    },
    {
      number: "4.9",
      label: "Средняя оценка",
      icon: Star
    },
    {
      number: "5★",
      label: "Премиум отели",
      icon: Award
    }
  ];

  const highlights = [
    "Уникальная программа обучения для всех уровней",
    "Размещение в эксклюзивных отелях 5★",
    "Профессиональные тренеры с международным опытом",
    "Индивидуальный подход к каждому участнику",
    "Культурная программа и экскурсии",
    "Малые группы до 12 человек для максимального внимания"
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-200">
                О нас
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Твое погружение в мир
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                  {" "}Pádel
                </span>
                <br />начинается здесь
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Добро пожаловать в Pádel Tour Academia — уникальное сочетание 
                тренировок с профессионалами, роскошного отдыха и незабываемых эмоций!
              </p>
            </div>

            {/* Program Details */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Программа тура включает:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-amber-500" />
                  <span className="text-gray-700">Утренние тренировки</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-amber-500" />
                  <span className="text-gray-700">Дневной отдых</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  <span className="text-gray-700">Вечерние игры</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  <span className="text-gray-700">Финальный турнир</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-amber-500" />
                  <span className="text-gray-700">Экскурсии по острову</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-amber-500" />
                  <span className="text-gray-700">Проживание 5★</span>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900">
                Что делает нас особенными:
              </h3>
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={() => window.location.href = '/booking'}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
              >
                Забронировать тур
              </Button>
              <Button 
                variant="outline"
                className="border-amber-300 text-amber-600 hover:bg-amber-50 px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
                onClick={() => {
                  const element = document.getElementById("coaches");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Познакомиться с командой
              </Button>
            </div>
          </div>

          {/* Image & Stats */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1673746214893-42c6c126391f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxUZW5lcmlmZSUyMHJlc29ydHxlbnwwfHx8fDE3NTI4NDIwODB8MA&ixlib=rb-4.1.0&q=85" 
                alt="Luxury resort pool" 
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Floating Stats */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-md">
                <div className="grid grid-cols-2 gap-4 px-4">
                  {stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <div key={index} className="bg-white rounded-xl p-4 shadow-lg text-center">
                        <div className="flex items-center justify-center mb-2">
                          <IconComponent className="h-5 w-5 text-amber-500 mr-2" />
                          <span className="text-2xl font-bold text-gray-900">{stat.number}</span>
                        </div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;