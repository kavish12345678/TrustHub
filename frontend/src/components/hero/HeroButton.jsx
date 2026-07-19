import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * Premium CTA with scale, glow, and click ripple.
 */
function HeroButton({
  children,
  to,
  href,
  variant = "primary",
  className = "",
  onClick,
  ...rest
}) {
  const ref = useRef(null);
  const [ripples, setRipples] = useState([]);

  const spawnRipple = (event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.6;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const id = Date.now() + Math.random();
    setRipples((current) => [...current, { id, x, y, size }]);
    window.setTimeout(() => {
      setRipples((current) => current.filter((item) => item.id !== id));
    }, 650);
  };

  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3.5 text-sm font-semibold will-change-transform";

  const variants = {
    primary:
      "bg-gradient-to-r from-th-blue via-[#6366f1] to-th-purple text-white shadow-[0_0_28px_rgba(99,102,241,0.4)] hover:shadow-[0_0_48px_rgba(139,92,246,0.65)]",
    secondary:
      "border border-white/20 bg-white/[0.04] text-white backdrop-blur-md hover:border-white/40 hover:bg-white/[0.08]",
  };

  const content = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute z-0 animate-[th-ripple_0.65s_ease-out_forwards] rounded-full bg-white/35"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </>
  );

  const sharedProps = {
    ref,
    className: `${base} ${variants[variant]} ${className}`,
    onClick: (event) => {
      spawnRipple(event);
      onClick?.(event);
    },
    whileHover: { scale: 1.035 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 380, damping: 24 },
    ...rest,
  };

  if (to) {
    return (
      <motion.div className="inline-flex" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link
          ref={ref}
          to={to}
          className={`${base} ${variants[variant]} ${className}`}
          onClick={(event) => {
            spawnRipple(event);
            onClick?.(event);
          }}
          {...rest}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a href={href} {...sharedProps}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" {...sharedProps}>
      {content}
    </motion.button>
  );
}

export default HeroButton;
