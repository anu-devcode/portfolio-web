import { NextRequest, NextResponse } from 'next/server';
import { validateChatMessage, sanitizeInput } from '@/lib/validation';
import { rateLimit, getClientIdentifier } from '@/lib/rateLimit';
import { ChatRepository } from '@/lib/db/repositories/chat';
import { logger } from '@/lib/logger';
import { defaultConfig } from '@/config/site.config';

// Enhanced AI response system (keeping existing logic)
const AI_RESPONSES = {
  greetings: [
    "Hello! I'm here to help you learn more about the portfolio and answer any questions.",
    "Hi there! Feel free to ask me anything about the projects, skills, or experience.",
    "Greetings! I'm your AI assistant. How can I help you today?",
  ],
  portfolio: [
    "This portfolio showcases various projects including backend development, AI systems, and full-stack applications. Would you like to know more about any specific project?",
    "The portfolio features work in software engineering, AI, and automation. Check out the Projects section to see detailed examples.",
  ],
  skills: [
    "The main skills include Backend Development (Node.js, Python), AI & Automation, Cloud & DevOps, and Full-Stack Development. Each area has multiple technologies and frameworks.",
    "Key expertise areas are: Backend systems, AI/ML, Cloud infrastructure, and modern web development. You can see detailed technologies in the About section.",
  ],
  contact: [
    `You can reach out via the contact form on this page, or email directly at ${defaultConfig.personalInfo.email}. I'm always open to discussing new opportunities!`,
    "Feel free to use the contact form below or reach out through the social links in the footer. I'd love to hear from you!",
  ],
  default: [
    "That's an interesting question! Let me help you with that.",
    "I'd be happy to provide more information about that.",
    "Great question! Here's what I can tell you...",
    "Thanks for asking! Let me share some insights...",
  ],
};

function generateAIResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();

  // Greeting detection
  if (message.match(/\b(hi|hello|hey|greetings|good morning|good afternoon|good evening)\b/)) {
    return AI_RESPONSES.greetings[
      Math.floor(Math.random() * AI_RESPONSES.greetings.length)
    ];
  }

  // Portfolio/projects detection
  if (message.match(/\b(portfolio|project|work|showcase|what.*do|what.*build)\b/)) {
    return AI_RESPONSES.portfolio[
      Math.floor(Math.random() * AI_RESPONSES.portfolio.length)
    ];
  }

  // Skills/technologies detection
  if (message.match(/\b(skill|technology|tech|stack|framework|language|expertise|what.*know|what.*use)\b/)) {
    return AI_RESPONSES.skills[
      Math.floor(Math.random() * AI_RESPONSES.skills.length)
    ];
  }

  // Contact detection
  if (message.match(/\b(contact|email|reach|get.*touch|hire|collaborate|work.*together)\b/)) {
    return AI_RESPONSES.contact[
      Math.floor(Math.random() * AI_RESPONSES.contact.length)
    ];
  }

  // Default response
  return AI_RESPONSES.default[
    Math.floor(Math.random() * AI_RESPONSES.default.length)
  ];
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const limit = rateLimit(`chat-${clientId}`, {
      windowMs: 60 * 1000, // 1 minute
      maxRequests: 20, // 20 requests per minute
    });

    if (!limit.allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please slow down.',
          retryAfter: Math.ceil((limit.resetTime - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil((limit.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': '20',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(limit.resetTime).toISOString(),
          },
        }
      );
    }

    const body = await request.json();
    const { message, sessionId } = body;

    // Validate message
    const sanitizedMessage = sanitizeInput(message || '');
    const validation = validateChatMessage(sanitizedMessage);

    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    // Session management
    let activeSessionId = sessionId;

    if (!activeSessionId) {
      // Create new session
      activeSessionId = `session-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      await ChatRepository.createSession(activeSessionId, clientId);
    } else {
      // Check if session exists in DB, if not recreate it
      // This handles cases where client has an ID but server (DB) was reset
      const existingSession = await ChatRepository.getSession(activeSessionId);
      if (!existingSession) {
        await ChatRepository.createSession(activeSessionId, clientId);
      }
    }

    // Save user message
    await ChatRepository.addMessage(activeSessionId, 'user', sanitizedMessage);

    // Generate AI response
    let aiResponse: string;

    // Check if OpenAI API key is available
    if (process.env.OPENAI_API_KEY) {
      try {
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: `You are a helpful AI assistant for ${defaultConfig.personalInfo.name}'s portfolio website. You help visitors learn about the portfolio, projects, and skills. Be friendly, concise, and professional.`,
              },
              {
                role: 'user',
                content: sanitizedMessage,
              },
            ],
            max_tokens: 150,
            temperature: 0.7,
          }),
        });

        if (openaiResponse.ok) {
          const data = await openaiResponse.json();
          aiResponse = data.choices[0]?.message?.content || generateAIResponse(sanitizedMessage);
        } else {
          // Fallback to local AI if OpenAI fails
          aiResponse = generateAIResponse(sanitizedMessage);
        }
      } catch (error) {
        logger.error('OpenAI API error', error);
        // Fallback to local AI
        aiResponse = generateAIResponse(sanitizedMessage);
      }
    } else {
      // Use local AI responses
      aiResponse = generateAIResponse(sanitizedMessage);
    }

    // Save AI response
    await ChatRepository.addMessage(activeSessionId, 'assistant', aiResponse);

    return NextResponse.json(
      {
        response: aiResponse,
        sessionId: activeSessionId,
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': '20',
          'X-RateLimit-Remaining': limit.remaining.toString(),
          'X-RateLimit-Reset': new Date(limit.resetTime).toISOString(),
        },
      }
    );
  } catch (error) {
    logger.error('Chat API error', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
