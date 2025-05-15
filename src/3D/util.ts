/**
 * Precision to retain in factoredInteger()
 */
const FACTOR: number = 2;

/**
 * Factor a number by FACTOR and round to the nearest whole number
 */
export const factoredInteger = (value: number): number =>
  Math.round(value * 10 ** FACTOR);

/**
 * Convert internal value back to original scale
 * Note: This function maintains the same unit as the input
 */
export const unfactorInteger = (value: number): number => value / 10 ** FACTOR;
