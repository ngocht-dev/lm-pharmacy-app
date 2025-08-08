/**
 * Formats a number as Vietnamese Dong (VND) currency
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "17.500₫")
 */
export const formatVND = (amount: number | string): string => {
  const numericAmount =
    typeof amount === 'string'
      ? parseFloat(amount.replace(/[^\d.-]/g, ''))
      : amount;

  if (isNaN(numericAmount)) {
    return '0₫';
  }

  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericAmount);
};

/**
 * Formats a number as Vietnamese Dong (VND) currency without the ₫ symbol
 * @param amount - The amount to format
 * @returns Formatted currency string without symbol (e.g., "17.500")
 */
export const formatVNDWithoutSymbol = (amount: number | string): string => {
  const numericAmount =
    typeof amount === 'string'
      ? parseFloat(amount.replace(/[^\d.-]/g, ''))
      : amount;

  if (isNaN(numericAmount)) {
    return '0';
  }

  return new Intl.NumberFormat('vi-VN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericAmount);
};

/**
 * Extracts numeric value from a currency string
 * @param currencyString - The currency string to parse
 * @returns Numeric value
 */
export const parseCurrencyValue = (currencyString: string): number => {
  return parseFloat(currencyString.replace(/[^\d.-]/g, '')) || 0;
};
