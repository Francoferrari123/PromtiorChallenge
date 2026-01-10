

export default function LoadingMessage() {
  return (
    <div className="flex justify-start">
      <div className="bg-red px-4 py-3 rounded-2xl shadow-md">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
          <div
            className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
            style={{ animationDelay: '150ms' }}
          />
          <div
            className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  )
}
