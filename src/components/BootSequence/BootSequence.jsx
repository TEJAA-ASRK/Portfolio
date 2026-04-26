import { useState, useEffect, useRef } from 'react';
import { BOOT_LINES } from '../../data/portfolio';

export default function BootSequence({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [done, setDone] = useState(false);
  const [flash, setFlash] = useState(false);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef(null);

  const complete = () => {
    setFlash(true);
    setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 400);
    }, 400);
  };

  useEffect(() => {
    const skipHandler = (e) => {
      if (e.key === 'Escape') {
        clearTimeout(timerRef.current);
        complete();
      }
    };
    window.addEventListener('keydown', skipHandler);
    return () => window.removeEventListener('keydown', skipHandler);
  }, []);

  useEffect(() => {
    if (currentLine >= BOOT_LINES.length) {
      timerRef.current = setTimeout(complete, 600);
      return;
    }

    const delay = BOOT_LINES[currentLine].text === '' ? 200 :
      currentLine === BOOT_LINES.length - 2 ? 100 :
      480;

    timerRef.current = setTimeout(() => {
      setLines(prev => [...prev, BOOT_LINES[currentLine]]);
      setCurrentLine(prev => prev + 1);
    }, delay);

    return () => clearTimeout(timerRef.current);
  }, [currentLine]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#000',
      zIndex: 9990,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-mono)',
      padding: '2rem',
      opacity: flash ? 0 : 1,
      transition: flash ? 'opacity 0.4s ease, filter 0.2s ease' : 'none',
      filter: flash ? 'brightness(10)' : 'brightness(1)',
    }}>
      {/* R.O.S Logo */}
      <div style={{
        marginBottom: '3rem',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          color: '#00f0ff',
          letterSpacing: '0.4em',
          textShadow: '0 0 20px #00f0ff, 0 0 60px rgba(0,240,255,0.4)',
          marginBottom: '0.5rem',
        }}>R.O.S</div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: '#7a7aaa',
          letterSpacing: '0.2em',
        }}>ROBOTIC OPERATING SYSTEM INTERFACE v1.0</div>
      </div>

      {/* Terminal Output */}
      <div style={{
        width: '100%',
        maxWidth: '680px',
        background: '#080810',
        border: '1px solid #1a1a3a',
        borderRadius: '4px',
        padding: '1.5rem 2rem',
        minHeight: '280px',
      }}>
        {lines.map((line, i) => (
          <BootLine key={i} line={line} isLast={i === lines.length - 1 && currentLine < BOOT_LINES.length} />
        ))}
        {currentLine >= BOOT_LINES.length && (
          <div style={{ marginTop: '0.5rem', color: '#7fff00', animation: 'ledPulse 1s ease-in-out infinite' }}>
            ▶ PRESS ANY KEY TO CONTINUE
          </div>
        )}
      </div>

      {/* Skip hint */}
      <div style={{
        marginTop: '1.5rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        color: '#444',
        letterSpacing: '0.15em',
      }}>
        [ESC] SKIP BOOT SEQUENCE
      </div>
    </div>
  );
}

function BootLine({ line, isLast }) {
  if (line.text === '') return <div style={{ height: '0.8rem' }} />;

  const isWelcome = line.text.startsWith('WELCOME');
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '0.45rem',
      fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)',
      lineHeight: '1.5',
    }}>
      {/* Main text */}
      <span style={{
        color: isWelcome ? '#00f0ff' : '#7fff00',
        textShadow: isWelcome
          ? '0 0 10px #00f0ff'
          : '0 0 6px rgba(127,255,0,0.6)',
        fontWeight: isWelcome ? 600 : 400,
        fontSize: isWelcome ? '1.05rem' : 'inherit',
        flex: 1,
        letterSpacing: isWelcome ? '0.1em' : '0',
      }}>
        {line.text}
        {isLast && !isWelcome && (
          <span style={{ animation: 'blink 1s step-end infinite', color: '#7fff00' }}> █</span>
        )}
      </span>

      {/* Dots + status */}
      {line.dots && (
        <span style={{ color: '#2a2a4a', letterSpacing: '0.05em', flexShrink: 0 }}>
          {'·'.repeat(Math.max(0, 46 - line.text.length))}
        </span>
      )}
      {line.status && (
        <span style={{
          color: '#7fff00',
          textShadow: '0 0 8px rgba(127,255,0,0.8)',
          fontWeight: 600,
          flexShrink: 0,
        }}>
          {line.status}
        </span>
      )}
    </div>
  );
}
