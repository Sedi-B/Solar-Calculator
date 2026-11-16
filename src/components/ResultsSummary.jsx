import { Sun, Banknote, PiggyBank, Clock, Info } from 'lucide-react';
import { fmtR, fmtRange, fmtYears } from '../lib/format';

function Stat({ icon: Icon, label, value, sub }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Icon size={18} className="text-amber-500" /> {label}
      </div>
      <div className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">{value}</div>
      {sub && <div className="mt-1 text-xs text-slate-500">{sub}</div>}
    </div>
  );
}

export default function ResultsSummary({ r }) {
  return (
    <section className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-lg font-bold text-slate-900">Your first Estimate</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <Stat icon={Sun} label="Suggested system size" value={`${r.kwp} kWp`}
          sub={`Covers about ${Math.round(r.coverOfTotal * 100)}% of your total electricity use`} />
        <Stat icon={Banknote} label="Estimated cost" value={fmtRange(r.costLow, r.costHigh)}
          sub="Installed, excluding batteries" />
        <Stat icon={PiggyBank} label="Estimated saving per month" value={fmtRange(r.monthlyLow, r.monthlyHigh)}
          sub="Year 1, after maintenance" />
        <Stat icon={Clock} label="Payback period" value={fmtYears(r.paybackYears)}
          sub={`About ${fmtYears(r.paybackAfterTax)} if you claim Section 12B tax relief (${fmtR(r.taxBenefit)} deduction value)`} />
      </div>
      <p className="text-sm text-slate-700">
        Estimated net benefit over 25 years: <strong>{fmtR(r.net25)}</strong>
      </p>
      {r.roofLimited && (
        <p className="flex gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
          <Info size={18} className="shrink-0" />
          Your roof area limits the system size. We may be able to look at other options such as carports or ground-mount.
        </p>
      )}
    </section>
  );
}