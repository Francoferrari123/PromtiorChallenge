import { AlertCircle } from 'lucide-react'
import { useAgentContext } from '../contexts/agentContext';

export default function ErrorBanner() {

  const { error, setError } = useAgentContext();

  return (
    <>
      {error && (
        <div className="border-b border-red-200 px-6 py-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span className="text-sm text-red-600">Error: {error}</span>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-600 hover:text-red-800"
          >
            ✕
          </button>
        </div>
      )}
    </>
  )
}
