import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";
import { pageVariants, revealVariants, filmEase } from "../lib/motion";
import { cn } from "../lib/utils";

// Wraps each routed page so it animates in/out with AnimatePresence in the layout.
export function PageShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit" className={className}>
      {children}
    </motion.div>
  );
}

// Scroll-triggered reveal — fires once when the element scrolls into view.
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={revealVariants}
      initial="initial"
      animate={inView ? "enter" : "initial"}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Subtle parallax gradient background used on public pages.
export function GradientField({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div className="absolute inset-0" style={{ background: "var(--page-grad)" }} />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,transparent,rgba(43,20,0,0.65))]" />
      <motion.div
        aria-hidden
        className="absolute -right-40 top-1/4 h-[36rem] w-[36rem] rounded-full bg-[var(--color-amber)] opacity-20 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="film-grain absolute inset-0 opacity-[0.06] mix-blend-overlay" />
    </div>
  );
}

export const MotionEase = filmEase;
