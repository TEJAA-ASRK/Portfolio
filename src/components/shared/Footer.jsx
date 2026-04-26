export default function Footer() {
  return (
    <footer style={{
      position: 'relative',
      zIndex: 10,
      borderTop: '1px solid rgba(0,240,255,0.1)',
      padding: '2.5rem clamp(1.5rem, 6vw, 8rem)',
      background: 'rgba(6,6,16,0.8)',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1rem',
            color: 'var(--cyan)',
            textShadow: '0 0 10px rgba(0,240,255,0.6)',
            letterSpacing: '0.2em',
          }}>
            R.O.S
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.05em',
          }}>
            Robotic Operating System Interface v1.0
          </div>
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          textAlign: 'center',
        }}>
          © 2026 ARAVA SIVA TEJA SATYASRI · ALL SYSTEMS OPERATIONAL
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--text-muted)',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
        }}>
          <span style={{ color: 'var(--green)' }}>●</span>
          UPTIME: 99.99%
          <span>·</span>
          CGPA NODE: 9.17
          <span>·</span>
          <span title="Press D for diagnostics, try Konami code!" style={{ cursor: 'help' }}>
            [?]
          </span>
        </div>
      </div>
    </footer>
  );
}
