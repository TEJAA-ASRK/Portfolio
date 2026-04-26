import { useState, useEffect } from 'react';
import { sounds } from '../shared/SoundManager';

const NAV_LINKS = [
  { href: '#about', label: 'PROFILE' },
  { href: '#projects', label: 'MISSIONS' },
  { href: '#skills', label: 'DIAGNOSTICS' },
  { href: '#achievements', label: 'VAULT' },
  { href: '#experience', label: 'FIELD LOG' },
  { href: '#timeline', label: 'HISTORY' },
  { href: '#contact', label: 'UPLINK' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Detect active section
      const sections = ['about', 'projects', 'skills', 'achievements', 'experience', 'timeline', 'contact'];
      for (const sec of sections.reverse()) {
        const el = document.getElementById(sec);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(`#${sec}`);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (href) => {
    sounds.click();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 500,
      background: scrolled ? 'rgba(6,6,16,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,240,255,0.15)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '1rem clamp(1.5rem, 4vw, 3rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <div
          onClick={() => { sounds.click(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <div style={{
            width: '32px', height: '32px',
            background: 'rgba(0,240,255,0.1)',
            border: '1px solid rgba(0,240,255,0.4)',
            borderRadius: '4px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem',
          }}>⚙</div>
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.9rem',
              color: 'var(--cyan)',
              textShadow: '0 0 10px rgba(0,240,255,0.6)',
              letterSpacing: '0.2em',
            }}>R.O.S</div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
            }}>v1.0 [TEJA.ARAVA]</div>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }} className="desktop-nav">
          {NAV_LINKS.map(link => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              style={{
                border: '1px solid transparent',
                padding: '0.4rem 0.85rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: active === link.href ? 'var(--cyan)' : 'var(--text-muted)',
                cursor: 'pointer',
                letterSpacing: '0.1em',
                transition: 'all 0.2s ease',
                borderRadius: '2px',
                borderColor: active === link.href ? 'rgba(0,240,255,0.3)' : 'transparent',
                background: active === link.href ? 'rgba(0,240,255,0.05)' : 'transparent',
                position: 'relative',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--cyan)';
                e.currentTarget.style.borderColor = 'rgba(0,240,255,0.2)';
              }}
              onMouseLeave={e => {
                if (active !== link.href) {
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.borderColor = 'transparent';
                }
              }}
            >
              {active === link.href && (
                <span style={{
                  display: 'inline-block',
                  width: '5px', height: '5px',
                  borderRadius: '50%',
                  background: 'var(--green)',
                  boxShadow: '0 0 6px var(--green)',
                  marginRight: '0.4rem',
                  verticalAlign: 'middle',
                  animation: 'ledPulse 1.5s ease-in-out infinite',
                }}/>
              )}
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => { setMobileOpen(p => !p); sounds.click(); }}
          style={{
            display: 'none',
            background: 'none',
            border: '1px solid rgba(0,240,255,0.3)',
            color: 'var(--cyan)',
            padding: '0.5rem',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            borderRadius: '2px',
          }}
          className="mobile-menu-btn"
        >
          {mobileOpen ? '✕ CLOSE' : '☰ MENU'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div style={{
          background: 'rgba(6,6,16,0.97)',
          borderBottom: '1px solid rgba(0,240,255,0.2)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}>
          {NAV_LINKS.map(link => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              style={{
                background: 'none', border: 'none',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                padding: '0.75rem 1rem',
                textAlign: 'left',
                borderBottom: '1px solid rgba(0,240,255,0.1)',
              }}
            >
              {'> '}{link.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
