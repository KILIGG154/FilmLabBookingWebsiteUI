import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PageShell, Reveal, GradientField } from "../../components/motion";
import { Eyebrow } from "../../components/ui";
import { LabCard } from "../home/page";
import { filmLabs } from "../../lib/data";
import { cn } from "../../lib/utils";

const filters = ["All", "C-41", "E-6 Slide", "B&W Dev", "Drum Scans"];

export default function LabsPage() {
  const [active, setActive] = useState("All");
  const results = useMemo(
    () => (active === "All" ? filmLabs : filmLabs.filter((l) => l.specialties.includes(active))),
    [active],
  );

  return (
    <PageShell>
      <section className="relative overflow-hidden px-6 pb-16 pt-24 lg:px-10">
        <GradientField />
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Eyebrow>Film lab directory</Eyebrow>
            <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-tight text-[var(--color-cream)]">
              Find your darkroom.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-[var(--color-cream)]/85">
              {filmLabs.length} vetted labs, filtered by the process you shoot for.
            </p>
          </Reveal>

          <div className="mt-10 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={cn(
                  "relative rounded-full border border-[var(--color-hairline)] px-4 py-2 text-sm transition-colors",
                  active === f ? "text-[var(--color-ink)]" : "text-[var(--color-cream)] hover:border-[var(--color-sand)]",
                )}
              >
                {active === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-[var(--color-sand)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-ink)] px-6 py-16 lg:px-10">
        <motion.div layout className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((lab, i) => (
            <Reveal key={lab.slug} delay={i * 0.06}>
              <LabCard lab={lab} />
            </Reveal>
          ))}
        </motion.div>
      </section>
    </PageShell>
  );
}
