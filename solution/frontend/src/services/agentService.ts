import { api } from "../api/axios";
import type { ChatRequest } from "../types/ChatRequest";
import type { ChatResponse } from "../types/ChatResponse";

export const invokeChat = async (message: string, sessionId: string | null): Promise<string> => {
  const payload: ChatRequest = {
    input: {
      question: [{ content: message, type: 'human' }]
    },
    config: {
      configurable: {
        session_id: sessionId
      },
    },
  };
  const response = await api.post<ChatResponse>('/chat/invoke', payload);
  return response.data.output;
};

export const streamChat = async (message: string, sessionId: string | null): Promise<Response> => {
  const payload: ChatRequest = {
    input: {
      question: [{ content: message, type: 'human' }]
    },
    config: {
      configurable: {
        session_id: sessionId
      },
    },
  };
  const response = await fetch(import.meta.env.VITE_AGENT_API_URL + '/chat/stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return response;
}


export const healthCheck = async (): Promise<{ status: string }> => {
  const response = await api.get('/');
  return response.data;
};

export const getSessionHistory = async (sessionId: string) => {
  const response = await api.get(`/history/${sessionId}`);
  return response.data;
};