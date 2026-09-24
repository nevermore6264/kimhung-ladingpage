"use client";

import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export function StageParticles() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;

  return (
    <ParticlesProvider init={loadSlim}>
      <Particles
        id="stage-particles"
        className="pointer-events-none absolute inset-0 z-0"
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          fpsLimit: 40,
          particles: {
            number: { value: 26 },
            color: { value: "#9ec1ff" },
            opacity: { value: 0.4 },
            size: { value: { min: 1, max: 2.2 } },
            move: { enable: true, speed: 0.35 },
            links: { enable: true, distance: 110, color: "#1677ff", opacity: 0.22, width: 1 },
          },
          detectRetina: true,
        }}
      />
    </ParticlesProvider>
  );
}
