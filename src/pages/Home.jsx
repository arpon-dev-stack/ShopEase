import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Hero from '../components/Hero';

const Home = () => {
  const {items, categories} = useSelector(state => state.productBrif);

  const [selectCategory, setSelectCategory] = useState('all');

  const filteredProducts = selectCategory === 'all' ? items : items.filter(product => product.category === selectCategory)

  return (
    <div className="">
      {/* Hero Section */}
      {/* <section className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 md:p-12"> */}
      <Hero />
      {/* Categories */}
      <section className='mt-3'>
        <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
        <div className="flex flex-wrap gap-3 mb-6">
          {[...categories].map((product, key) => (
            <button
              key={key}
              onClick={() => setSelectCategory(product)}
              className={`px-6 py-2 rounded-full capitalize transition ${product === selectCategory
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
            >
              {product}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 mob:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-1000">
          {filteredProducts.map(product => <ProductCard key={product.id} product={product}/>)}
        </div>
      </section>

      {/* Banner */}
      <section className="bg-gray-100 rounded-2xl mt-4 p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Summer Sale!</h2>
        <p className="text-xl text-gray-600 mb-6">
          Up to 50% off on selected items. Limited time offer!
        </p>
        <Link to='/deals' className="btn-primary text-lg px-8 py-3">
          View Deals
        </Link>
      </section>
    </div>
  );
};

export default Home;