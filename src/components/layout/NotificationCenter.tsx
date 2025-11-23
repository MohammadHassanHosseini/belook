'use client';

import { useState } from 'react';
import { Bell, Check, Trash2, ShoppingCart, Package, Star, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { toast } from 'react-hot-toast';

interface Notification {
  id: string;
  type: 'order' | 'review' | 'offer' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  link?: string;
}

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'order',
      title: 'سفارش ارسال شد',
      message: 'سفارش #12345 شما ارسال شد و به زودی تحویل می‌گیرید',
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
      link: '/orders/12345',
    },
    {
      id: '2',
      type: 'offer',
      title: 'تخفیف ویژه!',
      message: '20٪ تخفیف ویژه برای محصولات مراقبت پوست',
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      link: '/products/skincare',
    },
    {
      id: '3',
      type: 'review',
      title: 'نظر شما تأیید شد',
      message: 'نظر شما برای محصول "سرم ویتامین C" منتشر شد',
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
    {
      id: '4',
      type: 'system',
      title: 'محصولات جدید',
      message: 'محصولات جدید به فروشگاه اضافه شد',
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
      link: '/products/new',
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'review':
        return <Star className="h-5 w-5 text-yellow-500" />;
      case 'offer':
        return <Tag className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    toast.success('همه اعلان‌ها خوانده شد');
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success('اعلان حذف شد');
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast.success('همه اعلان‌ها حذف شدند');
  };

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 rtl:-left-1 rtl:right-auto h-5 w-5 flex items-center justify-center p-0 text-xs">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notifications Panel */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 rtl:right-0 rtl:left-auto mt-2 w-96 max-w-[calc(100vw-2rem)] z-50">
            <Card className="shadow-lg">
              {/* Header */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg">اعلان‌ها</h3>
                  {notifications.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearAll}
                    >
                      <Trash2 className="h-4 w-4 me-1" />
                      حذف همه
                    </Button>
                  )}
                </div>
                {unreadCount > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={handleMarkAllAsRead}
                  >
                    <Check className="h-4 w-4 me-2" />
                    خواندن همه
                  </Button>
                )}
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>اعلانی وجود ندارد</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b hover:bg-secondary/50 transition-colors ${
                        !notification.isRead ? 'bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getIcon(notification.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-semibold text-sm">
                              {notification.title}
                            </h4>
                            {!notification.isRead && (
                              <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {formatDate(notification.createdAt, 'fa-IR', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                            <div className="flex gap-1">
                              {!notification.isRead && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                  className="h-7 px-2"
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(notification.id)}
                                className="h-7 px-2"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-3 border-t text-center">
                  <Button variant="ghost" size="sm" className="w-full">
                    مشاهده همه اعلان‌ها
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
