import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ position, color, speed, shape, scale = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x += 0.003 * speed;
    ref.current.rotation.y += 0.005 * speed;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3;
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'torus': return <torusGeometry args={[0.6 * scale, 0.25 * scale, 16, 32]} />;
      case 'octahedron': return <octahedronGeometry args={[0.5 * scale]} />;
      case 'icosahedron': return <icosahedronGeometry args={[0.5 * scale, 0]} />;
      case 'dodecahedron': return <dodecahedronGeometry args={[0.5 * scale, 0]} />;
      case 'torusKnot': return <torusKnotGeometry args={[0.4 * scale, 0.15 * scale, 64, 16]} />;
      default: return <sphereGeometry args={[0.5 * scale, 32, 32]} />;
    }
  }, [shape, scale]);

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={ref} position={position}>
        {geometry}
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.6}
          roughness={0.2}
          metalness={0.8}
          distort={0.2}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function Particles({ count = 300 }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#6366f1" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function WobbleSphere() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, -2]} scale={2.5}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshWobbleMaterial
        color="#1e1b4b"
        factor={0.3}
        speed={1}
        transparent
        opacity={0.3}
        wireframe
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[-5, -3, 3]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[0, 5, -5]} intensity={0.4} color="#06b6d4" />
      <Stars radius={50} depth={50} count={1500} factor={3} fade speed={1} />
      <Particles count={200} />
      <WobbleSphere />
      <FloatingShape position={[-3, 1.5, -1]} color="#3b82f6" speed={1.2} shape="dodecahedron" scale={0.8} />
      <FloatingShape position={[3.5, -0.5, 0]} color="#8b5cf6" speed={0.8} shape="torusKnot" scale={0.7} />
      <FloatingShape position={[-2, -1.5, 1]} color="#06b6d4" speed={1} shape="octahedron" scale={0.6} />
      <FloatingShape position={[2, 2, -2]} color="#ec4899" speed={0.6} shape="icosahedron" scale={0.5} />
      <FloatingShape position={[0, -2, -1]} color="#ff9933" speed={0.9} shape="torus" scale={0.6} />
      <FloatingShape position={[-4, 0, -3]} color="#10b981" speed={0.7} shape="dodecahedron" scale={0.4} />
    </>
  );
}

export default function HeroScene() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Scene />
      </Canvas>
    </div>
  );
}
