import { useAgentContext } from '../contexts/agentContext';


export default function SessionInfo() {
  const { sessionId } = useAgentContext();
  return (
    <div className="border-b border-t px-6 py-2">
      <p className="text-xs">
        Session:{' '}
        <code className="px-2 py-1 rounded font-mono text-xs">
          {sessionId}
        </code>
      </p>
    </div>
  )
}
