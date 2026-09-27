import { useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";
import { AuthShell } from "./shell";
import { Button, Input, Field } from "../../components/ui";
import { useAuth, roleHome } from "../../lib/auth";

export function LoginPage() {
  const nav = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("ansel@studio.com");
  const [remember, setRemember] = useState(true);
  const from = (location.state as { from?: string } | null)?.from;

  return (
    <AuthShell>
      <h1 className="font-display text-4xl tracking-tight">Welcome back.</h1>
      <p className="mt-2 text-[var(--color-sand)]">Sign in to track your rolls and scans.</p>
      <form
        className="mt-8 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          const user = login(email, remember);
          // Return to the page that sent us here, otherwise the role's home.
          nav(from ?? roleHome[user.role]);
        }}
      >
        <Field label="Email">
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-sand)]" />
            <Input
              type="email"
              required
              placeholder="you@studio.com"
              className="pl-11"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </Field>
        <Field label="Password">
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-sand)]" />
            <Input type="password" required placeholder="••••••••" className="pl-11" defaultValue="password" />
          </div>
        </Field>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-[var(--color-sand)]">
            <input
              type="checkbox"
              className="accent-[var(--color-amber)]"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />{" "}
            Remember me
          </label>
          <Link to="/reset-password" className="text-[var(--color-amber)] hover:underline">Forgot password?</Link>
        </div>
        <Button size="lg" className="w-full">Sign in <ArrowRight size={17} /></Button>
      </form>
      <div className="mt-6 rounded-xl border border-[var(--color-hairline)] bg-[var(--color-ink-2)] p-4 text-xs leading-relaxed text-[var(--color-sand)]">
        <span className="font-mono uppercase tracking-widest text-[var(--color-amber)]">Demo logins</span>
        <ul className="mt-2 space-y-1">
          <li>ansel@studio.com — Photographer</li>
          <li>owner@lab.com — Film Lab Owner</li>
          <li>mod@halide.com — Moderator</li>
          <li>admin@halide.com — Admin</li>
        </ul>
      </div>
      <p className="mt-6 text-sm text-[var(--color-sand)]">
        New here? <Link to="/register" className="text-[var(--color-cream)] underline">Create an account</Link>
      </p>
    </AuthShell>
  );
}

export function RegisterPage() {
  const nav = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <AuthShell
      aside={{
        title: "Start developing in minutes.",
        body: "Create an account, pick a lab and mail your first roll this week.",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&h=1400&fit=crop&auto=format",
      }}
    >
      <h1 className="font-display text-4xl tracking-tight">Create your account.</h1>
      <p className="mt-2 text-[var(--color-sand)]">Free to join. Pay only when you book.</p>
      <form
        className="mt-8 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          register(name, email);
          nav("/verify");
        }}
      >
        <Field label="Full name">
          <div className="relative">
            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-sand)]" />
            <Input required placeholder="Ansel Adams" className="pl-11" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        </Field>
        <Field label="Email">
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-sand)]" />
            <Input type="email" required placeholder="you@studio.com" className="pl-11" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </Field>
        <Field label="Password">
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-sand)]" />
            <Input type="password" required placeholder="Create a password" className="pl-11" />
          </div>
        </Field>
        <Button size="lg" className="w-full">Create account <ArrowRight size={17} /></Button>
      </form>
      <p className="mt-6 text-sm text-[var(--color-sand)]">
        Already have an account? <Link to="/login" className="text-[var(--color-cream)] underline">Sign in</Link>
      </p>
    </AuthShell>
  );
}

export function VerifyPage() {
  const nav = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const complete = code.every((c) => c !== "");

  const set = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...code];
    next[i] = v;
    setCode(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  return (
    <AuthShell
      aside={{
        title: "Check your inbox.",
        body: "We sent a six-digit code to confirm it's really you.",
        image: "https://images.unsplash.com/photo-1554672408-17d1cc2d4dfa?w=900&h=1400&fit=crop&auto=format",
      }}
    >
      <h1 className="font-display text-4xl tracking-tight">Verify your email.</h1>
      <p className="mt-2 text-[var(--color-sand)]">Enter the code we sent to your inbox.</p>
      <form className="mt-8" onSubmit={(e) => { e.preventDefault(); nav("/profile"); }}>
        <div className="flex justify-between gap-2">
          {code.map((c, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              value={c}
              onChange={(e) => set(i, e.target.value)}
              onKeyDown={(e) => e.key === "Backspace" && !c && i > 0 && refs.current[i - 1]?.focus()}
              inputMode="numeric"
              maxLength={1}
              className="h-14 w-full rounded-xl border border-[var(--color-hairline)] bg-[var(--color-ink-2)] text-center font-display text-2xl text-[var(--color-cream)] focus:border-[var(--color-amber)] focus:outline-none"
            />
          ))}
        </div>
        <Button size="lg" className="mt-8 w-full" disabled={!complete}>Verify & continue</Button>
      </form>
      <p className="mt-6 text-sm text-[var(--color-sand)]">
        Didn't get it? <button className="text-[var(--color-amber)] hover:underline">Resend code</button>
      </p>
    </AuthShell>
  );
}

export function ResetPasswordPage() {
  const [sent, setSent] = useState(false);
  return (
    <AuthShell
      aside={{
        title: "It happens to the best of us.",
        body: "Reset your password and get back to your negatives.",
        image: "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=900&h=1400&fit=crop&auto=format",
      }}
    >
      {sent ? (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <CheckCircle2 size={40} className="text-[var(--color-amber)]" />
          <h1 className="mt-5 font-display text-4xl tracking-tight">Check your email.</h1>
          <p className="mt-2 text-[var(--color-sand)]">We sent a reset link if that address is on file.</p>
          <Link to="/login" className="mt-8 inline-block">
            <Button size="lg">Back to sign in</Button>
          </Link>
        </motion.div>
      ) : (
        <>
          <h1 className="font-display text-4xl tracking-tight">Reset password.</h1>
          <p className="mt-2 text-[var(--color-sand)]">Enter your email and we'll send a reset link.</p>
          <form className="mt-8 space-y-5" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <Field label="Email">
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-sand)]" />
                <Input type="email" required placeholder="you@studio.com" className="pl-11" />
              </div>
            </Field>
            <Button size="lg" className="w-full">Send reset link</Button>
          </form>
          <p className="mt-6 text-sm text-[var(--color-sand)]">
            Remembered it? <Link to="/login" className="text-[var(--color-cream)] underline">Sign in</Link>
          </p>
        </>
      )}
    </AuthShell>
  );
}
