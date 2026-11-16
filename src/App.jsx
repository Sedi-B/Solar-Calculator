import { useMemo, useRef, useState } from 'react';
import { Sun } from 'lucide-react';
import { CONTACT } from './config';
import { DEFAULT_ASSUMPTIONS } from './lib/assumptions';
import { calculate } from './lib/solar';
import InputForm from './components/InputForm';
import AssumptionsPanel from './components/AssumptionsPanel';
import ResultsSummary from './components/ResultsSummary';
import SavingsChart from './components/SavingsChart';
import LeadForm from './components/LeadForm';
import Disclaimer from './components/Disclaimer';

export default function App() {
  const [inputs, setInputs] = useState(null);
  const [assumptions, setAssumptions] = useState(DEFAULT_ASSUMPTIONS);
  const [version, setVersion] = useState(0);
  const resultsRef = useRef(null);

  // Derived data: recalculates whenever inputs or assumptions change.
  const result = useMemo(
    () => (inputs ? calculate(inputs, assumptions) : null),
    [inputs, assumptions]
  );

  const handleSubmit = (values) => {
    setInputs(values);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const reset = () => {
    setAssumptions(DEFAULT_ASSUMPTIONS);
    setVersion((v) => v + 1);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-900 px-4 py-5 text-white">
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          <Sun className="text-amber-400" />
          <span className="font-semibold">{CONTACT.company}</span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-5 px-4 py-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">How much could solar save your business?</h1>
          <p className="mt-2 text-slate-600">Answer four quick questions for a first estimate in under two minutes.</p>
        </div>

        <InputForm onSubmit={handleSubmit} />

        <div ref={resultsRef} className="space-y-5">
          {result && (
            <>
              <ResultsSummary r={result} />
              <SavingsChart series={result.series} />
              <AssumptionsPanel assumptions={assumptions} onChange={setAssumptions} onReset={reset} version={version} />
              <LeadForm inputs={inputs} result={result} assumptions={assumptions} />
            </>
          )}
        </div>

        <Disclaimer />
      </main>
    </div>
  );
}