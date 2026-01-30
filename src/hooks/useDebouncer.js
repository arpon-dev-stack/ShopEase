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