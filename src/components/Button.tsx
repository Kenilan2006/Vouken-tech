import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  loading?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = "primary", loading, disabled, ...props }, ref) => {
    const styles = {
      primary: "bg-primary text-primary-foreground hover:brightness-[1.06]",
      secondary:
        "border border-border-strong bg-transparent text-foreground hover:border-primary/60 hover:text-primary",
      ghost: "text-muted-foreground hover:bg-accent hover:text-foreground",
      destructive: "bg-destructive text-destructive-foreground hover:brightness-[1.06]",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold tracking-[-0.01em] transition duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-0.5",
          styles[variant],
          className,
        )}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <span className="absolute inset-0 grid place-items-center">
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          </span>
        ) : null}
        <span className={cn("inline-flex items-center justify-center gap-2", loading && "invisible")}>{children}</span>
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
