'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Settings,
  LogOut,
  UserCircle,
  Bell,
  Lock,
  HelpCircle,
  Shield,
  Activity,
  Crown,
  ChevronRight
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

export default function ProfileDropdown({ isOpen, onClose, locale }: ProfileDropdownProps) {
  const user = {
    name: 'مدیر سیستم',
    email: 'admin@belook.com',
    role: 'SUPER_ADMIN',
    avatar: null,
    joinedDate: '۱۴۰۲/۰۵/۱۵'
  };

  const menuSections = [
    {
      title: 'حساب کاربری',
      items: [
        {
          icon: UserCircle,
          label: 'پروفایل من',
          href: `/${locale}/admin/profile`,
          badge: null,
          description: 'مشاهده و ویرایش اطلاعات شخصی'
        },
        {
          icon: Settings,
          label: 'تنظیمات',
          href: `/${locale}/admin/settings`,
          badge: null,
          description: 'تنظیمات عمومی پنل'
        },
        {
          icon: Activity,
          label: 'فعالیت‌های من',
          href: `/${locale}/admin/activity`,
          badge: null,
          description: 'تاریخچه فعالیت‌ها'
        },
      ]
    },
    {
      title: 'تنظیمات پیشرفته',
      items: [
        {
          icon: Bell,
          label: 'اعلانات',
          href: `/${locale}/admin/notifications`,
          badge: '۳',
          description: 'مدیریت اعلانات'
        },
        {
          icon: Lock,
          label: 'امنیت و رمز عبور',
          href: `/${locale}/admin/security`,
          badge: null,
          description: 'تنظیمات امنیتی'
        },
      ]
    },
    {
      title: 'آموزش',
      items: [
        {
          icon: HelpCircle,
          label: 'آموزش کار با پنل مدیریت',
          href: `/${locale}/admin/tutorial`,
          badge: 'جدید',
          description: 'راهنمای گام به گام استفاده از پنل'
        },
      ]
    }
  ];

  const handleSignOut = async () => {
    await signOut({ callbackUrl: `/${locale}/auth/login` });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Dropdown Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-16 md:top-[4.5rem] right-4 md:right-auto md:left-4 lg:left-8 w-[calc(100%-2rem)] md:w-80 z-50"
          >
            <div className="bg-background border shadow-2xl rounded-2xl overflow-hidden">
              {/* User Info Header */}
              <div className="relative px-6 py-6 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                <div className="relative flex items-start gap-4">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {user.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-background rounded-full" />
                  </div>

                  {/* User Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg mb-0.5 truncate">{user.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2 truncate">{user.email}</p>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                      <Crown className="w-3 h-3 me-1" />
                      مدیر کل
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Menu Sections */}
              <div className="py-2 max-h-[60vh] overflow-y-auto">
                {menuSections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className={cn(sectionIndex > 0 && "border-t")}>
                    <div className="px-4 py-2">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {section.title}
                      </h4>
                    </div>
                    <div className="px-2">
                      {section.items.map((item, itemIndex) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={itemIndex}
                            href={item.href}
                            onClick={onClose}
                            className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-secondary transition-colors group"
                            title={(item as any).description}
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className="p-2 rounded-lg bg-secondary group-hover:bg-background transition-colors shrink-0">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm">{item.label}</div>
                                {(item as any).description && (
                                  <div className="text-xs text-muted-foreground truncate">
                                    {(item as any).description}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {item.badge && (
                                <Badge variant="secondary" className="h-5 px-2 text-xs">
                                  {item.badge}
                                </Badge>
                              )}
                              <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer - Logout */}
              <div className="px-4 py-3 border-t bg-muted/30">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>خروج از حساب</span>
                </button>
              </div>

              {/* Small Footer Info */}
              <div className="px-6 py-3 bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground">
                  عضو از {user.joinedDate}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
