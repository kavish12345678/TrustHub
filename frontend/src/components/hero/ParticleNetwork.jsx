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
 * Layer 1 + 7: linked particle network + drifting star dust.
 * Uses @tsparticles/react v4 ParticlesProvider.
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
          value: 90,
          density: { enable: true, width: 1200, height: 800 },
        },
        color: { value: ["#60a5fa", "#8b5cf6", "#22d3ee", "#a78bfa"] },
        links: {
          enable: true,
          color: "#6366f1",
          distance: 130,
          opacity: 0.18,
          width: 0.8,
        },
        move: {
          enable: true,
          speed: 0.35,
          direction: "none",
          outModes: { default: "out" },
          random: true,
        },
        opacity: {
          value: { min: 0.15, max: 0.55 },
          animation: { enable: true, speed: 0.4, sync: false },
        },
        size: { value: { min: 0.6, max: 2.2 } },
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: { enable: true, mode: "repulse" },
          resize: { enable: true },
        },
        modes: {
          repulse: { distance: 90, duration: 0.35, speed: 0.4 },
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
