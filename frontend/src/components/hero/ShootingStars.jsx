import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../hooks/useMotionPrefs";

/**
 * Occasional slow shooting stars — lightweight canvas, few sprites.
 */
function ShootingStars() {
  const canvasRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d", { alpha: true });
    let raf = 0;
    let width = 0;
    let height = 0;
    let stars = [];
    let lastSpawn = 0;

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

    const spawn = () => {
      stars.push({
        x: Math.random() * width * 0.9,
        y: Math.random() * height * 0.45,
        len: 40 + Math.random() * 70,
        speed: 2.2 + Math.random() * 1.8,
        life: 0,
        maxLife: 55 + Math.random() * 40,
        angle: Math.PI / 5 + Math.random() * 0.2,
      });
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);

      if (time - lastSpawn > 2800 + Math.random() * 3200 && stars.length < 2) {
        spawn();
        lastSpawn = time;
      }

      stars = stars.filter((star) => {
        star.life += 1;
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        const t = star.life / star.maxLife;
        const alpha = t < 0.2 ? t / 0.2 : 1 - (t - 0.2) / 0.8;
        if (alpha <= 0) return false;

        const tx = star.x - Math.cos(star.angle) * star.len;
        const ty = star.y - Math.sin(star.angle) * star.len;
        const grad = ctx.createLinearGradient(tx, ty, star.x, star.y);
        grad.addColorStop(0, "rgba(167,139,250,0)");
        grad.addColorStop(0.6, `rgba(96,165,250,${0.35 * alpha})`);
        grad.addColorStop(1, `rgba(255,255,255,${0.75 * alpha})`);

        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(star.x, star.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.25;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(star.x, star.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.8 * alpha})`;
        ctx.fill();

        return true;
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1] opacity-70"
      aria-hidden="true"
    />
  );
}

export default ShootingStars;
