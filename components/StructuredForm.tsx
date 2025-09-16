'use client';

import { useState } from 'react';

// Optional: import a shared constant for API base (recommended)
// import { API_BASE_URL } from '@/lib/constants';

export default function StructuredForm() {
  const [behavior, setBehavior] = useState('');
  const [child, setChild] = useState('');
  const [age, setAge] = useState('');
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string[]>([]);
  const [followUp, setFollowUp] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setResponse([]);
    setFollowUp('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/strategies/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ behavior, age, context, child }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.followUp) {
        setFollowUp(data.message);
      } else if (data.strategies) {
        setResponse(Array.isArray(data.strategies) ? data.strategies : [data.strategies]);
      }
    } catch (err) {
      console.error('API Error:', err);
      setLoading(false);
      setFollowUp('An error occurred. Please try again.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const handleReset = () => {
    setBehavior('');
    setChild('');
    setAge('');
    setContext('');
    setResponse([]);
    setFollowUp('');
  };

  return (
    <form onKeyDown={handleKeyDown} className="space-y-6">
      <textarea
        value={behavior}
        onChange={(e) => setBehavior(e.target.value)}
        placeholder="Describe the behavior"
        required
        rows={3}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={child}
        onChange={(e) => setChild(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select a child</option>
        <option value="Ari">Ari</option>
        <option value="Sage">Sage</option>
      </select>

      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age (optional)"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        value={context}
        onChange={(e) => setContext(e.target.value)}
        placeholder="Context (optional)"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className={`px-6 py-2 rounded-md font-semibold text-white transition ${
            loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Thinking...' : 'Generate Strategies'}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-2 rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100"
        >
          Reset form
        </button>
      </div>

      {followUp && (
        <div className="p-4 rounded-md bg-yellow-100 text-yellow-800 border border-yellow-300">
          {followUp}
        </div>
      )}

      {response.length > 0 && (
        <div className="p-4 rounded-md bg-green-100 text-green-800 border border-green-300 space-y-2">
          {response.map((line, idx) => (
            <p key={idx}>• {line}</p>
          ))}
        </div>
      )}
    </form>
  );
}
