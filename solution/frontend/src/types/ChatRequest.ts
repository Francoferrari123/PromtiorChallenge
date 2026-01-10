import type { ChatConfig } from "./ChatConfig";
import type { Question } from "./Question";

export type ChatRequest = {
  input: {
    question: Question[];
  };
  config: ChatConfig;
}