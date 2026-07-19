import { useMemo } from "react";
import Particles, { ParticlesProvider, useParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

function ParticleCanvas({ options }) {
  const { loaded } = useParticlesProvider();
  if (!loaded) return null;

  return (
    <Particles
      id="trusthub-particles"
      className="absolute inset-0 h-full w-full"
      options={options}
    />
  );
}

/**
 * Layered particle field — mixed speeds for depth + subtle star dust.
 */
function ParticleNetwork({ className = "" }) {
  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: {
          value: 70,
          density: { enable: true, width: 1200, height: 800 },
        },
        color: { value: ["#60a5fa", "#8b5cf6", "#22d3ee", "#a78bfa", "#e0e7ff"] },
        links: {
          enable: true,
          color: "#6366f1",
          distance: 120,
          opacity: 0.14,
          width: 0.7,
        },
        move: {
          enable: true,
          speed: { min: 0.12, max: 0.85 },
          direction: "none",
          outModes: { default: "out" },
          random: true,
          straight: false,
        },
        opacity: {
          value: { min: 0.12, max: 0.55 },
          animation: { enable: true, speed: 0.35, sync: false },
        },
        size: { value: { min: 0.5, max: 2.1 } },
        twinkle: {
          particles: {
            enable: true,
            frequency: 0.04,
            opacity: 0.85,
          },
        },
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: { enable: true, mode: "repulse" },
          resize: { enable: true },
        },
        modes: {
          repulse: { distance: 80, duration: 0.3, speed: 0.35 },
        },
      },
    }),
    []
  );

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <ParticlesProvider init={loadSlim}>
        <ParticleCanvas options={options} />
      </ParticlesProvider>
    </div>
  );
}

export default ParticleNetwork;
