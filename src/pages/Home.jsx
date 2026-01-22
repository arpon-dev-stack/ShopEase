import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data';

const Home = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const featuredProducts = products.filter(product => product.rating >= 4.5);

  return (
    <div className="space-y-7">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 md:p-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to ShopEase
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Discover amazing products at unbeatable prices. Free shipping on orders over $50!
          </p>
          <button className="btn-primary bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3">
            Shop Now
          </button>
        </div>
      </section>
      {/* Categories */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.slice(0, 6).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="bg-gray-100 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Summer Sale!</h2>
        <p className="text-xl text-gray-600 mb-6">
          Up to 50% off on selected items. Limited time offer!
        </p>
        <button className="btn-primary text-lg px-8 py-3">
          View Deals
        </button>
      </section>
    </div>
  );
};

export default Home;