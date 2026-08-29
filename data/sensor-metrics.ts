import type { SensorData, Severity } from "@/types/terracure";

export type SensorMetric = {
  label: string;
  unit: string;
  note: (data: SensorData) => string;
  value: (data: SensorData) => number;
  severity: (data: SensorData) => Severity;
};

export const sensorMetrics: SensorMetric[] = [
  {
    label: "Suhu Tanah",
    unit: "°C",
    note: () => "Lingkungan perakaran",
    value: (data) => data.temperature,
    severity: () => "normal"
  },
  {
    label: "Kelembapan",
    unit: "%",
    note: (data) => `${data.waterLevel} cm tinggi air`,
    value: (data) => data.moisture,
    severity: (data) => (data.moisture < 40 || data.waterLevel === 0 ? "critical" : "normal")
  },
  {
    label: "EC",
    unit: "µS/cm",
    note: () => "Residu pupuk",
    value: (data) => data.ec,
    severity: (data) => (data.ec > 2000 ? "critical" : "normal")
  },
  {
    label: "pH Tanah",
    unit: "pH",
    note: () => "Keasaman tanah",
    value: (data) => data.ph,
    severity: (data) => (data.ph < 5.5 ? "critical" : "normal")
  },
  {
    label: "Nitrogen",
    unit: "mg/kg",
    note: () => "Daun dan anakan",
    value: (data) => data.nitrogen,
    severity: (data) => (data.hst >= 11 && data.hst <= 35 && data.nitrogen < 30 ? "warning" : "normal")
  },
  {
    label: "Fosfor",
    unit: "mg/kg",
    note: () => "Perakaran awal",
    value: (data) => data.phosphorus,
    severity: (data) => (data.hst <= 10 && data.phosphorus < 15 ? "warning" : "normal")
  },
  {
    label: "Kalium",
    unit: "mg/kg",
    note: () => "Fase generatif",
    value: (data) => data.potassium,
    severity: (data) => (data.hst >= 36 && data.hst <= 55 && data.potassium < 50 ? "warning" : "normal")
  },
  {
    label: "Tinggi Air",
    unit: "cm",
    note: () => "Muka air sawah",
    value: (data) => data.waterLevel,
    severity: (data) => (data.waterLevel === 0 ? "critical" : "normal")
  }
];
