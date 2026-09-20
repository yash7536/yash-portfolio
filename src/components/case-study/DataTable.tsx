"use client";

import { useReveal } from "@/components/motion/useReveal";

export function DataTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: (string | React.ReactNode)[][];
}) {
  const [ref, revealed] = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="overflow-x-auto my-6">
      <table className="w-full text-left border-collapse border-y border-border/60 text-xs font-mono">
        <thead>
          <tr className="border-b-2 border-ink text-muted uppercase tracking-widest">
            {columns.map((col) => (
              <th key={col} className="py-2.5 px-2 font-medium whitespace-nowrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {rows.map((row, i) => (
            <tr
              key={i}
              className="transition-opacity duration-(--dur-medium) ease-(--ease-premium)"
              style={{ opacity: revealed ? 1 : 0, transitionDelay: revealed ? `${i * 60}ms` : "0ms" }}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`py-3 px-2 ${j === 0 ? "font-semibold text-ink" : "text-muted-2"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
