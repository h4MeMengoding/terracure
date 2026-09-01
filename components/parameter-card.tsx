"use client";

import { useState } from "react";
import { CircleHelp } from "lucide-react";
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
  return (
    <article className={`metric-card relative flex min-w-0 flex-col rounded-[14px] border ${tone.border} bg-white p-4`}>
      <button type="button" aria-label={`Lihat penjelasan ${label}`} onClick={() => setShowHelp(true)} className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-lg text-[#477064] transition-colors hover:bg-[#EFF7D7]">
        <CircleHelp aria-hidden="true" size={17} strokeWidth={2.2} />
      </button>
      <div className="flex min-h-8 items-start gap-2 pr-9">
        <p className="min-w-0 text-[15px] font-extrabold leading-5 text-[#17201C]">{label}</p>
      </div>
      <div className="mt-5 flex min-w-0 items-baseline gap-1">
        <span className="truncate text-[32px] font-extrabold leading-none tracking-[-0.025em] text-[#17201C]">{value}</span>
        {unit ? <span className="shrink-0 text-[12px] font-bold text-[#6C766F]">{unit}</span> : null}
      </div>
      <p className="mt-3 min-h-[40px] text-left text-[12px] font-medium leading-5 text-[#6C766F]">{note}</p>
      <ParameterHelpSheet open={showHelp} label={label} description={description} onClose={() => setShowHelp(false)} />
    </article>
  );
}
