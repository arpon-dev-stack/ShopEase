import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';

const Header = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
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
              <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className={({isActive}) => `text-gray-700 hover:text-primary transition ${isActive ? 'text-primary' : 'text-black'}`}>
              Home
            </NavLink>
            <NavLink to="/products" className={({isActive}) => `text-gray-700 hover:text-primary transition ${isActive ? 'text-primary' : 'text-black'}`}>
              Products
            </NavLink>
            <NavLink to="/categories" className={({isActive}) => `text-gray-700 hover:text-primary transition ${isActive ? 'text-primary' : 'text-black'}`}>
              Categories
            </NavLink>
            <NavLink to="/deals" className={({isActive}) => `text-gray-700 hover:text-primary transition ${isActive ? 'text-primary' : 'text-black'}`}>
              Deals
            </NavLink>
          </nav>

          {/* Cart and Auth */}
          <div className="flex items-center space-x-5">
            <Link to="/cart" className="relative">
              <ShoppingCart className="sm:w-6 w-9 h-9  sm:h-6 text-gray-700 hover:text-primary transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <button className="btn-primary hidden md:block">
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
              <button className="btn-primary mt-4">Sign In</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;