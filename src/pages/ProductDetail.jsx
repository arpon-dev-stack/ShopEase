import { useParams, useNavigate } from 'react-router-dom';
import { Star, Truck, Shield, RefreshCw, ChevronLeft } from 'lucide-react';
import { addToCart, decrementQuantity, removeFromCart } from '../features/cart/cartSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetProductByIdQuery } from '../services/productDetail';

const backend = import.meta.env.VITE_DEMOBACKEND;

const dataDetail = () => {
  const { id } = useParams();
  const { isLoading, data, isError, isSuccess } = useGetProductByIdQuery(id)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  if (isSuccess) {
    console.log(`${backend}${data?.image}`)
  }
  return (
    <div className="space-y-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-primary transition"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back
      </button>

      {/* data Details */}
      {
        isSuccess && <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* data Images */}
            <div className="lg:w-1/2">
              <div className="mb-4">
                <img
                  src={`${backend}${data.image}`}
                  alt={data.name}
                  className="w-full h-96 object-cover rounded-lg"
                  loading='lazy'
                />
              </div>
            </div>

            {/* data Info */}
            <div className="lg:w-1/2">
              <h1 className="text-3xl font-bold mb-4">
                {data.name}
              </h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(data.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {data.rating} • {data.reviews} reviews
                </span>
                <span className="ml-4 px-2 py-1 bg-primary text-white text-sm rounded">
                  {data.category}
                </span>
              </div>

              <p className="text-gray-600 mb-6">
                {data.description}
              </p>

              <div className="text-4xl font-bold text-primary mb-6">
                ${data.price}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center mb-6">
                <span className="mr-4 font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(prev => prev - 1)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-8">
                <button
                  onClick={() => dispatch(addToCart({ ...data, quantity }))}
                  className="btn-primary flex-1 py-3 text-lg"
                >
                  Add to Cart
                </button>
                <button className="btn-secondary flex-1 py-3 text-lg">
                  Buy Now
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Truck className="w-6 h-6 text-primary mr-3" />
                  <div>
                    <div className="font-medium">Free Shipping</div>
                    <div className="text-sm text-gray-600">Over $50</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Shield className="w-6 h-6 text-primary mr-3" />
                  <div>
                    <div className="font-medium">2-Year Warranty</div>
                    <div className="text-sm text-gray-600">Guarantee</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <RefreshCw className="w-6 h-6 text-primary mr-3" />
                  <div>
                    <div className="font-medium">Easy Returns</div>
                    <div className="text-sm text-gray-600">30 Days</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      {
        isLoading &&
        <div className='w-full h-40 bg-blue-500 mt-6 rounded-lg flex justify-center items-center'>
          <svg className="mr-3 -ml-1 size-10 animate-spin text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        </div>
      }
      {
        isError &&
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">data not found</h2>
          <button
            onClick={() => navigate('/datas')}
            className="btn-primary"
          >
            Back to datas
          </button>
        </div>
      }

      {/* Related datas */}
      {/* {relateddatas.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related datas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relateddatas.map((relateddata) => (
              <div key={relateddata.id} className="bg-white rounded-lg shadow-md p-4">
                <img
                  src={relateddata.image}
                  alt={relateddata.name}
                  className="w-full h-40 object-cover rounded mb-4"
                  loading="lazy"
                />
                <h3 className="font-semibold mb-2">{relateddata.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold">${relateddata.price}</span>
                  <button
                    onClick={() => dispatch(addToCart(relateddata))}
                    className="btn-primary text-sm px-3 py-1"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div >
  );
};

export default dataDetail;