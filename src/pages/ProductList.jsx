import React, { useState, useEffect, useRef, Suspense } from 'react';
import ProductCard from '../components/ProductCard';
import { Filter, Grid, List } from 'lucide-react';
import ProductCardSkeleton from '../components/ProductCardSkeliton';
import { useGetProductsQuery } from '../services/products/product';
import { useSelector } from 'react-redux';

const ProductList = () => {
  const [filter, setFilter] = useState({
    category: 'All',
    maxPrice: 1000,
    minPrice: 0,
    sort: 'Default'
  });
  const { isError, isLoading, data, isSuccess } = useGetProductsQuery(filter);
  const loadContentRef = useRef();
  const [viewMode, setViewMode] = useState('Grid');
  const category = useSelector(state => state.productBrif.categories);

  console.log(data)

  useEffect(() => {
    // 1. Create the observer
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        // 2. If loader is visible AND we aren't already fetching
        if (target.isIntersecting && !isLoading) {
          dispatch(fetchNewProducts());
        }
      },
      { threshold: 1 } // Trigger when 50% of the loader is visible
    );

    // 3. Start watching the ref
    if (loadContentRef.current) {
      observer.observe(loadContentRef.current);
    }

    // 4. Cleanup
    return () => {
      if (loadContentRef.current) {
        observer.unobserve(loadContentRef.current);
      }
    };
  }, [!isLoading]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Sidebar */}
      {isSuccess && <> <div className="lg:w-1/4">
        <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </h3>

          {/* Category Filter */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Categories</h4>
            <div className="space-y-2">
              {category.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter({ ...filter, category: category })}
                  className={`block w-full text-left px-3 py-2 rounded ${filter.category === category
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Price Range</h4>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>${filter.minPrice}</span>
                <span>${filter.maxPrice}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                value={filter.minPrice}
                onChange={e => setFilter({ ...filter, minPrice: e.target.value })}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={filter.maxPrice}
                onChange={e => setFilter({ ...filter, maxPrice: e.target.value })}
                className="w-full"
              />
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <h4 className="font-medium mb-3">Sort By</h4>
            <div className="space-y-2">
              {[
                { value: 'default', label: 'Default' },
                { value: 'price-low', label: 'Price: Low to High' },
                { value: 'price-high', label: 'Price: High to Low' },
                { value: 'rating', label: 'Rating' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter({ ...filter, sort: option.value })}
                  className={`block w-full text-left px-3 py-2 rounded ${filter.sort === option.value
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

        {/* Products Section */}
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {/* Products ({filteredProduct.length}) */}
            </h2>

            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''
                    }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''
                    }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((product) => (
              <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
                <ProductCard
                  product={product}
                />

              </Suspense>
            ))}
          </div>
          {/* <div className="space-y-4">
            {filteredProduct.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md p-6 flex">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded mr-6"
                  loading="lazy"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      ${product.price}
                    </span>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="btn-primary"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </>
      }
      {data?.length === 0 && <div className=" w-full text-center py-12">
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No products found
        </h3>
        <p className="text-gray-500">Try adjusting your filters</p>
      </div>}
      {isError && <div className=" w-full text-center py-12">
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No products found
        </h3>
        <p className="text-gray-500">Try adjusting your filters</p>
      </div>}
      {isLoading && <div className='w-full h-20 bg-blue-500 mt-6 rounded-lg flex justify-center items-center' ref={loadContentRef}>
        <svg className="mr-3 -ml-1 size-10 animate-spin text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      </div>}
    </div>
  );
};

export default ProductList;