import { Link } from "react-router";
import { PageShell, Reveal, GradientField } from "../../components/motion";
import { Button, Badge, Eyebrow } from "../../components/ui";

const orders = [
  { id: "A-2291", lab: "Silverhalide Atelier", rolls: 3, status: "Scanning", eta: "Tomorrow", tone: "text-[var(--color-amber)]" },
  { id: "A-2287", lab: "Goldenhour Collective", rolls: 1, status: "Shipped back", eta: "Delivered", tone: "text-[var(--color-sand)]" },
  { id: "A-2280", lab: "North Loop Film Co.", rolls: 5, status: "Developing", eta: "3 days", tone: "text-[var(--color-amber)]" },
  { id: "A-2261", lab: "Tidewater Darkroom", rolls: 2, status: "Complete", eta: "Archived", tone: "text-[var(--color-sand)]" },
];

export default function ProfilePage() {
  return (
    <PageShell>
      <section className="relative px-6 pb-10 pt-16 lg:px-10">
        <GradientField />
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex flex-wrap items-center gap-6">
              <div className="grid h-24 w-24 place-items-center rounded-full border border-[var(--color-hairline)] bg-[var(--color-ink)] font-display text-4xl text-[var(--color-amber)]">
                A
              </div>
              <div>
                <Eyebrow>Photographer</Eyebrow>
                <h1 className="mt-2 font-display text-5xl tracking-tight text-[var(--color-cream)]">Ansel Rivera</h1>
                <p className="mt-1 text-[var(--color-cream)]/85">ansel@studio.com · Member since 2024</p>
              </div>
              <Link to="/labs" className="ml-auto">
                <Button>New booking</Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--color-ink)] px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { l: "Rolls developed", v: "47" },
                { l: "Active orders", v: "3" },
                { l: "Scans archived", v: "1,684" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-ink-2)] p-6">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-sand)]">{s.l}</p>
                  <p className="mt-3 font-display text-4xl text-[var(--color-cream)]">{s.v}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mt-14 font-display text-3xl tracking-tight">Your orders</h2>
            <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--color-hairline)]">
              <table className="w-full text-left text-sm">
                <thead className="bg-[var(--color-ink-2)] font-mono text-[11px] uppercase tracking-widest text-[var(--color-sand)]">
                  <tr>
                    <th className="px-6 py-4">Order</th>
                    <th className="px-6 py-4">Lab</th>
                    <th className="px-6 py-4">Rolls</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">ETA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-hairline)]">
                  {orders.map((o) => (
                    <tr key={o.id} className="transition-colors hover:bg-[rgba(242,224,192,0.04)]">
                      <td className="px-6 py-4 font-mono text-[var(--color-cream)]">#{o.id}</td>
                      <td className="px-6 py-4">{o.lab}</td>
                      <td className="px-6 py-4">{o.rolls}</td>
                      <td className="px-6 py-4"><Badge className={o.tone}>{o.status}</Badge></td>
                      <td className="px-6 py-4 text-right text-[var(--color-sand)]">{o.eta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
