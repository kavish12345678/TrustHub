import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import { HiOutlineShieldCheck } from "react-icons/hi2";

const HEADLINES = [
  { text: "Real trust.", gradient: false },
  { text: "On-chain proof.", gradient: false },
  { text: "Always verified.", gradient: true },
];

const lineVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.15 + index * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function HeroContent({ y }) {
  return (
    <motion.div className="relative z-10 max-w-xl" style={y ? { y } : undefined}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-md"
      >
        <HiOutlineShieldCheck className="text-th-cyan" size={14} />
        Secured by Ethereum Blockchain
      </motion.div>

      <h1
        id="hero-heading"
        className="font-display text-[clamp(2.6rem,6vw,4.25rem)] font-extrabold leading-[1.05] tracking-tight"
      >
        {HEADLINES.map((line, index) => (
          <motion.span
            key={line.text}
            custom={index}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className={`block ${
              line.gradient
                ? "bg-gradient-to-r from-th-blue via-th-purple to-th-purple-bright bg-clip-text text-transparent"
                : "text-white"
            }`}
          >
            {line.text}
          </motion.span>
        ))}
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-slate-400"
      >
        <p>
          TrustHub secures your documents with SHA-256 hashing and Ethereum blockchain
          verification.
        </p>
        <p className="text-slate-300">
          Upload once.{" "}
          <span className="text-white">Verify forever.</span>{" "}
          Impossible to fake.{" "}
          <span className="bg-gradient-to-r from-th-blue to-th-cyan bg-clip-text text-transparent">
            Instantly trusted.
          </span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-9 flex flex-wrap items-center gap-3"
      >
        <Link
          to="/register"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-th-blue to-th-purple px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_32px_rgba(99,102,241,0.45)] transition duration-300 hover:shadow-[0_0_48px_rgba(139,92,246,0.65)]"
        >
          <span>Get Started Free</span>
          <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

        <a
          href="#how-it-works"
          className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:border-white/40 hover:bg-white/[0.08]"
        >
          <FiPlay className="text-th-cyan" size={14} />
          Watch Demo
        </a>
      </motion.div>
    </motion.div>
  );
}

export default HeroContent;
