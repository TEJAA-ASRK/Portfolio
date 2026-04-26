import { useState } from 'react';
import BootSequence from './components/BootSequence/BootSequence';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Achievements from './components/Achievements/Achievements';
import Experience from './components/Experience/Experience';
import Timeline from './components/Timeline/Timeline';
import Certifications from './components/Certifications/Certifications';
import Contact from './components/Contact/Contact';
import Footer from './components/shared/Footer';
import BackgroundEffects from './components/shared/BackgroundEffects';
import CustomCursor from './components/shared/CustomCursor';
import PowerMeter from './components/shared/PowerMeter';
import EasterEggs from './components/shared/EasterEggs';
import SoundManager from './components/shared/SoundManager';

export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <SoundManager />
      <CustomCursor />
      <EasterEggs />

      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      {booted && (
        <>
          <BackgroundEffects />
          <PowerMeter />
          <Navbar />

          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Achievements />
            <Experience />
            <Timeline />
            <Certifications />
            <Contact />
          </main>

          <Footer />
        </>
      )}
    </>
  );
}
