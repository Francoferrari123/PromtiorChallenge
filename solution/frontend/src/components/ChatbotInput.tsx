import React from 'react'
import { Loader2, Send } from 'lucide-react';
import { useAgentContext } from '../contexts/agentContext';

export default function ChatbotInput() {

  const {
    isConnected,
    streaming,
    input,
    setInput,
    handleSendMessage,
  } = useAgentContext();


  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-0 h-[96px] px-6 py-4 shadow-lg w-[100%]">
      <div className="flex gap-3 max-w-4xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={
            isConnected ? 'Type your message...' : 'Connecting to server...'
          }
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
          disabled={streaming || !isConnected}
        />
        <button
          onClick={handleSendMessage}
          disabled={streaming || !input.trim() || !isConnected}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center gap-2"
        >
          {streaming ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
          Send
        </button>
      </div>
    </div>
  )
}
