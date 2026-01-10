import { createContext, useContext } from "react";
import type { ChatMessage } from "../types/ChatMessage";
import type { LLMProvider } from "../types/LLMProvider";

export type AgentContextProps = {

  sessionId: string;

  llmProvider: LLMProvider;
  setLlmProvider: (llm: LLMProvider) => void;

  messages: ChatMessage[];
  setMessages: (messages: ChatMessage[]) => void;

  streaming: boolean;
  setStreaming: (streaming: boolean) => void;

  currentStreamingMessage: string;
  setCurrentStreamingMessage: (message: string) => void;

  error: string | null;
  setError: (error: string | null) => void;

  input: string;
  setInput: (input: string) => void;

  isCheckingHealth: boolean;
  isConnected: boolean;

  sendMessage: (message: string) => Promise<void>;
  handleSendMessage: () => Promise<void>;
  clearChat: () => void;
}

export const AgentContext = createContext({} as AgentContextProps);

export const useAgentContext = () => useContext(AgentContext);