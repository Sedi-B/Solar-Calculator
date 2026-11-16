import { describe, it, expect } from 'vitest';
import { calculate } from './solar';
import { DEFAULT_ASSUMPTIONS as A } from './assumptions';

const base = { monthlyBill: 50000, monthlyKwh: 0, pattern: 'day5', roofArea: 0 };

describe('calculate', () => {
  it('sizes a R50k/month weekday factory at roughly 50 kWp', () => {
    const r = calculate(base, A);
    expect(r.kwp).toBeGreaterThan(40);
    expect(r.kwp).toBeLessThan(60);
  });
  it('respects the roof cap', () => {
    const r = calculate({ ...base, roofArea: 140 }, A); // 140 / 7 = 20 kWp
    expect(r.kwp).toBe(20);
    expect(r.roofLimited).toBe(true);
  });
  it('pays back within 25 years with defaults', () => {
    expect(calculate(base, A).paybackYears).toBeLessThan(25);
  });
});