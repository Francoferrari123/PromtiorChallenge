import { MessageSquare } from 'lucide-react'

interface DefaultMessageProps {
  isConnected: boolean;
  setInput: (input: string) => void;
}

export default function DefaultMessage({ isConnected, setInput }: DefaultMessageProps) {
  return (
    <div className="align-center mx-auto flex justify-center items-center margin-x-auto w-[100%]">
      <div className="text-center">
        <MessageSquare className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 text-gray-300" />
        <h2 className="text-xl font-semibold mb-10">Start a conversation</h2>
        <div className="flex gap-2 justify-center flex-wrap max-w-2xl mx-auto">
          {['What services does Promtior offer?', 'When was the company founded?', 'What can you do?'].map((q) => (
            <button
              key={q}
              onClick={() => setInput(q)}
              disabled={!isConnected}
              className="px-3 py-2 rounded-lg text-sm shadow-sm border border-gray-200 transition disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
