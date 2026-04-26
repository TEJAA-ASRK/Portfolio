import { useEffect, useState } from 'react';
import { sounds } from './SoundManager';

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

const DIAG_LINES = [
  '> RUNNING SYSTEM DIAGNOSTICS...',
  '> CPU LOAD: ████████░░ 82% [ROBOTICS ENGINE]',
  '> NEURAL NET: ███████░░░ 71% [ACTIVE INFERENCE]',
  '> SERVO ARRAY: ██████████ 100% [ALL NOMINAL]',
  '> SENSOR FUSION: █████████░ 94% [IMU + LIDAR OK]',
  '> MEMORY: 9.17 GB / 10.00 GB [HIGH EFFICIENCY]',
  '> UPTIME: 02y 08m 24d 01h [NIT-AP NODE]',
  '> ACTIVE MISSIONS: HVS-BOT [FUNDED], SMA-ML',
  '> NETWORK: RESEARCH-NET [LATENCY: 2ms]',
  '> STATUS: ALL SYSTEMS OPERATIONAL ✓',
  '',
  '> Press [D] again or [ESC] to close.',
];

export default function EasterEggs() {
  const [konamiIdx, setKonamiIdx] = useState(0);
  const [intruder, setIntruder] = useState(false);
  const [diag, setDiag] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      const key = e.key;

      // Konami
      if (key === KONAMI[konamiIdx]) {
        const next = konamiIdx + 1;
        if (next === KONAMI.length) {
          setKonamiIdx(0);
          setIntruder(true);
          sounds.alarm();
          setTimeout(() => setIntruder(false), 3000);
        } else {
          setKonamiIdx(next);
        }
      } else {
        setKonamiIdx(0);
      }

      // D key → diagnostics
      if (key === 'd' || key === 'D') {
        setDiag(prev => !prev);
        sounds.beep();
      }

      // ESC → close diag
      if (key === 'Escape') setDiag(false);
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [konamiIdx]);

  return (
    <>
      {/* Intruder Alert */}
      {intruder && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9995,
          background: 'rgba(200,0,0,0.18)',
          border: '4px solid #ff0000',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: '1rem',
          animation: 'intruderFlash 0.3s ease-in-out infinite',
          pointerEvents: 'none',
        }}>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            color: '#ff0000',
            textShadow: '0 0 30px #ff0000',
            letterSpacing: '0.3em',
            textAlign: 'center',
          }}>⚠ INTRUDER ALERT ⚠</div>
          <div style={{ fontFamily: 'var(--font-mono)', color: '#ff4444', fontSize: '1rem' }}>
            UNAUTHORIZED ACCESS DETECTED — INITIATING LOCKDOWN
          </div>
        </div>
      )}

      {/* Diagnostics Overlay */}
      {diag && (
        <div
          onClick={() => setDiag(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9993,
            background: 'rgba(6,6,16,0.93)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            color: 'var(--green)',
            cursor: 'pointer',
            padding: '2rem',
          }}>
          <div style={{
            background: 'var(--panel)',
            border: '1px solid var(--green)',
            borderRadius: '4px',
            padding: '2.5rem',
            maxWidth: '600px',
            width: '100%',
            boxShadow: '0 0 40px rgba(127,255,0,0.15)',
          }}>
            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(127,255,0,0.3)', paddingBottom: '1rem' }}>
              <span style={{ fontSize: '1.1rem', letterSpacing: '0.2em' }}>
                R.O.S // SYSTEM DIAGNOSTICS v1.0
              </span>
            </div>
            {DIAG_LINES.map((line, i) => (
              <div key={i} style={{
                fontSize: '0.82rem',
                lineHeight: '1.9',
                opacity: line === '' ? 0 : 1,
              }}>
                {line}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
