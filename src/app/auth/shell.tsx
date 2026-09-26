import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { GradientField } from "../../components/motion";
import Logo from "../../components/Logo";

export function AuthShell({
  children,
  aside,
}: {
  children: ReactNode;
  aside?: { title: string; body: string; image: string };
}) {
  const panel = aside ?? {
    title: "Every roll, in the right hands.",
    body: "Join thousands of photographers who trust vetted darkrooms with their negatives.",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=900&h=1400&fit=crop&auto=format",
  };
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Form side */}
      <div className="relative flex items-center justify-center px-6 py-16 lg:px-16">
        <div className="w-full max-w-md">
          <Logo className="mb-10" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </div>
      </div>

      {/* Visual side */}
      <div className="relative hidden overflow-hidden lg:block">
        <GradientField />
        <img src={panel.image} alt="" className="h-full w-full object-cover opacity-40 mix-blend-luminosity" />
        <div className="absolute inset-0 flex flex-col justify-end p-14">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md font-display text-5xl leading-[1.02] tracking-tight text-[var(--color-cream)]"
          >
            {panel.title}
          </motion.h2>
          <p className="mt-4 max-w-sm text-[var(--color-cream)]/85">{panel.body}</p>
        </div>
      </div>
    </div>
  );
}
