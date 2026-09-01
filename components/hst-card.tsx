import { TOTAL_HST, getGrowthPhase } from "@/lib/calculate-hst";

export function HstCard({ hst }: { hst: number }) {
  const progress = Math.round((hst / TOTAL_HST) * 100);

  return (
    <section className="hst-card overflow-hidden rounded-[14px] bg-[#173F36] p-4 text-white">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-[#DCE7E2]">MUSIM TANAM AKTIF</p>
          <p className="mt-1 text-sm font-semibold text-white">{getGrowthPhase(hst)}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-[#CDE974]">{hst}</p>
          <p className="text-xs font-semibold text-[#DCE7E2]">dari {TOTAL_HST} HST</p>
        </div>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/15" aria-label={`Progres musim tanam ${progress}%`}>
        <div className="h-full rounded-full bg-[#CDE974]" style={{ width: `${progress}%` }} />
      </div>
    </section>
  );
}
