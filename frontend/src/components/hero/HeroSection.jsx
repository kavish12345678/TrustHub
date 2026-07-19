import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";
import HeroFeatureBar from "./HeroFeatureBar";

/**
 * Premium TrustHub hero — cinematic multi-layer composition.
 */
function HeroSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0.35]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden pt-24 pb-10 sm:pt-28"
      aria-labelledby="hero-heading"
    >
      <HeroBackground />

      <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-8 xl:gap-12">
          <div>
            <HeroContent y={contentY} />
          </div>
          <div className="relative min-h-[22rem] sm:min-h-[28rem]">
            <HeroVisual scrollProgress={scrollYProgress} />
          </div>
        </div>

        <div className="mt-14 sm:mt-16 lg:mt-20">
          <HeroFeatureBar />
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
