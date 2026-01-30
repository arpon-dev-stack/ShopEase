import { useState, useEffect, useRef } from 'react';

const useElementOnScreen = (options) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Set state based on whether the element is intersecting
      setIsVisible(entry.isIntersecting);
    }, options);

    const currentTarget = containerRef.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    // Clean up the observer when the component unmounts
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};

export default useElementOnScreen;