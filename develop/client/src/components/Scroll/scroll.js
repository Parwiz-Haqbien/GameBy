import React, { useState, useEffect, useRef } from 'react';
import './scroll.css'

const SaleText = () => {
  const [offset, setOffset] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const containerWidth = containerRef.current.offsetWidth;
    const textWidth = containerRef.current.firstChild.offsetWidth;
    setOffset((containerWidth - textWidth) / 2);

    const animationInterval = setInterval(() => {
      setOffset(offset => {
        if (offset < -textWidth) {
          return containerWidth;
        }
        return offset - 1;
      });
    }, 25);

    return () => {
      clearInterval(animationInterval);
    };
  }, []);

  return (
    <div className="sale-text-container" ref={containerRef}>
      <p
        className="sale-text"
        style={{ transform: `translateX(${offset}px)` }}
      >
        Save now during our on <span className='highlight'>SALE</span> event!
      </p>
    </div>
  );
};

export default SaleText;
