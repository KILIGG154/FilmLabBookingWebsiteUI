import { useState } from "react";
import { BarChart3, Users, UserCog, FlaskConical, Settings } from "lucide-react";
import PortalLayout, { PortalHeader, StatCard } from "../../components/PortalLayout";
import { DataTable, Panel } from "./shared";

export function AdminLayout() {
  return (
    <PortalLayout
      role="Admin Portal"
      accent="var(--color-amber)"
      nav={[
        { to: "/portal/admin", label: "Analytics", icon: BarChart3 },
        { to: "/portal/admin/experts", label: "Experts", icon: UserCog },
        { to: "/portal/admin/accounts", label: "Accounts", icon: Users },
        { to: "/portal/admin/labs", label: "Film Labs", icon: FlaskConical },
        { to: "/portal/admin/settings", label: "System Settings", icon: Settings },
      ]}
    />
  );
}

export function AdminAnalytics() {
  return (
    <>
      <PortalHeader subtitle="Platform overview" title="Analytics & Metrics" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active labs" value="128" delta="+6 this month" />
        <StatCard label="Rolls in pipeline" value="3,410" delta="+18% wk/wk" />
        <StatCard label="Gross bookings" value="$284k" delta="+12% mo/mo" />
        <StatCard label="Avg turnaround" value="4.2 days" delta="−0.4 days" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Bookings by process">
          <BarRow label="C-41 Colour" pct={68} />
          <BarRow label="B&W Develop" pct={41} />
          <BarRow label="E-6 Slide" pct={27} />
          <BarRow label="Drum Scans" pct={14} />
        </Panel>
        <Panel title="Recent activity">
          <DataTable
            columns={["Event", "Actor", "When"]}
            rows={[
              ["Lab approved", "Goldenhour Collective", "2m ago"],
              ["Refund issued", "Order #A-2255", "1h ago"],
              ["Expert verified", "M. Cortez", "3h ago"],
              ["New account", "studio.northlight", "5h ago"],
            ]}
          />
        </Panel>
      </div>
    </>
  );
}

function BarRow({ label, pct }: { label: string; pct: number }) {
  return (
    <div className="mb-4">
      <div className="mb-1.5 flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-mono text-[var(--color-sand)]">{pct}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[var(--color-ink-2)]">
        <div className="h-full rounded-full bg-[var(--color-amber)]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function AdminExperts() {
  return (
    <>
      <PortalHeader subtitle="Verification" title="Expert List" />
      <DataTable
        columns={["ID", "Name", "Discipline", "Status", "Verified"]}
        rows={[
          ["EX-01", "Mara Cortez", "Colour science", { badge: "Verified", tone: "text-[var(--color-sand)]" }, "2026-08-14"],
          ["EX-02", "Jonah Reed", "B&W printing", { badge: "Pending", tone: "text-[var(--color-amber)]" }, "—"],
          ["EX-03", "Priya Anand", "Drum scanning", { badge: "Verified", tone: "text-[var(--color-sand)]" }, "2026-07-02"],
          ["EX-04", "Theo Blank", "E-6 chemistry", { badge: "Review", tone: "text-[var(--color-amber)]" }, "—"],
        ]}
      />
    </>
  );
}

export function AdminAccounts() {
  return (
    <>
      <PortalHeader subtitle="User management" title="Account List" />
      <DataTable
        columns={["ID", "User", "Role", "Plan", "Status"]}
        rows={[
          ["U-1042", "ansel@studio.com", "Photographer", "Pay-per-roll", { badge: "Active", tone: "text-[var(--color-sand)]" }],
          ["U-1039", "goldenhour.tx", "Lab Owner", "Pro", { badge: "Active", tone: "text-[var(--color-sand)]" }],
          ["U-1021", "mod.reyes", "Moderator", "Staff", { badge: "Active", tone: "text-[var(--color-sand)]" }],
          ["U-0998", "north.loop", "Lab Owner", "Pro", { badge: "Suspended", tone: "text-[var(--color-amber)]" }],
        ]}
      />
    </>
  );
}

export function AdminLabs() {
  return (
    <>
      <PortalHeader subtitle="Directory control" title="Film Lab Lists" />
      <DataTable
        columns={["ID", "Lab", "City", "Rating", "Status"]}
        rows={[
          ["L-01", "Silverhalide Atelier", "Portland, OR", "4.9", { badge: "Listed", tone: "text-[var(--color-sand)]" }],
          ["L-02", "North Loop Film Co.", "Minneapolis, MN", "4.8", { badge: "Listed", tone: "text-[var(--color-sand)]" }],
          ["L-03", "Goldenhour Collective", "Austin, TX", "4.7", { badge: "Review", tone: "text-[var(--color-amber)]" }],
          ["L-04", "Tidewater Darkroom", "Savannah, GA", "4.9", { badge: "Listed", tone: "text-[var(--color-sand)]" }],
        ]}
      />
    </>
  );
}

export function AdminSettings() {
  return (
    <>
      <PortalHeader subtitle="Configuration" title="System Settings" />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Platform">
          <Toggle label="Accept new lab applications" on />
          <Toggle label="Require expert verification" on />
          <Toggle label="Maintenance mode" />
        </Panel>
        <Panel title="Payments">
          <Toggle label="Instant payouts to labs" />
          <Toggle label="Hold funds until scan delivery" on />
          <Toggle label="Enable refunds via portal" on />
        </Panel>
      </div>
    </>
  );
}

function Toggle({ label, on }: { label: string; on?: boolean }) {
  const [checked, setChecked] = useState(!!on);
  return (
    <button
      type="button"
      onClick={() => setChecked((c) => !c)}
      className="flex w-full items-center justify-between border-b border-[var(--color-hairline)] py-3.5 text-left text-sm last:border-0"
    >
      <span>{label}</span>
      <span className={`relative h-6 w-11 rounded-full transition-colors ${checked ? "bg-[var(--color-amber)]" : "bg-[var(--color-ink-2)]"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-[var(--color-cream)] transition-all ${checked ? "left-[1.375rem]" : "left-0.5"}`} />
      </span>
    </button>
  );
}
