import { useState, useEffect } from 'react';

/**
 * @param {any} value - The state value (like your filter object)
 * @param {number} delay - Time in ms (default 500ms)
 */
export const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // 1. Set a timer to update the value
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // 2. Cleanup: If 'value' changes before 'delay' is over, 
        // this clears the timer and starts a new one.
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;

{/* Related datas */ }
{/* {relateddatas.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related datas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relateddatas.map((relateddata) => (
              <div key={relateddata.id} className="bg-white rounded-lg shadow-md p-4">
                <img
                  src={relateddata.image}
                  alt={relateddata.name}
                  className="w-full h-40 object-cover rounded mb-4"
                  loading="lazy"
                />
                <h3 className="font-semibold mb-2">{relateddata.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold">${relateddata.price}</span>
                  <button
                    onClick={() => dispatch(addToCart(relateddata))}
                    className="btn-primary text-sm px-3 py-1"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )} */}
