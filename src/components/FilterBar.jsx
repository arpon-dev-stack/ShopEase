import { Filter, ChevronDown } from 'lucide-react';
import { memo } from 'react';

const FilterBar = memo(({ filter, setFilter, categories }) => {
  return (
    <div className="bg-white rounded-lg shadow-md grid sm:grid-cols-4 sm:grid-rows-1 grid-cols-2 grid-rows-[40px_40px] sm:gap-0 gap-y-2 p-2">
      <span className="text-lg font-semibold justify-center flex items-center gap-2 relative">
        <Filter className="w-5 h-5 inline" />
        <span>Filters</span>
      </span>

      {/* Category Filter */}
      <div className="flex items-center gap-2 justify-center relative hover:bg-gray-100 rounded-lg group">
        <h4 className="font-medium">Categories</h4>
        <ChevronDown />
        <div className='absolute top-[40px] sm:top-[28px] w-full bg-white border-2 z-40 rounded-lg group-hover:block hidden '>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter({ ...filter, category: category })}
              className={`block w-full text-left px-3 py-2 rounded capitalize ${filter.category === category
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
      <div className="flex items-center gap-2 justify-center relative hover:bg-gray-100 rounded-lg group">
        <h4 className="font-medium">Price Range</h4>
        <ChevronDown />
        <div className='absolute top-[40px] bg-white sm:top-[28px] w-full border-2 z-40 rounded-lg hidden group-hover:block p-2'>
          <span>${filter.maxPrice}</span>
          <input
            type="range"
            min="50"
            max="1000"
            value={filter.maxPrice}
            onChange={e => setFilter({ ...filter, maxPrice: e.target.value })}
            className="w-full"
          />
        </div>
      </div>

      {/* Sort Options */}
      <div className='flex gap-2 items-center justify-center relative group hover:bg-gray-100 rounded-lg'>
        <h4 className="font-medium">Sort By</h4>
        <ChevronDown />
        <div className='absolute top-[40px] sm:top-[28px] w-full bg-white border-2 z-40 rounded-lg hidden group-hover:block'>
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
  );
});

export default FilterBar;