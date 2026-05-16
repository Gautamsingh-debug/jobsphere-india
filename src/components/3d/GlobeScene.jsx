import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { INDIAN_CITIES } from '../../api/mockData';

function Earth() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial color="#0f172a" transparent opacity={0.8} wireframe={false} />
      {/* Grid lines */}
      <mesh>
        <sphereGeometry args={[2.01, 32, 32]} />
        <meshBasicMaterial color="#1e3a5f" wireframe transparent opacity={0.15} />
      </mesh>
    </mesh>
  );
}

function CityDot({ city, onClick }) {
  const ref = useRef();
  // Convert lat/lng to 3D position on sphere
  const position = useMemo(() => {
    const phi = (90 - city.lat) * (Math.PI / 180);
    const theta = (city.lng + 180) * (Math.PI / 180);
    const r = 2.05;
    return [
      -(r * Math.sin(phi) * Math.cos(theta)),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta),
    ];
  }, [city.lat, city.lng]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + city.lat) * 0.3);
    }
  });

  return (
    <group position={position}>
      <mesh ref={ref} onClick={() => onClick?.(city)}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#3b82f6" />
      </mesh>
      {/* Glow ring */}
      <mesh>
        <ringGeometry args={[0.06, 0.09, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function GlobeContent({ onCityClick }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[-10, -5, 5]} intensity={0.3} color="#8b5cf6" />
      <Earth />
      {INDIAN_CITIES.map((city) => (
        <CityDot key={city.name} city={city} onClick={onCityClick} />
      ))}
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI * 3 / 4} />
    </>
  );
}

export default function GlobeScene({ onCityClick, className }) {
  return (
    <div className={className} style={{ width: '100%', height: '100%', minHeight: 400 }}>
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }} dpr={[1, 2]}>
        <GlobeContent onCityClick={onCityClick} />
      </Canvas>
    </div>
  );
}
