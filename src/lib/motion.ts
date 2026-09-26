import type { Variants, Transition } from "framer-motion";

// Cinematic easing — a slow-in, decisive-out curve that feels like film advancing.
export const filmEase: Transition["ease"] = [0.16, 1, 0.3, 1];

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  enter: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: filmEase, when: "beforeChildren", staggerChildren: 0.06 },
  },
  exit: { opacity: 0, y: -16, filter: "blur(6px)", transition: { duration: 0.35, ease: filmEase } },
};

export const revealVariants: Variants = {
  initial: { opacity: 0, y: 28 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.7, ease: filmEase } },
};

export const staggerContainer: Variants = {
  initial: {},
  enter: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 22 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.6, ease: filmEase } },
};

export const menuVariants: Variants = {
  closed: { opacity: 0, transition: { duration: 0.25, ease: filmEase, when: "afterChildren" } },
  open: { opacity: 1, transition: { duration: 0.4, ease: filmEase, when: "beforeChildren", staggerChildren: 0.07 } },
};

export const menuItemVariants: Variants = {
  closed: { opacity: 0, x: 32 },
  open: { opacity: 1, x: 0, transition: { duration: 0.5, ease: filmEase } },
};
