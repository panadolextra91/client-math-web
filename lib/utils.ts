/**
 * Validates player name according to server requirements
 * - Trim whitespace
 * - Max 64 characters
 * - Only alphanumeric, spaces, hyphens, underscores
 */
export function validatePlayerName(name: string): {
  isValid: boolean;
  error?: string;
} {
  const trimmed = name.trim();
  
  if (!trimmed) {
    return { isValid: false, error: 'Player name is required' };
  }
  
  if (trimmed.length > 64) {
    return { isValid: false, error: 'Player name must be 64 characters or less' };
  }
  
  const pattern = /^[a-zA-Z0-9\s_-]+$/;
  if (!pattern.test(trimmed)) {
    return {
      isValid: false,
      error: 'Player name can only contain letters, numbers, spaces, hyphens, and underscores',
    };
  }
  
  return { isValid: true };
}

/**
 * Sanitizes player name (trims and normalizes)
 */
export function sanitizePlayerName(name: string): string {
  return name.trim();
}

/**
 * Validates numeric answer input
 */
export function validateNumericAnswer(answer: string): {
  isValid: boolean;
  error?: string;
  numericValue?: number;
} {
  const trimmed = answer.trim();
  
  if (!trimmed) {
    return { isValid: false, error: 'Answer is required' };
  }
  
  const numeric = Number(trimmed);
  if (isNaN(numeric) || !isFinite(numeric)) {
    return { isValid: false, error: 'Answer must be a valid number' };
  }
  
  return { isValid: true, numericValue: numeric };
}

/**
 * Formats time in milliseconds to readable string
 */
export function formatTime(ms: number): string {
  if (ms < 1000) {
    return `${ms}ms`;
  }
  const seconds = ms / 1000;
  if (seconds < 60) {
    return `${seconds.toFixed(1)}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
}

/**
 * Formats accuracy as percentage
 */
export function formatAccuracy(accuracy: number): string {
  return `${(accuracy * 100).toFixed(1)}%`;
}

/**
 * Formats large numbers with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * Class name utility for conditional classes
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}


