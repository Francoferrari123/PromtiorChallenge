interface ActiveMessageProps {
  currentStreamingMessage: string;
}

export default function ActiveMessage({ currentStreamingMessage }: ActiveMessageProps) {
  return (
    <div className="flex justify-start">
      <div className="max-w-2xl px-4 py-3 rounded-2xl text-white-800 shadow-lg">
        <p className="whitespace-pre-wrap">
          {currentStreamingMessage}
          <span className="inline-block w-1 h-4 bg-indigo-600 ml-1 animate-pulse">
            |
          </span>
        </p>
      </div>
    </div>
  )
}
