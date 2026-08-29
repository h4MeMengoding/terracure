"use client";

import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { chartOptions } from "@/data/dummy-history";
import type { HistoryEntry } from "@/types/terracure";

type ChartKey = (typeof chartOptions)[number]["key"];

export function TrendChart({ entries, chartKey, unit, label }: { entries: HistoryEntry[]; chartKey: ChartKey; unit: string; label: string }) {
  if (entries.length === 0) {
    return <div className="surface-card p-4 text-sm text-[#4E5A53]">Belum ada rekaman untuk rentang ini. Pilih rentang lain untuk melihat tren.</div>;
  }

  const chartData = entries.map((entry) => ({ ...entry, shortDate: entry.date.replace(" 2026", "") }));
  const values = entries.map((entry) => Number(entry[chartKey]));
  const average = values.reduce((total, value) => total + value, 0) / values.length;
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);

  return (
    <section className="surface-card overflow-hidden p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="section-label">PERUBAHAN NILAI</p>
          <h2 className="mt-1 text-lg font-bold text-[#17201C]">{label}</h2>
        </div>
        <p className="text-right text-xs font-semibold text-[#5F6963]">{entries.length} rekaman</p>
      </div>
      <div className="mt-4 h-[250px] w-full" role="img" aria-label={`Grafik tren ${label}`}>
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={250}>
          <LineChart data={chartData} margin={{ top: 8, right: 8, bottom: 2, left: 0 }}>
            <CartesianGrid stroke="#E0E5DF" strokeDasharray="3 5" vertical={false} />
            <XAxis dataKey="shortDate" axisLine={false} tickLine={false} tick={{ fill: "#5F6963", fontSize: 10 }} minTickGap={24} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#5F6963", fontSize: 10 }} domain={["dataMin - 5", "dataMax + 5"]} width={44} />
            <Tooltip cursor={{ stroke: "#AEB8B0", strokeDasharray: "3 3" }} contentStyle={{ border: "1px solid #DCE2DC", borderRadius: 8, background: "#FFFFFF", boxShadow: "0 8px 20px rgb(23 32 28 / 10%)", fontSize: 12 }} labelStyle={{ color: "#5B665F", marginBottom: 4 }} />
            <ReferenceLine y={average} stroke="#8CAB32" strokeDasharray="5 5" />
            <Line type="monotone" dataKey={chartKey} name={label} unit={` ${unit}`} stroke="#173F36" strokeWidth={3} dot={false} activeDot={{ r: 5, fill: "#CDE974", stroke: "#173F36", strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 grid grid-cols-3 divide-x divide-[#DCE2DC] border-t border-[#DCE2DC] pt-3 text-center">
        <ChartStat label="Terendah" value={minimum} unit={unit} />
        <ChartStat label="Rata-rata" value={Number(average.toFixed(1))} unit={unit} />
        <ChartStat label="Tertinggi" value={maximum} unit={unit} />
      </div>
    </section>
  );
}

function ChartStat({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="min-w-0 px-1.5">
      <p className="text-[10px] font-semibold text-[#5F6963]">{label}</p>
      <p className="mt-1 truncate text-sm font-bold text-[#17201C]">{value}</p>
      <p className="truncate text-[9px] font-semibold text-[#7A847E]">{unit}</p>
    </div>
  );
}
