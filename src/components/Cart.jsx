import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartDetail from './CartDetail';

const backend = import.meta.env.VITE_DEMOBACKEND
const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);
  const navigate = useNavigate()

  const handleProceed = () => {
    navigate('/checkout', { state: cartItems })
  }

  const calculateTotal = () => {
    return cartItems.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (cartItems.items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
        <p className="text-gray-500">Add some products to your cart</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h2>

      {/* Cart Items */}
      <div className="">
        {cartItems.items.map((item, indx) => <CartDetail key={indx} item={item}/>)}
      </div>

      {/* Cart Summary */}
      <div className="mt-1 pt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-bold">${calculateTotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Shipping</span>
          {/* <span className="font-bold">${shipping}</span> */}
        </div>
        <div className="flex justify-between items-center text-lg font-bold mb-6">
          <span>Total</span>
          <span>${(calculateTotal() + 5.99).toFixed(2)}</span>
        </div>

        <button onClick={handleProceed} className="btn-primary w-full py-3 text-lg">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;