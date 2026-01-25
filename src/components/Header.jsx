import { useState, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCartTotals } from '../features/cart/cartSelectors';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const cart = useSelector(state => state.cart);
  const { itemCount } = useSelector(selectCartTotals);
  const signInDialogRef = useRef();
  const signUpDialogRef = useRef();

  const openSignInModal = () => {
    closeSignUpModel()
    signInDialogRef.current?.showModal();
  };

  const openSignUpModel = () => {
    closeSignInModal();
    signUpDialogRef.current?.showModal();
  }

  const closeSignInModal = () => {
    signInDialogRef.current?.close();
  };

  const closeSignUpModel = () => {
    signUpDialogRef.current?.close();
  }

  // Close if clicking the backdrop
  const handleSignInBackdropClick = (e) => {
    if (e.target === signInDialogRef.current) {
      closeSignInModal();
    }
  };

  const handleSignUpBackdropClick = (e) => {
    if (e.target === signUpDialogRef.current) {
      closeSignUpModel();
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 min-w-[280px]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            ShopEase
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg lg:mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5 hover:text-primary" />
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className={({ isActive }) => `text-gray-700 hover:text-primary transition ${isActive ? 'text-primary' : 'text-black'}`}>
              Home
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => `text-gray-700 hover:text-primary transition ${isActive ? 'text-primary' : 'text-black'}`}>
              Products
            </NavLink>
            <NavLink to="/categories" className={({ isActive }) => `text-gray-700 hover:text-primary transition ${isActive ? 'text-primary' : 'text-black'}`}>
              Categories
            </NavLink>
            <NavLink to="/deals" className={({ isActive }) => `text-gray-700 hover:text-primary transition ${isActive ? 'text-primary' : 'text-black'}`}>
              Deals
            </NavLink>
          </nav>

          {/* Cart and Auth */}
          <div className="flex items-center space-x-5">
            <Link to="/cart" className="relative">
              <ShoppingCart className="sm:w-6 w-9 h-9  sm:h-6 text-gray-700 hover:text-primary transition" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>

            <button className="btn-primary hidden md:block" onClick={openSignInModal}>
              Sign In
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="sm:w-6 sm:h-6 h-9 w-9" />
              ) : (
                <Menu className="sm:w-6 sm:h-6 w-9 h-9" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 relative border-t">
            {/* Search Bar - Mobile */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-primary transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/categories"
                className="text-gray-700 hover:text-primary transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/deals"
                className="text-gray-700 hover:text-primary transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Deals
              </Link>
              <button className="btn-primary mt-4" onClick={openModal}>Sign In</button>
            </div>
          </div>
        )}
        <dialog
          ref={signInDialogRef}
          onClick={handleSignInBackdropClick}
          className="rounded-lg p-0 backdrop:backdrop-blur-[1px]"
        >
          <div className="p-8 w-80 bg-white">
            <h2 className="text-xl font-bold mb-4">Sign In</h2>
            <form className="flex flex-col gap-4">
              <input type="email" placeholder="Email" className="border p-2 rounded ring-2 border-gray-300 focus:outline-none focus:ring-primary" />
              <input type="password" placeholder="Password" className="border p-2 rounded focus:ring-primary ring-2 focus:outline-none border-gray-300" />
              <button type="submit" className="btn-primary text-white p-2 rounded-lg">
                Login
              </button>
              <button type="button" onClick={closeSignInModal} className="text-gray-500 hover:bg-gray-300 active:bg-gray-400 bg-gray-200 font-semibold p-2 rounded-lg text-sm">
                Cancel
              </button>
              <span>Don't have Account</span>
              <button type="button" onClick={openSignUpModel} className="text-black hover:bg-gray-300 active:bg-gray-400 bg-gray-200 font-semibold p-2 rounded-lg text-sm">
                Sign Up
              </button>
            </form>
          </div>
        </dialog>
        <dialog ref={signUpDialogRef} onClick={handleSignUpBackdropClick} className='rounded-lg'>
          <div className="p-8 w-80 bg-white">
            <h2 className="text-xl font-bold mb-4">Sign Up</h2>
            <form className="flex flex-col gap-4">
              <input type="email" placeholder="Full name" className="border p-2 rounded ring-2 border-gray-300 focus:outline-none focus:ring-primary" />
              <input type="password" placeholder="Email" className="border p-2 rounded focus:ring-primary ring-2 focus:outline-none border-gray-300" />
              <input type="email" placeholder="Password" className="border p-2 rounded ring-2 border-gray-300 focus:outline-none focus:ring-primary" />
              <input type="password" placeholder="Conform Password" className="border p-2 rounded focus:ring-primary ring-2 focus:outline-none border-gray-300" />

              <button type="submit" className="btn-primary text-white p-2 rounded-lg">
                Login
              </button>
              <button type="button" onClick={closeSignUpModel} className="text-gray-500 hover:bg-gray-300 active:bg-gray-400 bg-gray-200 font-semibold p-2 rounded-lg text-sm">
                Cancel
              </button>
              <span>Have Account</span>
              <button type="button" onClick={openSignInModal} className="text-black hover:bg-gray-300 active:bg-gray-400 bg-gray-200 font-semibold p-2 rounded-lg text-sm">
                Sign In
              </button>
            </form>
          </div>
        </dialog>
      </div>
    </header>
  );
};

export default Header;