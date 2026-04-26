import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ACHIEVEMENTS } from '../../data/portfolio';

const TIER_COLORS = {
  gold: { border: '#ffd700', glow: 'rgba(255,215,0,0.3)', bg: 'rgba(255,215,0,0.05)' },
  silver: { border: '#c0c0c0', glow: 'rgba(192,192,192,0.2)', bg: 'rgba(192,192,192,0.04)' },
  bronze: { border: '#cd7f32', glow: 'rgba(205,127,50,0.2)', bg: 'rgba(205,127,50,0.04)' },
};

export default function Achievements() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="achievements" style={{
      position: 'relative', zIndex: 10,
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 8rem)',
      background: 'linear-gradient(180deg, transparent, rgba(26,26,46,0.3), transparent)',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="section-title">{'>> COMMENDATION RECORDS'}</div>

        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {ACHIEVEMENTS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <AchievementCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementCard({ item }) {
  const colors = TIER_COLORS[item.tier];

  return (
    <div
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}55`,
        borderRadius: '6px',
        padding: '1.75rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        animation: 'floatSlow 4s ease-in-out infinite',
        animationDelay: `${Math.random() * 2}s`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${colors.border}cc`;
        e.currentTarget.style.boxShadow = `0 0 30px ${colors.glow}, 0 10px 40px rgba(0,0,0,0.4)`;
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `${colors.border}55`;
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'none';
      }}
    >
      {/* Shimmer border top */}
      <div style={{
        position: 'absolute',
        top: 0, left: '-100%', right: 0,
        height: '1px',
        background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)`,
        animation: 'shimmer 3s linear infinite',
        backgroundSize: '200% auto',
      }} />

      {/* 3D rotating badge icon */}
      <div style={{
        fontSize: '2.5rem',
        marginBottom: '1rem',
        display: 'inline-block',
        animation: 'float 3s ease-in-out infinite',
        filter: `drop-shadow(0 0 8px ${colors.border}80)`,
      }}>
        {item.icon}
      </div>

      {/* Tier label */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        padding: '0.2rem 0.5rem',
        background: `${colors.border}20`,
        border: `1px solid ${colors.border}55`,
        borderRadius: '2px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.58rem',
        color: colors.border,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        {item.tier}
      </div>

      {/* Year */}
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        right: '1.25rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        color: 'var(--text-muted)',
        opacity: 0.5,
      }}>
        {item.year}
      </div>

      <h3 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '0.95rem',
        fontWeight: 700,
        color: colors.border,
        marginBottom: '0.4rem',
        letterSpacing: '0.05em',
        lineHeight: 1.3,
      }}>
        {item.title}
      </h3>

      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        color: 'var(--text-muted)',
        marginBottom: '0.75rem',
        letterSpacing: '0.05em',
      }}>
        {item.org}
      </div>

      <p style={{
        fontFamily: 'var(--font-ui)',
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        lineHeight: 1.6,
      }}>
        {item.desc}
      </p>
    </div>
  );
}
