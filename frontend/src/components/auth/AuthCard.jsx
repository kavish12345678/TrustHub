import { motion } from "framer-motion";

function AuthCard({ children, shake = 0, className = "" }) {
  return (
    <motion.div
      key={shake}
      className={`rounded-2xl border border-white/10 bg-white/[0.05] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8 ${className}`}
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={
        shake
          ? { opacity: 1, y: 0, scale: 1, x: [0, -8, 8, -6, 6, 0] }
          : { opacity: 1, y: 0, scale: 1, x: 0 }
      }
      transition={{
        opacity: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        y: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        x: { duration: 0.4 },
      }}
    >
      {children}
    </motion.div>
  );
}

export default AuthCard;
