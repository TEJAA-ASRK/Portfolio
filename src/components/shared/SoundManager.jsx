import { useEffect } from 'react';

// Web Audio API sound generator
const AudioContext = window.AudioContext || window.webkitAudioContext;
let ctx = null;

function getCtx() {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

function playTone(frequency, type = 'sine', duration = 0.1, vol = 0.15) {
  try {
    const ac = getCtx();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.type = type;
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(vol, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + duration);
  } catch (e) { /* silent fail */ }
}

export const sounds = {
  boot: () => {
    setTimeout(() => playTone(220, 'sine', 0.05, 0.08), 0);
    setTimeout(() => playTone(440, 'sine', 0.05, 0.08), 80);
    setTimeout(() => playTone(880, 'sine', 0.1, 0.1), 160);
  },
  click: () => playTone(800, 'square', 0.04, 0.06),
  ping: () => {
    playTone(1047, 'sine', 0.05, 0.1);
    setTimeout(() => playTone(1319, 'sine', 0.08, 0.12), 60);
  },
  beep: () => playTone(440, 'square', 0.06, 0.08),
  alarm: () => {
    for (let i = 0; i < 4; i++) {
      setTimeout(() => playTone(220, 'sawtooth', 0.15, 0.12), i * 200);
    }
  },
};

export default function SoundManager() {
  useEffect(() => {
    // Boot beep on load (needs user gesture first, so try)
    const tryBoot = () => {
      sounds.boot();
      document.removeEventListener('click', tryBoot);
      document.removeEventListener('keydown', tryBoot);
    };
    document.addEventListener('click', tryBoot, { once: true });
    document.addEventListener('keydown', tryBoot, { once: true });
  }, []);
  return null;
}
