import Button from "../ui/Button";

function EmptyState({
  icon = "◇",
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
  children,
}) {
  return (
    <div className="th-empty">
      <div className="th-empty__icon" aria-hidden="true">
        {icon}
      </div>
      {title ? <h3 className="th-empty__title">{title}</h3> : null}
      {description ? <p className="th-empty__description">{description}</p> : null}
      {(actionLabel || children) && (
        <div className="th-empty__actions">
          {actionLabel ? (
            <Button
              variant="primary"
              size="md"
              to={actionTo}
              onClick={onAction}
            >
              {actionLabel}
            </Button>
          ) : null}
          {children}
        </div>
      )}
    </div>
  );
}

export default EmptyState;
