import { useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui";
import Logo from "./Logo";
import { menuVariants, menuItemVariants } from "../lib/motion";
import { useAuth, roleHome } from "../lib/auth";
import { cn } from "../lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/labs", label: "Film Labs" },
  { to: "/profile", label: "Profile" },
];

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { scrollYProgress, scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <div className="relative min-h-screen">
      {/* scroll progress bar */}
      <motion.div
        className="fixed left-0 top-0 z-50 h-0.5 origin-left bg-[var(--color-amber)]"
        style={{ scaleX: scrollYProgress, width: "100%" }}
      />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500",
          scrolled
            ? "border-b border-[var(--color-hairline)] bg-[rgba(43,20,0,0.72)] backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Logo />

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors",
                    isActive ? "text-[var(--color-cream)]" : "text-[var(--color-sand)] hover:text-[var(--color-cream)]",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {n.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-[rgba(242,224,192,0.08)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link to={roleHome[user.role]} className="hidden items-center gap-2.5 md:flex">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-sand)] font-display text-sm text-[var(--color-ink)]">
                    {user.name.charAt(0)}
                  </span>
                  <span className="text-sm text-[var(--color-cream)]">{user.name.split(" ")[0]}</span>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:inline-flex"
                  onClick={() => { logout(); navigate("/"); }}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="hidden md:block">
                  <Button variant="ghost" size="sm">Sign in</Button>
                </Link>
                <Link to="/register" className="hidden md:block">
                  <Button size="sm">Book a lab</Button>
                </Link>
              </>
            )}
            <button
              onClick={() => setMenuOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-hairline)] text-[var(--color-cream)] md:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen animated menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-50 flex flex-col bg-[var(--color-ink)]"
          >
            <div className="flex h-18 items-center justify-between px-6 py-4">
              <Logo onClick={() => setMenuOpen(false)} />
              <button
                onClick={() => setMenuOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-hairline)]"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
              {[...nav, { to: "/login", label: "Sign in" }, { to: "/register", label: "Book a lab" }].map((n) => (
                <motion.div key={n.to} variants={menuItemVariants}>
                  <Link
                    to={n.to}
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-[var(--color-hairline)] py-5 font-display text-4xl tracking-tight text-[var(--color-cream)] transition-colors hover:text-[var(--color-amber)]"
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page transitions */}
      <main className="min-h-screen pt-18">
        <AnimatePresence mode="wait">
          <div key={location.pathname}>
            <Outlet />
          </div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-hairline)] bg-[var(--color-ink)] px-6 py-16 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo size="lg" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--color-sand)]">
            The booking layer for analog film labs. Develop, scan and archive your rolls with darkrooms you can trust.
          </p>
        </div>
        <FooterCol title="Platform" links={["Film Labs", "Pricing", "How it works", "Sign in"]} />
        <FooterCol title="Company" links={["About", "Careers", "Journal", "Contact"]} />
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col justify-between gap-4 border-t border-[var(--color-hairline)] pt-6 text-xs text-[var(--color-sand)] sm:flex-row">
        <span>© 2026 Halide Film Lab Co-op</span>
        <span className="font-mono">Developed with care in dip-and-dunk tanks</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-amber)]">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm text-[var(--color-sand)]">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="transition-colors hover:text-[var(--color-cream)]">{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
