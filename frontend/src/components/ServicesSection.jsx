import React from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { 
  Zap, 
  Hotel, 
  Palmtree, 
  Users, 
  Trophy, 
  Clock,
  Target,
  Star,
  Award
} from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "Профессиональное обучение",
      description: "Получите навыки игры в падель от опытных тренеров с международным опытом",
      icon: Trophy,
      features: [
        "Тренеры с международным опытом",
        "Индивидуальный подход к каждому",
        "Современные методики обучения",
        "Видеоанализ игры"
      ]
    },
    {
      id: 2,
      title: "Комфортное проживание",
      description: "Наслаждайтесь отдыхом в лучших отелях 5★ Испании с потрясающими видами",
      icon: Hotel,
      features: [
        "Отели категории 5 звезд",
        "Завтраки и ужины включены",
        "Спа и wellness центры",
        "Виды на Атлантический океан"
      ]
    },
    {
      id: 3,
      title: "Культурная программа",
      description: "Отключитесь от повседневных забот и окунитесь в атмосферу испанского побережья",
      icon: Palmtree,
      features: [
        "Экскурсии по острову",
        "Дегустации местной кухни",
        "Знакомство с культурой",
        "Фотосессии в красивых местах"
      ]
    },
    {
      id: 4,
      title: "Индивидуальный подход",
      description: "Мы учтем все ваши пожелания по размещению, питанию и тренировкам",
      icon: Users,
      features: [
        "Персональные тренировки",
        "Гибкий график занятий",
        "Диетические предпочтения",
        "VIP-сервис"
      ]
    },
    {
      id: 5,
      title: "Турнирная практика",
      description: "Участвуйте в турнирах и соревнованиях для закрепления навыков",
      icon: Award,
      features: [
        "Финальные турниры",
        "Командные соревнования",
        "Призы и награды",
        "Сертификаты участников"
      ]
    },
    {
      id: 6,
      title: "Полное сопровождение",
      description: "От трансфера до финального турнира - мы позаботимся обо всем",
      icon: Star,
      features: [
        "Трансфер из аэропорта",
        "Организация всех мероприятий",
        "Медицинская поддержка",
        "24/7 поддержка гостей"
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-200">
            Наши услуги
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            От первого удара до
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              {" "}идеального смэша
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Интенсивное обучение паделю, проживание в лучших отелях Испании и 
            культурная программа на побережье Тенерифе.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={service.id} 
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg"
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-amber-600 transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-center leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-50 to-amber-50 rounded-2xl p-8 border border-amber-200">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Готовы начать свое падель-путешествие?
              </h3>
              <p className="text-gray-600 mb-6">
                Наша команда профессионалов поможет вам достичь новых высот в игре 
                и насладиться незабываемым отдыхом на Тенерифе.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => {
                    const element = document.getElementById("coaches");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
                >
                  Познакомиться с тренерами
                </button>
                <button 
                  onClick={() => window.location.href = '/contact'}
                  className="bg-white border border-amber-300 text-amber-600 hover:bg-amber-50 px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
                >
                  Задать вопрос
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;