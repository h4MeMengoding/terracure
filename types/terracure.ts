export type Severity = "normal" | "warning" | "critical";

export type SensorData = {
  temperature: number;
  moisture: number;
  ec: number;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  waterLevel: number;
  hst: number;
};

export type Evaluation = {
  priority: string;
  status: string;
  severity: Severity;
  trigger: string;
  recommendation: string;
  detail: string;
};

export type HistoryEntry = SensorData & {
  date: string;
  time: string;
};

export type Scenario = {
  id: string;
  name: string;
  data: SensorData;
};
