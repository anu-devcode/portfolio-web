// Simple file-based storage for development
// For production, use a proper database (PostgreSQL, MongoDB, etc.)

import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: number;
  ip?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  sessionId?: string;
}

// Contact submissions storage
export class ContactStorage {
  private filePath = path.join(DATA_DIR, 'contacts.json');

  async save(submission: Omit<ContactSubmission, 'id' | 'timestamp'>): Promise<ContactSubmission> {
    const contacts = this.loadAll();
    const newSubmission: ContactSubmission = {
      ...submission,
      id: `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };

    contacts.push(newSubmission);
    fs.writeFileSync(this.filePath, JSON.stringify(contacts, null, 2));
    return newSubmission;
  }

  loadAll(): ContactSubmission[] {
    try {
      if (!fs.existsSync(this.filePath)) {
        return [];
      }
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading contacts:', error);
      return [];
    }
  }

  getById(id: string): ContactSubmission | undefined {
    return this.loadAll().find(c => c.id === id);
  }

  getRecent(limit: number = 10): ContactSubmission[] {
    return this.loadAll()
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }
}

// Chat messages storage
export class ChatStorage {
  private filePath = path.join(DATA_DIR, 'chats.json');

  async save(message: Omit<ChatMessage, 'id' | 'timestamp'>): Promise<ChatMessage> {
    const messages = this.loadAll();
    const newMessage: ChatMessage = {
      ...message,
      id: `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };

    messages.push(newMessage);
    fs.writeFileSync(this.filePath, JSON.stringify(messages, null, 2));
    return newMessage;
  }

  loadAll(): ChatMessage[] {
    try {
      if (!fs.existsSync(this.filePath)) {
        return [];
      }
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading chats:', error);
      return [];
    }
  }

  getBySession(sessionId: string): ChatMessage[] {
    return this.loadAll()
      .filter(m => m.sessionId === sessionId)
      .sort((a, b) => a.timestamp - b.timestamp);
  }
}

// Export singleton instances
export const contactStorage = new ContactStorage();
export const chatStorage = new ChatStorage();

