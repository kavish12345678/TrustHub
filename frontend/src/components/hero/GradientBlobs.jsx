import { motion } from "framer-motion";

const BLOBS = [
  {
    className: "bg-th-purple/25",
    style: { width: "38rem", height: "38rem", top: "-8%", left: "-10%" },
    animate: { x: [0, 80, -40, 0], y: [0, 60, 30, 0], scale: [1, 1.12, 0.95, 1] },
    duration: 28,
  },
  {
    className: "bg-th-blue/25",
    style: { width: "34rem", height: "34rem", top: "20%", right: "-12%" },
    animate: { x: [0, -70, 50, 0], y: [0, -40, 70, 0], scale: [1, 0.92, 1.1, 1] },
    duration: 24,
  },
  {
    className: "bg-th-cyan/20",
    style: { width: "28rem", height: "28rem", bottom: "-5%", left: "30%" },
    animate: { x: [0, 60, -30, 0], y: [0, -50, 20, 0], scale: [1, 1.08, 0.9, 1] },
    duration: 32,
  },
];

/** Layer 2 — large soft neon blobs drifting slowly */
function GradientBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {BLOBS.map((blob, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full blur-[100px] ${blob.className}`}
          style={blob.style}
          animate={blob.animate}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default GradientBlobs;
