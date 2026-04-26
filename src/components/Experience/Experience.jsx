import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { EXPERIENCE } from '../../data/portfolio';

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="experience" style={{
      position: 'relative', zIndex: 10,
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 8rem)',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="section-title">{'>> FIELD DEPLOYMENT RECORDS'}</div>

        <div ref={ref} style={{ maxWidth: '860px' }}>
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <ExperienceCard exp={exp} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ exp }) {
  return (
    <div
      className="card-panel grain"
      style={{ padding: '2.5rem', position: 'relative' }}
    >
      {/* Classification header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid rgba(0,240,255,0.15)',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--orange)',
            letterSpacing: '0.2em',
            marginBottom: '0.3rem',
          }}>
            CLASSIFICATION: {exp.classification}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
          }}>
            SECTOR: {exp.sector}
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1rem',
          background: 'rgba(127,255,0,0.08)',
          border: '1px solid rgba(127,255,0,0.4)',
          borderRadius: '2px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--green)',
          fontWeight: 600,
          letterSpacing: '0.1em',
        }}>
          <span style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: 'var(--green)', boxShadow: '0 0 8px var(--green)',
          }} />
          {exp.status}
        </div>
      </div>

      {/* Role + Org */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1rem, 2vw, 1.3rem)',
          fontWeight: 700,
          color: 'var(--cyan)',
          textShadow: '0 0 20px rgba(0,240,255,0.4)',
          letterSpacing: '0.06em',
          marginBottom: '0.4rem',
        }}>
          {exp.role}
        </h3>
        <div style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '1rem',
          color: 'var(--text-primary)',
          marginBottom: '0.3rem',
        }}>
          {exp.org}
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--orange)',
          letterSpacing: '0.08em',
        }}>
          {exp.period}
        </div>
      </div>

      {/* Bullets */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {exp.bullets.map((bullet, i) => (
          <li key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{
              color: 'var(--cyan)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              flexShrink: 0,
              marginTop: '0.15rem',
            }}>
              ▸
            </span>
            <span style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.88rem',
              color: 'var(--text-muted)',
              lineHeight: 1.65,
            }}>
              {bullet}
            </span>
          </li>
        ))}
      </ul>

      {/* Decorative corner elements */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1.5rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        color: 'var(--text-muted)',
        opacity: 0.4,
        letterSpacing: '0.1em',
      }}>
        REF: ONGC-2025-MECH-01
      </div>
    </div>
  );
}
