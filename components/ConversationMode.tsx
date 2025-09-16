'use client';

import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ConversationMode() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: updatedMessages }),
    });

    const data = await res.json();
    setMessages([...updatedMessages, { role: 'assistant', content: data.response }]);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    setMessages([]);
    setInput('');
  };

  return (
    <div className="space-y-6">
      {/* Chat Display */}
      <div className="h-64 overflow-y-auto p-4 border border-gray-300 rounded-md bg-white space-y-4">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-sm">Start a conversation about behavior strategies.</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`text-sm p-2 rounded-md ${msg.role === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-800'}`}>
              <strong>{msg.role === 'user' ? 'You' : 'Lumi'}:</strong> {msg.content}
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="space-y-3">
        <textarea
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message and press Enter..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className="flex space-x-4">
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className={`px-6 py-2 rounded-md font-semibold text-white transition ${
              loading || !input.trim()
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Thinking...' : 'Send'}
          </button>

          <button
            onClick={handleClear}
            className="px-6 py-2 rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100"
          >
            Clear Conversation
          </button>
        </div>
      </div>
    </div>
  );
}
