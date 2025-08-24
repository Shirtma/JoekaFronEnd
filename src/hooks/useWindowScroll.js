/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';

const useWindowScroll = () => {
  const [ pageYOffset, setPageYOffset ] = useState(0);

  useEffect(() => {
  const handleScroll = () => {
    const top = window.scrollY;
    if (top > 1) {
      setPageYOffset(top)
    } else {
      setPageYOffset(0)
    }
  }

    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    }

  }, []);

  return [pageYOffset]
}

export default useWindowScroll;