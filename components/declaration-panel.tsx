"use client";

import type { Evaluation } from "@/types/terracure";
import { severityClasses } from "@/components/status";

type DeclarationPanelProps = {
  evaluation: Evaluation;
  onOpenRecommendation: () => void;
};

export function DeclarationPanel({ evaluation, onOpenRecommendation }: DeclarationPanelProps) {
  const tone = severityClasses(evaluation.severity);

  return (
    <section className={`rounded-lg border ${tone.border} ${tone.bg} p-4`}>
      <div className="flex items-center justify-between gap-3">
        <p className={`text-xs font-bold ${tone.text}`}>STATUS LAHAN</p>
        <span className={`rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-bold ${tone.text}`}>{evaluation.priority}</span>
      </div>
      <h2 className="mt-3 text-[26px] font-bold leading-tight text-[#17201C]">{evaluation.status}</h2>
      <p className="mt-2 text-sm font-semibold text-[#414C46]">{evaluation.trigger}</p>
      <div className="mt-4 border-t border-black/10 pt-3">
        <p className="text-xs font-bold text-[#5B665F]">TINDAKAN UTAMA</p>
        <p className="mt-1.5 text-sm font-semibold leading-6 text-[#27332D]">{evaluation.recommendation}</p>
      </div>
      <button
        type="button"
        onClick={onOpenRecommendation}
        className={`mt-4 w-full rounded-lg px-4 py-3 text-sm font-bold transition-opacity hover:opacity-90 ${tone.solid}`}
      >
        Buka Panduan Tindakan
      </button>
    </section>
  );
}
