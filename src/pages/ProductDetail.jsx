import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Truck, Shield, RefreshCw, ChevronLeft } from 'lucide-react';
import { products } from '../data';

const ProductDetail = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Product not found</h2>
        <button
          onClick={() => navigate('/products')}
          className="btn-primary"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

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

      {/* Product Details */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} • {product.reviews} reviews
              </span>
              <span className="ml-4 px-2 py-1 bg-primary text-white text-sm rounded">
                {product.category}
              </span>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="text-4xl font-bold text-primary mb-6">
              ${product.price}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <span className="mr-4 font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-2 w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-8">
              <button
                onClick={() => onAddToCart({ ...product, quantity })}
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

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md p-4">
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold">${relatedProduct.price}</span>
                  <button
                    onClick={() => onAddToCart(relatedProduct)}
                    className="btn-primary text-sm px-3 py-1"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;