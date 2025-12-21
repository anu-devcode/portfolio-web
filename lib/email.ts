// Email service abstraction
// Supports multiple providers: SendGrid, Resend, Nodemailer, etc.

export interface EmailData {
  to: string;
  from: string;
  subject: string;
  html: string;
  text?: string;
}

export interface EmailService {
  send(data: EmailData): Promise<{ success: boolean; messageId?: string; error?: string }>;
}

// Console email service (for development)
export class ConsoleEmailService implements EmailService {
  async send(data: EmailData): Promise<{ success: boolean; messageId?: string; error?: string }> {
    console.log('📧 Email would be sent:');
    console.log('To:', data.to);
    console.log('From:', data.from);
    console.log('Subject:', data.subject);
    console.log('Body:', data.text || data.html);
    
    return {
      success: true,
      messageId: `console-${Date.now()}`,
    };
  }
}

// SendGrid email service
export class SendGridEmailService implements EmailService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async send(data: EmailData): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: data.to }] }],
          from: { email: data.from },
          subject: data.subject,
          content: [
            { type: 'text/plain', value: data.text || data.html },
            { type: 'text/html', value: data.html },
          ],
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        return { success: false, error };
      }

      const messageId = response.headers.get('x-message-id');
      return { success: true, messageId: messageId || undefined };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

// Resend email service
export class ResendEmailService implements EmailService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async send(data: EmailData): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: data.from,
          to: data.to,
          subject: data.subject,
          html: data.html,
          text: data.text,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        return { success: false, error: JSON.stringify(error) };
      }

      const result = await response.json();
      return { success: true, messageId: result.id };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

// Factory function to get the appropriate email service
export function getEmailService(): EmailService {
  // Check for SendGrid
  if (process.env.SENDGRID_API_KEY) {
    return new SendGridEmailService(process.env.SENDGRID_API_KEY);
  }

  // Check for Resend
  if (process.env.RESEND_API_KEY) {
    return new ResendEmailService(process.env.RESEND_API_KEY);
  }

  // Default to console (development)
  return new ConsoleEmailService();
}

// Helper to format contact form email
export function formatContactEmail(data: {
  name: string;
  email: string;
  message: string;
  config: {
    name: string;
    email: string;
  };
}): EmailData {
  return {
    to: data.config.email,
    from: process.env.EMAIL_FROM || `noreply@${process.env.NEXT_PUBLIC_SITE_URL?.replace('https://', '') || 'portfolio.com'}`,
    subject: `New Contact Form Submission from ${data.name}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #00f0ff 0%, #0066ff 50%, #8b5cf6 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #0066ff; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 3px solid #00f0ff; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${data.name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${data.email}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from your portfolio contact form.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}

Message:
${data.message}
    `,
  };
}

