"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";

export function useWebgl(defer = false) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!defer) {
      setReady(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setReady(true);
        observer.disconnect();
      },
      { rootMargin: "180px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [defer]);

  return { ready, ref };
}

export function WebglFrame({
  children,
  className,
  camera = [0, 0.15, 5.2],
  fov = 42,
  defer = false,
}: {
  children: ReactNode;
  className: string;
  camera?: [number, number, number];
  fov?: number;
  defer?: boolean;
}) {
  const { ready, ref } = useWebgl(defer);

  return (
    <div ref={ref} className={className} aria-hidden>
      {ready ? (
      <Canvas
        camera={{ position: camera, fov }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.95} />
        <directionalLight position={[3, 4, 5]} intensity={1.45} />
        <directionalLight position={[-4, -1, 2]} intensity={0.4} color="#9db7ff" />
        {children}
      </Canvas>
      ) : null}
    </div>
  );
}
