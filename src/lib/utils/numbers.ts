/**
 * تبدیل اعداد انگلیسی به فارسی
 */
export function toPersianDigits(str: string | number): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(str).replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
}

/**
 * تبدیل اعداد فارسی به انگلیسی
 */
export function toEnglishDigits(str: string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  
  let result = str;
  
  persianDigits.forEach((digit, index) => {
    result = result.replace(new RegExp(digit, 'g'), String(index));
  });
  
  arabicDigits.forEach((digit, index) => {
    result = result.replace(new RegExp(digit, 'g'), String(index));
  });
  
  return result;
}
