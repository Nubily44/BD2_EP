import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Search, User, Heart } from 'lucide-react';
import LoginModal from './LoginModal';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#" className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">ShopWave</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">Home</a>
              <a href="#categories" className="text-gray-700 hover:text-blue-600 transition">Categories</a>
              <a href="#featured" className="text-gray-700 hover:text-blue-600 transition">Featured</a>
              <a href="#offers" className="text-gray-700 hover:text-blue-600 transition">Offers</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition">Testimonials</a>
            </div>

            {/* Icons Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-gray-700 hover:text-blue-600 transition">
                <Search size={20} />
              </button>
              <button 
                className="text-gray-700 hover:text-blue-600 transition"
                onClick={() => setIsLoginModalOpen(true)}
              >
                <User size={20} />
              </button>
              <button className="text-gray-700 hover:text-blue-600 transition">
                <Heart size={20} />
              </button>
              <button className="relative text-gray-700 hover:text-blue-600 transition">
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button className="relative text-gray-700">
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </button>
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Home</a>
              <a href="#categories" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Categories</a>
              <a href="#featured" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Featured</a>
              <a href="#offers" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Offers</a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Testimonials</a>
            </div>
            <div className="px-2 pt-2 pb-3 border-t border-gray-200">
              <div className="flex space-x-6 px-3 py-2">
                <button className="text-gray-700">
                  <Search size={20} />
                </button>
                <button 
                  className="text-gray-700"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  <User size={20} />
                </button>
                <button className="text-gray-700">
                  <Heart size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Navbar;