import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = 
          `translate(${posRef.current.x - 10}px, ${posRef.current.y - 10}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', move);
    rafRef.current = requestAnimationFrame(animate);

    // Scale up on hover
    const handleEnter = () => {
      if (cursorRef.current) cursorRef.current.style.transform += ' scale(2)';
    };
    const handleLeave = () => {};

    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      id="custom-cursor"
      ref={cursorRef}
      style={{ willChange: 'transform', position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        {/* Outer ring */}
        <circle cx="12" cy="12" r="10" stroke="#00f0ff" strokeWidth="1" opacity="0.6"/>
        {/* Inner dot */}
        <circle cx="12" cy="12" r="2" fill="#00f0ff"/>
        {/* Crosshair lines */}
        <line x1="12" y1="2" x2="12" y2="7" stroke="#00f0ff" strokeWidth="1" opacity="0.6"/>
        <line x1="12" y1="17" x2="12" y2="22" stroke="#00f0ff" strokeWidth="1" opacity="0.6"/>
        <line x1="2" y1="12" x2="7" y2="12" stroke="#00f0ff" strokeWidth="1" opacity="0.6"/>
        <line x1="17" y1="12" x2="22" y2="12" stroke="#00f0ff" strokeWidth="1" opacity="0.6"/>
      </svg>
    </div>
  );
}
