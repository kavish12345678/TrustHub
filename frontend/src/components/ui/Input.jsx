import { AnimatePresence, motion } from "framer-motion";

/**
 * Text field with optional right slot (e.g. password toggle).
 * Animated error messages.
 */
function Input({
  id,
  label,
  hint,
  error,
  as = "input",
  className = "",
  rightSlot = null,
  ...rest
}) {
  const FieldTag = as === "textarea" ? "textarea" : "input";
  const inputId = id || rest.name;

  return (
    <div className="th-field">
      {label ? (
        <label className="th-field__label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}

      <div className={rightSlot ? "relative" : undefined}>
        <FieldTag
          id={inputId}
          className={[
            "th-input",
            as === "textarea" ? "th-textarea" : "",
            error ? "th-input--error" : "",
            rightSlot ? "pr-12" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...rest}
        />
        {rightSlot ? (
          <div className="absolute top-1/2 right-2 -translate-y-1/2">{rightSlot}</div>
        ) : null}
      </div>

      {hint && !error ? (
        <span id={`${inputId}-hint`} className="th-field__hint">
          {hint}
        </span>
      ) : null}

      <AnimatePresence mode="wait">
        {error ? (
          <motion.span
            key={error}
            id={`${inputId}-error`}
            className="th-field__error"
            role="alert"
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {error}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default Input;
