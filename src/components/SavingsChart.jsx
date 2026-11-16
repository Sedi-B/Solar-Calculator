import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ReferenceLine, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { fmtR } from '../lib/format';

const millions = (v) => `R${(v / 1e6).toFixed(1)}m`;

export default function SavingsChart({ series }) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <h2 className="mb-1 text-lg font-bold text-slate-900">Cumulative cash position</h2>
      <p className="mb-3 text-sm text-slate-600">Where the line crosses zero is when the system has paid for itself.</p>
      <div className="h-64 w-full">
        <ResponsiveContainer>
          <LineChart data={series} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} label={{ value: 'Years', position: 'insideBottom', offset: -2, fontSize: 12 }} />
            <YAxis tickFormatter={millions} tick={{ fontSize: 12 }} width={55} />
            <Tooltip formatter={(v) => fmtR(v)} labelFormatter={(y) => `Year ${y}`} />
            <Legend verticalAlign="top" height={30} />
            <ReferenceLine y={0} stroke="#64748b" />
            <Line type="monotone" dataKey="cumulative" name="Savings only" stroke="#f59e0b" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="afterTax" name="With Section 12B" stroke="#0f766e" strokeWidth={2} strokeDasharray="5 4" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}