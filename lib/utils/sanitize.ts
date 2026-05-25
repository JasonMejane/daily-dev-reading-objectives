import DOMPurify from 'isomorphic-dompurify';

export function sanitizeString(value: string): string {
  return DOMPurify.sanitize(value.trim());
}

export function checkUserId(userId: string): string {
  const sanitized = sanitizeString(userId);

  if (!/^[a-zA-Z0-9_-]+$/.test(sanitized)) {
    throw new Error('Invalid user ID format');
  }

  if (sanitized.length < 3 || sanitized.length > 64) {
    throw new Error('User ID must be between 3 and 64 characters long');
  }

  return sanitized;
}
