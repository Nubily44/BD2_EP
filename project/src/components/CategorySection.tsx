import React from 'react';

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    items: "240+ items"
  },
  {
    id: 2,
    name: "Clothing",
    image: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    items: "350+ items"
  },
  {
    id: 3,
    name: "Home & Kitchen",
    image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    items: "180+ items"
  },
  {
    id: 4,
    name: "Beauty",
    image: "https://images.pexels.com/photos/2659939/pexels-photo-2659939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    items: "120+ items"
  }
];

const CategorySection: React.FC = () => {
  return (
    <section id="categories" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore our wide selection of products across multiple categories tailored to meet your needs.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${category.image})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <p className="text-sm opacity-80">{category.items}</p>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30">
                <button className="bg-white text-blue-600 px-5 py-2 rounded-md font-medium transform scale-90 group-hover:scale-100 transition-all duration-300">
                  Browse
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;