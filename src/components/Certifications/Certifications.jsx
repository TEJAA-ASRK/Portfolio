import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CERTIFICATIONS } from '../../data/portfolio';

export default function Certifications() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="certifications" style={{
      position: 'relative', zIndex: 10,
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 8rem)',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="section-title">{'>> DOWNLOADED INTELLIGENCE MODULES'}</div>

        <div
          ref={ref}
          style={{
            display: 'flex',
            gap: '2rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              style={{ flexShrink: 0, scrollSnapAlign: 'start' }}
            >
              <CertChip cert={cert} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CertChip({ cert, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '300px',
        background: hovered ? `${cert.color}12` : 'var(--card)',
        border: `1px solid ${hovered ? cert.color + '66' : 'rgba(0,240,255,0.15)'}`,
        borderRadius: '8px',
        padding: '2rem',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'none',
        boxShadow: hovered ? `0 20px 40px ${cert.color}20, 0 0 0 1px ${cert.color}40` : '0 4px 20px rgba(0,0,0,0.3)',
        overflow: 'hidden',
      }}
    >
      {/* Slot insert effect — top glow */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)`,
        opacity: hovered ? 1 : 0.3,
        transition: 'opacity 0.3s',
      }} />

      {/* Chip notch (physical chip design) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '40px',
        height: '6px',
        background: 'var(--bg)',
        borderRadius: '0 0 4px 4px',
      }} />

      {/* IC chip contact pads */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        paddingLeft: '4px',
      }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{
            width: '8px',
            height: '4px',
            background: hovered ? cert.color : 'rgba(255,255,255,0.1)',
            borderRadius: '1px',
            transition: 'background 0.3s',
            boxShadow: hovered ? `0 0 4px ${cert.color}` : 'none',
          }} />
        ))}
      </div>
      <div style={{
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        paddingRight: '4px',
      }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{
            width: '8px',
            height: '4px',
            background: hovered ? cert.color : 'rgba(255,255,255,0.1)',
            borderRadius: '1px',
            transition: 'background 0.3s',
            boxShadow: hovered ? `0 0 4px ${cert.color}` : 'none',
          }} />
        ))}
      </div>

      {/* Content */}
      <div style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
        {/* Icon */}
        <div style={{
          fontSize: '2.2rem',
          marginBottom: '1rem',
          filter: hovered ? `drop-shadow(0 0 8px ${cert.color})` : 'none',
          transition: 'filter 0.3s',
        }}>
          {cert.icon}
        </div>

        {/* Badge */}
        <div style={{
          display: 'inline-block',
          padding: '0.2rem 0.6rem',
          background: `${cert.color}18`,
          border: `1px solid ${cert.color}55`,
          borderRadius: '2px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          color: cert.color,
          letterSpacing: '0.1em',
          marginBottom: '0.75rem',
        }}>
          {cert.badge}
        </div>

        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '0.85rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1.35,
          marginBottom: '0.5rem',
          letterSpacing: '0.04em',
        }}>
          {cert.title}
        </h3>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          marginBottom: '0.35rem',
        }}>
          {cert.org}
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: cert.color,
          opacity: 0.7,
        }}>
          {cert.date}
        </div>
      </div>
    </div>
  );
}
