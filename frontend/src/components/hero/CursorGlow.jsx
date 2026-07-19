import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsMobile, usePrefersReducedMotion } from "../../hooks/useMotionPrefs";

/**
 * Soft blue/purple cursor glow — mix-blend-mode: screen.
 * Disabled on mobile and reduced-motion.
 */
function CursorGlow() {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 120, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (reduced || mobile) return undefined;

    const onMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, mobile, x, y]);

  if (reduced || mobile) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[90] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 mix-blend-screen"
      style={{
        x: sx,
        y: sy,
        background:
          "radial-gradient(circle, rgba(96,165,250,0.35) 0%, rgba(139,92,246,0.18) 40%, transparent 70%)",
      }}
    />
  );
}

export default CursorGlow;
