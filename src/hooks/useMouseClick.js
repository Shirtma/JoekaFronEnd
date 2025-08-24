/* eslint-disable no-unused-vars */
import React, {useState, useRef, useEffect} from 'react';

const useMouseClick = (prop = false) => {
  const [ isClicked, setIsClicked ] = useState(prop);
  const ref = useRef(null);
  const handleClick = (event) => {
    if (ref.current && ref.current.contains(event.target)) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    };
  }

  useEffect(() => {
    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
    }
  }, []);

  return { ref, isClicked, setIsClicked };
}

export default useMouseClick;
