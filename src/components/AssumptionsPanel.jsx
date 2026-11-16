import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { ASSUMPTION_FIELDS } from '../lib/assumptions';
import { inputClass } from './Field';


// `version` changes on reset, which remounts the inputs with fresh defaults.
export default function AssumptionsPanel({ assumptions, onChange, onReset, version }) {
  const update = (field, raw) => {
    const n = parseFloat(raw);
    if (Number.isNaN(n) || n < 0) return;
    onChange({ ...assumptions, [field.key]: field.pct ? n / 100 : n });
  };

  return (
    <details className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <summary className="flex cursor-pointer items-center gap-2 font-semibold text-slate-800">
        <SlidersHorizontal size={18} /> Assumptions (tap to check or change)
      </summary>
      <p className="mt-3 text-sm text-slate-600">
        Change any value and your results update immediately.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {ASSUMPTION_FIELDS.map((f) => {
          const shown = f.pct ? Math.round(assumptions[f.key] * 10000) / 100 : assumptions[f.key];
          return (
            <div key={`${version}-${f.key}`} className="space-y-1">
              <label className="block text-sm text-slate-700">{f.label}</label>
              <div className="flex items-center gap-2">
                <input type="number" inputMode="decimal" step={f.step} defaultValue={shown}
                  onChange={(e) => update(f, e.target.value)} className={inputClass} />
                <span className="w-20 shrink-0 text-xs text-slate-500">{f.unit}</span>
              </div>
            </div>
          );
        })}
      </div>
      <button type="button" onClick={onReset}
        className="mt-4 inline-flex items-center gap-1 text-sm text-slate-600 underline">
        <RotateCcw size={14} /> Reset to defaults
      </button>
    </details>
  );
}