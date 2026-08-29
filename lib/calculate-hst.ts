export const TOTAL_HST = 115;

export function calculateHST(startDate: string | null) {
  if (!startDate) return 0;

  const start = new Date(startDate);
  if (Number.isNaN(start.getTime())) return 0;

  const now = new Date();
  const diffTime = now.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return Math.min(Math.max(diffDays, 0), TOTAL_HST);
}

export function getGrowthPhase(hst: number) {
  if (hst <= 10) return "Fase Awal / Perakaran";
  if (hst <= 35) return "Fase Vegetatif";
  if (hst <= 55) return "Fase Generatif";
  return "Fase Lanjutan / Monitoring";
}
