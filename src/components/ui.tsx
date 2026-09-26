import { forwardRef } from "react";
import type { ButtonHTMLAttributes, InputHTMLAttributes, HTMLAttributes } from "react";
import { cn } from "../lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-amber)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)] disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
      primary:
        "bg-[var(--color-sand)] text-[var(--color-ink)] hover:bg-[var(--color-amber)] hover:-translate-y-0.5 shadow-[0_8px_30px_-12px_rgba(239,159,39,0.6)]",
      outline:
        "border border-[var(--color-hairline)] text-[var(--color-cream)] hover:border-[var(--color-sand)] hover:bg-[rgba(242,224,192,0.06)]",
      ghost: "text-[var(--color-sand)] hover:text-[var(--color-cream)] hover:bg-[rgba(242,224,192,0.06)]",
    };
    const sizes = { sm: "h-9 px-4 text-sm", md: "h-11 px-6 text-sm", lg: "h-13 px-8 text-base py-3.5" };
    return <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />;
  },
);
Button.displayName = "Button";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-ink)] p-6 backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--color-hairline)] bg-[var(--color-ink-2)] px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-[var(--color-sand)]",
        className,
      )}
      {...props}
    />
  );
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-12 w-full rounded-xl border border-[var(--color-hairline)] bg-[var(--color-ink-2)] px-4 text-[var(--color-cream)] placeholder:text-[rgba(217,175,130,0.5)] transition-colors focus:border-[var(--color-sand)] focus:outline-none focus:ring-1 focus:ring-[var(--color-sand)]",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-sand)]">{label}</span>
      {children}
    </label>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-amber)]", className)}>
      {children}
    </span>
  );
}
