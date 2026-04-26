import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SOCIAL_LINKS } from '../../data/portfolio';
import { sounds } from '../shared/SoundManager';

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      sounds.ping();
      setTimeout(() => setSent(false), 4000);
    }, 1500);
  };

  return (
    <section id="contact" style={{
      position: 'relative', zIndex: 10,
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 8rem)',
      background: 'linear-gradient(180deg, transparent, rgba(26,26,46,0.4), transparent)',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="section-title">{'>> ESTABLISH UPLINK'}</div>

        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'start',
          }}
          className="contact-grid"
        >
          {/* LEFT — Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="card-panel grain" style={{ padding: '2.5rem' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                marginBottom: '2rem',
                letterSpacing: '0.1em',
              }}>
                UPLINK ESTABLISHED · TRANSMISSION READY · ENCRYPTION: AES-256
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <FormField
                  label="OPERATOR ID"
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={v => setForm(f => ({ ...f, name: v }))}
                />
                <FormField
                  label="UPLINK ADDRESS"
                  type="email"
                  placeholder="your@email.com"
                  hint="ROUTE TO: 723104@student.nitandhra.ac.in"
                  value={form.email}
                  onChange={v => setForm(f => ({ ...f, email: v }))}
                />
                <FormTextarea
                  label="TRANSMISSION DATA"
                  placeholder="Your message..."
                  value={form.message}
                  onChange={v => setForm(f => ({ ...f, message: v }))}
                />

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={sending || !form.name || !form.email || !form.message}
                  style={{
                    position: 'relative',
                    padding: '1rem 2rem',
                    background: sending ? 'rgba(255,77,0,0.3)' : 'rgba(255,77,0,0.15)',
                    border: `2px solid ${sent ? 'var(--green)' : 'var(--orange)'}`,
                    color: sent ? 'var(--green)' : 'var(--orange)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    cursor: sending ? 'wait' : 'pointer',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    boxShadow: sent
                      ? '0 0 20px rgba(127,255,0,0.4)'
                      : '0 0 20px rgba(255,77,0,0.3)',
                  }}
                >
                  {/* Radar pulse ring on hover */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at center, rgba(255,77,0,0.1), transparent)',
                    animation: sending ? 'pulse 1s ease-in-out infinite' : 'none',
                  }} />
                  <span style={{ position: 'relative', zIndex: 1 }}>
                    {sent ? '✓ TRANSMISSION RECEIVED' : sending ? '⟳ TRANSMITTING...' : 'TRANSMIT ▶'}
                  </span>
                </button>
              </form>
            </div>

            {/* Social toggles */}
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.15em',
                marginBottom: '0.5rem',
              }}>
                ALTERNATE UPLINK CHANNELS
              </div>
              <SocialToggle icon="🔗" label="LINKEDIN" value="linkedin.com/in/teja-arava" href={SOCIAL_LINKS.linkedin} color="var(--cyan)" />
              <SocialToggle icon="✉" label="EMAIL" value={SOCIAL_LINKS.email} href={`mailto:${SOCIAL_LINKS.email}`} color="var(--orange)" />
            </div>
          </motion.div>

          {/* RIGHT — World Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card-panel" style={{ padding: '2rem', overflow: 'hidden' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                marginBottom: '1.25rem',
                letterSpacing: '0.1em',
              }}>
                OPERATOR LOCATION · LIVE PING
              </div>

              <IndiaMap />

              {/* Coordinates */}
              <div style={{
                marginTop: '1.25rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
              }}>
                {[
                  { label: 'LATITUDE', value: '16.9891° N' },
                  { label: 'LONGITUDE', value: '82.2475° E' },
                  { label: 'TIMEZONE', value: 'IST UTC+5:30' },
                  { label: 'STATUS', value: '● ONLINE' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>{label}</div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', color: 'var(--cyan)' }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function FormField({ label, type, placeholder, hint, value, onChange }) {
  return (
    <div>
      <label style={{
        display: 'block',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.68rem',
        color: 'var(--cyan)',
        letterSpacing: '0.12em',
        marginBottom: '0.5rem',
      }}>
        {label}
      </label>
      {hint && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
          {hint}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        required
        style={{
          width: '100%',
          background: 'rgba(0,240,255,0.04)',
          border: '1px solid rgba(0,240,255,0.25)',
          borderRadius: '3px',
          padding: '0.75rem 1rem',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          outline: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
        onFocus={e => {
          e.target.style.borderColor = 'var(--cyan)';
          e.target.style.boxShadow = '0 0 12px rgba(0,240,255,0.15)';
        }}
        onBlur={e => {
          e.target.style.borderColor = 'rgba(0,240,255,0.25)';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  );
}

function FormTextarea({ label, placeholder, value, onChange }) {
  return (
    <div>
      <label style={{
        display: 'block',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.68rem',
        color: 'var(--cyan)',
        letterSpacing: '0.12em',
        marginBottom: '0.5rem',
      }}>
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        required
        rows={5}
        style={{
          width: '100%',
          background: 'rgba(0,240,255,0.04)',
          border: '1px solid rgba(0,240,255,0.25)',
          borderRadius: '3px',
          padding: '0.75rem 1rem',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          outline: 'none',
          resize: 'vertical',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          minHeight: '120px',
        }}
        onFocus={e => {
          e.target.style.borderColor = 'var(--cyan)';
          e.target.style.boxShadow = '0 0 12px rgba(0,240,255,0.15)';
        }}
        onBlur={e => {
          e.target.style.borderColor = 'rgba(0,240,255,0.25)';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  );
}

function SocialToggle({ icon, label, value, href, color }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => sounds.click()}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.75rem 1.25rem',
        background: flipped ? `${color}12` : 'transparent',
        border: `1px solid ${flipped ? color + '55' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '3px',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
      }}
    >
      <div style={{
        width: '32px', height: '32px',
        background: `${color}18`,
        border: `1px solid ${color}44`,
        borderRadius: '4px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1rem',
        flexShrink: 0,
        transform: flipped ? 'rotateY(180deg)' : 'none',
        transition: 'transform 0.4s ease',
      }}>
        {flipped ? '→' : icon}
      </div>
      <div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          color,
          letterSpacing: '0.1em',
          marginBottom: '0.15rem',
        }}>
          {label}
        </div>
        <div style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.78rem',
          color: flipped ? color : 'var(--text-muted)',
          transition: 'color 0.2s',
        }}>
          {value}
        </div>
      </div>
      <div style={{
        marginLeft: 'auto',
        width: '6px', height: '6px',
        borderRadius: '50%',
        background: color,
        boxShadow: flipped ? `0 0 8px ${color}` : 'none',
        transition: 'box-shadow 0.2s',
        animation: 'ledPulse 2s ease-in-out infinite',
        flexShrink: 0,
      }} />
    </a>
  );
}

// Simplified India SVG map with blinking dot at East Godavari
function IndiaMap() {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg
        viewBox="0 0 400 480"
        style={{ width: '100%', height: 'auto', opacity: 0.7 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="mapGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* India outline - simplified path */}
        <path
          d="M 150 20 L 180 15 L 220 20 L 255 30 L 290 45 L 310 60 L 320 80 L 315 100 L 325 115 L 330 130 L 320 155 L 330 175 L 325 190 L 310 200 L 300 220 L 285 240 L 280 260 L 265 275 L 260 295 L 250 315 L 240 340 L 225 355 L 215 380 L 210 400 L 200 420 L 195 440 L 185 460 L 175 455 L 165 440 L 160 420 L 155 400 L 145 380 L 130 360 L 115 340 L 100 325 L 90 305 L 80 285 L 70 265 L 75 245 L 65 230 L 60 210 L 70 195 L 80 180 L 75 165 L 85 150 L 95 135 L 90 115 L 100 100 L 110 85 L 120 70 L 130 55 L 140 35 Z"
          fill="rgba(0,240,255,0.06)"
          stroke="rgba(0,240,255,0.35)"
          strokeWidth="1.5"
          filter="url(#mapGlow)"
        />

        {/* Grid lines */}
        {[100, 150, 200, 250, 300, 350, 400].map(y => (
          <line key={y} x1="50" y1={y} x2="380" y2={y} stroke="rgba(0,240,255,0.08)" strokeWidth="0.5" />
        ))}
        {[80, 130, 180, 230, 280, 330].map(x => (
          <line key={x} x1={x} y1="10" x2={x} y2="470" stroke="rgba(0,240,255,0.08)" strokeWidth="0.5" />
        ))}

        {/* East Godavari dot — approximately at (245, 295) in this viewBox */}
        <circle cx="245" cy="295" r="5" fill="#7fff00" opacity="0.9" filter="url(#mapGlow)">
          <animate attributeName="r" values="5;9;5" dur="1.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0.4;0.9" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="245" cy="295" r="3" fill="#7fff00" />

        {/* Label */}
        <text x="255" y="290" fill="#7fff00" fontSize="9" fontFamily="'Share Tech Mono', monospace" opacity="0.9">
          EAST GODAVARI
        </text>
        <text x="255" y="302" fill="rgba(127,255,0,0.6)" fontSize="7.5" fontFamily="'Share Tech Mono', monospace">
          16.9891°N, 82.2475°E
        </text>

        {/* Signal rings */}
        <circle cx="245" cy="295" r="15" fill="none" stroke="#7fff00" strokeWidth="0.8" opacity="0.3">
          <animate attributeName="r" values="12;22;12" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="245" cy="295" r="25" fill="none" stroke="#7fff00" strokeWidth="0.5" opacity="0.15">
          <animate attributeName="r" values="20;35;20" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0;0.2" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
        </circle>

        {/* NIT AP marker */}
        <circle cx="220" cy="310" r="2.5" fill="var(--cyan)" opacity="0.8" />
        <text x="228" y="314" fill="rgba(0,240,255,0.7)" fontSize="7" fontFamily="'Share Tech Mono', monospace">
          NIT AP
        </text>
      </svg>
    </div>
  );
}
