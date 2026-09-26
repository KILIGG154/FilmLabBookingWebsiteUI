import { motion } from "framer-motion";
import { Badge } from "../../components/ui";

export function DataTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: (string | { badge: string; tone?: string })[][];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--color-hairline)]">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-[var(--color-ink)] font-mono text-[11px] uppercase tracking-widest text-[var(--color-sand)]">
          <tr>
            {columns.map((c, i) => (
              <th key={c} className={`px-6 py-4 ${i === columns.length - 1 ? "text-right" : ""}`}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-hairline)] bg-[var(--color-ink)]">
          {rows.map((row, ri) => (
            <motion.tr
              key={ri}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ri * 0.04, duration: 0.35 }}
              className="transition-colors hover:bg-[rgba(242,224,192,0.04)]"
            >
              {row.map((cell, ci) => (
                <td key={ci} className={`px-6 py-4 ${ci === row.length - 1 ? "text-right" : ""} ${ci === 0 ? "font-mono text-[var(--color-cream)]" : "text-[var(--color-cream)]/85"}`}>
                  {typeof cell === "string" ? cell : <Badge className={cell.tone}>{cell.badge}</Badge>}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-ink)] p-6">
      <h3 className="mb-4 font-display text-xl tracking-tight">{title}</h3>
      {children}
    </div>
  );
}
