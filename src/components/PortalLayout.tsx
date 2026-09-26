import { NavLink, Outlet, Link, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { LogOut } from "lucide-react";
import Logo from "./Logo";
import { cn } from "../lib/utils";

export type PortalNav = { to: string; label: string; icon: LucideIcon };

export default function PortalLayout({
  role,
  accent,
  nav,
}: {
  role: string;
  accent: string;
  nav: PortalNav[];
}) {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-[#220f00] text-[var(--color-cream)]">
      <div className="mx-auto flex max-w-[1500px]">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-[var(--color-hairline)] bg-[var(--color-ink)] px-5 py-6 lg:flex">
          <Logo className="mb-8" />
          <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-[var(--color-sand)]">{role}</p>
          <nav className="flex flex-1 flex-col gap-1">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end
                className={({ isActive }) =>
                  cn(
                    "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                    isActive
                      ? "text-[var(--color-ink)]"
                      : "text-[var(--color-sand)] hover:bg-[rgba(242,224,192,0.06)] hover:text-[var(--color-cream)]",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId={`side-${role}`}
                        className="absolute inset-0 -z-10 rounded-xl"
                        style={{ background: accent }}
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <n.icon size={17} />
                    {n.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          <Link
            to="/"
            className="mt-4 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[var(--color-sand)] transition-colors hover:text-[var(--color-cream)]"
          >
            <LogOut size={17} /> Sign out
          </Link>
        </aside>

        {/* Content */}
        <div className="flex-1">
          {/* mobile top nav */}
          <div className="flex gap-1 overflow-x-auto border-b border-[var(--color-hairline)] bg-[var(--color-ink)] px-4 py-3 lg:hidden">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end
                className={({ isActive }) =>
                  cn(
                    "whitespace-nowrap rounded-full px-3 py-1.5 text-xs",
                    isActive ? "bg-[var(--color-sand)] text-[var(--color-ink)]" : "text-[var(--color-sand)]",
                  )
                }
              >
                {n.label}
              </NavLink>
            ))}
          </div>
          <div className="px-5 py-8 lg:px-10 lg:py-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// Shared portal building blocks
export function PortalHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-amber)]">{subtitle}</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">{title}</h1>
    </div>
  );
}

export function StatCard({ label, value, delta }: { label: string; value: string; delta?: string }) {
  return (
    <div className="rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-ink)] p-5">
      <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-sand)]">{label}</p>
      <p className="mt-3 font-display text-3xl">{value}</p>
      {delta && <p className="mt-1 text-xs text-[var(--color-amber)]">{delta}</p>}
    </div>
  );
}
