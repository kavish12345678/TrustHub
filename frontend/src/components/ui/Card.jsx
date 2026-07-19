function Card({ children, hoverable = false, padding = "default", className = "", as: Tag = "div", ...rest }) {
  const paddingClass =
    padding === "compact"
      ? "th-card__body--compact"
      : padding === "spacious"
        ? "th-card__body--spacious"
        : "";

  return (
    <Tag
      className={["th-card", hoverable ? "th-card--hoverable" : "", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      <div className={["th-card__body", paddingClass].filter(Boolean).join(" ")}>{children}</div>
    </Tag>
  );
}

export default Card;
