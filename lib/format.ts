export function formatNumber(value: number, maximumFractionDigits = 1) {
  return new Intl.NumberFormat("id-ID", { maximumFractionDigits }).format(value);
}

export function formatDateInput(date: Date) {
  return date.toISOString().slice(0, 10);
}
