import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, Globe, Phone, Mail } from "lucide-react";
import { cn } from "../lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Главная", href: "/" },
    { name: "Туры", href: "/#tours" },
    { name: "О нас", href: "/#about" },
    { name: "Тренеры", href: "/#coaches" },
    { name: "Контакты", href: "/contact" },
  ];

  const scrollToSection = (sectionId) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  const handleMenuClick = (href) => {
    if (href.startsWith("/#")) {
      scrollToSection(href.substring(2));
    } else {
      navigate(href);
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-amber-600" />
                <span className="text-amber-800">padeltouracademia@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-amber-600" />
                <span className="text-amber-800">+34 123 456 789</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-amber-600" />
              <span className="text-amber-800">Santa Cruz de Tenerife</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200" 
          : "bg-transparent"
      )}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <div>
                <h1 className={cn(
                  "text-2xl font-bold transition-colors",
                  isScrolled ? "text-gray-900" : "text-white"
                )}>
                  Padel Tour Academia
                </h1>
                <p className={cn(
                  "text-sm transition-colors",
                  isScrolled ? "text-gray-600" : "text-white/90"
                )}>
                  Премиум падель-туры
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleMenuClick(item.href)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-amber-500",
                    isScrolled ? "text-gray-900" : "text-white"
                  )}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                onClick={() => navigate("/booking")}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all transform hover:scale-105"
              >
                Забронировать
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className={cn("h-6 w-6", isScrolled ? "text-gray-900" : "text-white")} />
              ) : (
                <Menu className={cn("h-6 w-6", isScrolled ? "text-gray-900" : "text-white")} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleMenuClick(item.href)}
                    className="text-left text-gray-900 hover:text-amber-500 transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
                <Button 
                  onClick={() => {
                    navigate("/booking");
                    setIsMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white mt-4"
                >
                  Забронировать
                </Button>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;