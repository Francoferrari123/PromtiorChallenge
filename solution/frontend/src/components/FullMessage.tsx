import type { ChatMessage } from '../types/ChatMessage';

interface FullMessageProps {
  message: ChatMessage;
}

export default function FullMessage({ message }: FullMessageProps) {
  return (
    <div
      className={`flex ${message.role === 'human' ? 'justify-end' : 'justify-start'
        }`}
    >
      <div
        className={`max-w-2xl px-4 py-3 rounded-2xl ${message.role === 'human'
          ? 'bg-indigo-600 text-white'
          : 'text-white-800 shadow-md'
          }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  )
}
