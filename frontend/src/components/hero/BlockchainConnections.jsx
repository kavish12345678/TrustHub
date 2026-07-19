import { useEffect, useRef } from "react";

/**
 * Layer 4 — blockchain-style nodes with pulsing links and traveling light.
 * Canvas-only for 60fps GPU path.
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

    const resize = () => {
      const { width, height } = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 768 ? 8 : 14;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 2 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
      }));

      edges = [];
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < Math.min(width, height) * 0.38) {
            edges.push({ a: i, b: j });
          }
        }
      }

      packets = edges.slice(0, Math.min(5, edges.length)).map((edge, index) => ({
        edge,
        t: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
        delay: index * 40,
      }));
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      frame += 1;

      edges.forEach(({ a, b }) => {
        const na = nodes[a];
        const nb = nodes[b];
        const pulse = 0.12 + 0.08 * Math.sin(frame * 0.02 + na.phase);
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = `rgba(99, 102, 241, ${pulse})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      packets.forEach((packet) => {
        if (frame < packet.delay) return;
        packet.t += packet.speed;
        if (packet.t > 1) packet.t = 0;
        const { a, b } = packet.edge;
        const na = nodes[a];
        const nb = nodes[b];
        const x = na.x + (nb.x - na.x) * packet.t;
        const y = na.y + (nb.y - na.y) * packet.t;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 8);
        grad.addColorStop(0, "rgba(34, 211, 238, 0.9)");
        grad.addColorStop(1, "rgba(34, 211, 238, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
      });

      nodes.forEach((node) => {
        const glow = 0.45 + 0.35 * Math.sin(frame * 0.03 + node.phase);
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r + 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${0.08 * glow})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${glow})`;
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
      className="pointer-events-none absolute inset-0 opacity-60"
      aria-hidden="true"
    />
  );
}

export default BlockchainConnections;
