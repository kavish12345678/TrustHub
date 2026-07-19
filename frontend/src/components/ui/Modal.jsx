import { useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
}) {
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="th-modal-overlay"
      role="presentation"
      onClick={closeOnOverlay ? onClose : undefined}
    >
      <div
        className={["th-modal", size === "lg" ? "th-modal--lg" : ""].filter(Boolean).join(" ")}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "th-modal-title" : undefined}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="th-modal__header">
          {title ? (
            <h2 id="th-modal-title" className="th-modal__title">
              {title}
            </h2>
          ) : (
            <span />
          )}
          <button
            type="button"
            className="th-modal__close"
            aria-label="Close dialog"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="th-modal__body">{children}</div>
        {footer ? <div className="th-modal__footer">{footer}</div> : null}
        {!footer && onClose ? (
          <div className="th-modal__footer">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : null}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
