import { motion } from "framer-motion";

const CUBES = [
  { size: 28, top: "12%", left: "58%", duration: 9, rotate: 360 },
  { size: 18, top: "28%", left: "78%", duration: 11, rotate: -360 },
  { size: 36, top: "55%", left: "62%", duration: 13, rotate: 360 },
  { size: 22, top: "68%", left: "82%", duration: 10, rotate: -360 },
  { size: 16, top: "18%", left: "88%", duration: 12, rotate: 360 },
  { size: 24, top: "42%", left: "52%", duration: 14, rotate: -360 },
  { size: 20, top: "75%", left: "70%", duration: 8, rotate: 360 },
];

/** Layer 5 — semi-transparent glass cubes */
function FloatingCubes() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
      {CUBES.map((cube, index) => (
        <motion.div
          key={index}
          className="absolute rounded-md border border-white/15 bg-gradient-to-br from-white/10 to-th-purple/10 shadow-[0_0_20px_rgba(99,102,241,0.15)] backdrop-blur-sm"
          style={{
            width: cube.size,
            height: cube.size,
            top: cube.top,
            left: cube.left,
            transformStyle: "preserve-3d",
          }}
          animate={{
            y: [0, -14, 0, 10, 0],
            rotateX: [0, 25, 0],
            rotateY: [0, cube.rotate / 4, 0],
            rotateZ: [0, cube.rotate > 0 ? 20 : -20, 0],
            opacity: [0.35, 0.7, 0.45, 0.65, 0.35],
          }}
          transition={{
            duration: cube.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.35,
          }}
        />
      ))}
    </div>
  );
}

export default FloatingCubes;
