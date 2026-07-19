/**
 * Film-grain noise overlay — static SVG, zero JS cost.
 */
function NoiseOverlay({ opacity = 0.04 }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2]"
      style={{
        opacity,
        mixBlendMode: "overlay",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "180px 180px",
      }}
      aria-hidden="true"
    />
  );
}

export default NoiseOverlay;
