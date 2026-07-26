// components/Cursor.js
import React, { useEffect, useRef } from 'react';

const Cursor = () => {
  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorRing = cursorRingRef.current;
    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    };

    const animateCursor = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top = ry + 'px';
      requestAnimationFrame(animateCursor);
    };

    document.addEventListener('mousemove', onMouseMove);
    animateCursor();

    return () => document.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <>
      <div id="cursor" ref={cursorRef}></div>
      <div id="cursor-ring" ref={cursorRingRef}></div>
    </>
  );
};

export default Cursor;
