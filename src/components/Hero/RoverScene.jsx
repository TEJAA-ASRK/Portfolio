import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function RoverMesh({ onClick }) {
  const roverRef = useRef();
  const wheelsRef = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const spinning = useRef(false);
  const spinTime = useRef(0);
  const { viewport } = useThree();

  useEffect(() => {
    const handler = (e) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  useFrame((state, delta) => {
    if (!roverRef.current) return;
    const t = state.clock.elapsedTime;

    // Idle bob + rotate
    roverRef.current.rotation.y += delta * 0.3;
    roverRef.current.position.y = Math.sin(t * 0.8) * 0.05;

    // Mouse tilt (subtle)
    roverRef.current.rotation.x += (mouse.current.y * 0.15 - roverRef.current.rotation.x) * 0.05;

    // Wheel spin on click
    if (spinning.current) {
      spinTime.current += delta;
      wheelsRef.current.forEach(w => {
        if (w) w.rotation.x += delta * 8;
      });
      if (spinTime.current > 1.5) {
        spinning.current = false;
        spinTime.current = 0;
      }
    }
  });

  const handleClick = () => {
    spinning.current = true;
    spinTime.current = 0;
    if (onClick) onClick();
  };

  const bodyMat = new THREE.MeshStandardMaterial({
    color: '#1a2a4a',
    metalness: 0.8,
    roughness: 0.3,
    emissive: '#00f0ff',
    emissiveIntensity: 0.1,
  });

  const accentMat = new THREE.MeshStandardMaterial({
    color: '#00f0ff',
    emissive: '#00f0ff',
    emissiveIntensity: 0.6,
    metalness: 0.9,
    roughness: 0.1,
  });

  const wheelMat = new THREE.MeshStandardMaterial({
    color: '#333344',
    metalness: 0.7,
    roughness: 0.5,
  });

  const orangeMat = new THREE.MeshStandardMaterial({
    color: '#ff4d00',
    emissive: '#ff4d00',
    emissiveIntensity: 0.5,
  });

  const wheelPositions = [
    [-0.52, -0.18, 0.45],
    [0.52, -0.18, 0.45],
    [-0.52, -0.18, -0.45],
    [0.52, -0.18, -0.45],
  ];

  return (
    <group ref={roverRef} onClick={handleClick} scale={[1.1, 1.1, 1.1]}>
      {/* Main body */}
      <mesh material={bodyMat} position={[0, 0, 0]}>
        <boxGeometry args={[0.9, 0.25, 0.7]} />
      </mesh>

      {/* Top sensor deck */}
      <mesh material={bodyMat} position={[0, 0.2, 0]}>
        <boxGeometry args={[0.7, 0.12, 0.5]} />
      </mesh>

      {/* Camera mast */}
      <mesh material={accentMat} position={[0.2, 0.42, 0]}>
        <boxGeometry args={[0.05, 0.22, 0.05]} />
      </mesh>
      {/* Camera eye */}
      <mesh material={accentMat} position={[0.27, 0.48, 0]}>
        <boxGeometry args={[0.12, 0.07, 0.07]} />
      </mesh>
      {/* Camera lens */}
      <mesh material={orangeMat} position={[0.34, 0.48, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.03, 8]} />
        <mesh rotation={[0, 0, Math.PI / 2]} />
      </mesh>

      {/* Antenna */}
      <mesh material={accentMat} position={[-0.15, 0.5, 0.1]}>
        <cylinderGeometry args={[0.012, 0.008, 0.28, 6]} />
      </mesh>
      {/* Antenna tip */}
      <mesh material={orangeMat} position={[-0.15, 0.66, 0.1]}>
        <sphereGeometry args={[0.025, 6, 6]} />
      </mesh>

      {/* Solar panel */}
      <mesh material={new THREE.MeshStandardMaterial({ color: '#001133', metalness: 0.6, roughness: 0.3, emissive: '#000033' })} position={[-0.15, 0.32, 0.0]}>
        <boxGeometry args={[0.35, 0.01, 0.28]} />
      </mesh>

      {/* Front bumper */}
      <mesh material={accentMat} position={[0.47, -0.06, 0]}>
        <boxGeometry args={[0.04, 0.15, 0.65]} />
      </mesh>

      {/* Back bumper */}
      <mesh material={orangeMat} position={[-0.47, -0.06, 0]}>
        <boxGeometry args={[0.04, 0.1, 0.65]} />
      </mesh>

      {/* Suspension arms */}
      {wheelPositions.map((pos, i) => (
        <mesh key={`arm${i}`} material={bodyMat}
          position={[pos[0] * 0.7, pos[1] + 0.05, pos[2]]}>
          <boxGeometry args={[0.15, 0.04, 0.06]} />
        </mesh>
      ))}

      {/* Wheels */}
      {wheelPositions.map((pos, i) => (
        <group key={i} ref={el => wheelsRef.current[i] = el} position={pos} rotation={[0, 0, Math.PI / 2]}>
          <mesh material={wheelMat}>
            <cylinderGeometry args={[0.16, 0.16, 0.1, 10]} />
          </mesh>
          {/* Wheel rim accent */}
          <mesh material={accentMat}>
            <torusGeometry args={[0.12, 0.015, 6, 12]} />
          </mesh>
        </group>
      ))}

      {/* Undercarriage lights */}
      {[[-0.2, 0.1], [0.2, 0.1], [0, -0.1]].map(([x, z], i) => (
        <mesh key={`light${i}`} material={accentMat} position={[x, -0.14, z]}>
          <boxGeometry args={[0.04, 0.02, 0.04]} />
        </mesh>
      ))}

      {/* Lights */}
      <pointLight color="#00f0ff" intensity={1.5} distance={3} position={[0.3, 0.5, 0]} />
      <pointLight color="#ff4d00" intensity={0.8} distance={2} position={[-0.3, 0.2, 0]} />
    </group>
  );
}

function RadarRing() {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = -state.clock.elapsedTime * 0.8;
    }
  });

  return (
    <group position={[0, -0.5, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
      {/* Rings */}
      {[1.2, 1.8, 2.4].map((r, i) => (
        <mesh key={i}>
          <torusGeometry args={[r, 0.01, 6, 64]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.15 - i * 0.04} />
        </mesh>
      ))}
      {/* Sweep */}
      <mesh ref={meshRef}>
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.25} side={THREE.DoubleSide} />
        <circleGeometry args={[2.4, 64, 0, Math.PI / 4]} />
      </mesh>
    </group>
  );
}

export default function RoverScene({ onRoverClick }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0.8, 2.8], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[2, 3, 2]} intensity={0.8} color="#e0e0ff" />
        <directionalLight position={[-2, 1, -1]} intensity={0.3} color="#ff4d00" />

        <RadarRing />
        <RoverMesh onClick={onRoverClick} />
      </Canvas>
    </div>
  );
}
