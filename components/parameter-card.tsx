"use client";

import { useState } from "react";
import { CircleAlert, CircleCheck, CircleHelp } from "lucide-react";
import type { Severity } from "@/types/terracure";
import { severityClasses } from "@/components/status";
import { ParameterHelpSheet } from "@/components/parameter-help-sheet";

type ParameterCardProps = {
  label: string;
  value: string | number;
  unit?: string;
  note: string;
  severity: Severity;
  range: string;
  description: string;
};

export function ParameterCard({ label, value, unit, note, severity, range, description }: ParameterCardProps) {
  const [showHelp, setShowHelp] = useState(false);
  const tone = severityClasses(severity);
  const StatusIcon = severity === "critical" ? CircleAlert : severity === "warning" ? CircleAlert : CircleCheck;

  return (
    <article className={`metric-card min-w-0 rounded-[14px] border ${tone.border} bg-white p-4`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-1.5">
          <p className="min-w-0 truncate text-[13px] font-bold text-[#17201C]">{label}</p>
          <button type="button" aria-label={`Lihat penjelasan ${label}`} onClick={() => setShowHelp(true)} className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[#477064] transition-colors hover:bg-[#EFF7D7]">
            <CircleHelp aria-hidden="true" size={16} strokeWidth={2.2} />
          </button>
        </div>
        <div className={`flex shrink-0 items-center gap-1.5 text-[10px] font-bold ${tone.text}`} aria-label={severity === "critical" ? "Kritis" : severity === "warning" ? "Waspada" : "Normal"}>
          <StatusIcon aria-hidden="true" size={16} strokeWidth={2} />
          <span className="hidden min-[380px]:inline">{severity === "critical" ? "Kritis" : severity === "warning" ? "Waspada" : "Normal"}</span>
        </div>
      </div>
      <div className="mt-5 flex min-w-0 items-baseline gap-1">
        <span className="truncate text-[29px] font-bold leading-none tracking-[-0.02em] text-[#17201C]">{value}</span>
        {unit ? <span className="shrink-0 text-[11px] font-semibold text-[#6C766F]">{unit}</span> : null}
      </div>
      <p className="mt-3 min-h-[40px] text-xs leading-5 text-[#6C766F]">{note}</p>
      <ParameterHelpSheet open={showHelp} label={label} range={range} description={description} onClose={() => setShowHelp(false)} />
    </article>
  );
}
