import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({children}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // This moves the window back to the very top (0,0)
    window.scrollTo(0, 0);
  }, [pathname]); // Runs every time the URL path changes

  return children; // This component doesn't render anything
};

export default ScrollToTop;