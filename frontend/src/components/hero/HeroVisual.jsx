import { useEffect, useMemo, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiCheck, FiLink, FiHash, FiShield } from "react-icons/fi";
import { FaEthereum } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi2";
import EnergyRings from "./EnergyRings";
import { useIsMobile } from "../../hooks/useMotionPrefs";

function buildSpherePoints(count) {
  const points = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    points.push({
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius,
    });
  }
  return points;
}

/**
 * Canvas dotted globe — frame-rate independent rotation, richer glow & orbits.
 */
function DotGlobe({ mouseX, mouseY, pointCount = 1200 }) {
  const canvasRef = useRef(null);
  const points = useMemo(() => buildSpherePoints(pointCount), [pointCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d", { alpha: true });
    let raf = 0;
    let angle = 0;
    let width = 0;
    let height = 0;
    let last = performance.now();
    const orbitDots = Array.from({ length: 3 }, (_, i) => ({
      lag: i * 2.1,
      speed: 0.55 + i * 0.2,
      radiusScale: 0.92 - i * 0.1,
    }));

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      angle += dt * 0.28;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.36;
      const tiltX = (mouseY?.get?.() || 0) * 0.32;
      const tiltY = (mouseX?.get?.() || 0) * 0.32;

      // Multi-stop atmospheric glow
      const glow = ctx.createRadialGradient(cx, cy, radius * 0.15, cx, cy, radius * 1.55);
      glow.addColorStop(0, "rgba(96, 165, 250, 0.32)");
      glow.addColorStop(0.35, "rgba(99, 102, 241, 0.16)");
      glow.addColorStop(0.65, "rgba(139, 92, 246, 0.08)");
      glow.addColorStop(1, "rgba(5, 8, 22, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.55, 0, Math.PI * 2);
      ctx.fill();

      // Soft halo ring
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.05, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(96, 165, 250, 0.12)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(cx, cy);
      for (let i = 0; i < 5; i += 1) {
        const rot = angle * (0.35 + i * 0.12) + tiltY * 0.5;
        ctx.beginPath();
        ctx.ellipse(
          0,
          0,
          radius * (1.02 - i * 0.07),
          radius * (0.38 + i * 0.06),
          rot,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = `rgba(96, 165, 250, ${0.22 - i * 0.03})`;
        ctx.lineWidth = i === 0 ? 1.25 : 0.9;
        ctx.stroke();
      }

      // Traveling orbit markers
      orbitDots.forEach((dot) => {
        const t = angle * dot.speed + dot.lag;
        const rx = radius * dot.radiusScale;
        const ry = radius * (0.42 + dot.lag * 0.04);
        const ox = Math.cos(t) * rx;
        const oy = Math.sin(t) * ry;
        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, 8);
        grad.addColorStop(0, "rgba(34, 211, 238, 0.95)");
        grad.addColorStop(1, "rgba(34, 211, 238, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ox, oy, 7, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      const cosA = Math.cos(angle + tiltY);
      const sinA = Math.sin(angle + tiltY);
      const cosB = Math.cos(0.32 + tiltX);
      const sinB = Math.sin(0.32 + tiltX);

      for (let i = 0; i < points.length; i += 1) {
        const p = points[i];
        let x = p.x * cosA - p.z * sinA;
        let z = p.x * sinA + p.z * cosA;
        const y = p.y * cosB - z * sinB;
        z = p.y * sinB + z * cosB;

        if (z < -0.12) continue;

        const depth = (z + 1) / 2;
        const px = cx + x * radius;
        const py = cy + y * radius;
        const size = 0.65 + depth * 1.7;
        const alpha = 0.18 + depth * 0.78;

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle =
          depth > 0.68
            ? `rgba(34, 211, 238, ${alpha})`
            : depth > 0.42
              ? `rgba(96, 165, 250, ${alpha})`
              : `rgba(167, 139, 250, ${alpha * 0.92})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [mouseX, mouseY, points]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

function OrbitDecorations({ parallaxX, parallaxY }) {
  const docX = useTransform(parallaxX, (v) => v * 10);
  const docY = useTransform(parallaxY, (v) => v * 8);

  return (
    <motion.div style={{ x: docX, y: docY }} className="pointer-events-none absolute inset-0">
      {[
        { top: "12%", left: "14%", delay: 0.2 },
        { top: "64%", left: "6%", delay: 1.4 },
        { top: "20%", right: "6%", delay: 0.7 },
      ].map((item, index) => (
        <motion.div
          key={index}
          className="absolute z-10 flex h-10 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-th-blue-bright shadow-[0_8px_24px_rgba(59,130,246,0.18)] backdrop-blur-md sm:h-11 sm:w-9"
          style={{ top: item.top, left: item.left, right: item.right }}
          animate={{ y: [0, -9, 0, 6, 0], rotate: [-3, 3, -3] }}
          transition={{
            duration: 6.5 + item.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
        >
          <HiOutlineDocumentText size={16} />
        </motion.div>
      ))}

      <motion.div
        className="absolute bottom-[16%] right-[14%] z-10 flex h-9 w-9 items-center justify-center rounded-full border border-th-purple/40 bg-th-purple/20 text-th-purple-bright shadow-[0_0_28px_rgba(139,92,246,0.4)] backdrop-blur-md sm:h-10 sm:w-10"
        animate={{ y: [0, -11, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
        aria-hidden="true"
      >
        <FaEthereum size={16} />
      </motion.div>

      {["0x7f3a…c91e", "0xb2e1…4a08"].map((hash, index) => (
        <motion.span
          key={hash}
          className="absolute z-10 hidden rounded-full border border-white/10 bg-th-navy/65 px-2.5 py-1 font-mono text-[10px] text-th-cyan/90 backdrop-blur-md sm:inline-flex"
          style={{
            top: index === 0 ? "78%" : "7%",
            left: index === 0 ? "26%" : "40%",
          }}
          animate={{ opacity: [0.3, 0.95, 0.3], y: [0, -5, 0] }}
          transition={{ duration: 4 + index * 0.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.6 }}
        >
          {hash}
        </motion.span>
      ))}
    </motion.div>
  );
}

function FloatingCard({ card, parallaxX, parallaxY }) {
  const x = useTransform(parallaxX, (v) => v * 14 * card.depth);
  const y = useTransform(parallaxY, (v) => v * 10 * card.depth);

  return (
    <motion.div
      className={`absolute z-20 ${card.className}`}
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.7,
        delay: 1.05 + card.delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        className="flex max-w-[10.5rem] items-start gap-2.5 rounded-2xl border border-inherit bg-white/[0.07] px-3 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.35),0_0_30px_rgba(99,102,241,0.12)] backdrop-blur-xl sm:max-w-[11.5rem] sm:px-3.5 sm:py-3"
        animate={{ y: [0, -card.float, 0, card.float * 0.45, 0] }}
        transition={{
          duration: card.duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.4 + card.delay,
        }}
        whileHover={{ scale: 1.04 }}
      >
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-th-blue/45 to-th-purple/45 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
          <card.Icon size={14} />
        </span>
        <div>
          <p className="text-[13px] font-semibold tracking-tight text-white sm:text-sm">
            {card.title}
          </p>
          <p className="mt-0.5 text-[11px] leading-snug text-slate-400 sm:text-xs">
            {card.subtitle}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FloatingStatusCards({ parallaxX, parallaxY }) {
  const cards = [
    {
      title: "Verified",
      subtitle: "Anywhere. Anytime.",
      Icon: FiCheck,
      className: "top-[4%] right-0 sm:top-[6%] sm:right-[2%] border-th-cyan/25",
      delay: 0.35,
      depth: 1.15,
      float: 7,
      duration: 5.8,
    },
    {
      title: "Immutable",
      subtitle: "Stored on Ethereum",
      Icon: FiLink,
      className: "top-[34%] -left-1 sm:top-[36%] sm:left-0 border-th-purple/25",
      delay: 1.1,
      depth: 0.85,
      float: 10,
      duration: 6.6,
    },
    {
      title: "SHA-256",
      subtitle: "Hash Generated",
      Icon: FiHash,
      className:
        "bottom-[30%] left-0 sm:bottom-[28%] sm:left-[4%] border-th-blue/25 hidden sm:flex",
      delay: 0.75,
      depth: 1,
      float: 8,
      duration: 7.2,
    },
    {
      title: "Tamper-Proof",
      subtitle: "Blockchain Secured",
      Icon: FiShield,
      className: "bottom-[6%] right-0 sm:bottom-[8%] sm:right-[0%] border-th-purple-bright/25",
      delay: 1.55,
      depth: 1.25,
      float: 9,
      duration: 5.4,
    },
  ];

  return (
    <>
      {cards.map((card) => (
        <FloatingCard
          key={card.title}
          card={card}
          parallaxX={parallaxX}
          parallaxY={parallaxY}
        />
      ))}
    </>
  );
}

/**
 * Right-side hero visual with shared parallax response.
 */
function HeroVisual({ scrollProgress, parallaxX, parallaxY }) {
  const mobile = useIsMobile();
  const localX = useMotionValue(0);
  const localY = useMotionValue(0);
  const fallbackProgress = useMotionValue(0);
  const progress = scrollProgress || fallbackProgress;

  const smoothLocalX = useSpring(localX, { stiffness: 55, damping: 22 });
  const smoothLocalY = useSpring(localY, { stiffness: 55, damping: 22 });

  // Blend section parallax with local hover for the globe
  const globeMouseX = useTransform(
    [parallaxX || localX, smoothLocalX],
    ([a, b]) => (a || 0) * 0.55 + (b || 0) * 0.7
  );
  const globeMouseY = useTransform(
    [parallaxY || localY, smoothLocalY],
    ([a, b]) => (a || 0) * 0.55 + (b || 0) * 0.7
  );

  const globeScale = useTransform(progress, [0, 1], [1, mobile ? 1.04 : 1.07]);
  const visualX = useTransform(parallaxX || localX, (v) => v * (mobile ? -6 : -14));
  const visualY = useTransform(parallaxY || localY, (v) => v * (mobile ? -4 : -10));

  const onMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    localX.set(x);
    localY.set(y);
  };

  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-[20rem] will-change-transform sm:max-w-[28rem] lg:max-w-none"
      style={{ scale: globeScale, x: visualX, y: visualY }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        localX.set(0);
        localY.set(0);
      }}
    >
      <EnergyRings className="inset-[1%]" />
      <div className="absolute inset-[6%] sm:inset-[8%]">
        <DotGlobe mouseX={globeMouseX} mouseY={globeMouseY} pointCount={mobile ? 700 : 1200} />
      </div>
      <OrbitDecorations
        parallaxX={parallaxX || smoothLocalX}
        parallaxY={parallaxY || smoothLocalY}
      />
      <FloatingStatusCards
        parallaxX={parallaxX || smoothLocalX}
        parallaxY={parallaxY || smoothLocalY}
      />
    </motion.div>
  );
}

export default HeroVisual;
export { DotGlobe, FloatingStatusCards };
