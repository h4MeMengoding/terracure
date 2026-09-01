export function formatNumber(value: number, maximumFractionDigits = 1) {
  return new Intl.NumberFormat("id-ID", { maximumFractionDigits }).format(value);
}
