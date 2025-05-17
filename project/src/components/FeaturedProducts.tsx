import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Eye } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    category: "Electronics",
    price: 199.99,
    salePrice: 149.99,
    rating: 4.8,
    image: "https://images.pexels.com/photos/3394654/pexels-photo-3394654.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    isNew: true,
    onSale: true
  },
  {
    id: 2,
    name: "Slim Fit Cotton T-Shirt",
    category: "Clothing",
    price: 29.99,
    rating: 4.5,
    image: "https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    isNew: true,
    onSale: false
  },
  {
    id: 3,
    name: "Smart Home Security Camera",
    category: "Electronics",
    price: 89.99,
    salePrice: 69.99,
    rating: 4.2,
    image: "https://images.pexels.com/photos/3951355/pexels-photo-3951355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    isNew: false,
    onSale: true
  },
  {
    id: 4,
    name: "Ceramic Coffee Mug Set",
    category: "Home & Kitchen",
    price: 24.99,
    rating: 4.7,
    image: "https://images.pexels.com/photos/1251833/pexels-photo-1251833.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    isNew: false,
    onSale: false
  },
  {
    id: 5,
    name: "Natural Moisturizing Face Cream",
    category: "Beauty",
    price: 34.99,
    salePrice: 29.99,
    rating: 4.4,
    image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    isNew: false,
    onSale: true
  },
  {
    id: 6,
    name: "Wireless Charging Pad",
    category: "Electronics",
    price: 49.99,
    rating: 4.3,
    image: "https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    isNew: true,
    onSale: false
  }
];

const FeaturedProducts: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  const displayCount = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : window.innerWidth >= 640 ? 2 : 1;
  const displayProducts = products.slice(startIndex, startIndex + displayCount);

  const prev = () => {
    setStartIndex(i => (i === 0 ? Math.max(0, products.length - displayCount) : Math.max(0, i - 1)));
  };

  const next = () => {
    setStartIndex(i => (i >= products.length - displayCount ? 0 : i + 1));
  };

  return (
    <section id="featured" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
            <p className="text-gray-600 mt-2">Handpicked favorites just for you</p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={prev}
              className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition"
              aria-label="Previous products"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={next}
              className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition"
              aria-label="Next products"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform hover:scale-110"
                />
                
                {product.isNew && (
                  <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold py-1 px-2 rounded">
                    NEW
                  </span>
                )}
                
                {product.onSale && (
                  <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold py-1 px-2 rounded">
                    SALE
                  </span>
                )}
                
                {/* Quick action buttons */}
                <div 
                  className={`absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-2 transition-opacity duration-300 ${
                    hoveredId === product.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <button className="bg-white p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300">
                    <Eye size={18} />
                  </button>
                  <button className="bg-white p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300">
                    <Heart size={18} />
                  </button>
                  <button className="bg-white p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300">
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <span className="text-sm text-gray-500">{product.category}</span>
                <h3 className="font-medium text-lg mt-1 mb-2 hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center">
                  <div className="flex items-end gap-2">
                    {product.onSale ? (
                      <>
                        <span className="text-lg font-bold text-blue-600">${product.salePrice}</span>
                        <span className="text-sm text-gray-400 line-through">${product.price}</span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="#" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition transform hover:scale-105"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;