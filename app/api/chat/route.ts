import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { validateChatMessage, sanitizeInput } from '@/lib/validation';
import { rateLimit, getClientIdentifier } from '@/lib/rateLimit';
import { ChatRepository } from '@/lib/db/repositories/chat';
import { ProfileRepository } from '@/lib/db/repositories/profile';
import { ProjectsRepository } from '@/lib/db/repositories/projects';
import { ServicesRepository } from '@/lib/db/repositories/services';
import { getSkills } from '@/lib/db/repositories/skills';
import { getWorkExperiences } from '@/lib/db/repositories/work-experiences';
import { SettingsRepository } from '@/lib/db/repositories/settings';
import { logger } from '@/lib/logger';
import { defaultConfig } from '@/config/site.config';
import type { Locale } from '@/lib/db/types';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const clientId = getClientIdentifier(request);
    const limit = rateLimit(`chat-${clientId}`, {
      windowMs: 60 * 1000,
      maxRequests: 20,
    });

    if (!limit.allowed) {
      return NextResponse.json({ error: 'Too many requests. Please slow down.' }, { status: 429 });
    }

    const { messages, sessionId, locale = 'en' } = await request.json();
    const lastMessage = messages[messages.length - 1]?.content || '';
    const sensitizedMessage = sanitizeInput(lastMessage);
    const validation = validateChatMessage(sensitizedMessage);

    if (!validation.valid) {
      return NextResponse.json({ error: 'Validation failed', errors: validation.errors }, { status: 400 });
    }

    // 1. Session Management
    let activeSessionId = sessionId;
    if (!activeSessionId) {
      activeSessionId = `session-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      await ChatRepository.createSession(activeSessionId, clientId);
    }

    // 2. Fetch Context Data
    const [profile, projects, services, skills, experiences, settings] = await Promise.all([
      ProfileRepository.getByLocale(locale as Locale),
      ProjectsRepository.getAll(locale as Locale),
      ServicesRepository.getAll(locale as Locale),
      getSkills(locale as Locale),
      getWorkExperiences(locale as Locale),
      SettingsRepository.getSettings(locale as Locale)
    ]);

    // 3. Build Dynamic System Prompt
    const context = `
      You are the professional AI assistant for ${profile?.name || defaultConfig.personalInfo.name}'s portfolio website.
      
      ABOUT ${profile?.name || defaultConfig.personalInfo.name}:
      - Title: ${profile?.title || defaultConfig.personalInfo.title}
      - Location: ${profile?.location || defaultConfig.personalInfo.location}
      - Bio: ${profile?.bio || defaultConfig.personalInfo.bio}
      - Status: ${profile?.status || 'Active'}
      - Email: ${profile?.email || defaultConfig.personalInfo.email}
      
      TECHNICAL SKILLS:
      ${skills.map(s => `- ${s.name} (Level: ${s.level}%, Category: ${s.category})`).join('\n')}
      
      KEY SERVICES:
      ${services.map(s => `- ${s.title}: ${s.description}`).join('\n')}
      
      NOTABLE PROJECTS:
      ${projects.slice(0, 5).map(p => `- ${p.title}: ${p.description} (Tech: ${p.technologies?.join(', ')})`).join('\n')}
      
      WORK EXPERIENCE:
      ${experiences.map(e => `- ${e.position} at ${e.company} (${e.location}). Highlights: ${e.description}`).join('\n')}

      INSTRUCTIONS:
      - Be professional, concise, and helpful.
      - Use Markdown for bold text, lists, and code blocks.
      - If you don't know something, suggest contacting ${profile?.name || 'the owner'} directly.
      - Always respond in the language of the user's message.
      - Custom Personality: ${settings?.chatbot_system_prompt || 'Standard Professional Assistant'}
    `;

    // 4. Call OpenAI with streaming
    const response = await openai.chat.completions.create({
      model: settings?.chatbot_model || process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      stream: true,
      messages: [
        { role: 'system', content: context },
        ...messages.map((m: any) => ({
          role: m.role,
          content: m.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    // 5. Convert to stream
    const stream = OpenAIStream(response, {
      async onCompletion(completion) {
        // Log to database on complete
        await ChatRepository.addMessage(activeSessionId, 'user', sensitizedMessage);
        await ChatRepository.addMessage(activeSessionId, 'assistant', completion);
      },
    });

    return new StreamingTextResponse(stream, {
      headers: {
        'X-Session-Id': activeSessionId,
      }
    });

  } catch (error) {
    logger.error('Chat API error', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
