import { CalendarCheck, Images, Users, Boxes, Settings, LineChart } from "lucide-react";
import PortalLayout, { PortalHeader, StatCard } from "../../components/PortalLayout";
import { DataTable, Panel } from "./shared";

export function OwnerLayout() {
  return (
    <PortalLayout
      role="Film Lab Portal"
      accent="var(--color-amber)"
      nav={[
        { to: "/portal/owner", label: "Bookings", icon: CalendarCheck },
        { to: "/portal/owner/archive", label: "Photo Archive", icon: Images },
        { to: "/portal/owner/customers", label: "Customers", icon: Users },
        { to: "/portal/owner/consignments", label: "Consignments", icon: Boxes },
        { to: "/portal/owner/analytics", label: "Analytics", icon: LineChart },
        { to: "/portal/owner/settings", label: "Lab Settings", icon: Settings },
      ]}
    />
  );
}

export function OwnerBookings() {
  return (
    <>
      <PortalHeader subtitle="Silverhalide Atelier" title="Bookings" />
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <StatCard label="In queue" value="41" />
        <StatCard label="Due today" value="9" delta="3 rush" />
        <StatCard label="This week $" value="$6,120" delta="+8%" />
        <StatCard label="Avg rating" value="4.9" />
      </div>
      <DataTable
        columns={["Booking", "Customer", "Service", "Rolls", "Status"]}
        rows={[
          ["B-8842", "Ansel Rivera", "Develop + Hi-res", "3", { badge: "In queue", tone: "text-[var(--color-amber)]" }],
          ["B-8839", "Lena Osei", "B&W develop", "2", { badge: "Developing", tone: "text-[var(--color-amber)]" }],
          ["B-8830", "Kofi Mensah", "Drum scan", "1", { badge: "Ready", tone: "text-[var(--color-sand)]" }],
          ["B-8821", "Rosa Delgado", "Develop + Scan", "6", { badge: "Shipped", tone: "text-[var(--color-sand)]" }],
        ]}
      />
    </>
  );
}

export function OwnerArchive() {
  const shots = [
    "1495707902641-75cac588d2e9", "1516035069371-29a1b244cc32", "1524234107056-1c1f48f64ab8",
    "1502920917128-1aa500764cbd", "1452587925148-ce544e77e70d", "1554672408-17d1cc2d4dfa",
    "1516724562728-afc824a36e84", "1520390138845-fd2d229dd553",
  ];
  return (
    <>
      <PortalHeader subtitle="Delivered scans" title="Digital Photo Archive" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {shots.map((id) => (
          <div key={id} className="group relative aspect-square overflow-hidden rounded-xl border border-[var(--color-hairline)] bg-[var(--color-ink)]">
            <img
              src={`https://images.unsplash.com/photo-${id}?w=500&h=500&fit=crop&auto=format`}
              alt="Archived film scan"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </>
  );
}

export function OwnerCustomers() {
  return (
    <>
      <PortalHeader subtitle="Relationships" title="Customer Lists" />
      <DataTable
        columns={["ID", "Customer", "Orders", "Lifetime $", "Tier"]}
        rows={[
          ["C-201", "Ansel Rivera", "47", "$1,240", { badge: "Gold", tone: "text-[var(--color-amber)]" }],
          ["C-198", "Lena Osei", "22", "$610", { badge: "Silver", tone: "text-[var(--color-sand)]" }],
          ["C-190", "Kofi Mensah", "9", "$284", { badge: "New", tone: "text-[var(--color-sand)]" }],
          ["C-181", "Rosa Delgado", "63", "$2,050", { badge: "Gold", tone: "text-[var(--color-amber)]" }],
        ]}
      />
    </>
  );
}

export function OwnerConsignments() {
  return (
    <>
      <PortalHeader subtitle="Inbound & outbound" title="Consignment Lists" />
      <DataTable
        columns={["Tracking", "Direction", "Rolls", "Carrier", "Status"]}
        rows={[
          ["1Z-4471", "Inbound", "5", "USPS", { badge: "In transit", tone: "text-[var(--color-amber)]" }],
          ["1Z-4468", "Outbound", "3", "UPS", { badge: "Delivered", tone: "text-[var(--color-sand)]" }],
          ["1Z-4460", "Inbound", "2", "FedEx", { badge: "Received", tone: "text-[var(--color-sand)]" }],
          ["1Z-4455", "Outbound", "6", "USPS", { badge: "Label made", tone: "text-[var(--color-amber)]" }],
        ]}
      />
    </>
  );
}

export function OwnerAnalytics() {
  return (
    <>
      <PortalHeader subtitle="Lab performance" title="Analytics & Metrics" />
      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Revenue (30d)" value="$24.8k" delta="+11%" />
        <StatCard label="Rolls processed" value="1,204" delta="+96" />
        <StatCard label="On-time rate" value="97%" delta="+2%" />
        <StatCard label="Repeat rate" value="64%" delta="+5%" />
      </div>
      <div className="mt-6">
        <Panel title="Weekly throughput">
          <div className="flex h-48 items-end gap-2">
            {[42, 58, 47, 71, 64, 88, 76].map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-md bg-[var(--color-amber)] transition-all" style={{ height: `${v}%` }} />
                <span className="font-mono text-[10px] text-[var(--color-sand)]">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}

export function OwnerSettings() {
  return (
    <>
      <PortalHeader subtitle="Storefront" title="Film Lab Settings" />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Listing">
          <p className="text-sm leading-relaxed text-[var(--color-sand)]">
            Update your lab name, city, turnaround windows and the services you offer. Changes go live after a quick
            moderator review.
          </p>
        </Panel>
        <Panel title="Payouts">
          <p className="text-sm leading-relaxed text-[var(--color-sand)]">
            Connected to a business account ending 4471. Payouts run weekly once scans are delivered to customers.
          </p>
        </Panel>
      </div>
    </>
  );
}
