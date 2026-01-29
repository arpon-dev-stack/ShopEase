import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state || {}; // Get the product passed from the last page

  const [method, setMethod] = useState('');

  if (!product) return <div>No product selected.</div>;

  const handlePayment = (e) => {
    e.preventDefault();
    // Logic to process credentials based on 'method'
    console.log("Processing payment for:", product.name, "via", method);
    alert("Purchase Successful!");
    navigate('/success');
  };

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-primary transition-colors group"
      >
        <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
        Back
      </button>
      <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10">
        <h2 className="text-2xl font-bold mb-6">Complete Your Purchase</h2>

        {/* Product Summary */}
        <div className="flex justify-between border-b pb-4 mb-6">
          <span>{product.name} (x{product.quantity})</span>
          <span className="font-bold">${(product.price * product.quantity).toLocaleString()}</span>
        </div>

        <form onSubmit={handlePayment} className="space-y-6">
          <h3 className="font-semibold">Select Transaction Method</h3>

          <div className="grid grid-cols-2 gap-4">
            <label className={`border p-4 rounded-lg cursor-pointer ${method === 'card' ? 'border-primary bg-blue-50' : ''}`}>
              <input type="radio" name="pay" className="hidden" onClick={() => setMethod('card')} />
              <p className="text-center font-medium">Credit/Debit Card</p>
            </label>

            <label className={`border p-4 rounded-lg cursor-pointer ${method === 'paypal' ? 'border-primary bg-blue-50' : ''}`}>
              <input type="radio" name="pay" className="hidden" onClick={() => setMethod('paypal')} />
              <p className="text-center font-medium">PayPal</p>
            </label>
          </div>

          {/* Conditional Credentials Input */}
          {method && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <input type="text" placeholder="Account Name / Number" className="w-full border p-3 rounded-lg" required />
              <button type="submit" className="w-full bg-black text-white py-4 rounded-xl font-bold">
                Pay Now
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Checkout;