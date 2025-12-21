export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateContactForm(data: {
  name: string;
  email: string;
  message: string;
}): ValidationResult {
  const errors: string[] = [];

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  if (data.name && data.name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }

  // Email validation
  if (!data.email || !validateEmail(data.email)) {
    errors.push('Please provide a valid email address');
  }

  // Message validation
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }
  if (data.message && data.message.length > 2000) {
    errors.push('Message must be less than 2000 characters');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 2000); // Limit length
}

export function validateChatMessage(message: string): ValidationResult {
  const errors: string[] = [];

  if (!message || message.trim().length < 1) {
    errors.push('Message cannot be empty');
  }
  if (message && message.length > 500) {
    errors.push('Message must be less than 500 characters');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

