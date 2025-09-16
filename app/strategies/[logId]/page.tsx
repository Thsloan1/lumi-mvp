"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

const strategies = [
  "Redirect",
  "Positive Reinforcement",
  "Ignore",
  "Time-In",
  "Collaborative Problem Solving",
];

export default function StrategyPage() {
  const { logId } = useParams();
  const router = useRouter();

  const [selectedStrategy, setSelectedStrategy] = useState("");
  const [confidence, setConfidence] = useState(5);
  const [doability, setDoability] = useState(5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/strategies/${logId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        strategy: selectedStrategy,
        confidence,
        doability,
      }),
    });

    if (res.ok) {
      alert("✅ Strategy saved!");
      // Future: Redirect to summary or confirmation page
    } else {
      alert("❌ Failed to save strategy");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Choose a Strategy</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          {strategies.map((s) => (
            <label key={s} className="block mb-2">
              <input
                type="radio"
                name="strategy"
                value={s}
                checked={selectedStrategy === s}
                onChange={(e) => setSelectedStrategy(e.target.value)}
                required
              />
              <span className="ml-2">{s}</span>
            </label>
          ))}
        </div>

        <div>
          <label>
            Confidence: {confidence}
            <input
              type="range"
              min="1"
              max="10"
              value={confidence}
              onChange={(e) => setConfidence(Number(e.target.value))}
              className="w-full"
            />
          </label>
        </div>

        <div>
          <label>
            Doability: {doability}
            <input
              type="range"
              min="1"
              max="10"
              value={doability}
              onChange={(e) => setDoability(Number(e.target.value))}
              className="w-full"
            />
          </label>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Strategy
        </button>
      </form>
    </div>
  );
}
<button
  type="button"
  className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
  onClick={() => alert("Coming soon!")}
>
  Generate Family Note
</button>
