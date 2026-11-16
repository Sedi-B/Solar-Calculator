// Reusable label + hint + error wrapper so every form looks and behaves the same.
export default function Field({ label, hint, error, children }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-slate-800">{label}</label>
      {children}
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

export const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200';