'use client';

import { useState } from 'react';

interface Props {
  logId: string;
  strategies: string[];
}

export default function StrategySelection({ logId, strategies }: Props) {
  const [selectedStrategy, setSelectedStrategy] = useState('');
  const [confidence, setConfidence] = useState(50);
  const [doability, setDoability] = useState(50);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!selectedStrategy) {
      setError('Please select a strategy before submitting.');
      return;
    }

    setSubmitting(true);
    setError('');

    const res = await fetch(`/api/strategies/${logId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        strategy: selectedStrategy,
        confidence,
        doability,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setSubmitted(true);
    } else {
      setError(data.error || 'Something went wrong.');
    }

    setSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Choose a Strategy</h2>

      <ul className="space-y-2">
        {strategies.map((s, index) => (
          <li key={index}>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="strategy"
                value={s}
                checked={selectedStrategy === s}
                onChange={() => setSelectedStrategy(s)}
              />
              <span>{s}</span>
            </label>
          </li>
        ))}
      </ul>

      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Confidence</label>
          <input
            type="range"
            min={0}
            max={100}
            value={confidence}
            onChange={(e) => setConfidence(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-sm text-gray-600">You feel {confidence}% confident implementing this.</p>
        </div>

        <div>
          <label className="block font-medium mb-1">Doability</label>
          <input
            type="range"
            min={0}
            max={100}
            value={doability}
            onChange={(e) => setDoability(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-sm text-gray-600">You feel this is {doability}% doable in your classroom.</p>
        </div>
      </div>

      {error && <p className="text-red-600">{error}</p>}
      {submitted ? (
        <p className="text-green-600">Strategy saved successfully!</p>
      ) : (
        <button
          onClick={handleSubmit}
          className="bg-[#C44E38] text-white px-4 py-2 rounded"
          disabled={submitting}
        >
          {submitting ? 'Saving...' : 'Save Strategy'}
        </button>
      )}
    </div>
  );
}
