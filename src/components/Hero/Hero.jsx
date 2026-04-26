import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { HERO_SUBTITLES, HUD_BADGES } from '../../data/portfolio';
import RoverScene from './RoverScene';
import { sounds } from '../shared/SoundManager';

export default function Hero() {
  const [roverClicked, setRoverClicked] = useState(false);
  const [particles, setParticles] = useState([]);

  const handleRoverClick = () => {
    sounds.beep();
    setRoverClicked(true);
    // Spark particles
    const sparks = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 60 - 30,
      y: Math.random() * 60 - 30,
    }));
    setParticles(sparks);
    setTimeout(() => { setParticles([]); setRoverClicked(false); }, 1500);
  };

  const scrollToProjects = () => {
    sounds.click();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(6rem, 10vw, 9rem) clamp(1.5rem, 6vw, 8rem) 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Depth fog */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '200px',
        background: 'linear-gradient(transparent, var(--bg))',
        zIndex: 5,
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
      }}
        className="hero-grid"
      >
        {/* LEFT — Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Subtitle pre-tag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--orange)',
              letterSpacing: '0.2em',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ color: 'var(--green)', animation: 'ledPulse 1.5s ease-in-out infinite' }}>▶</span>
            OPERATOR PROFILE LOADED
          </motion.div>

          {/* Main heading with glitch */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="glitch"
            data-text="ARAVA SIVA TEJA SATYASRI"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
              fontWeight: 900,
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              letterSpacing: '0.05em',
              marginBottom: '1.5rem',
              textShadow: '0 0 40px rgba(224,224,255,0.3)',
            }}
          >
            ARAVA SIVA TEJA SATYASRI
          </motion.h1>

          {/* Typewriter subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
              color: 'var(--cyan)',
              textShadow: '0 0 15px rgba(0,240,255,0.5)',
              marginBottom: '2rem',
              minHeight: '1.5em',
              letterSpacing: '0.05em',
            }}
          >
            <span>{'> '}</span>
            <Typewriter
              words={HERO_SUBTITLES}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={60}
              deleteSpeed={30}
              delaySpeed={1800}
            />
          </motion.div>

          {/* HUD Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '2.5rem' }}
          >
            {HUD_BADGES.map((badge, i) => (
              <HUDBadge key={i} badge={badge} />
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <button
              className="btn-primary"
              onClick={scrollToProjects}
              style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: 'var(--green)', boxShadow: '0 0 8px var(--green)',
                animation: 'ledPulse 1s ease-in-out infinite',
              }} />
              ▶ INITIALIZE PORTFOLIO
            </button>
            <a
              href="#"
              className="btn-secondary"
              onClick={e => { e.preventDefault(); sounds.click(); alert('Resume PDF — coming soon!'); }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}
            >
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: 'var(--orange)', boxShadow: '0 0 8px var(--orange)',
              }} />
              ⬇ DOWNLOAD DOSSIER
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT — 3D Rover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            height: 'clamp(350px, 50vw, 520px)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Floating hex particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: `${6 + i * 2}px`,
                height: `${6 + i * 2}px`,
                background: `rgba(0,240,255,${0.1 + i * 0.02})`,
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                left: `${10 + (i * 11) % 80}%`,
                bottom: `${5 + (i * 17) % 50}%`,
                animation: `float ${3 + i * 0.7}s ease-in-out ${i * 0.5}s infinite`,
                zIndex: 2,
              }}
            />
          ))}

          {/* Spark particles on click */}
          {particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, scale: 0 }}
              animate={{ opacity: 0, scale: 1, x: p.x, y: p.y }}
              transition={{ duration: 0.6 }}
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                width: '4px', height: '4px',
                background: '#ffcc00',
                borderRadius: '50%',
                boxShadow: '0 0 10px #ffcc00',
                zIndex: 20,
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Rover Canvas */}
          <div style={{
            width: '100%',
            height: '100%',
            cursor: 'pointer',
            position: 'relative',
          }}>
            <Suspense fallback={
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                height: '100%', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
              }}>
                [LOADING ROVER MODEL...]
              </div>
            }>
              <RoverScene onRoverClick={handleRoverClick} />
            </Suspense>

            {/* Click hint */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                textAlign: 'center',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            >
              [CLICK ROVER TO ACTIVATE]
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          zIndex: 10,
          letterSpacing: '0.15em',
        }}
      >
        SCROLL TO EXPLORE
        <div style={{
          width: '1px', height: '40px',
          background: 'linear-gradient(var(--cyan), transparent)',
        }} />
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}

function HUDBadge({ badge }) {
  const colors = {
    green: 'var(--green)',
    cyan: 'var(--cyan)',
    orange: 'var(--orange)',
    muted: 'var(--text-muted)',
  };
  const color = colors[badge.color] || colors.muted;

  return (
    <div className="hud-badge" style={{ borderColor: `${color}44`, color }}>
      {badge.led && (
        <span style={{
          display: 'inline-block',
          width: '6px', height: '6px',
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 6px ${color}`,
          animation: 'ledPulse 2s ease-in-out infinite',
          flexShrink: 0,
        }} />
      )}
      {badge.label}
    </div>
  );
}
