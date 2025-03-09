import { fallbackLng, languages } from '@/app/i18n/settings';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Rounds a numeric value to the given number of decimals.
 * e.g. roundNumber(1.23456, 2) -> 1.23
 * @param value The numeric value to round
 * @param decimals How many decimal places to keep (default: 2)
 * @returns The rounded number
 */
export function roundNumber(value: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/**
 * Returns the language from the given params, or the fallback language if the given language is not supported.
 * @param params The parameters object
 * @param params.lng The language to check
 * @returns The language to use
 */
export async function getLngFromParams(params: { lng: string }): Promise<string> {
  let { lng } = await params;
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  return lng;
}

/**
 * Shortens the given ID to a maximum of 6 characters.
 * @param id The ID to shorten
 * @returns The shortened ID
 */
export const shortId = (id: string) => {
  if (typeof id !== 'string' || !id) return '';
  if (id.length <= 6) return id;
  return `${id.slice(0, 3)}...${id.slice(-3)}`;
};
