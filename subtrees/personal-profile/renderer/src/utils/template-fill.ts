export function fillTemplate(template: string, data: Record<string, unknown>): string {
  return template.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match: string, key: string): string => {
    const parts = key.split('.');
    let value: unknown = data;
    for (const part of parts) {
      if (
        typeof value === 'object' &&
        value !== null &&
        Object.prototype.hasOwnProperty.call(value, part)
      ) {
        value = (value as Record<string, unknown>)[part];
      } else {
        return match;
      }
    }
    if (typeof value === 'number') {
      return Intl.NumberFormat('en-US').format(value);
    }
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'boolean') {
      return String(value);
    }
    return match;
  });
}
