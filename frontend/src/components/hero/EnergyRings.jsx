import { motion } from "framer-motion";

/** Concentric energy rings with traveling nodes */
function EnergyRings({ className = "" }) {
  const rings = [
    { size: "100%", duration: 48, opacity: 0.32, border: "border-th-blue/35" },
    { size: "78%", duration: 34, opacity: 0.42, border: "border-th-purple/40" },
    { size: "56%", duration: 26, opacity: 0.5, border: "border-th-cyan/35" },
    { size: "36%", duration: 18, opacity: 0.38, border: "border-white/15" },
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
                ? "0 0 50px rgba(139,92,246,0.22), inset 0 0 36px rgba(59,130,246,0.1)"
                : index === 2
                  ? "0 0 30px rgba(34,211,238,0.12)"
                  : "inset 0 0 20px rgba(59,130,246,0.05)",
          }}
          animate={{ rotate: index % 2 === 0 ? 360 : -360 }}
          transition={{
            duration: ring.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-th-cyan shadow-[0_0_12px_#22d3ee]" />
          <span className="absolute bottom-[12%] left-[8%] h-1 w-1 rounded-full bg-th-purple-bright/80 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
        </motion.div>
      ))}
    </div>
  );
}

export default EnergyRings;
