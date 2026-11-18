/**
 * Simple case-insensitive glob matcher supporting '*' wildcard.
 */
export function matchGlob(pattern: string, s: string): boolean {
  // Escape regex special characters except '*'
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  // Replace '*' with '.*'
  const regexStr = '^' + escaped.replace(/\*/g, '.*') + '$';
  const regex = new RegExp(regexStr, 'i');
  return regex.test(s);
}

/**
 * Checks if a string matches any of the given glob patterns.
 */
export function matchAnyGlob(patterns: string[], s: string): boolean {
  return patterns.some((pattern) => matchGlob(pattern, s));
}
