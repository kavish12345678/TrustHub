import { motion } from "framer-motion";

/** Layer 6 — concentric Ethereum energy rings behind the globe */
function EnergyRings({ className = "" }) {
  const rings = [
    { size: "100%", duration: 40, opacity: 0.35, border: "border-th-blue/40" },
    { size: "78%", duration: 28, opacity: 0.45, border: "border-th-purple/45" },
    { size: "56%", duration: 22, opacity: 0.55, border: "border-th-cyan/40" },
    { size: "36%", duration: 16, opacity: 0.4, border: "border-white/20" },
  ];

  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      {rings.map((ring, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full border ${ring.border}`}
          style={{
            width: ring.size,
            height: ring.size,
            opacity: ring.opacity,
            boxShadow:
              index === 1
                ? "0 0 40px rgba(139,92,246,0.2), inset 0 0 30px rgba(59,130,246,0.08)"
                : "inset 0 0 20px rgba(59,130,246,0.06)",
          }}
          animate={{ rotate: index % 2 === 0 ? 360 : -360 }}
          transition={{
            duration: ring.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-th-cyan shadow-[0_0_10px_#22d3ee]" />
        </motion.div>
      ))}
    </div>
  );
}

export default EnergyRings;
