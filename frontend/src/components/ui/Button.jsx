import { Link } from "react-router-dom";

const VARIANT_CLASS = {
  primary: "th-btn--primary",
  secondary: "th-btn--secondary",
  accent: "th-btn--accent",
  ghost: "th-btn--ghost",
  outline: "th-btn--outline",
};

const SIZE_CLASS = {
  sm: "th-btn--sm",
  md: "th-btn--md",
  lg: "th-btn--lg",
};

/**
 * Reusable TrustHub button.
 * Renders as Link when `to` is provided, otherwise as <button>.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  type = "button",
  block = false,
  className = "",
  disabled = false,
  onClick,
  ...rest
}) {
  const classes = [
    "th-btn",
    VARIANT_CLASS[variant] || VARIANT_CLASS.primary,
    SIZE_CLASS[size] || SIZE_CLASS.md,
    block ? "th-btn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
