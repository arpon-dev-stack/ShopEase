import React from 'react';

const ProductDetailSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-10 animate-pulse">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Image Section Skeleton */}
        <div className="lg:w-1/2">
          <div className="sticky top-6">
            <div className="w-full aspect-square bg-gray-200 rounded-xl"></div>
          </div>
        </div>

        {/* Info Section Skeleton */}
        <div className="lg:w-1/2 flex flex-col">
          {/* Category Badge */}
          <div className="mb-4">
            <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
          </div>

          {/* Title */}
          <div className="h-10 w-3/4 bg-gray-300 rounded-lg mb-4"></div>

          {/* Rating Row */}
          <div className="flex items-center mb-6">
            <div className="flex gap-1 mr-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-5 h-5 bg-gray-200 rounded-full"></div>
              ))}
            </div>
            <div className="h-5 w-32 bg-gray-200 rounded-md"></div>
          </div>

          {/* Description Paragraphs */}
          <div className="space-y-3 mb-8">
            <div className="h-4 w-full bg-gray-100 rounded"></div>
            <div className="h-4 w-full bg-gray-100 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
          </div>

          {/* Price */}
          <div className="h-12 w-40 bg-gray-200 rounded-lg mb-8"></div>

          {/* Quantity & Actions Skeleton */}
          <div className="space-y-6 mb-10">
            <div className="flex items-center">
              <div className="h-6 w-20 bg-gray-200 rounded mr-6"></div>
              <div className="h-12 w-32 bg-gray-100 rounded-xl"></div>
            </div>

            <div className="flex gap-4">
              <div className="h-14 flex-1 bg-gray-200 rounded-xl"></div>
              <div className="h-14 flex-1 bg-gray-200 rounded-xl"></div>
            </div>
          </div>

          {/* Trust Badges Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-3 w-16 bg-gray-200 rounded"></div>
                  <div className="h-3 w-12 bg-gray-100 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailSkeleton;