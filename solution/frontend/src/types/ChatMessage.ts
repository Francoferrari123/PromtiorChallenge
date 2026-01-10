import type { UserRole } from "./UserRole";

export type ChatMessage = {
  role: UserRole;
  content: string;
  timestamp?: number;
}