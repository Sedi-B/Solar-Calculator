import { PATTERNS } from './assumptions';

const YEARS = 25;

// Pure function: same inputs always give the same output, so it's easy to test.
export function calculate(inputs, a) {
  const monthlyKwh =
    inputs.monthlyKwh > 0 ? inputs.monthlyKwh : inputs.monthlyBill / a.allInTariff;
  const annualKwh = monthlyKwh * 12;
  const daytimeKwh = annualKwh * PATTERNS[inputs.pattern].share;

  // 1. Size to the daytime load, not the whole bill
  let kwp = (daytimeKwh * a.targetCover) / a.yieldKwhPerKwp;

  // 2. Roof cap (0 means the user didn't tell us)
  let roofLimited = false;
  if (inputs.roofArea > 0) {
    const maxKwp = inputs.roofArea / a.m2PerKwp;
    if (kwp > maxKwp) {
      kwp = maxKwp;
      roofLimited = true;
    }
  }
  kwp = Math.max(1, Math.round(kwp));

  // 3. Money
  const cost = kwp * a.costPerKwp;
  const taxBenefit = cost * a.taxRate; // Section 12B: 100% deduction in year 1
  const om = cost * a.omPct;

  // 4. 25-year projection
  const series = [{ year: 0, cumulative: -cost, afterTax: Math.round(-cost + taxBenefit) }];
  let cumulative = -cost;
  let yr1Saving = 0;
  for (let y = 1; y <= YEARS; y++) {
    const generation = kwp * a.yieldKwhPerKwp * Math.pow(1 - a.degradation, y - 1);
    const price = a.avoidedRate * Math.pow(1 + a.tariffEscalation, y - 1);
    const saving = generation * price;
    if (y === 1) yr1Saving = saving;
    cumulative += saving - om;
    series.push({
      year: y,
      cumulative: Math.round(cumulative),
      afterTax: Math.round(cumulative + taxBenefit),
    });
  }

  const monthlySaving = (yr1Saving - om) / 12;
  return {
    monthlyKwh,
    kwp,
    roofLimited,
    cost,
    costLow: cost * 0.85,
    costHigh: cost * 1.15,
    yr1Generation: kwp * a.yieldKwhPerKwp,
    coverOfTotal: Math.min(1, (kwp * a.yieldKwhPerKwp) / annualKwh),
    monthlySaving,
    monthlyLow: monthlySaving * 0.85,
    monthlyHigh: monthlySaving * 1.15,
    paybackYears: findPayback(series, 'cumulative'),
    paybackAfterTax: findPayback(series, 'afterTax'),
    taxBenefit,
    net25: series[YEARS].cumulative,
    series,
  };
}

// First year the cumulative line crosses zero, interpolated within that year
export function findPayback(series, key) {
  for (let i = 1; i < series.length; i++) {
    if (series[i][key] >= 0) {
      const prev = series[i - 1][key];
      const cur = series[i][key];
      return i - 1 + -prev / (cur - prev);
    }
  }
  return null; // doesn't pay back within 25 years
}