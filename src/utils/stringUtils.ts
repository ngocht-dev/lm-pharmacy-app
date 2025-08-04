/**
 * Safely converts any value to a string, handling null, undefined, and other types
 * @param value - The value to convert to string
 * @returns A string representation of the value, or empty string if conversion fails
 */
export const safeText = (value: any): string => {
  try {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    if (typeof value === 'boolean') return value.toString();
    return String(value);
  } catch (error) {
    console.warn('Error converting value to string:', value, error);
    return '';
  }
};
