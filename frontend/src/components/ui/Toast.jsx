import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { createPortal } from "react-dom";

const ToastContext = createContext(null);

let toastId = 0;

function ToastItem({ toast, onDismiss }) {
  return (
    <div
      className={`th-toast th-toast--${toast.variant || "info"}`}
      role="status"
      aria-live="polite"
    >
      <div className="th-toast__content">
        {toast.title ? <div className="th-toast__title">{toast.title}</div> : null}
        {toast.message ? <div className="th-toast__message">{toast.message}</div> : null}
      </div>
      <button
        type="button"
        className="th-toast__close"
        aria-label="Dismiss notification"
        onClick={() => onDismiss(toast.id)}
      >
        ✕
      </button>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback(
    ({ title, message, variant = "info", duration = 4000 }) => {
      const id = ++toastId;
      setToasts((current) => [...current, { id, title, message, variant }]);

      if (duration > 0) {
        window.setTimeout(() => dismiss(id), duration);
      }

      return id;
    },
    [dismiss]
  );

  const value = useMemo(
    () => ({
      push,
      dismiss,
      success: (message, title = "Success") => push({ title, message, variant: "success" }),
      error: (message, title = "Error") => push({ title, message, variant: "error" }),
      info: (message, title = "Info") => push({ title, message, variant: "info" }),
      warning: (message, title = "Warning") => push({ title, message, variant: "warning" }),
    }),
    [push, dismiss]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div className="th-toast-viewport" aria-label="Notifications">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onDismiss={dismiss} />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

export default ToastProvider;
