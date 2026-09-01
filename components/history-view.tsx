"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { chartOptions, historyData } from "@/data/dummy-history";
import { AppShell } from "@/components/app-shell";
import { HistoryTable } from "@/components/history-table";

const TrendChart = dynamic(() => import("@/components/trend-chart").then((module) => module.TrendChart), {
  ssr: false,
  loading: () => <div className="surface-card flex h-[360px] items-center justify-center text-sm font-semibold text-[#5B665F]">Menyiapkan grafik riwayat...</div>
});

type Filter = "7" | "30" | "all";
type ChartKey = (typeof chartOptions)[number]["key"];

export function HistoryView() {
  const [filter, setFilter] = useState<Filter>("7");
  const [chartKey, setChartKey] = useState<ChartKey>("ec");
  const chartEntries = useMemo(() => {
    if (filter === "7") return historyData.slice(-7);
    if (filter === "30") return historyData;
    return historyData;
  }, [filter]);
  const tableEntries = [...chartEntries].reverse();
  const selectedOption = chartOptions.find((option) => option.key === chartKey) ?? chartOptions[0];

  return (
    <AppShell title="Riwayat">
      <div className="space-y-5">
        <section className="surface-card p-4">
          <h2 className="text-base font-bold text-[#17201C]">Rentang Analisis</h2>
          <p className="mt-1 text-xs leading-5 text-[#5F6963]">Pilih waktu dan parameter yang ingin dibandingkan.</p>
          <div className="mt-4 grid grid-cols-3 rounded-lg bg-[#EEF1EB] p-1">
            {[
              ["7", "7 Hari"],
              ["30", "30 Hari"],
              ["all", "Semua"]
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value as Filter)}
                className={`rounded-md px-2 py-2 text-sm font-bold transition-colors ${
                  filter === value ? "bg-[#173F36] text-white shadow-sm" : "text-[#526059] hover:bg-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <label className="mt-4 block text-xs font-bold text-[#5B665F]" htmlFor="chart-param">
            Parameter grafik
          </label>
          <select
            id="chart-param"
            value={chartKey}
            onChange={(event) => setChartKey(event.target.value as ChartKey)}
            className="mt-2 w-full rounded-lg border border-[#CBD4CC] bg-white px-3 text-sm font-semibold text-[#17201C]"
          >
            {chartOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </section>
        <TrendChart entries={chartEntries} chartKey={chartKey} unit={selectedOption.unit} label={selectedOption.label} />
        <HistoryTable entries={tableEntries} />
      </div>
    </AppShell>
  );
}
