import React from "react";
import { Link } from "react-router-dom";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Instagram, 
  Send,
  Star,
  Award,
  Users,
  Calendar
} from "lucide-react";
import { Button } from "./ui/button";
import { companyInfo } from "../data/mock";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Padel Tour Academia</h3>
                <p className="text-gray-400 text-sm">Премиум падель-туры</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Уникальное сочетание профессиональных тренировок, роскошного отдыха и незабываемых эмоций на лучших курортах Испании.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Быстрые ссылки</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const element = document.getElementById("tours");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  Туры
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const element = document.getElementById("about");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  О нас
                </button>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Контакты</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-amber-400" />
                <span className="text-gray-400 text-sm">{companyInfo.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-amber-400" />
                <a 
                  href={`mailto:${companyInfo.email}`}
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                >
                  {companyInfo.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-amber-400" />
                <a 
                  href={`tel:${companyInfo.phone}`}
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                >
                  {companyInfo.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Stats & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Мы в цифрах</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Users className="h-4 w-4 text-amber-400" />
                  <span className="text-2xl font-bold">500+</span>
                </div>
                <p className="text-gray-400 text-xs">Довольных клиентов</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Calendar className="h-4 w-4 text-amber-400" />
                  <span className="text-2xl font-bold">50+</span>
                </div>
                <p className="text-gray-400 text-xs">Проведенных туров</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <span className="text-2xl font-bold">4.9</span>
                </div>
                <p className="text-gray-400 text-xs">Средняя оценка</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Award className="h-4 w-4 text-amber-400" />
                  <span className="text-2xl font-bold">5★</span>
                </div>
                <p className="text-gray-400 text-xs">Премиум отели</p>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-3 pt-4">
              <a 
                href={companyInfo.socialLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-amber-500 transition-colors"
              >
                <Send className="h-5 w-5" />
              </a>
              <a 
                href={companyInfo.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-500 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a 
                href={companyInfo.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h4 className="text-xl font-bold mb-2">Готовы к незабываемому падель-туру?</h4>
              <p className="text-gray-400">Забронируйте свое место уже сегодня!</p>
            </div>
            <div className="flex space-x-4">
              <Button 
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                onClick={() => window.location.href = '/booking'}
              >
                Забронировать тур
              </Button>
              <Button 
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
                onClick={() => window.location.href = '/contact'}
              >
                Связаться с нами
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © 2025 Padel Tour Academia. Все права защищены.
            </p>
            <div className="flex space-x-6 mt-2 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;