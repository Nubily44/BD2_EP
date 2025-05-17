import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Regular Customer",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    rating: 5,
    text: "I've been shopping here for years and the quality never disappoints. The customer service is exceptional and they really go above and beyond to help you find exactly what you need."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Tech Enthusiast",
    image: "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    rating: 4,
    text: "I'm always excited to see the latest electronics they bring in. The prices are competitive and the shipping is always prompt. Definitely my go-to store for all my tech needs."
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Interior Designer",
    image: "https://images.pexels.com/photos/761872/pexels-photo-761872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    rating: 5,
    text: "The home decor selection is outstanding. I've found so many unique pieces that my clients absolutely love. The quality is top-notch and delivery is always on time."
  }
];

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent(c => (c === 0 ? testimonials.length - 1 : c - 1));
  };

  const next = () => {
    setCurrent(c => (c === testimonials.length - 1 ? 0 : c + 1));
  };

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Don't just take our word for it. Hear what our satisfied customers have to say about their shopping experience.</p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full px-4">
                  <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              size={18}
                              className={i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700 italic mb-6">"{testimonial.text}"</p>
                        <div>
                          <h4 className="font-bold text-lg">{testimonial.name}</h4>
                          <p className="text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={prev}
            className="absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={next}
            className="absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === current ? 'w-8 bg-blue-600' : 'w-2.5 bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;