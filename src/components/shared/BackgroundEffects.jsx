// Animated hexagonal grid + circuit traces background
export default function BackgroundEffects() {
  return (
    <>
      {/* Hex grid */}
      <div className="hex-grid" aria-hidden="true">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexPat" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon
                points="30,2 58,17 58,47 30,62 2,47 2,17"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="0.5"
                opacity="0.5"
              />
            </pattern>
            <animateTransform />
          </defs>
          <rect width="100%" height="100%" fill="url(#hexPat)">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite"/>
          </rect>
        </svg>
      </div>

      {/* CRT scanlines */}
      <div className="scanlines" aria-hidden="true" />

      {/* Circuit traces */}
      <div className="circuit-bg" aria-hidden="true">
        {[
          { top: '15%', delay: '0s', dur: '9s' },
          { top: '35%', delay: '2s', dur: '11s' },
          { top: '55%', delay: '4.5s', dur: '8s' },
          { top: '72%', delay: '1s', dur: '12s' },
          { top: '88%', delay: '6s', dur: '10s' },
        ].map((t, i) => (
          <div
            key={i}
            className="circuit-trace"
            style={{
              top: t.top,
              animationDelay: t.delay,
              animationDuration: t.dur,
            }}
          />
        ))}
        {/* Vertical traces */}
        {[
          { left: '20%', delay: '1s', dur: '10s' },
          { left: '60%', delay: '3s', dur: '8s' },
          { left: '85%', delay: '5s', dur: '12s' },
        ].map((t, i) => (
          <div
            key={`v${i}`}
            style={{
              position: 'absolute',
              left: t.left,
              top: '-10%',
              width: '1px',
              height: '40%',
              background: 'linear-gradient(180deg, transparent, var(--orange), transparent)',
              opacity: 0,
              animationDelay: t.delay,
              animationDuration: t.dur,
              animation: `traceFlow ${t.dur} linear ${t.delay} infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}
