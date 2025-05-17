import React from 'react';
import { Clock, Gift } from 'lucide-react';

const OffersBanner: React.FC = () => {
  return (
    <section id="offers" className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Summer Sale</h2>
            <p className="text-xl mb-6 opacity-90">Get up to 40% off on select items. Limited time offer.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all">
                Shop Now
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white hover:text-blue-600 transition-all">
                Learn More
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-lg">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-500 p-3 rounded-lg">
                  <Gift size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
                  <p className="opacity-80">On all orders over $50. International shipping available.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-lg">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-500 p-3 rounded-lg">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Limited Time Deal</h3>
                  <div className="flex space-x-4 mt-3">
                    <div className="bg-white bg-opacity-20 rounded p-2 w-16 text-center">
                      <div className="text-2xl font-bold">15</div>
                      <div className="text-xs">Days</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded p-2 w-16 text-center">
                      <div className="text-2xl font-bold">08</div>
                      <div className="text-xs">Hours</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded p-2 w-16 text-center">
                      <div className="text-2xl font-bold">45</div>
                      <div className="text-xs">Mins</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersBanner;