/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function RestoreScroll() {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (hash !== '' || null) {
      const elem = document.querySelector(hash);
      if (elem) {
        elem.scrollTo(0, 0);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

export default RestoreScroll;
