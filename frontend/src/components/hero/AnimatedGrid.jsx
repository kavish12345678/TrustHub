import { motion } from "framer-motion";

/** Layer 3 — faint blueprint grid drifting diagonally */
function AnimatedGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -inset-[40%] opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.55) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 55% at 50% 40%, black 15%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 55% at 50% 40%, black 15%, transparent 70%)",
        }}
        animate={{ x: [0, 56], y: [0, 56] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default AnimatedGrid;
