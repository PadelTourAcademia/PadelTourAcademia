import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { useToast } from "../hooks/use-toast";
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  CreditCard,
  Shield,
  CheckCircle
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { tours } from "../data/mock";

const BookingPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    tour: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    participants: 1,
    specialRequests: '',
    agreedToTerms: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.agreedToTerms) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, согласитесь с условиями бронирования",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в течение 24 часов для подтверждения бронирования.",
    });

    // Reset form
    setFormData({
      tour: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      participants: 1,
      specialRequests: '',
      agreedToTerms: false
    });
  };

  const selectedTour = tours.find(t => t.id === parseInt(formData.tour));

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 hover:bg-amber-100 text-amber-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Вернуться к турам
          </Button>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Забронировать
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                {" "}падель-тур
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Заполните форму ниже, и мы свяжемся с вами для подтверждения бронирования 
              и обсуждения всех деталей вашего путешествия.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Fields */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Tour Selection */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-amber-500" />
                        <span>Выберите тур</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select value={formData.tour} onValueChange={(value) => handleInputChange('tour', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тур" />
                        </SelectTrigger>
                        <SelectContent>
                          {tours.map((tour) => (
                            <SelectItem key={tour.id} value={tour.id.toString()}>
                              {tour.title} - {tour.dates} ({tour.price} {tour.currency})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  {/* Personal Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <User className="h-5 w-5 text-amber-500" />
                        <span>Личная информация</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">Имя *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Фамилия *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Телефон *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="country">Страна *</Label>
                          <Input
                            id="country"
                            value={formData.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Booking Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-amber-500" />
                        <span>Детали бронирования</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="participants">Количество участников</Label>
                        <Select value={formData.participants.toString()} onValueChange={(value) => handleInputChange('participants', parseInt(value))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(4)].map((_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>
                                {i + 1} {i === 0 ? 'человек' : 'человека'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="specialRequests">Особые пожелания</Label>
                        <Textarea
                          id="specialRequests"
                          value={formData.specialRequests}
                          onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                          placeholder="Диетические предпочтения, особые потребности, пожелания по размещению..."
                          rows={4}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Terms & Conditions */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="terms"
                          checked={formData.agreedToTerms}
                          onCheckedChange={(checked) => handleInputChange('agreedToTerms', checked)}
                        />
                        <Label htmlFor="terms" className="text-sm leading-relaxed">
                          Я согласен с{" "}
                          <a href="#" className="text-amber-600 hover:underline">
                            условиями бронирования
                          </a>{" "}
                          и{" "}
                          <a href="#" className="text-amber-600 hover:underline">
                            политикой конфиденциальности
                          </a>
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Booking Summary */}
                  <Card className="sticky top-6">
                    <CardHeader>
                      <CardTitle>Сводка бронирования</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedTour ? (
                        <>
                          <div className="space-y-2">
                            <h4 className="font-semibold">{selectedTour.title}</h4>
                            <p className="text-sm text-gray-600">{selectedTour.dates}</p>
                            <p className="text-sm text-gray-600">{selectedTour.accommodation}</p>
                          </div>
                          <hr />
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Цена за человека:</span>
                              <span>{selectedTour.price} {selectedTour.currency}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Участников:</span>
                              <span>{formData.participants}</span>
                            </div>
                            <hr />
                            <div className="flex justify-between font-bold">
                              <span>Итого:</span>
                              <span>
                                {parseInt(selectedTour.price.replace('от ', '')) * formData.participants} {selectedTour.currency}
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <p className="text-gray-500">Выберите тур для расчета стоимости</p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Security & Trust */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-green-500" />
                        <span>Безопасность</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Защищенная передача данных</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Гарантия возврата средств</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Поддержка 24/7</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Submit Button */}
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium py-3"
                  >
                    Отправить заявку
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookingPage;