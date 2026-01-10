import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { healthCheck, invokeChat, streamChat } from '../services/agentService';
import { readStream } from '../utils/streamReader';
import { type LLMProvider } from '../types/LLMProvider';

export const useHealthCheck = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: healthCheck,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000,
    retry: 3,
  });
};

export const useInvokeChat = (sessionId: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (message: string) => invokeChat(message, sessionId),
    onSuccess: () => {
      // Optionally invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['chat-history', sessionId] });
    },
    onError: (error) => {
      console.error('Error invoking chat:', error);
    },
  });
};

export const useStreamChat = (
  sessionId: string | null,
  llmProvider: LLMProvider,
  onToken: (token: string) => void,
  onComplete: (fullMessage: string) => void,
  onError: (error: Error) => void
) => {
  const sendMessage = async (message: string): Promise<void> => {
    try {
      const response = await streamChat(message, sessionId);
      await readStream(response, onToken, onComplete, onError, llmProvider);
    } catch (error) {
      onError(error as Error);
    }
  };

  return { sendMessage };
};