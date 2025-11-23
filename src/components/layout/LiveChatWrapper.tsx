'use client';

import { usePathname } from 'next/navigation';
import LiveChat from './LiveChat';

export default function LiveChatWrapper() {
  const pathname = usePathname();
  
  // صفحاتی که نباید LiveChat داشته باشند
  const excludedPaths = [
    '/checkout',
    '/checkout/payment',
    '/checkout/complete',
    '/admin',
  ];
  
  // بررسی اینکه آیا در صفحه مستثنی شده هستیم
  const shouldHideChat = excludedPaths.some(path => pathname.includes(path));
  
  // اگر در صفحه checkout هستیم، چت را نمایش نده
  if (shouldHideChat) {
    return null;
  }
  
  return <LiveChat />;
}
