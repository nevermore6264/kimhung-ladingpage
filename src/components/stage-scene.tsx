"use client";

import { Float } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Wireframe() {
  return (
    <Float speed={1.2} rotationIntensity={0.7} floatIntensity={0.5}>
      <mesh position={[1.35, 0.15, 0]}>
        <icosahedronGeometry args={[1.05, 0]} />
        <meshStandardMaterial color="#1677ff" wireframe />
      </mesh>
    </Float>
  );
}

export function StageScene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <Canvas camera={{ position: [0, 0, 4.4], fov: 42 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 3]} intensity={1.1} />
        <Wireframe />
      </Canvas>
    </div>
  );
}
