import { lazy, Suspense } from "react";
import GradientBlobs from "./GradientBlobs";
import AnimatedGrid from "./AnimatedGrid";
import BlockchainConnections from "./BlockchainConnections";
import FloatingCubes from "./FloatingCubes";
import NoiseOverlay from "./NoiseOverlay";
import ShootingStars from "./ShootingStars";

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
      <ShootingStars />
      <FloatingCubes />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_15%,rgba(5,8,22,0.5)_72%,rgba(5,8,22,0.85)_100%)]" />
      <NoiseOverlay opacity={0.045} />
    </div>
  );
}

export default HeroBackground;
