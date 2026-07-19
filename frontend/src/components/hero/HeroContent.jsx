import { motion } from "framer-motion";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import HeroButton from "./HeroButton";

const HEADLINES = [
  { text: "Real trust.", gradient: false },
  { text: "On-chain proof.", gradient: false },
  { text: "Always verified.", gradient: true },
];

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      delay: 0.22 + index * 0.14,
      ease: EASE,
    },
  }),
};

function HeroContent({ style }) {
  return (
    <motion.div
      className="relative z-10 w-full max-w-xl will-change-transform"
      style={style}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={item}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-slate-300 backdrop-blur-md sm:mb-8 sm:text-xs"
      >
        <HiOutlineShieldCheck className="text-th-cyan" size={14} />
        Secured by Ethereum Blockchain
      </motion.div>

      <h1
        id="hero-heading"
        className="font-display text-[clamp(2.35rem,7.2vw,4.35rem)] font-extrabold leading-[1.08] tracking-[-0.035em] sm:leading-[1.05]"
      >
        {HEADLINES.map((line, index) => (
          <motion.span
            key={line.text}
            custom={index}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className={`block pb-[0.06em] ${
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
        variants={item}
        className="mt-6 max-w-[34rem] space-y-3.5 text-[0.95rem] leading-[1.7] text-slate-400 sm:mt-7 sm:space-y-4 sm:text-[1.0625rem] sm:leading-[1.75]"
      >
        <p>
          TrustHub secures your documents with SHA-256 hashing and Ethereum blockchain
          verification.
        </p>
        <p className="text-slate-300">
          Upload once.{" "}
          <span className="font-medium text-white">Verify forever.</span> Impossible to fake.{" "}
          <span className="bg-gradient-to-r from-th-blue to-th-cyan bg-clip-text font-medium text-transparent">
            Instantly trusted.
          </span>
        </p>
      </motion.div>

      <motion.div
        variants={item}
        className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center"
      >
        <HeroButton to="/register" variant="primary" className="w-full sm:w-auto">
          Get Started Free
          <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </HeroButton>

        <HeroButton href="#how-it-works" variant="secondary" className="w-full sm:w-auto">
          <FiPlay className="text-th-cyan" size={14} />
          Watch Demo
        </HeroButton>
      </motion.div>
    </motion.div>
  );
}

export default HeroContent;
