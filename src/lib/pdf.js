import { jsPDF } from 'jspdf';
import { ASSUMPTION_FIELDS, PATTERNS } from './assumptions';
import { fmtR, fmtRange, fmtYears } from './format';
import { CONTACT } from '../config';

export function downloadEstimate(inputs, r, a) {
  const doc = new jsPDF();
  let y = 20;
  const line = (text, size = 11, gap = 7) => {
    doc.setFontSize(size);
    const wrapped = doc.splitTextToSize(text, 180);
    doc.text(wrapped, 15, y);
    y += wrapped.length * gap;
  };

  doc.setFont('helvetica', 'bold');
  line('Solar Savings Estimate', 18, 9);
  doc.setFont('helvetica', 'normal');
  line(`Prepared ${new Date().toLocaleDateString('en-ZA')} by ${CONTACT.company}`, 10);
  y += 4;

  doc.setFont('helvetica', 'bold'); line('Your results (indicative)', 13);
  doc.setFont('helvetica', 'normal');
  line(`Suggested system size: ${r.kwp} kWp`);
  line(`Estimated installed cost: ${fmtRange(r.costLow, r.costHigh)}`);
  line(`Estimated monthly saving: ${fmtRange(r.monthlyLow, r.monthlyHigh)}`);
  line(`Payback: ${fmtYears(r.paybackYears)} (${fmtYears(r.paybackAfterTax)} including Section 12B tax relief)`);
  line(`Estimated 25-year net benefit: ${fmtR(r.net25)}`);
  y += 4;

  doc.setFont('helvetica', 'bold'); line('Your inputs', 13);
  doc.setFont('helvetica', 'normal');
  line(`Monthly bill: ${fmtR(inputs.monthlyBill)}`);
  if (inputs.monthlyKwh > 0) line(`Monthly usage: ${Math.round(inputs.monthlyKwh)} kWh`);
  line(`Operating pattern: ${PATTERNS[inputs.pattern].label}`);
  y += 4;

  doc.setFont('helvetica', 'bold'); line('Assumptions used', 13);
  doc.setFont('helvetica', 'normal');
  ASSUMPTION_FIELDS.forEach((f) => {
    const v = f.pct ? Math.round(a[f.key] * 10000) / 100 : a[f.key];
    line(`${f.label}: ${v} ${f.unit}`, 10, 6);
  });
  y += 4;

  doc.setFont('helvetica', 'italic');
  line('This is a first estimate, not a quote. Actual savings depend on your tariff, roof, shading and a site assessment. Tax figures are indicative; confirm with your tax adviser.', 9, 5);

  doc.save('solar-estimate.pdf');
}