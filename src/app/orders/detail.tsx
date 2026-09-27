import { Link, useParams, Navigate, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Check, MapPin, Package, Truck, Clock, Film, Navigation, Home } from "lucide-react";
import { PageShell, Reveal, GradientField } from "../../components/motion";
import { Button, Badge, Eyebrow } from "../../components/ui";
import { useAuth } from "../../lib/auth";
import { orders } from "../../lib/data";

const filmEase = [0.16, 1, 0.3, 1] as const;

export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" state={{ from: `/orders/${id}` }} replace />;

  const order = orders.find((o) => o.id === id);
  if (!order) {
    return (
      <PageShell>
        <section className="relative min-h-[70vh] px-6 py-32 lg:px-10">
          <GradientField />
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Order not found</Eyebrow>
            <h1 className="mt-3 font-display text-4xl tracking-tight text-[var(--color-cream)]">
              We couldn&rsquo;t find order #{id}.
            </h1>
            <Button className="mt-8" onClick={() => navigate("/profile")}>Back to my orders</Button>
          </div>
        </section>
      </PageShell>
    );
  }

  const done = order.currentStage;
  const total = order.stages.length;
  const progress = Math.round(((done + 0.5) / total) * 100);

  return (
    <PageShell>
      <section className="relative px-6 pb-10 pt-24 lg:px-10">
        <GradientField />
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <Link to="/profile" className="inline-flex items-center gap-2 text-sm text-[var(--color-cream)]/80 hover:text-[var(--color-cream)]">
              <ArrowLeft size={15} /> My orders
            </Link>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow>Order #{order.id}</Eyebrow>
                <h1 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-none tracking-tight text-[var(--color-cream)]">
                  {order.lab}
                </h1>
                <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-[var(--color-sand)]">
                  <span className="flex items-center gap-1.5"><MapPin size={14} /> {order.city}</span>
                  <span className="flex items-center gap-1.5"><Film size={14} /> {order.rolls} rolls · {order.film}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} /> Placed {order.placed}</span>
                </p>
              </div>
              <Badge className={order.tone}>{order.status}</Badge>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--color-ink)] px-6 py-14 lg:px-10">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.4fr_0.6fr]">
          {/* Progress tracker */}
          <div className="space-y-6">
            <Reveal>
              <DeliveryMap
                labName={order.lab}
                city={order.city}
                stage={order.currentStage}
                eta={order.eta}
              />
            </Reveal>
            <Reveal>
              <div className="rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-ink-2)] p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-2xl tracking-tight">Order progress</h2>
                  <span className="flex items-center gap-1.5 text-sm text-[var(--color-sand)]">
                    <Truck size={15} /> ETA {order.eta}
                  </span>
                </div>

                {/* progress bar */}
                <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-[rgba(242,224,192,0.12)]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: filmEase }}
                    className="h-full rounded-full bg-[var(--color-amber)]"
                  />
                </div>

                {/* timeline */}
                <ol className="mt-8 space-y-0">
                  {order.stages.map((s, i) => {
                    const isDone = i < done;
                    const isCurrent = i === done;
                    const isLast = i === order.stages.length - 1;
                    return (
                      <motion.li
                        key={s.key}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: filmEase, delay: i * 0.06 }}
                        className="relative flex gap-4 pb-8 last:pb-0"
                      >
                        {/* connector line */}
                        {!isLast && (
                          <span
                            className={`absolute left-[13px] top-7 h-[calc(100%-12px)] w-px ${
                              isDone ? "bg-[var(--color-amber)]" : "bg-[var(--color-hairline)]"
                            }`}
                          />
                        )}
                        {/* dot */}
                        <span className="relative z-10 mt-0.5 shrink-0">
                          {isCurrent && (
                            <motion.span
                              animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
                              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                              className="absolute inset-0 rounded-full bg-[var(--color-amber)]"
                            />
                          )}
                          <span
                            className={`relative grid h-[27px] w-[27px] place-items-center rounded-full border ${
                              isDone
                                ? "border-[var(--color-amber)] bg-[var(--color-amber)] text-[var(--color-ink)]"
                                : isCurrent
                                  ? "border-[var(--color-amber)] bg-[var(--color-ink-2)] text-[var(--color-amber)]"
                                  : "border-[var(--color-hairline)] bg-[var(--color-ink-2)] text-[var(--color-sand)]"
                            }`}
                          >
                            {isDone ? <Check size={14} /> : isCurrent ? <Package size={13} /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                          </span>
                        </span>
                        {/* text */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                            <p className={`font-display text-lg ${isDone || isCurrent ? "text-[var(--color-cream)]" : "text-[var(--color-cream)]/45"}`}>
                              {s.title}
                            </p>
                            {s.at && <span className="font-mono text-[11px] text-[var(--color-sand)]">{s.at}</span>}
                          </div>
                          <p className={`mt-1 text-sm ${isDone || isCurrent ? "text-[var(--color-cream)]/75" : "text-[var(--color-cream)]/35"}`}>
                            {s.detail}
                          </p>
                          {isCurrent && (
                            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[var(--color-amber)] bg-[rgba(239,159,39,0.1)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-amber)]">
                              In progress
                            </span>
                          )}
                        </div>
                      </motion.li>
                    );
                  })}
                </ol>
              </div>
            </Reveal>
          </div>

          {/* Summary */}
          <Reveal delay={0.1}>
            <div className="sticky top-24 rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-ink-2)] p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-sand)]">Order summary</p>
              <ul className="mt-5 space-y-3 text-sm">
                {order.services.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-[var(--color-cream)]/90">
                    <Check size={15} className="mt-0.5 shrink-0 text-[var(--color-amber)]" /> {s}
                  </li>
                ))}
              </ul>
              <div className="mt-5 space-y-2 border-t border-[var(--color-hairline)] pt-5 text-sm">
                <Row label="Rolls" value={String(order.rolls)} />
                <Row label="Film" value={order.film} />
                <Row label="Placed" value={order.placed} />
                <Row label="Estimated delivery" value={order.eta} />
              </div>
              <div className="mt-5 flex items-end justify-between border-t border-[var(--color-hairline)] pt-5">
                <span className="text-sm text-[var(--color-sand)]">Total paid</span>
                <span className="font-display text-4xl text-[var(--color-amber)]">${order.total}</span>
              </div>
              <Button variant="outline" className="mt-6 w-full" onClick={() => navigate(`/labs/${order.labSlug}`)}>
                Book this lab again
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}

// Cubic-bezier route across a stylized map. Normalized 0..100 × 0..46 space.
const P0 = { x: 11, y: 33 };
const P1 = { x: 34, y: 7 };
const P2 = { x: 63, y: 43 };
const P3 = { x: 88, y: 13 };

function bezier(t: number) {
  const u = 1 - t;
  const x = u * u * u * P0.x + 3 * u * u * t * P1.x + 3 * u * t * t * P2.x + t * t * t * P3.x;
  const y = u * u * u * P0.y + 3 * u * u * t * P1.y + 3 * u * t * t * P2.y + t * t * t * P3.y;
  return { x, y };
}

function DeliveryMap({ labName, city, stage, eta }: { labName: string; city: string; stage: number; eta: string }) {
  // Return shipment: van leaves the lab at "shipped" (6) and arrives "delivered" (7).
  const delivered = stage >= 7;
  const dispatched = stage >= 6;
  const t = delivered ? 1 : dispatched ? 0.58 : 0.06;
  const van = bezier(t);

  const label = delivered
    ? "Delivered to your address"
    : dispatched
      ? "Out for delivery — courier en route"
      : "Awaiting dispatch from the lab";

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-ink-2)]">
      <div className="flex items-center justify-between px-6 pt-5">
        <h2 className="font-display text-2xl tracking-tight">Live delivery map</h2>
        <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-[var(--color-sand)]">
          <Navigation size={13} /> Demo view
        </span>
      </div>

      <div className="relative mt-4 aspect-[100/46] w-full">
        <svg viewBox="0 0 100 46" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {/* land */}
          <rect x="0" y="0" width="100" height="46" fill="#3a1500" />
          {/* faint street grid */}
          <g stroke="rgba(242,224,192,0.06)" strokeWidth="0.4">
            {[10, 25, 40, 55, 70, 85].map((x) => (
              <line key={`v${x}`} x1={x} y1="0" x2={x} y2="46" />
            ))}
            {[9, 19, 29, 39].map((y) => (
              <line key={`h${y}`} x1="0" y1={y} x2="100" y2={y} />
            ))}
          </g>
          {/* river */}
          <path d="M -2 28 Q 30 22 48 34 T 102 30 L 102 46 L -2 46 Z" fill="rgba(157,53,0,0.35)" />
          {/* park */}
          <ellipse cx="72" cy="9" rx="12" ry="6" fill="rgba(217,175,130,0.1)" />
          {/* full route (faint) */}
          <path
            d={`M ${P0.x} ${P0.y} C ${P1.x} ${P1.y}, ${P2.x} ${P2.y}, ${P3.x} ${P3.y}`}
            fill="none"
            stroke="rgba(242,224,192,0.18)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="2 2"
          />
          {/* traveled route (amber) */}
          <motion.path
            d={`M ${P0.x} ${P0.y} C ${P1.x} ${P1.y}, ${P2.x} ${P2.y}, ${P3.x} ${P3.y}`}
            fill="none"
            stroke="var(--color-amber)"
            strokeWidth="1.2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: t }}
            transition={{ duration: 1.4, ease: filmEase }}
          />
        </svg>

        {/* origin pin (lab) */}
        <Pin x={P0.x} y={P0.y} tone="sand" icon={<MapPin size={12} />} />
        {/* destination pin (home) */}
        <Pin x={P3.x} y={P3.y} tone={delivered ? "amber" : "sand"} icon={<Home size={11} />} />

        {/* moving van */}
        <motion.div
          className="absolute z-10"
          style={{ left: `${van.x}%`, top: `${van.y}%` }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5, ease: filmEase }}
        >
          <motion.div
            className="-translate-x-1/2 -translate-y-1/2"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            {!delivered && (
              <motion.span
                animate={{ scale: [1, 2.2], opacity: [0.45, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-amber)]"
              />
            )}
            <span className="relative grid h-8 w-8 place-items-center rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-amber)] text-[var(--color-ink)] shadow-lg">
              <Truck size={15} />
            </span>
          </motion.div>
        </motion.div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-6 pb-5 pt-4">
        <div>
          <p className="flex items-center gap-2 text-sm text-[var(--color-cream)]">
            <span className={`h-2 w-2 rounded-full ${delivered ? "bg-[var(--color-sand)]" : "bg-[var(--color-amber)]"} ${!delivered ? "animate-pulse" : ""}`} />
            {label}
          </p>
          <p className="mt-1 text-xs text-[var(--color-sand)]">
            {labName} · {city}
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-sm text-[var(--color-sand)]">
          <Clock size={14} /> {delivered ? "Arrived" : `ETA ${eta}`}
        </span>
      </div>
    </div>
  );
}

function Pin({ x, y, tone, icon }: { x: number; y: number; tone: "amber" | "sand"; icon: React.ReactNode }) {
  const bg = tone === "amber" ? "bg-[var(--color-amber)] text-[var(--color-ink)]" : "bg-[var(--color-ink)] text-[var(--color-sand)]";
  return (
    <span
      className={`absolute z-[5] grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[var(--color-sand)] ${bg}`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {icon}
    </span>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-[var(--color-sand)]">{label}</span>
      <span className="text-[var(--color-cream)]">{value}</span>
    </div>
  );
}
