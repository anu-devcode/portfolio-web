/**
 * Chat Repository
 */

import { query, transaction, queryWithClient } from '../index';
import type { ChatSession, ChatMessage } from '../types';

export class ChatRepository {
  static async createSession(sessionId: string, ipAddress?: string): Promise<ChatSession> {
    const result = await query<ChatSession>(
      `INSERT INTO chat_sessions (session_id, ip_address)
      VALUES ($1, $2)
      RETURNING *`,
      [sessionId, ipAddress]
    );
    return result[0];
  }

  static async getSession(sessionId: string): Promise<ChatSession | null> {
    const result = await query<ChatSession>(
      'SELECT * FROM chat_sessions WHERE session_id = $1',
      [sessionId]
    );
    return result[0] || null;
  }

  static async addMessage(sessionId: string, role: 'user' | 'assistant', content: string): Promise<ChatMessage> {
    return await transaction(async (client) => {
      const q = queryWithClient(client);
      
      // Update session timestamp
      await q(
        'UPDATE chat_sessions SET updated_at = CURRENT_TIMESTAMP WHERE session_id = $1',
        [sessionId]
      );
      
      // Add message
      const result = await q<ChatMessage>(
        `INSERT INTO chat_messages (session_id, role, content)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [sessionId, role, content]
      );
      
      return result[0];
    });
  }

  static async getMessages(sessionId: string, limit = 50): Promise<ChatMessage[]> {
    return await query<ChatMessage>(
      'SELECT * FROM chat_messages WHERE session_id = $1 ORDER BY created_at ASC LIMIT $2',
      [sessionId, limit]
    );
  }

  static async deleteSession(sessionId: string): Promise<boolean> {
    const result = await query('DELETE FROM chat_sessions WHERE session_id = $1', [sessionId]);
    return result.length > 0;
  }
}