import { useState, useEffect, useRef, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeliton';
import { useGetProductsQuery } from '../services/products/product';
import { useSelector } from 'react-redux';
import FilterBar from '../components/FilterBar';
import useDebounce from '../utills/debouncer';

const ProductList = () => {

  const [filter, setFilter] = useState({
    category: 'all',
    maxPrice: 1000,
    page: 0
  });

  const debouncedFilter = useDebounce(filter, 500);
  const { isError, isLoading, data, isSuccess, isFetching } = useGetProductsQuery(debouncedFilter);
  const loaderRef = useRef();
  const categories = useSelector(state => state.productBrif.categories);

  console.log(data)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching) {
          // setFilter({...filter, page: filter.page + 1})
        }
      },
      { threshold: 0.1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [!isFetching]);

  const filteredProducts = useMemo(() => {
    if (!data) return [];
    return data.filter(p =>
      (filter.category === 'all' || p.category === filter.category) &&
      (p.price <= filter.maxPrice)
    );
  }, [data, filter]);

  return (
    <div className="flex flex-col gap-4 max-w-full">
      <FilterBar filter={filter} setFilter={setFilter} categories={categories} />

      <div className="w-full min-h-[700px]">
        {isLoading || isFetching ? ( // Change this line
          <div className="grid grid-cols-1 mob:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(6)].map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : isSuccess ? (
          <div className="grid grid-cols-1 mob:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : isError ||
        < div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600">No products found</h3>
          <p className="text-gray-500">Try adjusting your filters</p>
        </div>
        }
      </div>
      {/* Infinite Scroll Loader */}
      <div ref={loaderRef} className="w-full h-20 flex justify-center items-center">
        {isFetching && data && (
          <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
            {/* ... SVG Path ... */}
          </svg>
        )}
      </div>
    </div >
  );
};

export default ProductList;