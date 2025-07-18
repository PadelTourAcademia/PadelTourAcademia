import React from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { 
  Star, 
  Award, 
  Users, 
  Clock,
  MessageCircle,
  Trophy
} from "lucide-react";
import { coaches } from "../data/mock";

const CoachesSection = () => {
  return (
    <section id="coaches" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-200">
            Наши тренеры
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Команда
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              {" "}профессионалов
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Наши тренеры — профессионалы своего дела с международным опытом. 
            Они с радостью помогут вам улучшить свои навыки игры.
          </p>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coaches.map((coach) => (
            <Card 
              key={coach.id} 
              className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden"
            >
              <div className="relative">
                <img 
                  src={coach.image} 
                  alt={coach.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center space-x-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Trophy className="h-4 w-4" />
                    <span className="text-sm font-medium">{coach.experience}</span>
                  </div>
                </div>
              </div>

              <CardHeader className="text-center pb-2">
                <h3 className="text-xl font-bold group-hover:text-amber-600 transition-colors">
                  {coach.name}
                </h3>
                <p className="text-amber-600 font-medium">{coach.title}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-center space-x-1">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <span className="text-sm text-gray-600">{coach.experience}</span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed text-center">
                  {coach.description}
                </p>

                {/* Rating */}
                <div className="flex items-center justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">5.0</span>
                </div>

                {/* Specializations */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {coach.id === 1 && (
                    <>
                      <Badge variant="secondary" className="text-xs">Техника</Badge>
                      <Badge variant="secondary" className="text-xs">Стратегия</Badge>
                    </>
                  )}
                  {coach.id === 2 && (
                    <>
                      <Badge variant="secondary" className="text-xs">Основы</Badge>
                      <Badge variant="secondary" className="text-xs">Удары</Badge>
                    </>
                  )}
                  {coach.id === 3 && (
                    <>
                      <Badge variant="secondary" className="text-xs">Тактика</Badge>
                      <Badge variant="secondary" className="text-xs">Психология</Badge>
                    </>
                  )}
                </div>

                <Button 
                  variant="outline"
                  className="w-full border-amber-300 text-amber-600 hover:bg-amber-50 group-hover:scale-105 transition-all"
                  onClick={() => window.location.href = '/contact'}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Связаться
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Stats */}
        <div className="mt-16 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Опыт нашей команды
            </h3>
            <p className="text-gray-600">
              Более 37 лет совместного опыта в профессиональном паделе
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
              <p className="text-gray-600">Обученных игроков</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
              <p className="text-gray-600">Международных турниров</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">5</div>
              <p className="text-gray-600">Языков обучения</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachesSection;