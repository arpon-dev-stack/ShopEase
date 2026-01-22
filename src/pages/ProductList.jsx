import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data';
import { Filter, Grid, List } from 'lucide-react';

const ProductList = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 500]);

  const filteredProducts = products
    .filter(product => 
      selectedCategory === 'All' || product.category === selectedCategory
    )
    .filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Sidebar */}
      <div className="lg:w-1/4">
        <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </h3>

          {/* Category Filter */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Categories</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`block w-full text-left px-3 py-2 rounded ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Price Range</h4>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <h4 className="font-medium mb-3">Sort By</h4>
            <div className="space-y-2">
              {[
                { value: 'default', label: 'Default' },
                { value: 'price-low', label: 'Price: Low to High' },
                { value: 'price-high', label: 'Price: High to Low' },
                { value: 'rating', label: 'Rating' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`block w-full text-left px-3 py-2 rounded ${
                    sortBy === option.value
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="lg:w-3/4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Products ({filteredProducts.length})
          </h2>
          
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid' ? 'bg-white shadow' : ''
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list' ? 'bg-white shadow' : ''
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md p-6 flex">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded mr-6"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      ${product.price}
                    </span>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="btn-primary"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;