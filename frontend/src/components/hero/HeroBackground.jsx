import { lazy, Suspense } from "react";
import GradientBlobs from "./GradientBlobs";
import AnimatedGrid from "./AnimatedGrid";
import BlockchainConnections from "./BlockchainConnections";
import FloatingCubes from "./FloatingCubes";

const ParticleNetwork = lazy(() => import("./ParticleNetwork"));

/**
 * Multi-layer animated hero atmosphere.
 * Particles are lazy-loaded to keep first paint light.
 */
function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[#050816]" />
      <GradientBlobs />
      <AnimatedGrid />
      <BlockchainConnections />
      <Suspense fallback={null}>
        <ParticleNetwork />
      </Suspense>
      <FloatingCubes />
      {/* Soft vignette for readability */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(5,8,22,0.55)_80%)]" />
    </div>
  );
}

export default HeroBackground;
