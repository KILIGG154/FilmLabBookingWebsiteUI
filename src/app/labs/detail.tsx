import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Star, MapPin, Clock, Check, ArrowLeft } from "lucide-react";
import { PageShell, Reveal } from "../../components/motion";
import { Button, Badge, Eyebrow } from "../../components/ui";
import { filmLabs, services } from "../../lib/data";
import { useAuth } from "../../lib/auth";
import { cn } from "../../lib/utils";

export default function LabDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const lab = filmLabs.find((l) => l.slug === slug) ?? filmLabs[0];
  const [selected, setSelected] = useState<string[]>([services[0].name]);
  const [rolls, setRolls] = useState(1);

  const toggle = (name: string) =>
    setSelected((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));

  const chosen = services.filter((s) => selected.includes(s.name));
  const perRoll = chosen.filter((s) => s.unit !== "per order").reduce((a, s) => a + s.price, 0);
  const flat = chosen.filter((s) => s.unit === "per order").reduce((a, s) => a + s.price, 0);
  const total = perRoll * rolls + flat;

  const handleBook = () => {
    // Guests sign in first, then land back here to continue.
    if (!user) {
      navigate("/login", { state: { from: `/labs/${lab.slug}` } });
      return;
    }
    // Signed in — head to the Stripe checkout with the order details.
    navigate("/checkout", {
      state: {
        labSlug: lab.slug,
        labName: lab.name,
        city: lab.city,
        items: chosen.map((s) => ({ name: s.name, price: s.price, unit: s.unit })),
        rolls,
        total,
      },
    });
  };

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative h-[52vh] min-h-[380px] overflow-hidden">
        <img src={lab.image} alt={`Inside ${lab.name}`} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[rgba(43,20,0,0.4)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-10 lg:px-10">
          <Link to="/labs" className="mb-4 inline-flex items-center gap-2 text-sm text-[var(--color-cream)]/80 hover:text-[var(--color-cream)]">
            <ArrowLeft size={15} /> All labs
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-tight text-[var(--color-cream)]"
          >
            {lab.name}
          </motion.h1>
          <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-[var(--color-cream)]">
            <span className="flex items-center gap-1.5"><MapPin size={15} /> {lab.city}</span>
            <span className="flex items-center gap-1.5"><Clock size={15} /> {lab.turnaround}</span>
            <span className="flex items-center gap-1.5">
              <Star size={15} className="fill-[var(--color-amber)] text-[var(--color-amber)]" /> {lab.rating} ({lab.reviews} reviews)
            </span>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-ink)] px-6 py-16 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Info */}
          <div className="space-y-10">
            <Reveal>
              <Eyebrow>About the lab</Eyebrow>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--color-cream)]/90">{lab.about}</p>
            </Reveal>
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-3">
                <Spec label="Formats" value={lab.formats.join(" · ")} />
                <Spec label="Scanners" value={lab.scans} />
                <Spec label="Turnaround" value={lab.turnaround} />
              </div>
            </Reveal>
            <Reveal>
              <h3 className="font-display text-2xl">Specialties</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {lab.specialties.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Booking card */}
          <Reveal delay={0.1}>
            <div className="sticky top-24 rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-ink-2)] p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-sand)]">Build your order</p>
              <div className="mt-5 space-y-2">
                {services.map((s) => {
                  const on = selected.includes(s.name);
                  return (
                    <button
                      key={s.name}
                      onClick={() => toggle(s.name)}
                      className={cn(
                        "flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                        on ? "border-[var(--color-sand)] bg-[rgba(217,175,130,0.08)]" : "border-[var(--color-hairline)] hover:border-[var(--color-sand)]",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span className={cn("grid h-5 w-5 place-items-center rounded-full border", on ? "border-[var(--color-amber)] bg-[var(--color-amber)] text-[var(--color-ink)]" : "border-[var(--color-hairline)]")}>
                          {on && <Check size={13} />}
                        </span>
                        <span className="text-sm">{s.name}</span>
                      </span>
                      <span className="font-mono text-sm text-[var(--color-amber)]">${s.price}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm text-[var(--color-sand)]">Rolls</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setRolls((r) => Math.max(1, r - 1))} className="grid h-8 w-8 place-items-center rounded-full border border-[var(--color-hairline)]">−</button>
                  <span className="w-6 text-center font-mono">{rolls}</span>
                  <button onClick={() => setRolls((r) => r + 1)} className="grid h-8 w-8 place-items-center rounded-full border border-[var(--color-hairline)]">+</button>
                </div>
              </div>

              <div className="mt-6 flex items-end justify-between border-t border-[var(--color-hairline)] pt-5">
                <span className="text-sm text-[var(--color-sand)]">Estimated total</span>
                <motion.span key={total} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl text-[var(--color-amber)]">
                  ${total}
                </motion.span>
              </div>
              <Button size="lg" className="mt-5 w-full" onClick={handleBook}>
                {user ? "Book this lab" : "Sign in to book"}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--color-hairline)] bg-[var(--color-ink-2)] p-4">
      <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-sand)]">{label}</p>
      <p className="mt-2 font-display text-lg">{value}</p>
    </div>
  );
}
