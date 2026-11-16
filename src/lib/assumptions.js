// Every number the calculation relies on lives here, so it can be shown and edited.
export const DEFAULT_ASSUMPTIONS = {
  allInTariff: 3.8,        // R/kWh, whole-bill average. Only used to turn a bill into kWh
  avoidedRate: 2.4,        // R/kWh, energy charge that solar actually replaces
  yieldKwhPerKwp: 1750,    // kWh per kWp per year (Gauteng)
  costPerKwp: 13000,       // R per kWp installed, excl. batteries
  targetCover: 0.8,        // share of daytime use the system should cover (avoids oversizing)
  tariffEscalation: 0.08,  // yearly electricity price increase
  degradation: 0.005,      // yearly panel output loss
  omPct: 0.01,             // yearly maintenance + insurance as share of system cost
  taxRate: 0.27,           // SA company tax rate, used for the Section 12B view
  m2PerKwp: 7,             // roof area needed per kWp
};

export const ASSUMPTION_FIELDS = [
  { key: 'allInTariff', label: 'Average all-in price (used only if you give a bill but no kWh)', unit: 'R/kWh', step: 0.1 },
  { key: 'avoidedRate', label: 'Price per kWh that solar replaces', unit: 'R/kWh', step: 0.1 },
  { key: 'yieldKwhPerKwp', label: 'Yearly output per kWp', unit: 'kWh/kWp', step: 50 },
  { key: 'costPerKwp', label: 'Installed cost', unit: 'R/kWp', step: 500 },
  { key: 'targetCover', label: 'Share of daytime use covered by solar', unit: '%', step: 5, pct: true },
  { key: 'tariffEscalation', label: 'Yearly electricity price increase', unit: '%', step: 0.5, pct: true },
  { key: 'degradation', label: 'Yearly panel degradation', unit: '%', step: 0.1, pct: true },
  { key: 'omPct', label: 'Yearly maintenance & insurance', unit: '% of cost', step: 0.1, pct: true },
  { key: 'taxRate', label: 'Company tax rate', unit: '%', step: 1, pct: true },
  { key: 'm2PerKwp', label: 'Roof space per kWp', unit: 'm²/kWp', step: 0.5 },
];

// share = rough fraction of total electricity used while the sun is up
export const PATTERNS = {
  day5: { label: 'Weekdays, day shift', share: 0.7 },
  day6: { label: 'Mon–Sat, day shift', share: 0.65 },
  two: { label: 'Two shifts', share: 0.5 },
  always: { label: '24 hours / 7 days', share: 0.4 },
};