import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { PersonaType } from '@/types/twin';

interface DigitalTwinAvatarProps {
  persona: PersonaType;
  indicators: {
    hormoneBalance: number;
    inflammationIndex: number;
    energyLevel: number;
  };
}

function AuraGlow({ persona }: { persona: PersonaType }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const auraColor = useMemo(() => {
    switch (persona) {
      case 'balanced-bloom':
        return new THREE.Color('#4ade80');
      case 'stress-amplified':
      case 'inflammation-spike':
        return new THREE.Color('#f97316');
      case 'insulin-resistant':
      case 'irregular-rhythm':
      case 'hormone-reset':
        return new THREE.Color('#eab308');
      default:
        return new THREE.Color('#a78bfa');
    }
  }, [persona]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshBasicMaterial 
        color={auraColor} 
        transparent 
        opacity={0.15} 
        side={THREE.BackSide}
      />
    </mesh>
  );
}

function FloatingIcon({ position, color, delay = 0 }: { 
  position: [number, number, number]; 
  color: string;
  delay?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[0.15, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
}

function Avatar({ persona, indicators }: DigitalTwinAvatarProps) {
  const bodyRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (bodyRef.current) {
      // Subtle breathing animation
      const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.02;
      bodyRef.current.scale.set(1, breathe, 1);
    }
  });

  const bodyColor = useMemo(() => {
    if (persona === 'balanced-bloom') return '#f0e6f5';
    if (persona === 'stress-amplified' || persona === 'inflammation-spike') return '#fef3e6';
    return '#f5f0fa';
  }, [persona]);

  return (
    <group ref={bodyRef}>
      {/* Aura */}
      <AuraGlow persona={persona} />
      
      {/* Body - Stylized humanoid form */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
        {/* Torso */}
        <Sphere args={[0.8, 32, 32]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color={bodyColor}
            speed={2}
            distort={0.1}
            radius={1}
          />
        </Sphere>
        
        {/* Head */}
        <Sphere args={[0.5, 32, 32]} position={[0, 1.1, 0]}>
          <MeshDistortMaterial
            color={bodyColor}
            speed={2}
            distort={0.05}
            radius={1}
          />
        </Sphere>
        
        {/* Inner glow core */}
        <Sphere args={[0.4, 32, 32]} position={[0, 0, 0]}>
          <meshBasicMaterial 
            color={persona === 'balanced-bloom' ? '#86efac' : '#c4b5fd'} 
            transparent 
            opacity={0.4}
          />
        </Sphere>
      </Float>

      {/* Floating Health Icons */}
      <FloatingIcon position={[-1.5, 0.5, 0.5]} color="#f472b6" delay={0} /> {/* Heart/Cycle */}
      <FloatingIcon position={[1.5, 0.3, 0.5]} color="#60a5fa" delay={1} /> {/* Energy */}
      <FloatingIcon position={[0, -1.3, 1]} color="#fbbf24" delay={2} /> {/* Inflammation */}
      <FloatingIcon position={[-1, 1.2, 0.8]} color="#a78bfa" delay={1.5} /> {/* Hormone */}
    </group>
  );
}

export function DigitalTwin3D({ persona, indicators }: DigitalTwinAvatarProps) {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, 0, 5]} intensity={0.5} color="#a78bfa" />
        <pointLight position={[5, 0, -5]} intensity={0.3} color="#60a5fa" />
        
        <Avatar persona={persona} indicators={indicators} />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
