import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GradientBlobs from "../hero/GradientBlobs";
import AnimatedGrid from "../hero/AnimatedGrid";
import NoiseOverlay from "../hero/NoiseOverlay";
import Navbar from "../navbar/Navbar";

/**
 * Shared auth shell — floating navy atmosphere + centered glass card.
 */
function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-[#050816]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <GradientBlobs />
        <AnimatedGrid />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_10%,rgba(5,8,22,0.75)_70%)]" />
        <NoiseOverlay opacity={0.035} />
      </div>

      <Navbar />

      <main className="relative z-10 flex min-h-[100svh] items-center justify-center px-4 pt-24 pb-12 sm:px-6">
        <motion.div
          className="w-full max-w-[28rem]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8 text-center">
            <Link
              to="/"
              className="mb-5 inline-flex items-center gap-2 font-display text-xl font-extrabold tracking-tight text-white"
            >
              <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-th-blue to-th-purple shadow-[0_0_20px_rgba(99,102,241,0.45)]" />
              TrustHub
            </Link>
            {title ? (
              <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {title}
              </h1>
            ) : null}
            {subtitle ? (
              <p className="mt-2 text-sm leading-relaxed text-slate-400 sm:text-[0.95rem]">
                {subtitle}
              </p>
            ) : null}
          </div>

          {children}
        </motion.div>
      </main>
    </div>
  );
}

export default AuthLayout;
