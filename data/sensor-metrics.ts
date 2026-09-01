import type { SensorData, Severity } from "@/types/terracure";

export type SensorMetric = {
  label: string;
  unit: string;
  note: (data: SensorData) => string;
  value: (data: SensorData) => number;
  severity: (data: SensorData) => Severity;
  range: string;
  description: string;
};

export const sensorMetrics: SensorMetric[] = [
  {
    label: "Suhu Tanah",
    unit: "°C",
    note: () => "Lingkungan perakaran",
    value: (data) => data.temperature,
    severity: () => "normal",
    range: "-20 sampai 60 °C",
    description: "Memantau kondisi suhu tanah sebagai indikator lingkungan perakaran."
  },
  {
    label: "Kelembapan",
    unit: "%",
    note: (data) => `${data.waterLevel} cm tinggi air`,
    value: (data) => data.moisture,
    severity: (data) => (data.moisture < 40 || data.waterLevel === 0 ? "critical" : "normal"),
    range: "0 sampai 100%",
    description: "Memantau kadar air tanah dan membantu menentukan kebutuhan pengairan."
  },
  {
    label: "EC",
    unit: "µS/cm",
    note: () => "Residu pupuk",
    value: (data) => data.ec,
    severity: (data) => (data.ec > 2000 ? "critical" : "normal"),
    range: "0 sampai 10000 µS/cm",
    description: "Mendeteksi kepekatan ion dan residu pupuk untuk mengenali potensi toksisitas lahan."
  },
  {
    label: "pH Tanah",
    unit: "pH",
    note: () => "Keasaman tanah",
    value: (data) => data.ph,
    severity: (data) => (data.ph < 5.5 ? "critical" : "normal"),
    range: "3.0 sampai 9.0 pH",
    description: "Memantau tingkat keasaman tanah yang dapat memengaruhi penyerapan hara."
  },
  {
    label: "Nitrogen",
    unit: "mg/kg",
    note: () => "Daun dan anakan",
    value: (data) => data.nitrogen,
    severity: (data) => (data.hst >= 11 && data.hst <= 35 && data.nitrogen < 30 ? "warning" : "normal"),
    range: "0 sampai 1999 mg/kg",
    description: "Memantau ketersediaan nitrogen untuk mendukung pertumbuhan daun dan anakan."
  },
  {
    label: "Fosfor",
    unit: "mg/kg",
    note: () => "Perakaran awal",
    value: (data) => data.phosphorus,
    severity: (data) => (data.hst <= 10 && data.phosphorus < 15 ? "warning" : "normal"),
    range: "0 sampai 1999 mg/kg",
    description: "Memantau ketersediaan fosfor, terutama untuk fase awal pertumbuhan akar."
  },
  {
    label: "Kalium",
    unit: "mg/kg",
    note: () => "Fase generatif",
    value: (data) => data.potassium,
    severity: (data) => (data.hst >= 36 && data.hst <= 55 && data.potassium < 50 ? "warning" : "normal"),
    range: "0 sampai 1999 mg/kg",
    description: "Memantau ketersediaan kalium, terutama pada fase generatif."
  },
  {
    label: "Tinggi Air",
    unit: "cm",
    note: () => "Muka air sawah",
    value: (data) => data.waterLevel,
    severity: (data) => (data.waterLevel === 0 ? "critical" : "normal"),
    range: "0 sampai 30 cm",
    description: "Memantau tinggi muka air sawah untuk membantu evaluasi kebutuhan pengairan."
  }
];
