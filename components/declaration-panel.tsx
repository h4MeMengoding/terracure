"use client";

import type { Evaluation } from "@/types/terracure";
import { CircleAlert, CircleCheck, ArrowUpRight } from "lucide-react";
import { severityClasses } from "@/components/status";

type DeclarationPanelProps = {
  evaluation: Evaluation;
  onOpenRecommendation: () => void;
};

export function DeclarationPanel({ evaluation, onOpenRecommendation }: DeclarationPanelProps) {
  const tone = severityClasses(evaluation.severity);
  const StatusIcon = evaluation.severity === "normal" ? CircleCheck : CircleAlert;

  return (
    <section className={`declaration-panel rounded-[14px] border ${tone.border} ${tone.bg} p-4`}>
      <div className="flex items-start justify-between gap-3">
        <div className={`flex items-center gap-2 text-xs font-bold ${tone.text}`}><StatusIcon aria-hidden="true" size={18} strokeWidth={2} /><span>STATUS LAHAN</span></div>
        <span title={evaluation.priority} className={`max-w-[58%] truncate border-b-2 pb-1 text-right text-[10px] font-bold ${tone.text}`}>{evaluation.priority}</span>
      </div>
      <h2 className="mt-4 text-[32px] font-extrabold leading-[1.05] tracking-[-0.025em] text-[#17201C]">{evaluation.status}</h2>
      <p className="mt-2 text-left text-sm font-semibold text-[#414C46]">{evaluation.trigger}</p>
      <div className="mt-4 border-t border-black/10 pt-3 text-left">
        <p className="text-xs font-bold text-[#5B665F]">TINDAKAN UTAMA</p>
        <p className="mt-1.5 text-sm font-semibold leading-6 text-[#27332D]">{evaluation.recommendation}</p>
      </div>
      <button
        type="button"
        onClick={onOpenRecommendation}
        className={`mt-4 flex w-full items-center justify-between gap-3 border px-4 py-3 text-sm font-bold transition-colors hover:bg-white/70 ${tone.border} text-[#17201C]`}
      >
        <span>Buka Panduan Tindakan</span><ArrowUpRight aria-hidden="true" size={18} strokeWidth={2.2} />
      </button>
    </section>
  );
}
