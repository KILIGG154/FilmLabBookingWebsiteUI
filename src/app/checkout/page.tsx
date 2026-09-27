import { useState } from "react";
import { Link, useLocation, useNavigate, Navigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Lock, ArrowLeft, CheckCircle2, ShieldCheck, Loader2, CreditCard, QrCode, FileDown, Check } from "lucide-react";
import { PageShell, GradientField } from "../../components/motion";
import { Button, Eyebrow } from "../../components/ui";
import Logo from "../../components/Logo";
import { stripePromise, hasStripeKey } from "../../lib/stripe";
import { useAuth } from "../../lib/auth";

export type BookingState = {
  labSlug: string;
  labName: string;
  city: string;
  items: { name: string; price: number; unit: string }[];
  rolls: number;
  total: number;
};

// Stripe Elements takes hex, not CSS vars — matched to the amber / maroon theme.
const fieldStyle = {
  style: {
    base: {
      color: "#f2e0c0",
      fontFamily: "Inter, system-ui, sans-serif",
      fontSize: "15px",
      "::placeholder": { color: "rgba(217,175,130,0.5)" },
      iconColor: "#ef9f27",
    },
    invalid: { color: "#ef9f27", iconColor: "#ef9f27" },
  },
};

export default function CheckoutPage() {
  const location = useLocation();
  const { user } = useAuth();
  const booking = location.state as BookingState | null;

  if (!user) return <Navigate to="/login" state={{ from: "/checkout" }} replace />;
  if (!booking) return <Navigate to="/labs" replace />;

  return (
    <PageShell>
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-8 lg:px-6">
        <GradientField />
        <div className="w-full max-w-5xl">
          <div className="mb-5 flex items-center justify-between">
            <Link
              to={`/labs/${booking.labSlug}`}
              className="inline-flex items-center gap-2 text-sm text-[var(--color-cream)]/80 hover:text-[var(--color-cream)]"
            >
              <ArrowLeft size={15} /> Back to {booking.labName}
            </Link>
            <Eyebrow>Secure checkout</Eyebrow>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid overflow-hidden rounded-3xl border border-[var(--color-hairline)] shadow-2xl md:grid-cols-2"
          >
            <OrderSummary booking={booking} />
            <Elements stripe={stripePromise}>
              <PaymentPanel booking={booking} />
            </Elements>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}

function OrderSummary({ booking }: { booking: BookingState }) {
  return (
    <div className="flex flex-col bg-[var(--color-ink-2)] p-7 lg:p-9">
      <Logo />
      <button className="mt-5 inline-flex w-fit items-center gap-2 text-xs text-[var(--color-sand)] transition-colors hover:text-[var(--color-amber)]">
        <FileDown size={14} /> Download the invoice in PDF format
      </button>

      <div className="mt-6 space-y-4 border-t border-[var(--color-hairline)] pt-6">
        {booking.items.map((it) => (
          <div key={it.name} className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-[var(--color-cream)]">{it.name}</p>
              <p className="mt-0.5 font-mono text-[11px] text-[var(--color-sand)]">
                {it.unit === "per roll" ? `${booking.rolls} rolls · $${it.price} each` : it.unit}
              </p>
            </div>
            <span className="font-mono text-sm text-[var(--color-cream)]">
              ${it.unit === "per roll" ? it.price * booking.rolls : it.price}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3 border-t border-[var(--color-hairline)] pt-6 text-sm">
        <Line label="Discounts & offers" value="$0.00" muted />
        <Line label="Tax" value="$0.00" muted />
      </div>

      <div className="mt-auto flex items-end justify-between border-t border-[var(--color-hairline)] pt-6">
        <span className="text-sm text-[var(--color-sand)]">Total</span>
        <span className="font-display text-4xl tracking-tight text-[var(--color-amber)]">${booking.total.toFixed(2)}</span>
      </div>
      <p className="mt-4 flex items-center gap-2 text-[11px] text-[var(--color-sand)]">
        <ShieldCheck size={13} /> Funds held until your scans are delivered.
      </p>
    </div>
  );
}

function Line({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className={muted ? "text-[var(--color-cream)]/75" : "text-[var(--color-cream)]"}>{label}</span>
      <span className="font-mono text-[var(--color-cream)]">{value}</span>
    </div>
  );
}

type Method = "card" | "qr";

function PaymentPanel({ booking }: { booking: BookingState }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [method, setMethod] = useState<Method>("card");
  const [name, setName] = useState(user?.name ?? "");
  const [remember, setRemember] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (method === "card" && stripe && elements) {
      const card = elements.getElement(CardNumberElement);
      if (!card) return;
      setProcessing(true);
      const { error: stripeError } = await stripe.createPaymentMethod({ type: "card", card, billing_details: { name } });
      setProcessing(false);
      if (stripeError && stripeError.type === "validation_error") {
        setError(stripeError.message ?? "Please check your card details.");
        return;
      }
    } else {
      setProcessing(true);
      await new Promise((r) => setTimeout(r, 800));
      setProcessing(false);
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center bg-[var(--color-ink)] p-9 text-center">
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ ease: [0.16, 1, 0.3, 1] }}>
          <CheckCircle2 size={48} className="text-[var(--color-amber)]" />
        </motion.div>
        <h2 className="mt-5 font-display text-3xl tracking-tight">Payment successful</h2>
        <p className="mx-auto mt-2 max-w-xs text-sm text-[var(--color-sand)]">
          Your booking with {booking.labName} is confirmed. We&rsquo;ve emailed a prepaid shipping label.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button onClick={() => navigate("/profile")}>View my orders</Button>
          <Button variant="outline" onClick={() => navigate("/labs")}>Book another lab</Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col bg-[var(--color-ink)] p-7 lg:p-9">
      {/* Method tabs */}
      <div className="grid grid-cols-2 gap-3">
        <MethodTab active={method === "card"} onClick={() => setMethod("card")} icon={<CreditCard size={16} />} label="Credit or Debit Card" />
        <MethodTab active={method === "qr"} onClick={() => setMethod("qr")} icon={<QrCode size={16} />} label="Bank Transfer" />
      </div>

      {!hasStripeKey && (
        <p className="mt-4 rounded-lg border border-[var(--color-hairline)] bg-[var(--color-ink-2)] px-3 py-2 font-mono text-[10px] text-[var(--color-sand)]">
          Demo mode · set VITE_STRIPE_PUBLISHABLE_KEY for live payments
        </p>
      )}

      <div className="mt-6 min-h-[268px]">
        <AnimatePresence mode="wait">
          {method === "card" ? (
            <motion.div
              key="card"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <label className="block">
                <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-[var(--color-sand)]">Cardholder&rsquo;s name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ANSEL RIVERA"
                  className="h-11 w-full rounded-xl border border-[var(--color-hairline)] bg-[var(--color-ink-2)] px-4 text-sm uppercase tracking-wide text-[var(--color-cream)] placeholder:text-[rgba(217,175,130,0.5)] focus:border-[var(--color-sand)] focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-[var(--color-sand)]">Card number</span>
                <div className="flex h-11 items-center rounded-xl border border-[var(--color-hairline)] bg-[var(--color-ink-2)] px-4 focus-within:border-[var(--color-sand)]">
                  <div className="flex-1"><CardNumberElement options={fieldStyle} /></div>
                </div>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-[var(--color-sand)]">Expiry</span>
                  <div className="flex h-11 items-center rounded-xl border border-[var(--color-hairline)] bg-[var(--color-ink-2)] px-4 focus-within:border-[var(--color-sand)]">
                    <div className="flex-1"><CardExpiryElement options={fieldStyle} /></div>
                  </div>
                </label>
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-[var(--color-sand)]">CVC</span>
                  <div className="flex h-11 items-center rounded-xl border border-[var(--color-hairline)] bg-[var(--color-ink-2)] px-4 focus-within:border-[var(--color-sand)]">
                    <div className="flex-1"><CardCvcElement options={fieldStyle} /></div>
                  </div>
                </label>
              </div>

              <button
                type="button"
                onClick={() => setRemember((r) => !r)}
                className="flex items-center gap-2.5 pt-1 text-sm text-[var(--color-cream)]/85"
              >
                <span className={`grid h-5 w-5 place-items-center rounded-[6px] border ${remember ? "border-[var(--color-amber)] bg-[var(--color-amber)] text-[var(--color-ink)]" : "border-[var(--color-hairline)]"}`}>
                  {remember && <Check size={13} />}
                </span>
                Remember this card
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="qr"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center text-center"
            >
              <div className="rounded-2xl bg-[var(--color-cream)] p-4">
                <QrArt amount={booking.total} />
              </div>
              <p className="mt-4 font-display text-lg text-[var(--color-cream)]">Scan to pay ${booking.total.toFixed(2)}</p>
              <p className="mt-1 max-w-[16rem] text-xs text-[var(--color-sand)]">
                Open your banking app, scan the code, and confirm the transfer. Then tap the button below.
              </p>
              <div className="mt-4 w-full rounded-xl border border-[var(--color-hairline)] bg-[var(--color-ink-2)] px-4 py-3 text-left font-mono text-[11px] text-[var(--color-sand)]">
                <div className="flex justify-between"><span>Bank</span><span className="text-[var(--color-cream)]">Halide Union · 4021 8890</span></div>
                <div className="mt-1 flex justify-between"><span>Reference</span><span className="text-[var(--color-cream)]">HAL-{booking.labSlug.slice(0, 4).toUpperCase()}</span></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && <p className="mt-3 text-sm text-[var(--color-amber)]">{error}</p>}

      <Button size="lg" className="mt-6 w-full" disabled={processing}>
        {processing ? (
          <>
            <Loader2 size={17} className="animate-spin" /> Processing…
          </>
        ) : method === "card" ? (
          <>
            <Lock size={16} /> Pay Now · ${booking.total.toFixed(2)}
          </>
        ) : (
          <>
            <Check size={17} /> I&rsquo;ve completed the transfer
          </>
        )}
      </Button>
    </form>
  );
}

function MethodTab({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-sm transition-colors ${
        active
          ? "border-[var(--color-amber)] bg-[rgba(239,159,39,0.1)] text-[var(--color-cream)]"
          : "border-[var(--color-hairline)] text-[var(--color-cream)]/70 hover:border-[var(--color-sand)]"
      }`}
    >
      <span className={active ? "text-[var(--color-amber)]" : "text-[var(--color-sand)]"}>{icon}</span>
      <span className="leading-tight">{label}</span>
    </button>
  );
}

// Decorative QR — deterministic module grid with three finder patterns (demo, not scannable).
function QrArt({ amount }: { amount: number }) {
  const size = 25;
  const seed = Math.round(amount * 100) + 7;
  const isFinder = (r: number, c: number) => {
    const inBox = (br: number, bc: number) => r >= br && r < br + 7 && c >= bc && c < bc + 7;
    return inBox(0, 0) || inBox(0, size - 7) || inBox(size - 7, 0);
  };
  const cells: { r: number; c: number }[] = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (isFinder(r, c)) continue;
      if (((r * 31 + c * 17 + seed) * 2654435761) % 100 > 52) cells.push({ r, c });
    }
  }
  const finders: [number, number][] = [
    [0, 0],
    [0, size - 7],
    [size - 7, 0],
  ];
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-40 w-40" shapeRendering="crispEdges">
      {cells.map(({ r, c }) => (
        <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#2b1400" />
      ))}
      {finders.map(([fr, fc], i) => (
        <g key={i}>
          <rect x={fc} y={fr} width="7" height="7" fill="#2b1400" />
          <rect x={fc + 1} y={fr + 1} width="5" height="5" fill="#f2e0c0" />
          <rect x={fc + 2} y={fr + 2} width="3" height="3" fill="#2b1400" />
        </g>
      ))}
    </svg>
  );
}
