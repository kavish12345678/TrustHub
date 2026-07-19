function Spinner({ size = "md", accent = false, label, className = "" }) {
  const sizeClass =
    size === "sm" ? "th-spinner--sm" : size === "lg" ? "th-spinner--lg" : "th-spinner--md";

  const spinner = (
    <span
      className={[
        "th-spinner",
        sizeClass,
        accent ? "th-spinner--accent" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-label={label || "Loading"}
    />
  );

  if (!label) return spinner;

  return (
    <div className="th-spinner-wrap">
      {spinner}
      <span>{label}</span>
    </div>
  );
}

export default Spinner;
