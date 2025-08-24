/* eslint-disable no-unused-vars */
import React, {useState, useRef, useEffect} from 'react';

const useMouseHover = (prop = false) => {
  const [ isHovered, setIsHovered ] = useState(prop);
  const ref = useRef(null);
  const handleHover = (event) => {
    if (ref.current && ref.current.contains(event.target)) {
      setIsHovered(true);
    } else {
      setIsHovered(false);
    };
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleHover, true);
    return () => {
      document.removeEventListener('mousemove', handleHover, true);
    }
  }, []);

  return [ ref, isHovered, setIsHovered ];
}

export default useMouseHover;
