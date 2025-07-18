import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { 
  Eye, 
  ZoomIn, 
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { gallery } from "../data/mock";

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("all");

  const categories = [
    { id: "all", name: "Все фото", count: gallery.length },
    { id: "accommodation", name: "Размещение", count: gallery.filter(img => img.category === "accommodation").length },
    { id: "training", name: "Тренировки", count: gallery.filter(img => img.category === "training").length },
    { id: "landscape", name: "Пейзажи", count: gallery.filter(img => img.category === "landscape").length }
  ];

  const filteredImages = filter === "all" 
    ? gallery 
    : gallery.filter(img => img.category === filter);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-200">
            Галерея
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Увидьте своими глазами
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              {" "}красоту Тенерифе
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Роскошные отели, профессиональные корты, потрясающие пейзажи и 
            незабываемые моменты — все это ждет вас в наших падель-турах.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={filter === category.id ? "default" : "outline"}
              onClick={() => setFilter(category.id)}
              className={`transition-all ${
                filter === category.id 
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white" 
                  : "border-amber-300 text-amber-600 hover:bg-amber-50"
              }`}
            >
              {category.name}
              <Badge variant="secondary" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => openModal(image)}
            >
              <img 
                src={image.image} 
                alt={image.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white">
                  <ZoomIn className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-medium">{image.title}</p>
                </div>
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-white/90 text-gray-900 capitalize">
                  {image.category === "accommodation" && "Размещение"}
                  {image.category === "training" && "Тренировки"}
                  {image.category === "landscape" && "Пейзажи"}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <Dialog open={!!selectedImage} onOpenChange={closeModal}>
            <DialogContent className="max-w-4xl w-full p-0 bg-black/95 border-0">
              <div className="relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                
                <img 
                  src={selectedImage.image} 
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-screen object-contain"
                />
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{selectedImage.title}</h3>
                  <Badge className="bg-amber-500 text-white">
                    {selectedImage.category === "accommodation" && "Размещение"}
                    {selectedImage.category === "training" && "Тренировки"}
                    {selectedImage.category === "landscape" && "Пейзажи"}
                  </Badge>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Готовы стать частью этих воспоминаний?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Присоединяйтесь к нашим падель-турам и создайте собственные незабываемые моменты 
              в одном из самых красивых мест Испании.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.location.href = '/booking'}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
              >
                Забронировать тур
              </Button>
              <Button 
                variant="outline"
                className="border-amber-300 text-amber-600 hover:bg-amber-50 px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
                onClick={() => window.location.href = '/contact'}
              >
                Задать вопрос
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;