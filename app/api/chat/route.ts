import { NextRequest, NextResponse } from 'next/server';
import { validateChatMessage, sanitizeInput } from '@/lib/validation';
import { rateLimit, getClientIdentifier } from '@/lib/rateLimit';
import { ChatRepository } from '@/lib/db/repositories/chat';
import { logger } from '@/lib/logger';
import { defaultConfig } from '@/config/site.config';

// Enhanced AI response system (keeping existing logic)
const AI_RESPONSES = {
  greetings: [
    `Hello! I'm the AI assistant for ${defaultConfig.personalInfo.name}'s portfolio. How can I help you today?`,
    `Hi there! I can tell you about ${defaultConfig.personalInfo.name}'s projects, skills, or professional experience. What would you like to know?`,
    "Greetings! Feel free to ask me anything about the work featured on this site.",
  ],
  portfolio: [
    `${defaultConfig.personalInfo.name} specializes in Backend Engineering and AI. The portfolio features projects like this very website, which uses Next.js, PostgreSQL, and Three.js.`,
    "You can find detailed information about various projects in the Projects section, ranging from AI automated systems to robust backend architectures.",
  ],
  skills: [
    `Key technical expertise includes: ${defaultConfig.personalInfo.bio}. Specific technologies used are Node.js, Python, PostgreSQL, and modern frontend frameworks.`,
    "Technical stack overview: TypeScript for type-safety, React/Next.js for the interface, and PostgreSQL for data management. Extensive experience in AI integration and automation.",
  ],
  contact: [
    `You can reach ${defaultConfig.personalInfo.name} directly via email at ${defaultConfig.personalInfo.email} or use the contact form at the bottom of the page.`,
    `Feel free to connect on LinkedIn or check out more code on GitHub. Links are available in the footer and contact section.`,
  ],
  identity: [
    `I am an AI assistant specifically designed for ${defaultConfig.personalInfo.name}'s portfolio. I use a combination of local logic and OpenAI to provide accurate information.`,
    `My purpose is to help visitors navigate this portfolio and learn more about ${defaultConfig.personalInfo.name}'s professional background.`,
  ],
  default: [
    "That's an interesting question! While I focus on the portfolio details, I'd be happy to help if it relates to the work shown here.",
    "I'm here to provide information about the projects and skills of the developer. If you have a specific question about those, please let me know!",
  ],
};

function generateAIResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();

  if (message.match(/\b(who are you|your name|what are you)\b/)) {
    return AI_RESPONSES.identity[Math.floor(Math.random() * AI_RESPONSES.identity.length)];
  }
  if (message.match(/\b(hi|hello|hey|greetings|morning|evening)\b/)) {
    return AI_RESPONSES.greetings[Math.floor(Math.random() * AI_RESPONSES.greetings.length)];
  }
  if (message.match(/\b(portfolio|project|work|build|making|made)\b/)) {
    return AI_RESPONSES.portfolio[Math.floor(Math.random() * AI_RESPONSES.portfolio.length)];
  }
  if (message.match(/\b(skill|tech|stack|language|know|use|expertise|experience)\b/)) {
    return AI_RESPONSES.skills[Math.floor(Math.random() * AI_RESPONSES.skills.length)];
  }
  if (message.match(/\b(contact|email|reach|hire|touch|call|phone|linkedin|github)\b/)) {
    return AI_RESPONSES.contact[Math.floor(Math.random() * AI_RESPONSES.contact.length)];
  }

  return AI_RESPONSES.default[Math.floor(Math.random() * AI_RESPONSES.default.length)];
}

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

    const { message, sessionId } = await request.json();
    const sanitizedMessage = sanitizeInput(message || '');
    const validation = validateChatMessage(sanitizedMessage);

    if (!validation.valid) {
      return NextResponse.json({ error: 'Validation failed', errors: validation.errors }, { status: 400 });
    }

    let activeSessionId = sessionId;
    if (!activeSessionId) {
      activeSessionId = `session-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      await ChatRepository.createSession(activeSessionId, clientId);
    } else {
      const existingSession = await ChatRepository.getSession(activeSessionId);
      if (!existingSession) await ChatRepository.createSession(activeSessionId, clientId);
    }

    await ChatRepository.addMessage(activeSessionId, 'user', sanitizedMessage);

    let aiResponse: string;
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
                content: `You are the professional AI assistant for ${defaultConfig.personalInfo.name}'s portfolio website. 
                Owner Info: ${defaultConfig.personalInfo.title}, located in ${defaultConfig.personalInfo.location}.
                Bio: ${defaultConfig.personalInfo.bio}.
                Skills: Backend (Node.js, Python), AI, Cloud, Full-stack.
                Contact: ${defaultConfig.personalInfo.email}.
                Instructions: Be highly professional, concise, and helpful. Focus on the portfolio details.`,
              },
              { role: 'user', content: sanitizedMessage },
            ],
            max_tokens: 200,
            temperature: 0.7,
          }),
        });

        if (openaiResponse.ok) {
          const data = await openaiResponse.json();
          aiResponse = data.choices[0]?.message?.content || generateAIResponse(sanitizedMessage);
        } else {
          aiResponse = generateAIResponse(sanitizedMessage);
        }
      } catch (error) {
        logger.error('OpenAI API error', error);
        aiResponse = generateAIResponse(sanitizedMessage);
      }
    } else {
      aiResponse = generateAIResponse(sanitizedMessage);
    }

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
