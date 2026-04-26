import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TIMELINE } from '../../data/portfolio';

export default function Timeline() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="timeline" style={{
      position: 'relative', zIndex: 10,
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 8rem)',
      background: 'linear-gradient(180deg, transparent, rgba(26,26,46,0.2), transparent)',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="section-title">{'>> BUILD HISTORY LOG'}</div>

        {/* Desktop: horizontal scroll timeline */}
        <div ref={ref} className="timeline-container">
          <div className="timeline-track">
            {/* Conveyor belt line */}
            <div className="timeline-line" />
            {/* Animated dots along the line */}
            <div className="timeline-pulse" />

            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                className="timeline-block"
                initial={{ opacity: 0, y: item.status === 'active' ? 0 : 40, scale: 0.85 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {/* Arm connector */}
                <div className="timeline-arm">
                  <div className="timeline-arm-line" />
                  <div
                    className="timeline-dot"
                    style={{
                      background: item.status === 'active' ? 'var(--orange)' : 'var(--cyan)',
                      boxShadow: item.status === 'active'
                        ? '0 0 12px var(--orange)'
                        : '0 0 8px var(--cyan)',
                      animation: item.status === 'active'
                        ? 'ledPulse 1s ease-in-out infinite'
                        : 'none',
                    }}
                  />
                </div>

                {/* Platform block */}
                <div
                  className="timeline-platform"
                  style={{
                    borderColor: item.status === 'active'
                      ? 'rgba(255,77,0,0.5)'
                      : 'rgba(0,240,255,0.2)',
                    background: item.status === 'active'
                      ? 'rgba(255,77,0,0.06)'
                      : 'var(--card)',
                  }}
                >
                  <div className="timeline-icon">{item.icon}</div>
                  <div className="timeline-year"
                    style={{
                      color: item.status === 'active' ? 'var(--orange)' : 'var(--cyan)',
                    }}
                  >
                    {item.year}
                  </div>
                  <div className="timeline-event">{item.event}</div>
                  <div className="timeline-detail">{item.detail}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .timeline-container {
          overflow-x: auto;
          overflow-y: visible;
          padding-bottom: 2rem;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: var(--cyan) var(--panel);
        }

        .timeline-track {
          display: flex;
          align-items: flex-end;
          gap: 0;
          min-width: max-content;
          padding: 3rem 2rem 1rem;
          position: relative;
        }

        .timeline-line {
          position: absolute;
          bottom: 3.5rem;
          left: 2rem;
          right: 2rem;
          height: 2px;
          background: linear-gradient(90deg, var(--cyan), var(--orange), var(--green));
          opacity: 0.4;
          z-index: 0;
        }

        .timeline-pulse {
          position: absolute;
          bottom: 3.5rem;
          left: 2rem;
          width: 20px;
          height: 2px;
          background: white;
          opacity: 0.8;
          z-index: 1;
          animation: pulseLine 4s linear infinite;
        }

        @keyframes pulseLine {
          0% { left: 2rem; opacity: 0; }
          5% { opacity: 0.8; }
          95% { opacity: 0.8; }
          100% { left: calc(100% - 2rem); opacity: 0; }
        }

        .timeline-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 160px;
          flex-shrink: 0;
          position: relative;
          z-index: 2;
        }

        .timeline-arm {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        .timeline-arm-line {
          width: 1px;
          height: 30px;
          background: linear-gradient(var(--cyan), rgba(0,240,255,0.2));
        }

        .timeline-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .timeline-platform {
          margin-top: 0;
          background: var(--card);
          border: 1px solid rgba(0,240,255,0.2);
          border-radius: 4px;
          padding: 1rem 0.85rem;
          text-align: center;
          width: 145px;
          transition: all 0.3s ease;
        }

        .timeline-platform:hover {
          border-color: rgba(0,240,255,0.5);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,240,255,0.1);
        }

        .timeline-icon {
          font-size: 1.4rem;
          margin-bottom: 0.4rem;
        }

        .timeline-year {
          font-family: var(--font-heading);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          margin-bottom: 0.3rem;
        }

        .timeline-event {
          font-family: var(--font-ui);
          font-size: 0.72rem;
          color: var(--text-primary);
          font-weight: 600;
          margin-bottom: 0.3rem;
          line-height: 1.3;
        }

        .timeline-detail {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .timeline-track {
            flex-direction: column;
            align-items: flex-start;
            min-width: auto;
            padding: 1rem;
            gap: 1rem;
          }

          .timeline-line {
            left: 1.5rem;
            right: auto;
            top: 1rem;
            bottom: 1rem;
            width: 2px;
            height: auto;
          }

          .timeline-pulse { display: none; }

          .timeline-block {
            flex-direction: row;
            align-items: center;
            width: 100%;
            gap: 1rem;
          }

          .timeline-arm {
            flex-direction: row;
            gap: 0;
          }

          .timeline-arm-line {
            width: 30px;
            height: 1px;
          }

          .timeline-platform {
            width: 100%;
            text-align: left;
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
          }
        }
      `}</style>
    </section>
  );
}
