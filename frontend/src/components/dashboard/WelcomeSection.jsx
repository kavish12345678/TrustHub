import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { authService } from "../../services/authService";
import { Button } from "../ui";

function WelcomeSection() {
  const user = authService.getCurrentUser();
  const name = user?.firstName || user?.username || "there";
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-th-blue/15 via-th-purple/10 to-transparent p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:p-8"
    >
      <div
        className="pointer-events-none absolute -top-16 -right-10 h-48 w-48 rounded-full bg-th-purple/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 left-10 h-40 w-40 rounded-full bg-th-blue/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-semibold tracking-widest text-th-cyan uppercase">
            TrustHub workspace
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {greeting}, {name}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-400 sm:text-[0.95rem]">
            Hash documents, anchor proofs on Ethereum, and verify authenticity —
            all from one secure dashboard.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="md" to="/upload">
            Upload document
          </Button>
          <Link
            to="/verify"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.07]"
          >
            Verify now
            <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

export default WelcomeSection;
