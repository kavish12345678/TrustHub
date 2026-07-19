import { useEffect, useRef } from "react";

/**
 * Blockchain nodes with occasional stronger transaction pulses.
 */
function BlockchainConnections() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d", { alpha: true });
    let frame = 0;
    let raf = 0;
    let nodes = [];
    let edges = [];
    let packets = [];
    let burstUntil = 0;

    const resize = () => {
      const { width, height } = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 768 ? 7 : 12;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1.8 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
      }));

      edges = [];
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < Math.min(width, height) * 0.36) {
            edges.push({ a: i, b: j });
          }
        }
      }

      packets = edges.slice(0, Math.min(4, edges.length)).map((edge, index) => ({
        edge,
        t: Math.random(),
        speed: 0.0018 + Math.random() * 0.0025,
        delay: index * 50,
      }));
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      frame += 1;

      // Occasional network-wide transaction pulse
      if (frame % 320 === 0) {
        burstUntil = frame + 45;
      }
      const bursting = frame < burstUntil;
      const burstBoost = bursting ? 0.12 * Math.sin(((burstUntil - frame) / 45) * Math.PI) : 0;

      edges.forEach(({ a, b }) => {
        const na = nodes[a];
        const nb = nodes[b];
        const pulse = 0.1 + 0.07 * Math.sin(frame * 0.018 + na.phase) + burstBoost;
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = `rgba(99, 102, 241, ${Math.min(0.4, pulse)})`;
        ctx.lineWidth = bursting ? 1.35 : 1;
        ctx.stroke();
      });

      packets.forEach((packet) => {
        if (frame < packet.delay) return;
        packet.t += packet.speed * (bursting ? 1.8 : 1);
        if (packet.t > 1) packet.t = 0;
        const { a, b } = packet.edge;
        const na = nodes[a];
        const nb = nodes[b];
        const x = na.x + (nb.x - na.x) * packet.t;
        const y = na.y + (nb.y - na.y) * packet.t;
        const radius = bursting ? 11 : 7;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0, bursting ? "rgba(167, 139, 250, 0.95)" : "rgba(34, 211, 238, 0.9)");
        grad.addColorStop(1, "rgba(34, 211, 238, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      nodes.forEach((node) => {
        const glow = 0.4 + 0.3 * Math.sin(frame * 0.028 + node.phase) + burstBoost * 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r + 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${0.07 * glow})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${Math.min(1, glow)})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 opacity-55"
      aria-hidden="true"
    />
  );
}

export default BlockchainConnections;
