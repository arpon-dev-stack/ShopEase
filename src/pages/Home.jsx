import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom'
import { filter } from '../features/product/initialProduct'
import { useSelector, useDispatch } from 'react-redux';
import Hero from '../components/Hero';

const Home = () => {
  const dispatch = useDispatch();
  const initialProduct = useSelector(state => state.initialProduct);
  const cartCount = useSelector(state => state.cart)
  const uniqueArray = ['All', ...new Set(initialProduct.map(product => product.category))];
  const [selectCategory, setSelectCategory] = useState('All');

  const handleSelect = (param) => {
    console.log(param)
    setSelectCategory(param)
  }

  return (
    <div className="">
      {/* Hero Section */}
      {/* <section className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 md:p-12"> */}
      <Hero />
      {/* Categories */}
      <section className='mt-1'>
        <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
        <div className="flex flex-wrap gap-3 mb-6">
          {uniqueArray.map((product, key) => (
            <button
              key={key}
              onClick={() => { dispatch(filter(product)); handleSelect(product) }}
              className={`px-6 py-2 rounded-full transition ${ product === selectCategory
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            initialProduct.filter(product => product.isShow).map(product => <ProductCard
              key={product.id}
              product={product}
            />)
          }
        </div>
      </section>

      {/* Banner */}
      <section className="bg-gray-100 rounded-2xl p-8 text-center">
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