/**
 * Authentication System
 * Server-side authentication for admin panel
 */

import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { query } from '../db';
import type { User } from '../db/types';

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days

/**
 * Hash a password
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

/**
 * Verify a password
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

/**
 * Create a session for a user
 */
export async function createSession(userId: string): Promise<string> {
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_DURATION * 1000);
  
  // Store session in database (you can create a sessions table if needed)
  // For now, we'll use a simple cookie-based approach
  
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION,
    path: '/',
  });
  
  return sessionId;
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  
  if (!sessionId) {
    return null;
  }
  
  // In a real implementation, you'd verify the session in the database
  // For now, we'll check if there's a user_id in the session
  // This is a simplified version - you should implement proper session management
  
  return null;
}

/**
 * Sign in a user
 */
export async function signIn(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const users = await query<User>(
      'SELECT * FROM users WHERE email = $1 LIMIT 1',
      [email]
    );
    
    if (users.length === 0) {
      return { success: false, error: 'Invalid email or password' };
    }
    
    const user = users[0];
    const isValid = await verifyPassword(password, user.password_hash);
    
    if (!isValid) {
      return { success: false, error: 'Invalid email or password' };
    }
    
    await createSession(user.id);
    
    // Remove password hash from response
    const { password_hash, ...userWithoutPassword } = user;
    
    return { success: true, user: userWithoutPassword as User };
  } catch (error) {
    console.error('Sign in error:', error);
    return { success: false, error: 'An error occurred during sign in' };
  }
}

/**
 * Sign out a user
 */
export async function signOut(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Require authentication - throws error if not authenticated
 */
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('Unauthorized');
  }
  
  return user;
}

