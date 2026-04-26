import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ABOUT_TERMINAL, SKILL_GAUGES } from '../../data/portfolio';

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [visibleLines, setVisibleLines] = useState(0);
  const [gaugesFilled, setGaugesFilled] = useState(false);

  useEffect(() => {
    if (inView) {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setVisibleLines(i);
        if (i >= ABOUT_TERMINAL.length + 2) {
          clearInterval(interval);
          setTimeout(() => setGaugesFilled(true), 300);
        }
      }, 120);
      return () => clearInterval(interval);
    }
  }, [inView]);

  return (
    <section id="about" style={{ position: 'relative', zIndex: 10, padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 8rem)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="section-title">
          {'>> SYSTEM PROFILE MODULE'}
        </div>

        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'start',
          }}
          className="about-grid"
        >
          {/* LEFT — Terminal Neofetch */}
          <div
            className="card-panel grain"
            style={{
              padding: '2rem',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.7rem, 1.3vw, 0.85rem)',
              position: 'relative',
            }}
          >
            {/* Terminal bar */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid rgba(0,240,255,0.15)',
            }}>
              {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
                <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', background: c }} />
              ))}
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: '0.5rem', letterSpacing: '0.1em' }}>
                operator@NIT-AP:~$
              </span>
            </div>

            {/* Prompt */}
            <div style={{ color: 'var(--green)', marginBottom: '1rem' }}>
              {visibleLines > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  operator@NIT-AP:~$ <span style={{ color: 'var(--cyan)' }}>whoami</span>
                </motion.div>
              )}
            </div>

            {/* Terminal lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {ABOUT_TERMINAL.map((line, i) => (
                visibleLines > i + 1 && (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: 'flex', gap: '1.5rem' }}
                  >
                    <span style={{
                      color: 'var(--cyan)',
                      minWidth: '80px',
                      flexShrink: 0,
                      fontWeight: 600,
                    }}>
                      {line.key}
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>:</span>
                    <span style={{
                      color: line.key === 'MISSION' ? 'var(--orange)' :
                        line.key === 'STATUS' ? 'var(--green)' :
                        line.key === 'CGPA' ? '#ffd700' :
                        'var(--text-primary)',
                      fontWeight: line.key === 'MISSION' || line.key === 'STATUS' ? 600 : 400,
                    }}>
                      {line.value}
                    </span>
                  </motion.div>
                )
              ))}
              {visibleLines >= ABOUT_TERMINAL.length + 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ color: 'var(--green)', marginTop: '0.5rem' }}
                >
                  {'>'} <span style={{ animation: 'blink 1s step-end infinite' }}>█</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* RIGHT — Arc Gauges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingTop: '0.5rem' }}>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.85rem',
              color: 'var(--cyan)',
              letterSpacing: '0.2em',
              marginBottom: '0.5rem',
            }}>
              CAPABILITY MATRIX
            </div>

            {SKILL_GAUGES.map((gauge, i) => (
              <GaugeBar key={i} gauge={gauge} filled={gaugesFilled} delay={i * 0.2} />
            ))}

            {/* Location card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={gaugesFilled ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2 }}
              className="card-panel"
              style={{ padding: '1.25rem', marginTop: '0.5rem' }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                CURRENT LOCATION
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: 'var(--green)', boxShadow: '0 0 10px var(--green)',
                  animation: 'ledPulse 2s ease-in-out infinite',
                }} />
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                  East Godavari, Andhra Pradesh, India
                </span>
              </div>
              <div style={{
                marginTop: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
              }}>
                16.9891° N, 82.2475° E
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function GaugeBar({ gauge, filled, delay }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (filled) {
      setTimeout(() => setWidth(gauge.value), delay * 1000);
    }
  }, [filled]);

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.6rem',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          color: 'var(--text-primary)',
          letterSpacing: '0.05em',
        }}>
          {gauge.label}
        </span>
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '0.85rem',
          color: gauge.color,
          fontWeight: 700,
        }}>
          {filled ? gauge.value : 0}%
        </span>
      </div>
      <div style={{
        height: '6px',
        background: 'rgba(255,255,255,0.06)',
        borderRadius: '3px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          height: '100%',
          width: `${width}%`,
          background: `linear-gradient(90deg, ${gauge.color}aa, ${gauge.color})`,
          boxShadow: `0 0 12px ${gauge.color}80`,
          borderRadius: '3px',
          transition: `width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
          position: 'relative',
        }}>
          {/* Shimmer */}
          <div style={{
            position: 'absolute',
            right: 0,
            top: 0,
            height: '100%',
            width: '20px',
            background: 'rgba(255,255,255,0.4)',
            filter: 'blur(3px)',
          }} />
        </div>
      </div>
      {/* Tick marks */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '0.3rem',
      }}>
        {[0, 25, 50, 75, 100].map(tick => (
          <span key={tick} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            color: 'var(--text-muted)',
            opacity: 0.5,
          }}>
            {tick}
          </span>
        ))}
      </div>
    </div>
  );
}
