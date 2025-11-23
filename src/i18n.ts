// Supported locales
export const locales = ['fa', 'ar', 'en'] as const;
export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = 'fa';

// RTL locales
export const rtlLocales: Locale[] = ['fa', 'ar'];
