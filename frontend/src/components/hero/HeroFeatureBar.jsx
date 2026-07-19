import { motion } from "framer-motion";
import {
  HiOutlineCloudArrowUp,
  HiOutlineHashtag,
  HiOutlineCubeTransparent,
  HiOutlineCheckBadge,
} from "react-icons/hi2";

const FEATURES = [
  {
    title: "Upload",
    text: "Upload any document in seconds with ease.",
    Icon: HiOutlineCloudArrowUp,
  },
  {
    title: "Hash",
    text: "SHA-256 hash generated locally for security.",
    Icon: HiOutlineHashtag,
  },
  {
    title: "Anchor",
    text: "Hash anchored on Ethereum blockchain.",
    Icon: HiOutlineCubeTransparent,
  },
  {
    title: "Verify",
    text: "Verify authenticity anytime, anywhere.",
    Icon: HiOutlineCheckBadge,
  },
];

function HeroFeatureBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto w-full max-w-6xl rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_60px_rgba(59,130,246,0.08)] backdrop-blur-xl sm:p-5"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/10">
        {FEATURES.map(({ title, text, Icon }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + index * 0.08, duration: 0.5 }}
            whileHover={{ y: -3 }}
            className="flex gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white/[0.03] sm:px-4"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-th-blue to-th-purple text-white shadow-[0_0_20px_rgba(99,102,241,0.35)]">
              <Icon size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">{title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default HeroFeatureBar;
