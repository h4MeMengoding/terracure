import type { Severity } from "@/types/terracure";
import { severityClasses } from "@/components/status";

type ParameterCardProps = {
  label: string;
  value: string | number;
  unit?: string;
  note: string;
  severity: Severity;
};

export function ParameterCard({ label, value, unit, note, severity }: ParameterCardProps) {
  const tone = severityClasses(severity);

  return (
    <article className={`min-w-0 rounded-lg border ${tone.border} bg-white p-3.5`}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-bold text-[#5B665F]">{label}</p>
        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${severity === "critical" ? "bg-[#D63A31]" : severity === "warning" ? "bg-[#B86516]" : "bg-[#8CAB32]"}`} aria-label={severity === "critical" ? "Kritis" : severity === "warning" ? "Waspada" : "Normal"}>
          <span className="sr-only">
          {severity === "critical" ? "Kritis" : severity === "warning" ? "Waspada" : "Normal"}
          </span>
        </span>
      </div>
      <div className="mt-3 flex min-w-0 items-baseline gap-1">
        <span className="min-w-0 truncate text-[24px] font-bold leading-none text-[#17201C]">{value}</span>
        {unit ? <span className="shrink-0 text-[11px] font-semibold text-[#6C766F]">{unit}</span> : null}
      </div>
      <p className="mt-2 text-xs leading-5 text-[#6C766F]">{note}</p>
    </article>
  );
}
