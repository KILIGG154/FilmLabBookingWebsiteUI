import { Link } from "react-router";
import { motion } from "framer-motion";
import { Film } from "lucide-react";
import { filmEase } from "../lib/motion";
import { cn } from "../lib/utils";

export default function Logo({
  size = "md",
  onClick,
  className,
}: {
  size?: "md" | "lg";
  onClick?: () => void;
  className?: string;
}) {
  const badge = size === "lg" ? "h-10 w-10" : "h-9 w-9";
  const icon = size === "lg" ? 18 : 16;
  const text = size === "lg" ? "text-2xl" : "text-xl";
  return (
    <Link to="/" onClick={onClick} className={cn("group flex items-center gap-2.5 text-[var(--color-cream)]", className)}>
      <motion.span
        className={cn(
          "grid place-items-center rounded-full border border-[var(--color-hairline)] bg-[var(--color-ink)] transition-colors duration-300 group-hover:border-[var(--color-amber)] group-hover:bg-[var(--color-amber)]",
          badge,
        )}
        whileHover={{ rotate: 360, scale: 1.08 }}
        transition={{ duration: 0.6, ease: filmEase }}
      >
        <Film size={icon} className="text-[var(--color-amber)] transition-colors duration-300 group-hover:text-[var(--color-ink)]" />
      </motion.span>
      <span className={cn("relative font-display tracking-tight", text)}>
        <span className="transition-colors duration-300 group-hover:text-[var(--color-amber)]">Halide</span>
        <span className="text-[var(--color-amber)] transition-colors duration-300 group-hover:text-[var(--color-cream)]">.</span>
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[var(--color-amber)] transition-all duration-400 group-hover:w-full" />
      </span>
    </Link>
  );
}
