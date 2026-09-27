import { Link, Navigate, useNavigate } from "react-router";
import { ChevronRight } from "lucide-react";
import { PageShell, Reveal, GradientField } from "../../components/motion";
import { Button, Badge, Eyebrow } from "../../components/ui";
import { useAuth } from "../../lib/auth";
import { orders } from "../../lib/data";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Not signed in — bounce to login.
  if (!user) return <Navigate to="/login" replace />;

  return (
    <PageShell>
      <section className="relative px-6 pb-10 pt-16 lg:px-10">
        <GradientField />
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex flex-wrap items-center gap-6">
              <div className="grid h-24 w-24 place-items-center rounded-full border border-[var(--color-hairline)] bg-[var(--color-ink)] font-display text-4xl text-[var(--color-amber)]">
                {user.name.charAt(0)}
              </div>
              <div>
                <Eyebrow>{user.role}</Eyebrow>
                <h1 className="mt-2 font-display text-5xl tracking-tight text-[var(--color-cream)]">{user.name}</h1>
                <p className="mt-1 text-[var(--color-cream)]/85">{user.email} · Member since 2024</p>
              </div>
              <div className="ml-auto flex gap-3">
                <Link to="/labs">
                  <Button>New booking</Button>
                </Link>
                <Link to="/" onClick={logout}>
                  <Button variant="outline">Sign out</Button>
                </Link>
              </div>
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
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-hairline)]">
                  {orders.map((o) => (
                    <tr
                      key={o.id}
                      onClick={() => navigate(`/orders/${o.id}`)}
                      className="cursor-pointer transition-colors hover:bg-[rgba(242,224,192,0.04)]"
                    >
                      <td className="px-6 py-4 font-mono text-[var(--color-cream)]">#{o.id}</td>
                      <td className="px-6 py-4">{o.lab}</td>
                      <td className="px-6 py-4">{o.rolls}</td>
                      <td className="px-6 py-4"><Badge className={o.tone}>{o.status}</Badge></td>
                      <td className="px-6 py-4 text-right text-[var(--color-sand)]">{o.eta}</td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center gap-1 text-sm text-[var(--color-amber)]">
                          Track <ChevronRight size={15} />
                        </span>
                      </td>
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
