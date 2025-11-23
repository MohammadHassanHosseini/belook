'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BreadcrumbsProps {
  locale: string;
}

export default function Breadcrumbs({ locale }: BreadcrumbsProps) {
  const pathname = usePathname();

  const pathSegments = pathname.split('/').filter(segment => segment && segment !== locale && segment !== 'admin');

  const routeNames: Record<string, string> = {
    'products': 'محصولات',
    'orders': 'سفارشات',
    'users': 'کاربران',
    'categories': 'دسته‌بندی‌ها',
    'brands': 'برندها',
    'reviews': 'نظرات',
    'coupons': 'کدهای تخفیف',
    'newsletter': 'خبرنامه',
    'reports': 'گزارش‌ها',
    'settings': 'تنظیمات',
    'profile': 'پروفایل من',
    'activity': 'فعالیت‌های من',
    'notifications': 'اعلانات',
    'appearance': 'ظاهر و تم',
    'security': 'امنیت و رمز عبور',
    'tutorial': 'آموزش کار با پنل',
    'chat': 'چت و پشتیبانی',
    'new': 'جدید',
    'edit': 'ویرایش',
    'add': 'افزودن',
    'create': 'ایجاد',
    'delete': 'حذف',
    'view': 'مشاهده',
    'list': 'لیست',
    'dashboard': 'داشبورد',
  };

  // If we're on the main admin page
  if (pathSegments.length === 0) {
    return (
      <nav className="flex items-center gap-2 text-sm mb-6">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary"
        >
          <Home className="w-4 h-4" />
          <span className="font-semibold">داشبورد</span>
        </motion.div>
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-2 text-sm mb-6 overflow-x-auto pb-2">
      {/* Home Link */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link
          href={`/${locale}/admin`}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">داشبورد</span>
        </Link>
      </motion.div>

      {/* Path Segments */}
      {pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;
        const href = `/${locale}/admin/${pathSegments.slice(0, index + 1).join('/')}`;
        const label = routeNames[segment] || segment;

        return (
          <React.Fragment key={segment}>
            <ChevronLeft className="w-4 h-4 text-muted-foreground shrink-0" />
            
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (index + 1) * 0.05 }}
            >
              {isLast ? (
                <div className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg font-semibold whitespace-nowrap",
                  "bg-primary/10 text-primary"
                )}>
                  {label}
                </div>
              ) : (
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors whitespace-nowrap",
                    "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {label}
                </Link>
              )}
            </motion.div>
          </React.Fragment>
        );
      })}
    </nav>
  );
}
