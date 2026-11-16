import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, MessageCircle, Download, CheckCircle2 } from 'lucide-react';
import { leadSchema } from '../schemas/leadSchema';
import { CONTACT } from '../config';
import { summaryText } from '../lib/format';
import { downloadEstimate } from '../lib/pdf';
import Field, { inputClass } from './Field';

export default function LeadForm({ inputs, result, assumptions }) {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: '', company: '', phone: '', email: '', consent: false },
  });

  const body = (lead) =>
    `Hi, I used your solar calculator.\n\nName: ${lead.name}\nCompany: ${lead.company}\nPhone: ${lead.phone}\nEmail: ${lead.email}\n\n${summaryText(inputs, result)}`;

  // No backend: open the user's email app with everything pre-filled.
  const onSubmit = (lead) => {
    const subject = encodeURIComponent(`Solar enquiry: ${lead.company}`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${encodeURIComponent(body(lead))}`;
    setSent(true);
  };

  const whatsapp = () => {
    const lead = getValues();
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(body(lead))}`, '_blank');
  };

  if (sent) {
    return (
      <section className="rounded-2xl bg-teal-50 p-5 ring-1 ring-teal-200">
        <p className="flex items-center gap-2 font-semibold text-teal-900">
          <CheckCircle2 size={20} /> Thanks, your email is ready to send.
        </p>
        <p className="mt-1 text-sm text-teal-900">Send it from your email app and we'll be in touch within one working day.</p>
      </section>
    );
  }

  return (
    <section className="space-y-4 rounded-2xl bg-slate-900 p-5 text-white">
      <h2 className="text-lg font-bold">Want a proper quote?</h2>
      <p className="text-sm text-slate-300">
        Our team can check your roof, your tariff and your real consumption profile and give you a firm number.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3 rounded-xl bg-white p-4 text-slate-900">
        <Field label="Your name" error={errors.name?.message}>
          <input className={inputClass} autoComplete="name" {...register('name')} />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <input className={inputClass} autoComplete="organization" {...register('company')} />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input type="tel" className={inputClass} autoComplete="tel" {...register('phone')} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input type="email" className={inputClass} autoComplete="email" {...register('email')} />
        </Field>
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" className="mt-1" {...register('consent')} />
          I agree to be contacted about this enquiry.
        </label>
        {errors.consent && <p className="text-xs text-red-600">{errors.consent.message}</p>}

        <button type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-3 font-semibold text-slate-900 hover:bg-amber-400">
          <Mail size={18} /> Request a call-back
        </button>
        <button type="button" onClick={handleSubmit(whatsapp)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-500">
          <MessageCircle size={18} /> Chat on WhatsApp
        </button>
      </form>
      <button type="button" onClick={() => downloadEstimate(inputs, result, assumptions)}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-500 px-4 py-3 text-sm hover:bg-slate-800">
        <Download size={18} /> Download this estimate (PDF)
      </button>
    </section>
  );
}