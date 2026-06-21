import { Check, X } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { comparisonRows, type ComparisonCell } from "@/data/website-pricing";
import { cn } from "@/lib/utils";

function ComparisonCellContent({ value }: { value: ComparisonCell }) {
  if (value === "yes") {
    return <Check className="mx-auto h-4 w-4 text-nx-cyan" aria-label="Included" />;
  }
  if (value === "no") {
    return <X className="mx-auto h-4 w-4 text-nx-grey/50" aria-label="Not included" />;
  }
  return <span className="text-sm text-nx-grey">{value}</span>;
}

export function ComparisonTable() {
  return (
    <section id="compare-packages" className="scroll-mt-28">
      <Reveal>
        <div className="glass overflow-hidden rounded-2xl border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 bg-nx-navy/50">
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-nx-grey sm:px-6">
                    Feature
                  </th>
                  {(["Starter", "Pro", "Enterprise"] as const).map((col, i) => (
                    <th
                      key={col}
                      className={cn(
                        "px-4 py-4 text-center text-sm font-bold text-white sm:px-6",
                        i === 1 && "bg-nx-cyan/5 text-nx-cyan",
                      )}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={cn(
                      "border-b border-white/5 transition hover:bg-white/[0.02]",
                      i % 2 === 0 && "bg-nx-black/20",
                    )}
                  >
                    <td className="px-5 py-3.5 text-sm font-medium text-white sm:px-6">
                      {row.feature}
                    </td>
                    <td className="px-4 py-3.5 text-center sm:px-6">
                      <ComparisonCellContent value={row.starter} />
                    </td>
                    <td className="bg-nx-cyan/[0.03] px-4 py-3.5 text-center sm:px-6">
                      <ComparisonCellContent value={row.pro} />
                    </td>
                    <td className="px-4 py-3.5 text-center sm:px-6">
                      <ComparisonCellContent value={row.enterprise} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
