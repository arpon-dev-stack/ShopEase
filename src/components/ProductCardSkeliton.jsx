const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Skeleton Image Area */}
      <div className="h-72 bg-gray-200" />

      {/* Skeleton Content */}
      <div className="p-4 space-y-4">
        {/* Title */}
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        
        {/* Description lines */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
        </div>

        {/* Rating Stars placeholder */}
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-200 rounded-full" />
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 bg-gray-200 rounded w-16" />
          <div className="flex space-x-2">
            <div className="h-9 w-16 bg-gray-200 rounded" />
            <div className="h-9 w-16 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;