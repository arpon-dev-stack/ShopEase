import {memo } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import { addToCart } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const BASE_URL = import.meta.env.VITE_DEMOBACKEND

const ProductCard = memo(({ product}) => {
  const dispatch = useDispatch()
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 grid grid-row-5 grid-cols-1">
      {/* Product Image */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={`${product.image.split('/')[1] === 'src' ? product.image : BASE_URL + product.image}`}
          alt={product.name}
          className="min-w-full min-h-72 object-cover hover:scale-[1.001] transition-transform duration-300"
          loading='lazy'
        />
        <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
          {product.category}
        </span>
      </div>

      {/* Product Info */}
      <div className="p-4 grid grid-rows-subgrd row-span-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            ({product.reviews} reviews)
          </span>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">
              ${product.price}
            </span>
          </div>
          
          <div className="flex space-x-2">
            <Link
              to={`/product/${product.id}`}
              className="btn-secondary text-sm px-3 py-2"
            >
              View
            </Link>
            <button
              onClick={() => {dispatch(addToCart({...product, quantity: 1 }))}}
              className="btn-primary text-sm px-3 py-2 flex items-center"
            >
              <ShoppingBag className="w-4 h-4 mr-1" />
              Add
            </button>
          </div>
        </div> 
      </div>
    </div>
  );
})

export default ProductCard;