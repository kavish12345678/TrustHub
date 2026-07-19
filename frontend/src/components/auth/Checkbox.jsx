import { AnimatePresence, motion } from "framer-motion";

function Checkbox({
  id,
  name,
  checked,
  onChange,
  onBlur,
  label,
  error,
  ...rest
}) {
  const inputId = id || name;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="flex cursor-pointer items-start gap-3 text-sm text-slate-300"
      >
        <input
          id={inputId}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-th-navy accent-th-blue"
          {...rest}
        />
        <span className="leading-snug">{label}</span>
      </label>

      <AnimatePresence>
        {error ? (
          <motion.p
            key={error}
            role="alert"
            className="th-field__error mt-1.5"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default Checkbox;
