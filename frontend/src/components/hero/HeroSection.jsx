import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";
import HeroFeatureBar from "./HeroFeatureBar";
import CursorGlow from "./CursorGlow";
import { useIsMobile, usePrefersReducedMotion } from "../../hooks/useMotionPrefs";

/**
 * Premium TrustHub hero — cinematic multi-layer composition.
 */
function HeroSection() {
  const sectionRef = useRef(null);
  const mobile = useIsMobile();
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const parallaxX = useSpring(rawX, { stiffness: 45, damping: 24, mass: 0.35 });
  const parallaxY = useSpring(rawY, { stiffness: 45, damping: 24, mass: 0.35 });

  const scrollContentY = useTransform(scrollYProgress, [0, 1], [0, mobile ? 40 : 80]);
  const parallaxTextX = useTransform(parallaxX, (v) => v * (mobile || reduced ? 0 : 14));
  const parallaxTextY = useTransform(parallaxY, (v) => v * (mobile || reduced ? 0 : 10));
  const contentY = useTransform(
    [scrollContentY, parallaxTextY],
    ([scroll, pan]) => scroll + pan
  );
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  const onMove = (event) => {
    if (reduced || mobile) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    rawX.set(Math.max(-1, Math.min(1, x)));
    rawY.set(Math.max(-1, Math.min(1, y)));
  };

  const onLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden pt-20 pb-8 sm:pt-24 sm:pb-10 lg:pt-28"
      aria-labelledby="hero-heading"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <CursorGlow />
      <HeroBackground />

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-6 xl:gap-10">
          <HeroContent style={{ x: parallaxTextX, y: contentY }} />
          <div className="relative mx-auto min-h-[18rem] w-full max-w-md sm:min-h-[24rem] sm:max-w-lg lg:mx-0 lg:max-w-none">
            <HeroVisual
              scrollProgress={scrollYProgress}
              parallaxX={parallaxX}
              parallaxY={parallaxY}
            />
          </div>
        </div>

        <div className="mt-10 sm:mt-14 lg:mt-16">
          <HeroFeatureBar />
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
