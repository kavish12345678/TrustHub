import { useEffect, useMemo, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiCheck, FiLink, FiHash, FiShield } from "react-icons/fi";
import { FaEthereum } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi2";
import EnergyRings from "./EnergyRings";

/** Fibonacci sphere points for a dense dotted globe */
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
 * Canvas dotted globe with slow rotation, orbit arcs, and mouse parallax.
 */
function DotGlobe({ mouseX, mouseY, scale = 1 }) {
  const canvasRef = useRef(null);
  const points = useMemo(() => buildSpherePoints(1400), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d", { alpha: true });
    let raf = 0;
    let angle = 0;
    let width = 0;
    let height = 0;

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

    const draw = () => {
      angle += 0.004;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.36 * scale;
      const tiltX = (mouseY?.get?.() || 0) * 0.25;
      const tiltY = (mouseX?.get?.() || 0) * 0.25;

      const glow = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 1.35);
      glow.addColorStop(0, "rgba(59, 130, 246, 0.22)");
      glow.addColorStop(0.55, "rgba(139, 92, 246, 0.1)");
      glow.addColorStop(1, "rgba(5, 8, 22, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.translate(cx, cy);
      for (let i = 0; i < 4; i += 1) {
        ctx.beginPath();
        ctx.ellipse(
          0,
          0,
          radius * (0.95 - i * 0.08),
          radius * (0.45 + i * 0.05),
          angle * (0.4 + i * 0.15) + tiltY,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = `rgba(96, 165, 250, ${0.18 - i * 0.03})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();

      const cosA = Math.cos(angle + tiltY);
      const sinA = Math.sin(angle + tiltY);
      const cosB = Math.cos(0.35 + tiltX);
      const sinB = Math.sin(0.35 + tiltX);

      for (let i = 0; i < points.length; i += 1) {
        const p = points[i];
        let x = p.x * cosA - p.z * sinA;
        let z = p.x * sinA + p.z * cosA;
        const y = p.y * cosB - z * sinB;
        z = p.y * sinB + z * cosB;

        if (z < -0.15) continue;

        const depth = (z + 1) / 2;
        const px = cx + x * radius;
        const py = cy + y * radius;
        const size = 0.7 + depth * 1.6;
        const alpha = 0.2 + depth * 0.75;

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle =
          depth > 0.65
            ? `rgba(34, 211, 238, ${alpha})`
            : depth > 0.4
              ? `rgba(96, 165, 250, ${alpha})`
              : `rgba(167, 139, 250, ${alpha * 0.9})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [mouseX, mouseY, points, scale]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

function OrbitDecorations() {
  return (
    <>
      {[
        { top: "14%", left: "18%", delay: 0 },
        { top: "62%", left: "8%", delay: 1.2 },
        { top: "22%", right: "8%", delay: 0.6 },
      ].map((item, index) => (
        <motion.div
          key={index}
          className="absolute z-10 flex h-11 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-th-blue-bright shadow-[0_0_20px_rgba(59,130,246,0.25)] backdrop-blur-md"
          style={{ top: item.top, left: item.left, right: item.right }}
          animate={{ y: [0, -10, 0], rotate: [-4, 4, -4] }}
          transition={{
            duration: 5 + item.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
        >
          <HiOutlineDocumentText size={18} />
        </motion.div>
      ))}

      <motion.div
        className="absolute bottom-[18%] right-[16%] z-10 flex h-10 w-10 items-center justify-center rounded-full border border-th-purple/40 bg-th-purple/20 text-th-purple-bright shadow-[0_0_24px_rgba(139,92,246,0.45)] backdrop-blur-md"
        animate={{ y: [0, -12, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <FaEthereum size={18} />
      </motion.div>

      {["0x7f3a…c91e", "0xb2e1…4a08"].map((hash, index) => (
        <motion.span
          key={hash}
          className="absolute z-10 rounded-full border border-white/10 bg-th-navy/60 px-2.5 py-1 font-mono text-[10px] text-th-cyan/90 backdrop-blur-md"
          style={{
            top: index === 0 ? "78%" : "8%",
            left: index === 0 ? "28%" : "42%",
          }}
          animate={{ opacity: [0.35, 1, 0.35], y: [0, -6, 0] }}
          transition={{ duration: 3.5 + index, repeat: Infinity, ease: "easeInOut" }}
        >
          {hash}
        </motion.span>
      ))}
    </>
  );
}

function FloatingStatusCards() {
  const cards = [
    {
      title: "Verified",
      subtitle: "Anywhere. Anytime.",
      Icon: FiCheck,
      className:
        "top-[8%] right-[4%] border-th-cyan/30 shadow-[0_0_30px_rgba(34,211,238,0.15)]",
      delay: 0,
    },
    {
      title: "Immutable",
      subtitle: "Stored on Ethereum",
      Icon: FiLink,
      className:
        "top-[38%] left-0 border-th-purple/30 shadow-[0_0_30px_rgba(139,92,246,0.18)]",
      delay: 0.4,
    },
    {
      title: "SHA-256",
      subtitle: "Hash Generated",
      Icon: FiHash,
      className:
        "bottom-[28%] left-[6%] border-th-blue/30 shadow-[0_0_30px_rgba(59,130,246,0.18)]",
      delay: 0.8,
    },
    {
      title: "Tamper-Proof",
      subtitle: "Blockchain Secured",
      Icon: FiShield,
      className:
        "bottom-[10%] right-[2%] border-th-purple-bright/30 shadow-[0_0_30px_rgba(167,139,250,0.16)]",
      delay: 1.1,
    },
  ];

  return (
    <>
      {cards.map((card) => (
        <motion.div
          key={card.title}
          className={`absolute z-20 flex max-w-[11.5rem] items-start gap-2.5 rounded-2xl border bg-white/[0.06] px-3.5 py-3 backdrop-blur-xl ${card.className}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.5 + card.delay },
            y: {
              duration: 4.5 + card.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: card.delay,
            },
          }}
          whileHover={{ scale: 1.03 }}
        >
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-th-blue/40 to-th-purple/40 text-white">
            <card.Icon size={14} />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">{card.title}</p>
            <p className="text-xs leading-snug text-slate-400">{card.subtitle}</p>
          </div>
        </motion.div>
      ))}
    </>
  );
}

/**
 * Right-side hero visual: energy rings + dotted globe + orbiting chrome.
 */
function HeroVisual({ scrollProgress }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const fallbackProgress = useMotionValue(0);
  const progress = scrollProgress || fallbackProgress;
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const globeScale = useTransform(progress, [0, 1], [1, 1.08]);

  const onMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-[34rem] lg:max-w-none"
      style={{ scale: globeScale }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <EnergyRings className="inset-[2%]" />
      <div className="absolute inset-[8%]">
        <DotGlobe mouseX={smoothX} mouseY={smoothY} />
      </div>
      <OrbitDecorations />
      <FloatingStatusCards />
    </motion.div>
  );
}

export default HeroVisual;
export { DotGlobe, FloatingStatusCards };
