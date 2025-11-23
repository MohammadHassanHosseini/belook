'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Package, 
  ShoppingCart, 
  Users, 
  FolderTree, 
  Tag, 
  MessageSquare,
  Ticket,
  Mail,
  BarChart3,
  Settings,
  LayoutDashboard,
  Command,
  ArrowRight,
  Clock,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  icon: any;
  href: string;
  category: string;
  keywords: string[];
}

interface CommandPaletteProps {
  locale: string;
  onClose?: () => void;
}

export default function CommandPalette({ locale, onClose }: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const commands: CommandItem[] = useMemo(() => [
    {
      id: 'dashboard',
      title: 'داشبورد',
      description: 'صفحه اصلی پنل مدیریت',
      icon: LayoutDashboard,
      href: `/${locale}/admin`,
      category: 'صفحات',
      keywords: ['dashboard', 'home', 'main', 'داشبورد', 'خانه']
    },
    {
      id: 'products',
      title: 'محصولات',
      description: 'مدیریت محصولات فروشگاه',
      icon: Package,
      href: `/${locale}/admin/products`,
      category: 'صفحات',
      keywords: ['products', 'items', 'محصولات', 'کالا']
    },
    {
      id: 'orders',
      title: 'سفارشات',
      description: 'مشاهده و مدیریت سفارشات',
      icon: ShoppingCart,
      href: `/${locale}/admin/orders`,
      category: 'صفحات',
      keywords: ['orders', 'purchases', 'سفارشات', 'خرید']
    },
    {
      id: 'users',
      title: 'کاربران',
      description: 'مدیریت کاربران سیستم',
      icon: Users,
      href: `/${locale}/admin/users`,
      category: 'صفحات',
      keywords: ['users', 'customers', 'کاربران', 'مشتریان']
    },
    {
      id: 'categories',
      title: 'دسته‌بندی‌ها',
      description: 'مدیریت دسته‌بندی محصولات',
      icon: FolderTree,
      href: `/${locale}/admin/categories`,
      category: 'صفحات',
      keywords: ['categories', 'taxonomy', 'دسته‌بندی']
    },
    {
      id: 'brands',
      title: 'برندها',
      description: 'مدیریت برندهای محصولات',
      icon: Tag,
      href: `/${locale}/admin/brands`,
      category: 'صفحات',
      keywords: ['brands', 'manufacturers', 'برند']
    },
    {
      id: 'reviews',
      title: 'نظرات',
      description: 'مدیریت نظرات و بازخوردها',
      icon: MessageSquare,
      href: `/${locale}/admin/reviews`,
      category: 'صفحات',
      keywords: ['reviews', 'comments', 'feedback', 'نظرات', 'کامنت']
    },
    {
      id: 'coupons',
      title: 'کدهای تخفیف',
      description: 'مدیریت کدهای تخفیف و پیشنهادات',
      icon: Ticket,
      href: `/${locale}/admin/coupons`,
      category: 'صفحات',
      keywords: ['coupons', 'discounts', 'تخفیف', 'کوپن']
    },
    {
      id: 'newsletter',
      title: 'خبرنامه',
      description: 'مدیریت مشترکین خبرنامه',
      icon: Mail,
      href: `/${locale}/admin/newsletter`,
      category: 'صفحات',
      keywords: ['newsletter', 'email', 'subscribers', 'خبرنامه']
    },
    {
      id: 'reports',
      title: 'گزارش‌ها',
      description: 'مشاهده گزارش‌ها و آمار',
      icon: BarChart3,
      href: `/${locale}/admin/reports`,
      category: 'صفحات',
      keywords: ['reports', 'analytics', 'stats', 'گزارش', 'آمار']
    },
    {
      id: 'settings',
      title: 'تنظیمات',
      description: 'تنظیمات سیستم',
      icon: Settings,
      href: `/${locale}/admin/settings`,
      category: 'صفحات',
      keywords: ['settings', 'config', 'preferences', 'تنظیمات']
    },
  ], [locale]);

  const filteredCommands = useMemo(() => {
    if (!search) return commands;
    
    const searchLower = search.toLowerCase();
    return commands.filter(cmd => 
      cmd.title.toLowerCase().includes(searchLower) ||
      cmd.description?.toLowerCase().includes(searchLower) ||
      cmd.keywords.some(k => k.toLowerCase().includes(searchLower))
    );
  }, [search, commands]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close with Escape
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
        return;
      }

      // Navigation
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        );
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
      }
      
      // Execute command
      if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        e.preventDefault();
        executeCommand(filteredCommands[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filteredCommands, onClose]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const executeCommand = (command: CommandItem) => {
    router.push(command.href);
    setSearch('');
    onClose?.();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Command Palette */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl mx-4"
        >
          <div className="bg-background border shadow-2xl rounded-2xl overflow-hidden">
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-4 border-b">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="جستجو در پنل مدیریت..."
                className="flex-1 bg-transparent outline-none text-lg placeholder:text-muted-foreground"
                autoFocus
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted rounded">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>نتیجه‌ای یافت نشد</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredCommands.map((command, index) => {
                    const Icon = command.icon;
                    const isSelected = index === selectedIndex;

                    return (
                      <motion.button
                        key={command.id}
                        onClick={() => executeCommand(command)}
                        className={cn(
                          "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-right",
                          isSelected 
                            ? "bg-primary text-primary-foreground shadow-lg" 
                            : "hover:bg-secondary"
                        )}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={cn(
                          "p-2 rounded-lg",
                          isSelected ? "bg-primary-foreground/20" : "bg-secondary"
                        )}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold">{command.title}</div>
                          {command.description && (
                            <div className={cn(
                              "text-sm truncate",
                              isSelected ? "opacity-90" : "text-muted-foreground"
                            )}>
                              {command.description}
                            </div>
                          )}
                        </div>
                        <ArrowRight className={cn(
                          "w-4 h-4 shrink-0",
                          isSelected ? "opacity-100" : "opacity-0"
                        )} />
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/50 text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-background border rounded">↑↓</kbd>
                  <span>حرکت</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-background border rounded">Enter</kbd>
                  <span>انتخاب</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Command className="w-3 h-3" />
                <span>+K برای باز کردن</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
