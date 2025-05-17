import React from 'react';
import { Facebook, Instagram, Twitter, Youtube as YouTube, MapPin, Phone, Mail, CreditCard, Truck, RefreshCw } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-b border-gray-800">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Truck size={24} className="text-white" />
            </div>
            <div>
              <h4 className="text-white font-bold">Free Shipping</h4>
              <p className="text-sm">On orders over $50</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <RefreshCw size={24} className="text-white" />
            </div>
            <div>
              <h4 className="text-white font-bold">Easy Returns</h4>
              <p className="text-sm">30-day return policy</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <CreditCard size={24} className="text-white" />
            </div>
            <div>
              <h4 className="text-white font-bold">Secure Payments</h4>
              <p className="text-sm">Protected by Stripe</p>
            </div>
          </div>
        </div>
        
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">ShopWave</h3>
            <p className="mb-4">Your one-stop shop for high-quality products at affordable prices. We're committed to delivering an exceptional shopping experience.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <YouTube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">All Products</a></li>
              <li><a href="#" className="hover:text-white transition">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition">Featured</a></li>
              <li><a href="#" className="hover:text-white transition">Clearance</a></li>
              <li><a href="#" className="hover:text-white transition">Discounted</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-white transition">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex space-x-3">
                <MapPin size={20} className="flex-shrink-0 text-blue-600" />
                <span>123 Commerce St, Shopping City, SC 12345</span>
              </li>
              <li className="flex space-x-3">
                <Phone size={20} className="flex-shrink-0 text-blue-600" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex space-x-3">
                <Mail size={20} className="flex-shrink-0 text-blue-600" />
                <span>support@shopwave.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Payment methods and copyright */}
        <div className="py-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div>
            <p>&copy; 2025 ShopWave. All rights reserved.</p>
          </div>
          <div className="flex space-x-3">
            <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-8 w-auto bg-white p-1 rounded" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" className="h-8 w-auto bg-white p-1 rounded" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196539.png" alt="PayPal" className="h-8 w-auto bg-white p-1 rounded" />
            <img src="https://cdn-icons-png.flaticon.com/512/5968/5968144.png" alt="Apple Pay" className="h-8 w-auto bg-white p-1 rounded" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;