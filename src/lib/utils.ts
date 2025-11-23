import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toPersianDigits } from './utils/numbers';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency - قیمت‌ها به تومان
export function formatCurrency(
  amount: number,
  locale: string = 'fa-IR',
  currency: string = 'IRR'
): string {
  // برای سایت فارسی، قیمت‌ها به تومان نمایش داده می‌شوند
  const displayAmount = locale === 'fa-IR' || locale === 'fa' ? amount : amount;
  
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(displayAmount);
  
  // اگر فارسی است، اعداد را فارسی کنیم
  if (locale === 'fa-IR' || locale === 'fa') {
    return toPersianDigits(formatted);
  }
  
  return formatted;
}

// Format number - اعداد فارسی
export function formatNumber(
  value: number,
  locale: string = 'fa-IR'
): string {
  const formatted = new Intl.NumberFormat('en-US').format(value);
  
  // اگر فارسی است، اعداد را فارسی کنیم
  if (locale === 'fa-IR' || locale === 'fa') {
    return toPersianDigits(formatted);
  }
  
  return formatted;
}

// Format date
export function formatDate(
  date: Date | string,
  locale: string = 'fa-IR',
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

// Truncate text
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Generate slug
export function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Calculate discount percentage
export function calculateDiscountPercentage(
  originalPrice: number,
  salePrice: number
): number {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone (Iranian phone numbers)
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+98|0)?9\d{9}$/;
  return phoneRegex.test(phone);
}

// Get initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Sleep utility for delays
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Get random items from array
export function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Deep clone object
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// Check if string is RTL
export function isRTL(locale: string): boolean {
  return ['fa', 'ar'].includes(locale);
}

// Convert English numbers to Persian
// @deprecated - استفاده از toPersianDigits از './utils/numbers' را توصیه می‌کنیم
export function toPersianNumber(num: number | string): string {
  return toPersianDigits(num.toString());
}

// Convert Persian numbers to English
// @deprecated - استفاده از toEnglishDigits از './utils/numbers' را توصیه می‌کنیم
export function toEnglishNumber(str: string): string {
  const { toEnglishDigits } = require('./utils/numbers');
  return toEnglishDigits(str);
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
