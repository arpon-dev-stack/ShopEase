import { Link } from 'react-router-dom';
import Cart from '../components/Cart'
import { useSelector} from 'react-redux';
import { selectCartTotals } from '../utills/filter';

const CartPage = () => {
const cart = useSelector(state => state.cart.items)
const {shipping, subtotal, tax, total} = selectCartTotals(cart);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <Cart/>
        </div>

        {/* Order Summary - Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  {subtotal}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">${shipping}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">
                  {tax}
                </span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>
                    {total}
                  </span>
                </div>
              </div>
            </div>

            <button className="btn-primary w-full py-3 mb-4">
              Proceed to Checkout
            </button>

            <div className="text-center">
              <Link to="/products" className="text-primary hover:underline">
                Continue Shopping
              </Link>
            </div>

            {/* Promo Code */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="font-medium mb-3">Promo Code</h3>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 px-4 min-w-0 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="btn-secondary rounded-l-none">
                  Apply
                </button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <h3 className="font-medium mb-3">We Accept</h3>
              <div className="grid sm:grid-cols-4 grid-cols-2 sm:grid-rows-1 lg:grid-cols-2 grid-rows-2 gap-2 grid-flow-row">
                {['Visa', 'MasterCard', 'PayPal', 'Apple Pay'].map((method) => (
                  <div
                    key={method}
                    className="flex overflow-hidden justify-center items-center bg-gray-100 rounded-lg p-2 text-center text-sm h-12"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;