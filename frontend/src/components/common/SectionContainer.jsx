function SectionContainer({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  align = "left",
  spacing = "default",
  narrow = false,
  className = "",
  headerClassName = "",
}) {
  const spacingClass =
    spacing === "tight"
      ? "th-section--tight"
      : spacing === "loose"
        ? "th-section--loose"
        : "";

  return (
    <section
      id={id}
      className={["th-section", spacingClass, className].filter(Boolean).join(" ")}
    >
      <div className={["th-container", narrow ? "th-container--narrow" : ""].filter(Boolean).join(" ")}>
        {(eyebrow || title || subtitle) && (
          <header
            className={[
              "th-section__header",
              align === "center" ? "th-section__header--center" : "",
              headerClassName,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {eyebrow ? <span className="th-section__eyebrow">{eyebrow}</span> : null}
            {title ? <h2 className="th-section__title">{title}</h2> : null}
            {subtitle ? <p className="th-section__subtitle">{subtitle}</p> : null}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

export default SectionContainer;
