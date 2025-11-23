'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Bell, 
  Mail, 
  Smartphone, 
  CheckCircle, 
  Save,
  ShoppingCart,
  Package,
  Users,
  MessageSquare,
  AlertCircle,
  TrendingUp,
  Check,
  Trash2,
  CheckCheck,
  X,
  Search,
  Filter,
  Clock,
  Settings as SettingsIcon,
  Archive
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useNotifications } from '@/contexts/NotificationsContext';

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<'notifications' | 'settings'>('notifications');
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'read'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { 
    notifications, 
    markAsRead: contextMarkAsRead, 
    markAsUnread: contextMarkAsUnread,
    markAllAsRead: contextMarkAllAsRead, 
    deleteNotification: contextDeleteNotification, 
    clearAll: contextClearAll,
    unreadCount 
  } = useNotifications();

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    orderNotifications: true,
    productNotifications: true,
    userNotifications: true,
    reviewNotifications: true,
    systemNotifications: true,
  });

  // Functions with toast notifications
  const markAsRead = (id: string) => {
    contextMarkAsRead(id);
    toast.success('علامت‌گذاری به عنوان خوانده شده');
  };

  const markAsUnread = (id: string) => {
    contextMarkAsUnread(id);
    toast.success('علامت‌گذاری به عنوان خوانده نشده');
  };

  const markAllAsRead = () => {
    contextMarkAllAsRead();
    toast.success('تمام اعلانات به عنوان خوانده شده علامت‌گذاری شدند');
  };

  const deleteNotification = (id: string) => {
    contextDeleteNotification(id);
    toast.success('اعلان حذف شد');
  };

  const clearAll = () => {
    contextClearAll();
    toast.success('تمام اعلانات پاک شدند');
  };

  const handleSave = () => {
    toast.success('تنظیمات اعلانات ذخیره شد');
  };

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Filtered notifications
  const filteredNotifications = useMemo(() => {
    let filtered = notifications;

    // Filter by read/unread
    if (filterType === 'unread') {
      filtered = filtered.filter(n => !n.read);
    } else if (filterType === 'read') {
      filtered = filtered.filter(n => n.read);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(query) ||
        n.message.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [notifications, filterType, searchQuery]);

  const stats = {
    total: notifications.length,
    unread: unreadCount,
    read: notifications.length - unreadCount,
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-0 shadow-2xl overflow-hidden">
          <div className="relative h-40 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="relative h-full flex items-center px-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                  <Bell className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-black text-white">مدیریت اعلانات</h1>
                    {unreadCount > 0 && (
                      <Badge className="bg-white text-purple-600 font-bold">
                        {unreadCount} خوانده نشده
                      </Badge>
                    )}
                  </div>
                  <p className="text-white/90">
                    مدیریت و پیگیری اعلانات و رویدادهای سیستم
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-500">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-black">{stats.total}</div>
                <div className="text-sm text-muted-foreground">کل اعلانات</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950 flex items-center justify-center text-orange-500">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-black">{stats.unread}</div>
                <div className="text-sm text-muted-foreground">خوانده نشده</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-950 flex items-center justify-center text-green-500">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-black">{stats.read}</div>
                <div className="text-sm text-muted-foreground">خوانده شده</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b">
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'notifications' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('notifications')}
              className="gap-2"
            >
              <Bell className="w-4 h-4" />
              اعلانات
            </Button>
            <Button
              variant={activeTab === 'settings' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('settings')}
              className="gap-2"
            >
              <SettingsIcon className="w-4 h-4" />
              تنظیمات
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'notifications' ? (
          <motion.div
            key="notifications"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Toolbar */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="جستجو در اعلانات..."
                      className="pr-10"
                    />
                  </div>

                  {/* Filters */}
                  <div className="flex gap-2">
                    <Button
                      variant={filterType === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterType('all')}
                    >
                      همه
                    </Button>
                    <Button
                      variant={filterType === 'unread' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterType('unread')}
                      className="gap-1"
                    >
                      خوانده نشده
                      {stats.unread > 0 && (
                        <Badge variant="secondary" className="ml-1">{stats.unread}</Badge>
                      )}
                    </Button>
                    <Button
                      variant={filterType === 'read' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterType('read')}
                    >
                      خوانده شده
                    </Button>
                  </div>

                  {/* Actions */}
                  {unreadCount > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={markAllAsRead}
                      className="gap-2"
                    >
                      <CheckCheck className="w-4 h-4" />
                      خواندن همه
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Notifications List */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-0">
                {filteredNotifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                    <Bell className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-lg font-semibold">اعلانی وجود ندارد</p>
                    <p className="text-sm mt-1">همه اعلانات شما اینجا نمایش داده می‌شود</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredNotifications.map((notification, index) => {
                      const Icon = notification.icon;
                      
                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                          className={cn(
                            "group relative p-6 hover:bg-secondary/50 transition-colors",
                            !notification.read && "bg-primary/5"
                          )}
                        >
                          <div className="flex gap-4">
                            {/* Icon */}
                            <div className={cn(
                              "shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center",
                              notification.bgColor
                            )}>
                              <Icon className={cn("w-6 h-6", notification.color)} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h4 className={cn(
                                  "font-bold text-base",
                                  !notification.read && "text-primary"
                                )}>
                                  {notification.title}
                                </h4>
                                {!notification.read && (
                                  <div className="w-2.5 h-2.5 bg-primary rounded-full shrink-0 mt-1.5" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="w-3.5 h-3.5" />
                                {notification.time}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                              {notification.read ? (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => markAsUnread(notification.id)}
                                  className="h-9 w-9"
                                  title="علامت به عنوان خوانده نشده"
                                >
                                  <Bell className="w-4 h-4" />
                                </Button>
                              ) : (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => markAsRead(notification.id)}
                                  className="h-9 w-9"
                                  title="علامت به عنوان خوانده شده"
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteNotification(notification.id)}
                                className="h-9 w-9 text-red-500 hover:text-red-600 hover:bg-red-50"
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

                {/* Clear All Button */}
                {notifications.length > 0 && (
                  <div className="p-4 border-t">
                    <Button
                      variant="ghost"
                      onClick={clearAll}
                      className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      پاک کردن همه اعلانات
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Notification Types */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>انواع اعلانات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'orderNotifications', label: 'اعلانات سفارشات', icon: ShoppingCart, color: 'text-blue-500' },
                  { key: 'productNotifications', label: 'اعلانات محصولات', icon: Package, color: 'text-orange-500' },
                  { key: 'userNotifications', label: 'اعلانات کاربران', icon: Users, color: 'text-purple-500' },
                  { key: 'reviewNotifications', label: 'اعلانات نظرات', icon: MessageSquare, color: 'text-green-500' },
                  { key: 'systemNotifications', label: 'اعلانات سیستم', icon: AlertCircle, color: 'text-red-500' },
                ].map((item) => {
                  const Icon = item.icon;
                  const key = item.key as keyof typeof settings;
                  return (
                    <div
                      key={item.key}
                      onClick={() => toggleSetting(key)}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={cn("w-5 h-5", item.color)} />
                        <div className="font-semibold">{item.label}</div>
                      </div>
                      <div className={`w-12 h-6 rounded-full transition-colors ${settings[key] ? 'bg-green-500' : 'bg-gray-300'} relative`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings[key] ? 'right-1' : 'right-7'}`} />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Delivery Methods */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>روش‌های دریافت</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'emailNotifications', label: 'ایمیل', description: 'دریافت اعلانات از طریق ایمیل', icon: Mail, color: 'text-blue-500' },
                  { key: 'pushNotifications', label: 'اعلانات Push', description: 'دریافت اعلانات فوری در مرورگر', icon: Bell, color: 'text-purple-500' },
                  { key: 'smsNotifications', label: 'پیامک', description: 'دریافت پیامک برای رویدادهای مهم', icon: Smartphone, color: 'text-green-500' },
                ].map((item) => {
                  const Icon = item.icon;
                  const key = item.key as keyof typeof settings;
                  return (
                    <div
                      key={item.key}
                      onClick={() => toggleSetting(key)}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn("w-10 h-10 rounded-xl bg-secondary flex items-center justify-center", item.color)}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold">{item.label}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </div>
                      </div>
                      <div className={`w-12 h-6 rounded-full transition-colors ${settings[key] ? 'bg-green-500' : 'bg-gray-300'} relative`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings[key] ? 'right-1' : 'right-7'}`} />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Save Button */}
            <Button onClick={handleSave} className="w-full gap-2" size="lg">
              <Save className="w-5 h-5" />
              ذخیره تنظیمات
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
