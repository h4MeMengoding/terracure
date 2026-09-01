import type { HistoryEntry } from "@/types/terracure";

export function HistoryTable({ entries }: { entries: HistoryEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="surface-card p-4 text-sm text-[#4E5A53]">
        Belum ada rekaman untuk filter ini. Pilih rentang lain untuk melihat data.
      </div>
    );
  }

  return (
    <section>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-[#17201C]">Riwayat</h2>
        <span className="text-xs font-semibold text-[#5F6963]">Terbaru di atas</span>
      </div>
      <div className="space-y-2.5">
        {entries.map((entry) => (
          <article key={`${entry.date}-${entry.time}`} className="surface-card p-3.5">
            <div className="flex items-center justify-between gap-3 border-b border-[#E3E8E3] pb-2.5">
              <div>
                <p className="text-sm font-bold text-[#17201C]">{entry.date}</p>
                <p className="mt-0.5 text-xs text-[#5F6963]">{entry.time} WIB</p>
              </div>
              <span className="rounded-full bg-[#EFF7D7] px-2.5 py-1 text-xs font-bold text-[#23483E]">{entry.hst} HST</span>
            </div>
            <dl className="mt-3 grid grid-cols-5 gap-2 text-center">
              {[
                ["Intensitas Kimia", entry.ec],
                ["pH", entry.ph],
                ["N", entry.nitrogen],
                ["P", entry.phosphorus],
                ["K", entry.potassium]
              ].map(([label, value]) => (
                <div key={label} className="min-w-0">
                  <dt className="text-[10px] font-semibold text-[#78827C]">{label}</dt>
                  <dd className="mt-1 truncate text-xs font-bold text-[#27332D]">{value}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
