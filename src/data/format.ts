// Formatting helper for Num.display strings. No Intl — western comma grouping, hand-rolled.
export function formatNum(value: number, decimals: number): string {
  if (decimals === 0) {
    const rounded = Math.round(value);
    const sign = rounded < 0 ? '-' : '';
    const digits = Math.abs(rounded).toString();
    return sign + digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return value.toFixed(decimals);
}
