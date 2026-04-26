import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SKILLS } from '../../data/portfolio';

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeSubsystem, setActiveSubsystem] = useState(0);

  return (
    <section id="skills" style={{
      position: 'relative', zIndex: 10,
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 8rem)',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="section-title">{'>> RUNNING DIAGNOSTICS...'}</div>

        {/* Subsystem tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {SKILLS.map((sub, i) => (
            <button
              key={i}
              onClick={() => setActiveSubsystem(i)}
              style={{
                padding: '0.6rem 1.2rem',
                background: activeSubsystem === i
                  ? `${sub.color}18`
                  : 'transparent',
                border: `1px solid ${activeSubsystem === i ? sub.color : 'rgba(255,255,255,0.1)'}`,
                color: activeSubsystem === i ? sub.color : 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                borderRadius: '2px',
                transition: 'all 0.2s ease',
                boxShadow: activeSubsystem === i ? `0 0 12px ${sub.color}30` : 'none',
              }}
            >
              {i === activeSubsystem && (
                <span style={{
                  display: 'inline-block',
                  width: '6px', height: '6px',
                  borderRadius: '50%',
                  background: sub.color,
                  boxShadow: `0 0 6px ${sub.color}`,
                  marginRight: '0.5rem',
                  animation: 'ledPulse 1.5s ease-in-out infinite',
                  verticalAlign: 'middle',
                }} />
              )}
              {sub.subsystem}
            </button>
          ))}
        </div>

        <div ref={ref}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSubsystem}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <CircuitBoard
                subsystem={SKILLS[activeSubsystem]}
                inView={inView}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function CircuitBoard({ subsystem, inView }) {
  const [tooltip, setTooltip] = useState(null);
  const W = 100; // viewBox percentage units
  const H = 100;

  return (
    <div
      className="card-panel grain"
      style={{
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '380px',
      }}
    >
      {/* Subsystem label */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1.5rem',
        fontFamily: 'var(--font-heading)',
        fontSize: '0.65rem',
        color: subsystem.color,
        letterSpacing: '0.2em',
        opacity: 0.6,
      }}>
        {subsystem.subsystem}
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', height: '320px' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {subsystem.edges.map(([from, to], i) => {
          const fromNode = subsystem.nodes.find(n => n.id === from);
          const toNode = subsystem.nodes.find(n => n.id === to);
          if (!fromNode || !toNode) return null;
          return (
            <line
              key={i}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={subsystem.color}
              strokeWidth="0.4"
              opacity="0.25"
              strokeDasharray="2 2"
            />
          );
        })}

        {/* Animated pulse along edges */}
        {subsystem.edges.slice(0, 3).map(([from, to], i) => {
          const fromNode = subsystem.nodes.find(n => n.id === from);
          const toNode = subsystem.nodes.find(n => n.id === to);
          if (!fromNode || !toNode) return null;
          return (
            <circle key={`pulse${i}`} r="0.8" fill={subsystem.color} opacity="0.8" filter="url(#glow)">
              <animateMotion
                dur={`${2 + i}s`}
                repeatCount="indefinite"
                begin={`${i * 0.7}s`}
              >
                <mpath>
                  <path d={`M${fromNode.x},${fromNode.y} L${toNode.x},${toNode.y}`} />
                </mpath>
              </animateMotion>
            </circle>
          );
        })}

        {/* Nodes */}
        {subsystem.nodes.map((node, i) => (
          <g
            key={node.id}
            style={{ cursor: 'pointer' }}
            onClick={() => setTooltip(tooltip?.id === node.id ? null : node)}
          >
            {/* Outer ring pulse */}
            <circle
              cx={node.x}
              cy={node.y}
              r="3.5"
              fill="none"
              stroke={subsystem.color}
              strokeWidth="0.5"
              opacity="0.4"
              filter="url(#glow)"
            >
              <animate
                attributeName="r"
                values="3;4.5;3"
                dur={`${2 + i * 0.3}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.4;0.8;0.4"
                dur={`${2 + i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>

            {/* Main dot */}
            <circle
              cx={node.x}
              cy={node.y}
              r="2.5"
              fill={subsystem.color}
              opacity="0.9"
              filter="url(#glow)"
            />

            {/* Label */}
            <text
              x={node.x}
              y={node.y + 6.5}
              textAnchor="middle"
              fill="var(--text-primary)"
              fontSize="3.8"
              fontFamily="var(--font-mono)"
              opacity="0.85"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            style={{
              position: 'absolute',
              bottom: '1.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--panel)',
              border: `1px solid ${subsystem.color}55`,
              borderRadius: '4px',
              padding: '1rem 1.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--text-primary)',
              textAlign: 'center',
              zIndex: 10,
              boxShadow: `0 0 20px ${subsystem.color}30`,
              minWidth: '200px',
            }}
          >
            <div style={{ color: subsystem.color, fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.85rem' }}>
              {tooltip.label}
            </div>
            <div style={{ color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
              Proficiency: {tooltip.proficiency}%
            </div>
            {/* Mini bar */}
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${tooltip.proficiency}%`,
                background: subsystem.color,
                boxShadow: `0 0 8px ${subsystem.color}`,
                borderRadius: '2px',
              }} />
            </div>
            <button
              onClick={() => setTooltip(null)}
              style={{
                marginTop: '0.75rem',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.65rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.1em',
              }}
            >
              [CLOSE]
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
