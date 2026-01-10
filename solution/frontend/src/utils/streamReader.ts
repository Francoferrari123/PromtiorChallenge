import type { LLMProvider } from "../types/LLMProvider";

export const readStream = async (
  response: Response,
  onToken: (token: string) => void,
  onComplete: (fullMessage: string) => void,
  onError: (error: Error) => void,
  llmProvider: LLMProvider
): Promise<void> => {
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('No reader available');
  }

  const decoder = new TextDecoder();
  let buffer = '';
  let fullMessage = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      if (llmProvider == "ollama") {
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (typeof (data) == 'string') {
                fullMessage += data;
                onToken(fullMessage);
              }
            } catch (e) {
              console.error('Error parsing SSE:', e);
            }
          } else if (line.includes('event: end')) {
            onComplete(fullMessage);
          }
        }
      }
      else if (llmProvider == "openai") {
        let readNextLine = false;
        for (const line of lines) {
          if (readNextLine) {
            try {
              const data = JSON.parse(line.slice(6)).content;
              fullMessage += data;
              onToken(fullMessage);
            } catch (e) {
              console.error('Error parsing SSE:', e);
            }
            readNextLine = false;
          }
          else if (line.startsWith('event: data')) {
            readNextLine = true
          }
          else if (line.includes('event: end')) {
            onComplete(fullMessage);
          }
        }
      }
    }
  } catch (error) {
    onError(error as Error);
  } finally {
    reader.releaseLock();
  }
};