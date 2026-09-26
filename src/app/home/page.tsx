import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Star, Camera, Scan, Package } from "lucide-react";
import { PageShell, Reveal, GradientField } from "../../components/motion";
import { Button, Badge, Eyebrow } from "../../components/ui";
import { staggerContainer, fadeUp } from "../../lib/motion";
import { filmLabs, services, steps } from "../../lib/data";

const popularServices = [
  { name: "Develop & Scan — 35mm", price: 14, unit: "per roll", bookings: 8420, trend: "+12% this month" },
  { name: "High-Res Scan Upgrade", price: 9, unit: "per roll", bookings: 5310, trend: "+9% this month" },
  { name: "Develop & Scan — 120", price: 16, unit: "per roll", bookings: 3980, trend: "+18% this month" },
  { name: "Push / Pull Processing", price: 4, unit: "per stop", bookings: 2140, trend: "+6% this month" },
];

export default function HomePage() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden px-6 lg:px-10">
        <GradientField />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div variants={staggerContainer} initial="initial" animate="enter">
            <motion.div variants={fadeUp}>
              <Eyebrow>Analog film lab booking</Eyebrow>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mt-5 font-display text-[clamp(2.75rem,7vw,5.25rem)] font-medium leading-[0.95] tracking-tight text-[var(--color-cream)]"
            >
              Your rolls,
              <br />
              in the right
              <span className="italic text-[var(--color-amber)]"> hands.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-md text-lg leading-relaxed text-[var(--color-cream)]/85">
              Book vetted darkrooms for developing, scanning and archival prints. Mail your film, track every stage, and
              download scans the moment they are ready.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/labs">
                <Button size="lg">
                  Browse film labs <ArrowUpRight size={18} />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg">Create an account</Button>
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10 flex items-center gap-6 text-sm text-[var(--color-cream)]/80">
              <span className="flex items-center gap-1.5">
                <Star size={15} className="fill-[var(--color-amber)] text-[var(--color-amber)]" /> 4.9 avg rating
              </span>
              <span className="h-4 w-px bg-[var(--color-hairline)]" />
              <span>28,000+ rolls developed</span>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp} initial="initial" animate="enter" className="relative">
            <div className="rounded-[2rem] border border-[var(--color-hairline)] bg-[var(--color-ink)] p-7">
              <div className="flex items-center justify-between">
                <div>
                  <Eyebrow>Most popular</Eyebrow>
                  <h3 className="mt-2 font-display text-2xl tracking-tight">Top booked services</h3>
                </div>
                <Link to="/labs" className="text-[var(--color-sand)] transition-colors hover:text-[var(--color-cream)]">
                  <ArrowUpRight size={20} />
                </Link>
              </div>

              <ul className="mt-6 space-y-2">
                {popularServices.map((s, i) => (
                  <motion.li
                    key={s.name}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to="/labs"
                      className="group flex items-center gap-4 rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-ink-2)] p-4 transition-colors hover:border-[var(--color-sand)]"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--color-ink)] font-display text-lg text-[var(--color-amber)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-lg leading-tight">{s.name}</span>
                        <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-sand)]">
                          {s.bookings.toLocaleString()} booked · {s.trend}
                        </span>
                      </span>
                      <span className="text-right">
                        <span className="block font-mono text-lg text-[var(--color-amber)]">${s.price}</span>
                        <span className="text-[11px] text-[var(--color-sand)]">{s.unit}</span>
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STEPS */}
      <section className="relative bg-[var(--color-ink)] px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-3 max-w-2xl font-display text-4xl tracking-tight md:text-5xl">
              Four steps from shot to scan.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="group h-full rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-ink-2)] p-6 transition-colors hover:border-[var(--color-sand)]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-[var(--color-amber)]">{s.n}</span>
                    {[Camera, Package, Scan, ArrowUpRight][i] &&
                      (() => {
                        const Icon = [Camera, Package, Scan, ArrowUpRight][i];
                        return <Icon size={18} className="text-[var(--color-sand)]" />;
                      })()}
                  </div>
                  <h3 className="mt-8 font-display text-2xl">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-sand)]">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED LABS */}
      <section className="relative px-6 py-24 lg:px-10" style={{ background: "var(--page-grad)" }}>
        <div className="absolute inset-0 bg-[rgba(43,20,0,0.55)]" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow>Featured labs</Eyebrow>
                <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">Darkrooms worth mailing to.</h2>
              </div>
              <Link to="/labs">
                <Button variant="outline">View all labs</Button>
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filmLabs.slice(0, 3).map((lab, i) => (
              <Reveal key={lab.slug} delay={i * 0.08}>
                <LabCard lab={lab} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-[var(--color-ink)] px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Eyebrow>Transparent pricing</Eyebrow>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">Pay per roll. No memberships.</h2>
            <p className="mt-5 max-w-sm text-[var(--color-sand)]">
              Every lab sets its own rates — here's a typical menu. You'll always see the full total before you confirm a
              booking.
            </p>
            <Link to="/register" className="mt-8 inline-block">
              <Button size="lg">Start a booking</Button>
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="divide-y divide-[var(--color-hairline)] rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-ink-2)]">
              {services.map((s) => (
                <div key={s.name} className="flex items-center justify-between gap-4 px-6 py-5">
                  <div>
                    <p className="font-display text-lg">{s.name}</p>
                    <p className="text-sm text-[var(--color-sand)]">{s.note}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-2xl text-[var(--color-amber)]">${s.price}</span>
                    <p className="text-xs text-[var(--color-sand)]">{s.unit}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}

export function LabCard({ lab }: { lab: (typeof filmLabs)[number] }) {
  return (
    <Link
      to={`/labs/${lab.slug}`}
      className="group block overflow-hidden rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-ink)] transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-sand)]"
    >
      <div className="relative h-52 overflow-hidden bg-[var(--color-ink-2)]">
        <img
          src={lab.image}
          alt={`Inside ${lab.name}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-[var(--color-amber)] px-3 py-1 font-mono text-[11px] font-semibold text-[var(--color-ink)]">
          from ${lab.fromPrice}
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl tracking-tight">{lab.name}</h3>
          <span className="flex items-center gap-1 text-sm">
            <Star size={14} className="fill-[var(--color-amber)] text-[var(--color-amber)]" />
            {lab.rating}
          </span>
        </div>
        <p className="mt-1 text-sm text-[var(--color-sand)]">{lab.city} · {lab.turnaround}</p>
        <p className="mt-3 text-sm text-[var(--color-cream)]/80">{lab.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {lab.specialties.map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
