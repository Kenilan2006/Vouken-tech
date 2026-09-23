import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { CheckCircle2, Info, TriangleAlert, X } from "lucide-react";
import { cn } from "../lib/utils";

type Toast = { id: number; title: string; description?: string; variant: "success" | "error" | "info" };
type ToastContextValue = { notify: (toast: Omit<Toast, "id">) => void };
const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const notify = useCallback((toast: Omit<Toast, "id">) => {
    const id = Date.now();
    setToasts((current) => [...current, { ...toast, id }]);
    window.setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 5000);
  }, []);
  const dismiss = (id: number) => setToasts((current) => current.filter((item) => item.id !== id));
  const icons = { success: CheckCircle2, error: TriangleAlert, info: Info };

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] flex flex-col items-end gap-3"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((toast) => {
          const Icon = icons[toast.variant];
          return (
            <div
              key={toast.id}
              className={cn(
                "pointer-events-auto flex w-full max-w-sm gap-3 rounded-lg border border-border-strong bg-popover p-4 text-popover-foreground reveal",
                toast.variant === "error" && "border-destructive",
              )}
            >
              <Icon
                className={cn(
                  "mt-0.5 size-5 shrink-0",
                  toast.variant === "error" ? "text-destructive" : "text-primary",
                )}
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{toast.title}</p>
                {toast.description ? (
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{toast.description}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                aria-label="Dismiss notification"
                className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X size={15} aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}
