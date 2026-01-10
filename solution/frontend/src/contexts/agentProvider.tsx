import { useEffect, useState, type PropsWithChildren } from 'react';
import { AgentContext } from './agentContext';
import type { ChatMessage } from '../types/ChatMessage';
import { useHealthCheck, useStreamChat } from '../hooks/useChat';
import { getSessionHistory } from '../services/agentService';
import type { Question } from '../types/Question';
import { type LLMProvider } from '../types/LLMProvider';

export const AgentProvider = ({ children }: PropsWithChildren) => {
  const [llmProvider, setLlmProvider] = useState<LLMProvider>('ollama')
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [currentStreamingMessage, setCurrentStreamingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState('');

  const { data: healthData, isLoading: isCheckingHealth } = useHealthCheck();
  const isConnected = healthData?.status === 'ok';
  const sessionId = `${llmProvider}-session`;

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await getSessionHistory(sessionId);
      setMessages(response.messages.map((msg: Question) => ({
        role: msg.type,
        content: msg.content,
      })));
    }
    fetchMessages();
  }, [sessionId]);

  const { sendMessage } = useStreamChat(
    sessionId,
    llmProvider,
    (token) => {
      setCurrentStreamingMessage(token);
    },
    // onComplete
    (fullMessage) => {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: fullMessage, timestamp: Date.now() },
      ]);
      setCurrentStreamingMessage('');
      setStreaming(false);
      setError(null);
    },
    // onError
    (err) => {
      console.error('Stream error:', err);
      setError(err.message);
      setStreaming(false);
      setCurrentStreamingMessage('');
    }
  );


  const handleSendMessage = async () => {
    if (!input.trim() || streaming || !isConnected) return;

    const userMessage: ChatMessage = {
      role: 'human',
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageText = input;
    setInput('');
    setStreaming(true);
    setError(null);

    try {
      await sendMessage(messageText);
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setCurrentStreamingMessage('');
    setError(null);
  };

  return (
    <AgentContext.Provider value={{
      handleSendMessage,
      llmProvider,
      setLlmProvider,
      clearChat,
      input,
      setInput,
      sendMessage,
      sessionId,
      messages,
      setMessages,
      streaming,
      setStreaming,
      currentStreamingMessage,
      setCurrentStreamingMessage,
      error,
      setError,
      isCheckingHealth,
      isConnected
    }}>
      {children}
    </AgentContext.Provider >
  );
};

