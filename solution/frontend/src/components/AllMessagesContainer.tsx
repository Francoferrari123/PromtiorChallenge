import { useEffect, useRef } from 'react'
import DefaultMessage from './DefaultMessage';
import FullMessage from './FullMessage';
import ActiveMessage from './ActiveMessage';
import LoadingMessage from './LoadingMessage';
import { useAgentContext } from '../contexts/agentContext';


export default function AllMessagesContainer() {

  const { messages, currentStreamingMessage, streaming, isConnected, setInput } = useAgentContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    scrollToBottom();
  }, [messages, currentStreamingMessage, messagesEndRef]);

  return (
    <div className="flex flex-col grow min-h-0 h-full mb-[10vh] w-[100%] overflow-y-auto px-6 py-6 space-y-4
          [mask-image:linear-gradient(to_bottom,black_80%,transparent)]
          [-webkit-mask-image:linear-gradient(to_bottom,black_80%,transparent)]">
      {messages.length === 0 && !currentStreamingMessage ? (
        <DefaultMessage isConnected={isConnected} setInput={setInput} />
      ) : (
        <>
          {messages.map((msg, idx) => (
            <FullMessage key={idx} message={msg} />
          ))}

          {currentStreamingMessage && (
            <ActiveMessage currentStreamingMessage={currentStreamingMessage} />
          )}

          {streaming && !currentStreamingMessage && (
            <LoadingMessage />
          )}
        </>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}
