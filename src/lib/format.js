// Intl uses non-breaking spaces; jsPDF can't render them, so normalise to normal spaces.
const clean = (s) => s.replace(/\s/g, ' ');

export const fmtR = (n) => clean('R ' + Math.round(n).toLocaleString('en-ZA'));
export const fmtRange = (a, b) => `${fmtR(a)} – ${fmtR(b)}`;
export const fmtYears = (y) => (y == null ? '25+ years' : `${y.toFixed(1)} years`);

export function summaryText(inputs, r) {
  return [
    `Monthly bill: ${fmtR(inputs.monthlyBill)}`,
    `Estimated system size: ${r.kwp} kWp`,
    `Estimated cost: ${fmtRange(r.costLow, r.costHigh)}`,
    `Estimated monthly saving: ${fmtRange(r.monthlyLow, r.monthlyHigh)}`,
    `Payback: ${fmtYears(r.paybackYears)}`,
  ].join('\n');
}