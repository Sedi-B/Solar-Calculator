import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calculator } from 'lucide-react';
import { inputSchema } from '../schemas/inputSchema';
import { PATTERNS } from '../lib/assumptions';
import Field, { inputClass } from './Field';

export default function InputForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(inputSchema),
    defaultValues: { monthlyBill: '', monthlyKwh: '', pattern: 'day5', roofArea: '' },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
    >
      <Field label="Average monthly electricity bill (R)" error={errors.monthlyBill?.message}
        hint="Check a recent bill, including VAT.">
        <input type="number" inputMode="decimal" placeholder="e.g. 50000" className={inputClass}
          {...register('monthlyBill')} />
      </Field>

      <Field label="Monthly usage in kWh (optional)" error={errors.monthlyKwh?.message}
        hint="Found on most bills. It makes the estimate more accurate.">
        <input type="number" inputMode="decimal" placeholder="e.g. 13000" className={inputClass}
          {...register('monthlyKwh')} />
      </Field>

      <Field label="When does your site operate?" error={errors.pattern?.message}
        hint="Solar only produces by day, so this affects the size we suggest.">
        <select className={inputClass} {...register('pattern')}>
          {Object.entries(PATTERNS).map(([key, p]) => (
            <option key={key} value={key}>{p.label}</option>
          ))}
        </select>
      </Field>

      <Field label="Usable roof area in m² (optional)" error={errors.roofArea?.message}
        hint="If you're not sure, leave it blank.">
        <input type="number" inputMode="decimal" placeholder="e.g. 800" className={inputClass}
          {...register('roofArea')} />
      </Field>

      <button type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-3 text-base font-semibold text-slate-900 hover:bg-amber-400 active:bg-amber-600">
        <Calculator size={20} /> Calculate my savings
      </button>
    </form>
  );
}