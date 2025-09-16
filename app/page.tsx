import { notFound } from 'next/navigation';
import StrategySelection from '@/components/StrategySelection';

interface LogData {
  strategies: string[];
}

export default async function StrategyPage({
  params,
}: {
  params: { logId: string };
}) {
  const { logId } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/strategies/${logId}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    notFound(); // Show 404 if log not found
  }

  const data: LogData = await res.json();

  return (
    <div className="max-w-xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Select a Strategy</h1>
      <StrategySelection logId={logId} strategies={data.strategies} />
    </div>
  );
}
