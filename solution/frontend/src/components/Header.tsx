import { Loader2, Trash2 } from 'lucide-react'
import { useAgentContext } from '../contexts/agentContext';
import logoWithName from '../assets/promtiorLogoAndName.svg'

export default function Header() {
  const { isConnected, isCheckingHealth, streaming, clearChat, llmProvider, setLlmProvider } = useAgentContext();

  return (
    <div className="shadow-lg px-6 py-4 ">
      <div className="
        flex flex-col gap-0 md:gap-4
        md:flex-row md:items-center md:justify-between
      ">
        <div className="flex justify-center md:justify-start">
          <div>
            <div className='max-w-[50dvw] md:max-w-[250px]'>
              <img src={logoWithName}></img>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <h1 className='hidden md:flex mb-2'>ChatBot</h1>
          <p className="text-sm flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${isCheckingHealth
                ? 'bg-yellow-500 animate-pulse'
                : isConnected
                  ? 'bg-green-500'
                  : 'bg-red-500'
                }`}
            />
            {isCheckingHealth
              ? 'Connecting...'
              : isConnected
                ? 'Connected'
                : 'Disconnected'}
            {streaming && (
              <span className="flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                Streaming...
              </span>
            )}
          </p>
        </div>

        <div className="
          flex flex-row gap-2 mt-5 md:mt-0max-w-[50%] mx-auto md:mx-0 md:justify-between
          md:align-center  sm:justify-center
        ">
          {/* LLM Provider selector */}
          <select
            value={llmProvider}
            onChange={(e) =>
              setLlmProvider(e.target.value as 'ollama' | 'openai')
            }
            disabled={streaming}
            className="
              
              px-3 py-2 rounded-lg border
              text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500
              disabled:opacity-50 disabled:cursor-not-allowed appearance-none
              align-center
            "
            title={streaming ? 'Cannot change provider while streaming' : ''}
          >
            <option className="text-sm bg-black px-3 py-2 rounded-lg border" value="ollama">Ollama (local)</option>
            <option className="text-sm bg-black px-3 py-2 rounded-lg border" value="openai">OpenAI</option>
          </select>

          {/* Clear chat */}
          <button
            onClick={clearChat}
            className="
              flex items-center gap-2
              px-4 py-2
              rounded-lg
              text-white
              bg-white
              transition
            "
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}
