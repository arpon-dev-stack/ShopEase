import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">ShopEase</h3>
            <p className="text-gray-400 mb-6">
              Your one-stop destination for all shopping needs. Quality products at affordable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white transition">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white transition">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop By Category</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/category/electronics" className="text-gray-400 hover:text-white transition">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/category/fashion" className="text-gray-400 hover:text-white transition">
                  Fashion
                </Link>
              </li>
              <li>
                <Link to="/category/home" className="text-gray-400 hover:text-white transition">
                  Home & Kitchen
                </Link>
              </li>
              <li>
                <Link to="/category/sports" className="text-gray-400 hover:text-white transition">
                  Sports & Outdoors
                </Link>
              </li>
              <li>
                <Link to="/category/books" className="text-gray-400 hover:text-white transition">
                  Books
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='flex flex-col'>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-primary" />
                <span className="text-gray-400">123 Shopping St, City, Country</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-primary" />
                <span className="text-gray-400">support@shopease.com</span>
              </li>
            </ul>
            
            {/* Newsletter */}
            <div className="mt-6 w-full">
              <h5 className="text-lg font-semibold mb-3">Newsletter</h5>
              <div className="flex w-full">
                <input
                  type="email"
                  placeholder="Your email"
                  className="min-w-0 px-4 py-2 text-gray-800 rounded-l-lg focus:outline-none"
                />
                <button className="btn-primary rounded-l-none ">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} ShopEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;