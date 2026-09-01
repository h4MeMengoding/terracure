import type { HistoryEntry } from "@/types/terracure";

const ecValues = [
  2650, 2570, 2490, 2420, 2360, 2300, 2240, 2190, 2130, 2080,
  2050, 2010, 1980, 1940, 1900, 1870, 1840, 1810, 1780, 1760,
  1730, 1710, 1680, 1660, 1640, 1620, 1590, 1570, 1550, 1530
];

export const historyData: HistoryEntry[] = ecValues.map((ec, index) => {
  const day = 17 + index;
  const month = day <= 31 ? "Mei" : "Juni";
  const dateDay = day <= 31 ? day : day - 31;

  return {
    date: `${dateDay} ${month} 2026`,
    time: index % 2 === 0 ? "10.20" : "09.20",
    hst: Math.min(34 + index, 115),
    temperature: Number((30.8 - index * 0.04).toFixed(1)),
    moisture: Math.max(72, 100 - index),
    ec,
    ph: Number((7.5 - index * 0.04).toFixed(1)),
    nitrogen: Math.max(35, 65 - index),
    phosphorus: Math.max(24, 40 - Math.floor(index * 0.45)),
    potassium: Math.max(62, 80 - Math.floor(index * 0.4)),
    waterLevel: index < 12 ? 30 : 20
  };
});

export const chartOptions = [
  { key: "ec", label: "Intensitas Kimia", unit: "µS/cm" },
  { key: "ph", label: "pH Tanah", unit: "pH" },
  { key: "nitrogen", label: "Nitrogen", unit: "mg/kg" },
  { key: "phosphorus", label: "Fosfor", unit: "mg/kg" },
  { key: "potassium", label: "Kalium", unit: "mg/kg" },
  { key: "moisture", label: "Kelembapan", unit: "%" },
  { key: "temperature", label: "Temperatur", unit: "°C" }
] as const;
