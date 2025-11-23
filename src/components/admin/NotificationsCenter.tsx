'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  X, 
  Check, 
  Trash2,
  CheckCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/contexts/NotificationsContext';
import { toast } from 'react-hot-toast';

interface NotificationsCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsCenter({ isOpen, onClose }: NotificationsCenterProps) {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification, 
    clearAll,
    unreadCount 
  } = useNotifications();

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
    toast.success('علامت‌گذاری به عنوان خوانده شده');
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    toast.success('تمام اعلانات به عنوان خوانده شده علامت‌گذاری شدند');
  };

  const handleDelete = (id: string) => {
    deleteNotification(id);
    toast.success('اعلان حذف شد');
  };

  const handleClearAll = () => {
    clearAll();
    toast.success('تمام اعلانات پاک شدند');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Notifications Panel */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-16 md:top-[4.5rem] right-4 md:right-auto md:left-20 lg:left-24 w-[calc(100%-2rem)] md:w-96 z-50"
          >
            <div className="bg-background border shadow-2xl rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-primary/5 to-purple-500/5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                      >
                        <span className="text-[10px] text-white font-bold">
                          {unreadCount}
                        </span>
                      </motion.div>
                    )}
                  </div>
                  <h3 className="font-bold text-lg">اعلانات</h3>
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleMarkAllAsRead}
                      className="h-8 px-3 text-xs"
                    >
                      <CheckCheck className="w-3.5 h-3.5 me-1" />
                      خواندن همه
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="h-8 w-8"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                    <Bell className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-lg font-medium">اعلانی وجود ندارد</p>
                    <p className="text-sm mt-1">همه اعلانات شما اینجا نمایش داده می‌شود</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {notifications.map((notification, index) => {
                      const Icon = notification.icon || Bell;
                      
                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={cn(
                            "group relative px-6 py-4 hover:bg-secondary/50 transition-colors",
                            !notification.read && "bg-primary/5"
                          )}
                        >
                          <div className="flex gap-4">
                            {/* Icon */}
                            <div className={cn(
                              "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
                              notification.read ? "bg-secondary" : "bg-primary/10"
                            )}>
                              <Icon className={cn("w-5 h-5", notification.color)} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className={cn(
                                  "font-semibold text-sm",
                                  !notification.read && "text-primary"
                                )}>
                                  {notification.title}
                                </h4>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-primary rounded-full shrink-0" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                {notification.message}
                              </p>
                              <span className="text-xs text-muted-foreground">
                                {notification.time}
                              </span>
                            </div>

                            {/* Actions */}
                            <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                  className="h-8 w-8"
                                  title="علامت به عنوان خوانده شده"
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(notification.id)}
                                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                title="حذف"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="px-6 py-3 border-t bg-muted/30">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearAll}
                    className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 me-2" />
                    پاک کردن همه
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
