import { ClipboardList, Flag, FileText } from "lucide-react";
import PortalLayout, { PortalHeader, StatCard } from "../../components/PortalLayout";
import { DataTable } from "./shared";

export function ModeratorLayout() {
  return (
    <PortalLayout
      role="Moderator Portal"
      accent="var(--color-sand)"
      nav={[
        { to: "/portal/moderator", label: "Order List", icon: ClipboardList },
        { to: "/portal/moderator/reports", label: "Report List", icon: Flag },
        { to: "/portal/moderator/blog", label: "Blog List", icon: FileText },
      ]}
    />
  );
}

export function ModeratorOrders() {
  return (
    <>
      <PortalHeader subtitle="Operations" title="Order List" />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Open orders" value="214" />
        <StatCard label="Flagged" value="7" delta="needs review" />
        <StatCard label="Resolved today" value="63" />
      </div>
      <DataTable
        columns={["Order", "Customer", "Lab", "Rolls", "Status"]}
        rows={[
          ["A-2291", "Ansel Rivera", "Silverhalide", "3", { badge: "Scanning", tone: "text-[var(--color-amber)]" }],
          ["A-2288", "Lena Osei", "Goldenhour", "2", { badge: "Developing", tone: "text-[var(--color-amber)]" }],
          ["A-2284", "Kofi Mensah", "North Loop", "1", { badge: "Shipped", tone: "text-[var(--color-sand)]" }],
          ["A-2279", "Rosa Delgado", "Tidewater", "6", { badge: "Complete", tone: "text-[var(--color-sand)]" }],
        ]}
      />
    </>
  );
}

export function ModeratorReports() {
  return (
    <>
      <PortalHeader subtitle="Trust & safety" title="Report List" />
      <DataTable
        columns={["ID", "Subject", "Type", "Priority", "Status"]}
        rows={[
          ["R-118", "Late scan delivery", "Service", { badge: "High", tone: "text-[var(--color-amber)]" }, "Open"],
          ["R-115", "Damaged negatives", "Quality", { badge: "High", tone: "text-[var(--color-amber)]" }, "Investigating"],
          ["R-109", "Duplicate charge", "Billing", { badge: "Medium", tone: "text-[var(--color-sand)]" }, "Resolved"],
          ["R-104", "Wrong scan format", "Quality", { badge: "Low", tone: "text-[var(--color-sand)]" }, "Resolved"],
        ]}
      />
    </>
  );
}

export function ModeratorBlog() {
  return (
    <>
      <PortalHeader subtitle="Editorial" title="Blog List" />
      <DataTable
        columns={["Title", "Author", "Category", "Status", "Updated"]}
        rows={[
          ["Metering for Portra 400", "M. Cortez", "Guides", { badge: "Published", tone: "text-[var(--color-sand)]" }, "Sep 20"],
          ["The dip-and-dunk difference", "Editorial", "Craft", { badge: "Published", tone: "text-[var(--color-sand)]" }, "Sep 12"],
          ["Cross-processing E-6", "T. Blank", "Experiments", { badge: "Draft", tone: "text-[var(--color-amber)]" }, "Sep 25"],
          ["Archiving negatives 101", "P. Anand", "Guides", { badge: "Review", tone: "text-[var(--color-amber)]" }, "Sep 24"],
        ]}
      />
    </>
  );
}
