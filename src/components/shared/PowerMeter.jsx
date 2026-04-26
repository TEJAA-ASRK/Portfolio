import { useEffect, useState } from 'react';

export default function PowerMeter() {
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setFill(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div id="power-meter">
        <div id="power-meter-fill" style={{ height: `${fill}%` }} />
      </div>
      <span id="power-meter-label" style={{
        position: 'fixed',
        right: '22px',
        top: '50%',
        transform: 'translateY(-50%) rotate(90deg)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.55rem',
        color: 'var(--text-muted)',
        letterSpacing: '0.1em',
        whiteSpace: 'nowrap',
        zIndex: 100,
        pointerEvents: 'none',
      }}>
        PWR {Math.round(fill)}%
      </span>
    </>
  );
}
