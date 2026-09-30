"use client";

import { useRef, type ReactNode } from "react";
import { ContactShadows, Float, MeshDistortMaterial, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { WebglFrame } from "@/components/webgl-frame";

const cobalt = "#003ab9";

function Turn({ speed, children }: { speed: number; children: ReactNode }) {
  const ref = useRef<Group>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed;
  });

  return <group ref={ref}>{children}</group>;
}

function HeroRig() {
  return (
    <>
      <Turn speed={0.28}>
        <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.55}>
          <mesh>
            <torusKnotGeometry args={[0.78, 0.22, 160, 18]} />
            <meshStandardMaterial color={cobalt} metalness={0.55} roughness={0.18} />
          </mesh>
        </Float>
        <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
          <torusGeometry args={[1.55, 0.025, 16, 80]} />
          <meshStandardMaterial color="#7aa2ff" metalness={0.3} roughness={0.3} />
        </mesh>
        <Float speed={2} rotationIntensity={0.6} floatIntensity={1.1}>
          <mesh position={[-1.7, 0.95, -0.2]}>
            <icosahedronGeometry args={[0.34, 0]} />
            <meshStandardMaterial color={cobalt} wireframe />
          </mesh>
        </Float>
        <Float speed={1.6} rotationIntensity={1.1} floatIntensity={0.8}>
          <mesh position={[1.55, -0.85, 0.2]}>
            <octahedronGeometry args={[0.38, 0]} />
            <meshStandardMaterial color="#1d4ed8" metalness={0.4} roughness={0.25} />
          </mesh>
        </Float>
        <mesh position={[1.35, 1.05, -0.4]}>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshStandardMaterial color="#dbe6ff" metalness={0.2} roughness={0.15} />
        </mesh>
      </Turn>
      <ContactShadows position={[0, -1.7, 0]} opacity={0.28} scale={6} blur={2.4} far={3} color="#003ab9" />
    </>
  );
}

export function HeroOrbit() {
  return (
    <WebglFrame
      className="pointer-events-none absolute top-6 -right-6 hidden h-[460px] w-[460px] lg:block"
      camera={[0, 0.2, 5.4]}
    >
      <HeroRig />
    </WebglFrame>
  );
}

function StepRig() {
  return (
    <Turn speed={0.45}>
      <Float speed={1.4} floatIntensity={0.6}>
        <RoundedBox args={[0.7, 0.7, 0.7]} radius={0.12} position={[-1.7, 0, 0]}>
          <meshStandardMaterial color={cobalt} metalness={0.45} roughness={0.22} />
        </RoundedBox>
        <mesh position={[0, 0.05, 0]}>
          <sphereGeometry args={[0.48, 40, 40]} />
          <meshStandardMaterial color="#1d4ed8" metalness={0.35} roughness={0.2} />
        </mesh>
        <mesh position={[1.7, 0, 0]} rotation={[0.4, 0.2, 0]}>
          <torusGeometry args={[0.42, 0.14, 24, 48]} />
          <meshStandardMaterial color={cobalt} wireframe />
        </mesh>
      </Float>
    </Turn>
  );
}

export function StepCluster() {
  return (
    <WebglFrame defer className="mx-auto mt-2 h-40 w-full max-w-xl sm:h-48" camera={[0, 0.15, 4.8]} fov={40}>
      <StepRig />
    </WebglFrame>
  );
}

function BandRig() {
  return (
    <Turn speed={0.35}>
      <Float speed={1.5} rotationIntensity={0.7} floatIntensity={0.5}>
        <mesh>
          <sphereGeometry args={[0.95, 64, 64]} />
          <MeshDistortMaterial color="#ffffff" speed={1.8} distort={0.32} roughness={0.12} metalness={0.08} />
        </mesh>
        <mesh rotation={[Math.PI / 2.2, 0.4, 0]}>
          <torusGeometry args={[1.35, 0.035, 16, 80]} />
          <meshStandardMaterial color="#dbe6ff" metalness={0.4} roughness={0.2} />
        </mesh>
      </Float>
    </Turn>
  );
}

export function BandOrb() {
  return (
    <WebglFrame defer className="h-40 w-40 shrink-0 sm:h-48 sm:w-48" camera={[0, 0, 3.6]} fov={40}>
      <BandRig />
    </WebglFrame>
  );
}

function ShelfRig() {
  const pieces = [
    { x: -2.25, node: <capsuleGeometry args={[0.22, 0.55, 8, 16]} /> },
    { x: -0.75, node: <boxGeometry args={[0.55, 0.55, 0.55]} /> },
    { x: 0.75, node: <coneGeometry args={[0.38, 0.7, 5]} /> },
    { x: 2.25, node: <dodecahedronGeometry args={[0.38, 0]} /> },
  ];

  return (
    <Turn speed={0.3}>
      {pieces.map((piece) => (
        <Float key={piece.x} speed={1.3} floatIntensity={0.45}>
          <mesh position={[piece.x, 0, 0]}>
            {piece.node}
            <meshStandardMaterial color={cobalt} metalness={0.4} roughness={0.25} />
          </mesh>
        </Float>
      ))}
    </Turn>
  );
}

export function CategoryShelf() {
  return (
    <WebglFrame defer className="mb-2 hidden h-36 w-full sm:block" camera={[0, 0.2, 6.2]} fov={38}>
      <ShelfRig />
    </WebglFrame>
  );
}

function SpecRig() {
  return (
    <Turn speed={0.5}>
      <Float speed={1.4} rotationIntensity={1} floatIntensity={0.4}>
        <mesh>
          <torusKnotGeometry args={[0.62, 0.16, 120, 14]} />
          <meshStandardMaterial color={cobalt} metalness={0.5} roughness={0.2} />
        </mesh>
        <mesh position={[1.3, 0.4, -0.2]}>
          <icosahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial color="#60a5fa" wireframe />
        </mesh>
      </Float>
    </Turn>
  );
}

export function SpecSpin() {
  return (
    <WebglFrame defer className="h-36 w-full" camera={[0, 0.1, 4.2]}>
      <SpecRig />
    </WebglFrame>
  );
}
