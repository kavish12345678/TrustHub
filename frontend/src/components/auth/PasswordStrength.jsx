import { motion } from "framer-motion";
import { usePasswordStrength } from "../../hooks/usePasswordStrength";

const TONE_CLASS = {
  muted: "bg-white/10",
  danger: "bg-rose-500",
  warning: "bg-amber-400",
  info: "bg-th-blue",
  success: "bg-th-emerald",
};

const TONE_TEXT = {
  muted: "text-slate-500",
  danger: "text-rose-400",
  warning: "text-amber-300",
  info: "text-th-blue-bright",
  success: "text-th-emerald",
};

function PasswordStrength({ password }) {
  const strength = usePasswordStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1.5" aria-live="polite">
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className={`h-full rounded-full ${TONE_CLASS[strength.tone]}`}
          initial={{ width: 0 }}
          animate={{ width: `${strength.percent}%` }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <p className={`text-xs ${TONE_TEXT[strength.tone]}`}>
        Password strength: <span className="font-semibold">{strength.label}</span>
      </p>
    </div>
  );
}

export default PasswordStrength;
