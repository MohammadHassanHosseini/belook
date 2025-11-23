'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FolderTree,
  Tag,
  MessageSquare,
  Settings,
  Ticket,
  Mail,
  BarChart3,
  MessageCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  locale: string;
  isMobile?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ locale, isMobile = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'داشبورد',
      icon: LayoutDashboard,
      href: `/${locale}/admin`,
    },
    {
      title: 'محصولات',
      icon: Package,
      href: `/${locale}/admin/products`,
    },
    {
      title: 'سفارشات',
      icon: ShoppingCart,
      href: `/${locale}/admin/orders`,
    },
    {
      title: 'کاربران',
      icon: Users,
      href: `/${locale}/admin/users`,
    },
    {
      title: 'دسته‌بندی‌ها',
      icon: FolderTree,
      href: `/${locale}/admin/categories`,
    },
    {
      title: 'برندها',
      icon: Tag,
      href: `/${locale}/admin/brands`,
    },
    {
      title: 'نظرات',
      icon: MessageSquare,
      href: `/${locale}/admin/reviews`,
    },
    {
      title: 'چت و پشتیبانی',
      icon: MessageCircle,
      href: `/${locale}/admin/chat`,
    },
    {
      title: 'کدهای تخفیف',
      icon: Ticket,
      href: `/${locale}/admin/coupons`,
    },
    {
      title: 'خبرنامه',
      icon: Mail,
      href: `/${locale}/admin/newsletter`,
    },
    {
      title: 'گزارش‌ها',
      icon: BarChart3,
      href: `/${locale}/admin/reports`,
    },
    {
      title: 'تنظیمات',
      icon: Settings,
      href: `/${locale}/admin/settings`,
    },
  ];

  const handleClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <aside className={cn(
      "bg-card p-4",
      !isMobile && "hidden lg:block lg:w-64 border-e min-h-screen sticky top-0",
      isMobile && "w-full"
    )}>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-primary">پنل مدیریت</h2>
        <p className="text-sm text-muted-foreground mt-1">فروشگاه بی لوک</p>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleClick}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-md'
                  : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
