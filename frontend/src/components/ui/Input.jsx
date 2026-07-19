function Input({
  id,
  label,
  hint,
  error,
  as = "input",
  className = "",
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
      <FieldTag
        id={inputId}
        className={[
          "th-input",
          as === "textarea" ? "th-textarea" : "",
          error ? "th-input--error" : "",
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
      {hint && !error ? (
        <span id={`${inputId}-hint`} className="th-field__hint">
          {hint}
        </span>
      ) : null}
      {error ? (
        <span id={`${inputId}-error`} className="th-field__error" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}

export default Input;
