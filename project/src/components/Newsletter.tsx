import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // In a real application, you would send this to your API
      console.log('Subscribing email:', email);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };
  
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="bg-blue-600 text-white p-8 md:p-12">
              <Mail size={36} className="mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to our newsletter</h2>
              <p className="opacity-90 mb-6">
                Stay updated with the latest products, exclusive offers, and special promotions delivered directly to your inbox.
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <span className="bg-white bg-opacity-20 px-2 py-1 rounded">New Arrivals</span>
                <span className="bg-white bg-opacity-20 px-2 py-1 rounded">Exclusive Deals</span>
                <span className="bg-white bg-opacity-20 px-2 py-1 rounded">Tips</span>
              </div>
            </div>
            
            <div className="p-8 md:p-12 flex items-center">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="w-full">
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="youremail@example.com"
                      className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  >
                    Subscribe
                  </button>
                  <p className="text-sm text-gray-600 mt-3">
                    By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                  </p>
                </form>
              ) : (
                <div className="text-center w-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Thank you for subscribing!</h3>
                  <p className="text-gray-600">
                    You've been successfully added to our mailing list. Get ready for some amazing offers!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;