import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../hooks/use-toast";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin,
  Send,
  MessageCircle,
  Instagram,
  Clock,
  Globe,
  Users,
  Star
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { companyInfo } from "../data/mock";

const ContactPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Сообщение отправлено!",
      description: "Мы свяжемся с вами в течение 24 часов.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: companyInfo.email,
      link: `mailto:${companyInfo.email}`,
      description: "Отправьте нам письмо"
    },
    {
      icon: Phone,
      title: "Телефон",
      value: companyInfo.phone,
      link: `tel:${companyInfo.phone}`,
      description: "Звоните в любое время"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "WhatsApp чат",
      link: companyInfo.socialLinks.whatsapp,
      description: "Быстрый ответ"
    },
    {
      icon: Send,
      title: "Telegram",
      value: "Telegram чат",
      link: companyInfo.socialLinks.telegram,
      description: "Мгновенная связь"
    }
  ];

  const faqItems = [
    {
      question: "Какой уровень игры необходим для участия?",
      answer: "Мы принимаем игроков всех уровней — от полных новичков до продвинутых игроков. Наши программы адаптированы для каждого уровня."
    },
    {
      question: "Что включено в стоимость тура?",
      answer: "Проживание в отеле 5★, завтраки и ужины, все тренировки, оборудование, трансфер, экскурсии и финальный турнир."
    },
    {
      question: "Можно ли отменить бронирование?",
      answer: "Да, отмена возможна за 30 дней до начала тура с полным возвратом средств. При отмене менее чем за 30 дней применяются штрафы."
    },
    {
      question: "Нужна ли виза для поездки?",
      answer: "Для граждан многих стран виза не требуется. Мы поможем с оформлением необходимых документов."
    }
  ];

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
            Вернуться на главную
          </Button>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Связаться с
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                {" "}нами
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Остались вопросы? Мы с радостью на них ответим! Свяжитесь с нами любым удобным способом.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                    <a
                      href={method.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-700 font-medium"
                    >
                      {method.value}
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Send className="h-5 w-5 text-amber-500" />
                  <span>Отправить сообщение</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Имя *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
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
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Тема *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Сообщение *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Расскажите, как мы можем помочь..."
                      rows={6}
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium py-3"
                  >
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info & Map */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-amber-500" />
                    <span>Наш офис</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-amber-500 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Адрес</p>
                      <p className="text-gray-600">{companyInfo.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-amber-500 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Часы работы</p>
                      <p className="text-gray-600">Пн-Пт: 9:00 - 18:00</p>
                      <p className="text-gray-600">Сб-Вс: 10:00 - 16:00</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Globe className="h-5 w-5 text-amber-500 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Языки</p>
                      <p className="text-gray-600">Русский, Английский, Испанский</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Почему выбирают нас</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-700">Рейтинг 4.9/5 от 500+ клиентов</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-amber-500" />
                    <span className="text-sm text-gray-700">Персональный подход к каждому</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-amber-500" />
                    <span className="text-sm text-gray-700">Поддержка 24/7 во время тура</span>
                  </div>
                </CardContent>
              </Card>

              {/* Map placeholder */}
              <Card>
                <CardContent className="p-0">
                  <div className="h-64 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-amber-500 mx-auto mb-2" />
                      <p className="text-gray-600">Интерактивная карта</p>
                      <p className="text-sm text-gray-500">Тенерифе, Канарские острова</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Часто задаваемые вопросы
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ответы на самые популярные вопросы о наших падель-турах
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;