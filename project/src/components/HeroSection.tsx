import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Summer Collection 2025",
    subtitle: "Discover the latest trends",
    description: "Shop the hottest styles for the season with up to 40% off. Limited time offer.",
    cta: "Shop Now",
    image: "https://images.pexels.com/photos/5868272/pexels-photo-5868272.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    color: "from-blue-500 to-purple-500",
  },
  {
    id: 2,
    title: "Premium Electronics",
    subtitle: "Next-gen technology",
    description: "Experience innovation with our curated selection of high-performance gadgets.",
    cta: "Explore",
    image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    color: "from-indigo-500 to-blue-600",
  },
  {
    id: 3,
    title: "Home Essentials",
    subtitle: "Comfort & style",
    description: "Transform your space with beautiful, functional home décor and essentials.",
    cta: "Discover",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    color: "from-orange-400 to-pink-500",
  }
];

const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out bg-cover bg-center bg-no-repeat ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-60`}></div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-xl text-white">
                <h2 className="text-xl md:text-2xl font-medium mb-1 opacity-90">{slide.subtitle}</h2>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">{slide.title}</h1>
                <p className="text-lg md:text-xl opacity-90 mb-6 md:mb-8">{slide.description}</p>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-md font-medium flex items-center space-x-2 hover:bg-opacity-90 transition transform hover:scale-105 duration-300">
                  <span>{slide.cta}</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === current ? 'w-8 bg-white' : 'w-2.5 bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;