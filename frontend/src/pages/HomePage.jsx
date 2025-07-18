import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ToursSection from "../components/ToursSection";
import ServicesSection from "../components/ServicesSection";
import AboutSection from "../components/AboutSection";
import CoachesSection from "../components/CoachesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import GallerySection from "../components/GallerySection";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ToursSection />
      <ServicesSection />
      <AboutSection />
      <CoachesSection />
      <TestimonialsSection />
      <GallerySection />
      <Footer />
    </div>
  );
};

export default HomePage;