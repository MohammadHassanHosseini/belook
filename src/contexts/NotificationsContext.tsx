'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  ShoppingCart,
  Package,
  Users,
  MessageSquare,
  AlertCircle,
  TrendingUp,
  X,
  CheckCircle,
} from 'lucide-react';

export interface Notification {
  id: string;
  type: 'order' | 'product' | 'user' | 'review' | 'alert' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: any;
  color: string;
  bgColor: string;
}

interface NotificationsContextType {
  notifications: Notification[];
  markAsRead: (id: string) => void;
  markAsUnread: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
  unreadCount: number;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'order',
    title: 'سفارش جدید',
    message: 'سفارش #۱۲۳۴۵ با مبلغ ۲۵۰,۰۰۰ تومان ثبت شد. مشتری: زهرا احمدی',
    time: '۲ دقیقه پیش',
    read: false,
    icon: ShoppingCart,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950'
  },
  {
    id: '2',
    type: 'product',
    title: 'موجودی کم',
    message: 'محصول "سرم ویتامین C" کمتر از ۱۰ عدد موجودی دارد. لطفاً سفارش جدید ثبت کنید.',
    time: '۱۵ دقیقه پیش',
    read: false,
    icon: Package,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-950'
  },
  {
    id: '3',
    type: 'user',
    title: 'کاربر جدید',
    message: 'علی رضایی ثبت‌نام کرد و پروفایل خود را تکمیل نمود.',
    time: '۳۰ دقیقه پیش',
    read: false,
    icon: Users,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-950'
  },
  {
    id: '4',
    type: 'review',
    title: 'نظر جدید',
    message: 'محمد حسینی نظری برای "کرم مرطوب‌کننده" ثبت کرد. امتیاز: ۵ ستاره',
    time: '۱ ساعت پیش',
    read: true,
    icon: MessageSquare,
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-950'
  },
  {
    id: '5',
    type: 'alert',
    title: 'هشدار امنیتی',
    message: 'تلاش ناموفق برای ورود به پنل مدیریت از IP: 192.168.1.100',
    time: '۲ ساعت پیش',
    read: true,
    icon: AlertCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-950'
  },
  {
    id: '6',
    type: 'system',
    title: 'فروش بالا',
    message: 'امروز ۴۵ سفارش جدید ثبت شد (+۲۵٪ نسبت به دیروز)',
    time: '۳ ساعت پیش',
    read: true,
    icon: TrendingUp,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950'
  },
  {
    id: '7',
    type: 'order',
    title: 'سفارش لغو شد',
    message: 'سفارش #۱۲۳۴۰ توسط مشتری لغو شد. دلیل: تغییر نظر',
    time: '۵ ساعت پیش',
    read: true,
    icon: X,
    color: 'text-gray-500',
    bgColor: 'bg-gray-50 dark:bg-gray-900'
  },
  {
    id: '8',
    type: 'product',
    title: 'محصول جدید',
    message: 'محصول "ماسک صورت هیدراته" با موفقیت به فروشگاه اضافه شد.',
    time: '۱ روز پیش',
    read: true,
    icon: CheckCircle,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950'
  },
];

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('belook_notifications');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Re-assign icons (they can't be stored in JSON)
        const withIcons = parsed.map((n: Notification) => ({
          ...n,
          icon: getIconByType(n.type)
        }));
        setNotifications(withIcons);
      } catch (error) {
        console.error('Error loading notifications:', error);
        setNotifications(initialNotifications);
      }
    } else {
      setNotifications(initialNotifications);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (notifications.length > 0) {
      // Remove icons before storing (they can't be serialized)
      const toStore = notifications.map(({ icon, ...rest }) => rest);
      localStorage.setItem('belook_notifications', JSON.stringify(toStore));
    }
  }, [notifications]);

  const getIconByType = (type: string) => {
    const iconMap: Record<string, any> = {
      order: ShoppingCart,
      product: Package,
      user: Users,
      review: MessageSquare,
      alert: AlertCircle,
      system: TrendingUp,
    };
    return iconMap[type] || AlertCircle;
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAsUnread = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: false } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.removeItem('belook_notifications');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        markAsRead,
        markAsUnread,
        markAllAsRead,
        deleteNotification,
        clearAll,
        unreadCount,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
}
