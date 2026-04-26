import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PROJECTS, COMPLEXITY_MAP } from '../../data/portfolio';
import { sounds } from '../shared/SoundManager';

const STATUS_COLORS = {
  ACTIVE: 'var(--green)',
  COMPLETED: 'var(--cyan)',
};

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="projects" style={{
      position: 'relative', zIndex: 10,
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 8rem)',
      background: 'linear-gradient(180deg, transparent, rgba(26,26,46,0.3), transparent)',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="section-title">{'>> ACTIVE MISSION LOGS'}</div>

        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
          }}
        >
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40, x: i % 2 === 0 ? -20 : 20 }}
              animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const complexity = COMPLEXITY_MAP[project.complexity];

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => { setHovered(true); sounds.click(); }}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        background: 'var(--card)',
        border: `1px solid ${hovered ? 'rgba(0,240,255,0.5)' : 'rgba(0,240,255,0.15)'}`,
        borderRadius: '4px',
        padding: '1.75rem',
        cursor: 'pointer',
        transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.15s ease',
        boxShadow: hovered
          ? '0 20px 60px rgba(0,240,255,0.15), 0 0 0 1px rgba(0,240,255,0.2), inset 0 0 30px rgba(0,240,255,0.03)'
          : '0 4px 20px rgba(0,0,0,0.4)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Corner accent */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '20px', height: '20px',
        borderTop: '2px solid var(--cyan)',
        borderLeft: '2px solid var(--cyan)',
        opacity: hovered ? 1 : 0.4,
        transition: 'opacity 0.3s',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0, right: 0,
        width: '20px', height: '20px',
        borderBottom: '2px solid var(--orange)',
        borderRight: '2px solid var(--orange)',
        opacity: hovered ? 1 : 0.4,
        transition: 'opacity 0.3s',
      }} />

      {/* Glowing top line on hover */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: `linear-gradient(90deg, transparent, var(--cyan), transparent)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s',
      }} />

      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.15em',
            marginBottom: '0.25rem',
          }}>
            {project.code}
          </div>
          {/* Redacted reveal */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: hovered ? 'transparent' : '#000',
              transition: 'background 0.4s ease',
              zIndex: 2,
              borderRadius: '2px',
            }} />
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
              fontWeight: 700,
              color: 'var(--cyan)',
              textShadow: hovered ? '0 0 15px rgba(0,240,255,0.6)' : 'none',
              transition: 'text-shadow 0.3s',
              letterSpacing: '0.08em',
            }}>
              {project.name}
            </h3>
          </div>
        </div>

        {/* Status badge */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'flex-end', flexShrink: 0 }}>
          <StatusBadge status={project.status} />
          {project.badge && (
            <div style={{
              padding: '0.2rem 0.5rem',
              background: 'rgba(255,77,0,0.12)',
              border: '1px solid rgba(255,77,0,0.4)',
              borderRadius: '2px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              color: 'var(--orange)',
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
            }}>
              {project.badge}
            </div>
          )}
        </div>
      </div>

      {/* Brief */}
      <p style={{
        fontFamily: 'var(--font-ui)',
        fontSize: '0.82rem',
        color: 'var(--text-muted)',
        lineHeight: 1.65,
        marginBottom: '1.25rem',
      }}>
        {project.brief}
      </p>

      {/* Tech chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
        {project.tech.map(t => (
          <span key={t} className="tech-chip">{t}</span>
        ))}
      </div>

      {/* Complexity bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          color: 'var(--text-muted)',
          marginBottom: '0.4rem',
          letterSpacing: '0.1em',
        }}>
          <span>COMPLEXITY</span>
          <span style={{ color: complexity.color, textShadow: `0 0 8px ${complexity.color}` }}>
            {complexity.label}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '3px' }}>
          {[1, 2, 3, 4, 5].map(n => (
            <div key={n} style={{
              flex: 1,
              height: '5px',
              borderRadius: '2px',
              background: n <= project.complexityLevel
                ? complexity.color
                : 'rgba(255,255,255,0.08)',
              boxShadow: n <= project.complexityLevel
                ? `0 0 6px ${complexity.color}80`
                : 'none',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          className="btn-primary"
          style={{ flex: 1, padding: '0.65rem 1rem', fontSize: '0.7rem' }}
          onClick={() => sounds.click()}
        >
          [VIEW INTEL]
        </button>
        <button
          className="btn-secondary"
          style={{ flex: 1, padding: '0.65rem 1rem', fontSize: '0.7rem' }}
          onClick={() => sounds.click()}
        >
          [SOURCE CODE]
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] || 'var(--text-muted)';
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.35rem',
      padding: '0.2rem 0.6rem',
      background: `${color}14`,
      border: `1px solid ${color}55`,
      borderRadius: '2px',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.6rem',
      color,
      letterSpacing: '0.1em',
      whiteSpace: 'nowrap',
    }}>
      <span style={{
        width: '5px', height: '5px',
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 6px ${color}`,
        animation: status === 'ACTIVE' ? 'ledPulse 1.5s ease-in-out infinite' : 'none',
      }} />
      {status}
    </div>
  );
}
