'use client';

import { useState } from 'react';
import StructuredForm from '@/components/StructuredForm';
import ConversationMode from '@/components/ConversationMode';

export default function NewLogPage() {
  const [mode, setMode] = useState<'form' | 'chat'>('form');

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Log New Behavior
        </h1>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setMode('form')}
            className={`px-5 py-2 rounded-md font-medium transition ${
              mode === 'form'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Quick Form
          </button>
          <button
            onClick={() => setMode('chat')}
            className={`px-5 py-2 rounded-md font-medium transition ${
              mode === 'chat'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Conversation Mode
          </button>
        </div>

        <div className="mt-4">
          {mode === 'form' ? <StructuredForm /> : <ConversationMode />}
        </div>
      </div>
    </div>
  );
}
