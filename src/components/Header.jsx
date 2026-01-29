import React, { useState, useRef, useCallback, useMemo } from 'react';
import { NavLink, Link } from 'react-router-dom';
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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceQuery = useDebounce(query, 300); // 300ms is standard; 5000ms is too slow
  const { data, isSuccess, isFetching } = useProductNameQuery(debounceQuery);
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const totalQuantity = selectTotalQuantity(cart);

  const suggestions = useMemo(() => {
    if (!data || !query.trim()) return [];

    return data
      .filter((product) => {
        const productName = product.name.toLowerCase();
        const searchTerms = query.toLowerCase().trim();

        // Matches if the full search sentence exists anywhere in the product name
        return productName.includes(searchTerms);
      })
      .slice(0, 4); // Limit to 4 as requested
  }, [data, query]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 min-w-[280px]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 h-16">
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
                  value={query}
                  onFocus={() => setShowSuggestions(true)}
                  // Timeout allows the onClick of a suggestion to fire before the div vanishes
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <div className="absolute right-3 flex items-center gap-2">
                  {isFetching && <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />}
                  <Search className="text-gray-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
                </div>
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && query.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-100 mt-1 rounded-lg shadow-xl z-[60] overflow-hidden">
                  {suggestions.length > 0 ? (
                    suggestions.map((product) => {
                      // Split name into parts to highlight the matching "sentence"
                      const parts = product.name.split(new RegExp(`(${query})`, 'gi'));

                      return (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}`}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50/50 border-b border-gray-50 last:border-none transition-colors group"
                          onClick={() => {
                            setQuery(product.name);
                            setShowSuggestions(false);
                          }}
                        >
                          <Search className="w-4 h-4 text-gray-300 group-hover:text-primary shrink-0" />
                          <span className="text-sm text-gray-700 truncate">
                            {parts.map((part, i) =>
                              part.toLowerCase() === query.toLowerCase() ? (
                                <strong key={i} className="text-primary font-bold">{part}</strong>
                              ) : (
                                part
                              )
                            )}
                          </span>
                        </Link>
                      );
                    })
                  ) : (
                    !isFetching && (
                      <div className="px-4 py-4 text-sm text-gray-400 text-center italic">
                        No matches for "{query}"
                      </div>
                    )
                  )}
                </div>
              )}
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

            <div className='relative flex group'>
              {isAuthenticated && user ? (<igm src={user?.image} className='h-6 w-6' />) : (<CircleUserRound className='h-6 w-6' />)}
              <div className='absolute top-6 bg-white rounded-lg left-1/2 -translate-x-1/2 hidden flex-col group-hover:flex'>
                {isAuthenticated && user ?
                  <>
                    <Link className='hover:bg-gray-200 text-center p-2 rounded-lg whitespace-nowrap' to='/profile'>Profile</Link>
                    <button onClick={() => dispatch(logout())} className='hover:bg-gray-200 text-center p-2 rounded-lg whitespace-nowrap'>Log out</button>
                  </> :
                  <>
                    <Link className='hover:bg-gray-200 text-center p-2 rounded-lg whitespace-nowrap' to='/profile'>Sign In</Link>
                    <Link className='hover:bg-gray-200 text-center p-2 rounded-lg whitespace-nowrap' to='/profile'>Sign Up</Link>
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
          <div className="md:hidden py-4 border-t border-gray-100 animate-in slide-in-from-top duration-200">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>

            <div className="flex flex-col gap-1">
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
              {/* <button
                className="btn-primary mt-4 w-full py-3"
                onClick={() => { setIsMenuOpen(false); toggleModal(signInRef, 'open'); }}
              >
                Sign In
              </button> */}
            </div>
          </div>
        )}
      </div>

      {/* Auth Modals */}
      {/* <AuthModal
        dialogRef={signInRef}
        title="Sign In"
        onClose={() => toggleModal(signInRef, 'close')}
        switchModal={() => toggleModal(signUpRef, 'open')}
        switchText="Don't have an account? Sign Up"
        formSubmit={() => handleAuth('signin')}
      >
        <AuthInput type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <AuthInput type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
      </AuthModal>

      <AuthModal
        dialogRef={signUpRef}
        title="Create Account"
        onClose={() => toggleModal(signUpRef, 'close')}
        switchModal={() => toggleModal(signInRef, 'open')}
        switchText="Already have an account? Sign In"
        formSubmit={() => handleAuth('signup')}
      >
        <AuthInput type="text" placeholder="Full Name" onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
        <AuthInput type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <AuthInput type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <AuthInput type="password" placeholder="Confirm Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
      </AuthModal> */}
    </header>
  );
};

export default Header;