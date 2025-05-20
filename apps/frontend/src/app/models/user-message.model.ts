export interface UserMessage {
  id: string;
  username: string;
  message: string;
  email?: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
} 