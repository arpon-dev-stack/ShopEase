import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Truck, Shield, RefreshCw, ChevronLeft, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { useGetProductByIdQuery } from '../services/products/productDetail';
import ProductCardSkeleton from '../components/ProductCardSkeliton';
import Badge from '../components/Badge';
const BACKEND_URL = import.meta.env.VITE_DEMOBACKEND;

const DataDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector(state => state.auth)

  const { data, isLoading, isError, isSuccess } = useGetProductByIdQuery(id);
  const [quantity, setQuantity] = useState(1);

  // Memoize image URL to prevent recalculation on every render
  const imageUrl = useMemo(() =>
    data?.image ? `${BACKEND_URL}${data.image}` : '',
    [data?.image]);

  const handleAddToCart = () => {
    if (data) {
      dispatch(addToCart({ ...data, quantity }));
    }
  };

  // Guard for decrementing quantity
  const updateQuantity = (val) => {
    setQuantity(prev => Math.max(1, prev + val));
  };

  const handleBuyNow = () => {
      navigate('/checkout', {state: {...data, quantity}})
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-primary transition-colors group"
      >
        <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
        Back
      </button>
      {isSuccess ?
        (<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-10">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Image Section */}
            <div className="lg:w-1/2">
              <div className="sticky top-6">
                <img
                  src={data.image}
                  alt={data.name}
                  className="w-full aspect-square h-48 mob:h-72 sm:h-[370px] md:h-[400px] lg:h-[450px] object-cover rounded-xl shadow-inner"
                  loading="eager"
                />
              </div>
            </div>

            {/* Info Section */}
            <div className="lg:w-1/2 flex flex-col">
              <div className="mb-2">
                <span className="px-3 py-1 bg-blue-50 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
                  {data.category}
                </span>
              </div>

              <h1 className="text-4xl font-extrabold text-gray-900 mb-4 capitalize">{data.name}</h1>

              <div className="flex items-center mb-6">
                <div className="flex items-center mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(data.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">
                  {data.rating} <span className="text-gray-400 mx-1">•</span> {data.reviews} reviews
                </span>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-8 capitalize">{data.description}</p>

              <div className="text-5xl font-bold text-gray-900 mb-8">
                ${data.price.toLocaleString()}
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-6 mb-10">
                <div className="flex items-center">
                  <span className="mr-6 font-semibold text-gray-700">Quantity</span>
                  <div className="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => updateQuantity(-1)}
                      className="px-5 py-3 hover:bg-gray-50 transition-colors font-bold"
                    >-</button>
                    <span className="px-6 py-3 bg-white min-w-[60px] text-center font-bold text-lg">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(1)}
                      className="px-5 py-3 hover:bg-gray-50 transition-colors font-bold"
                    >+</button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="bg-primary hover:bg-primary/90 text-white flex-1 py-4 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-primary/20"
                  >
                    Add to Cart
                  </button>
                  <button className="border-2 border-gray-200 hover:border-gray-800 flex-1 py-4 rounded-xl font-bold text-lg transition-all" onClick={handleBuyNow}>
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
                <Badge icon={<Truck />} title="Free Shipping" sub="Over $50" />
                <Badge icon={<Shield />} title="2-Year Warranty" sub="Guaranteed" />
                <Badge icon={<RefreshCw />} title="Easy Returns" sub="30 Days" />
              </div>
            </div>
          </div>
        </div>) : isLoading ? (
          <ProductCardSkeleton />
        ) : (
          <div className="text-center py-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
            <button onClick={() => navigate(-1)} className="btn-primary">
              Go Back
            </button>
          </div>
        )}
    </div>
  );
};


export default DataDetail;