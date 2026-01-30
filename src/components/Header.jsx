import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTotalQuantity } from '../utills/filter';
import { useProductNameQuery } from '../services/products/queryProduct';
import useDebounce from '../utills/debouncer';
import { CircleUserRound } from 'lucide-react';
import { logout } from '../services/auth/authSlice';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Categories', path: '/categories' },
  { name: 'Deals', path: '/deals' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cart = useSelector(state => state.cart.items);
  const [query, setQuery] = useState('')
  const debounceQuery = useDebounce(query, 300); // 300ms is standard; 5000ms is too slow
  const { data, isSuccess, isFetching } = useProductNameQuery(debounceQuery);
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const mobNavRef = useRef(null);

  useEffect(() => {
    console.log("hmm")
    const handleClickOutside = (event) => {
      console.log("work")
      // Check if the click was outside the mobNavRef element
      if (mobNavRef.current && !mobNavRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup listener when component unmounts or modal closes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const totalQuantity = selectTotalQuantity(cart);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 max-w-[1600px] mx-auto w-full sm:px-4 h-16">
      <div className=" mx-auto px-4 h-full relative">
        <div className="flex items-center justify-between gap-4 h-full">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary shrink-0">
            ShopEase
          </Link>

          <div className="hidden md:flex flex-1 max-w-lg lg:mx-8">
            <div className="relative w-full group">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <div className="absolute right-3 flex items-center gap-2">
                  <Search className="text-gray-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
                </div>
              </div>

              {/* Suggestions Dropdown */}
              <div className="absolute top-full left-0 w-full bg-white border border-gray-100 mt-1 rounded-lg shadow-xl z-[60] overflow-hidden">
              </div>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-primary bg-primary/5' : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Cart and Auth */}
          <div className="flex items-center space-x-2 sm:space-x-5">
            <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition" aria-label="View Cart">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                  {totalQuantity > 9 ? "9+" : totalQuantity}
                </span>
              )}
            </Link>

            <div className='relative sm:flex group hidden'>
              {isAuthenticated && user ? (<img src={user?.image} className='h-6 w-6 bg-blue-700 rounded-full' />) : (<CircleUserRound className='h-6 w-6' />)}
              <div className='absolute top-6 bg-white rounded-lg left-1/2 -translate-x-1/2 hidden flex-col group-hover:flex'>
                {isAuthenticated && user ?
                  <>
                    <Link className='hover:bg-primary text-center p-2 rounded-lg whitespace-nowrap' to='/profile'>Profile</Link>
                    <button onClick={() => dispatch(logout())} className='text-center p-2 rounded-lg whitespace-nowrap bg-red-100 hover:bg-red-300'>Log out</button>
                  </> : location.pathname !== '/profile' &&
                  <>
                    <Link className='hover:bg-primary hover:text-white font-semibold text-center p-2 rounded-lg whitespace-nowrap' to='/profile'>Sign In</Link>
                    <Link className='hover:bg-primary hover:text-white font-semibold text-center p-2 rounded-lg whitespace-nowrap' to='/profile'>Sign Up</Link>
                  </>

                }
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden py-4 px-4 border-t border-gray-100 bg-white w-full left-0 top-16 animate-in slide-in-from-top duration-200 absolute" ref={mobNavRef}>
            <div className="relative h-11">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 h-full bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute text-gray-400 w-5 h-5 right-2 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex flex-col mt-2 gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;