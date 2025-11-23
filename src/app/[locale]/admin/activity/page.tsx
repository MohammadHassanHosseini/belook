'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import {
  Activity,
  Clock,
  Monitor,
  MapPin,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash,
  Plus,
  Eye,
  Download,
  Filter
} from 'lucide-react';
import { toPersianDigits } from '@/lib/utils/numbers';

export default function ActivityPage() {
  const [filter, setFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'login',
      action: 'ورود به سیستم',
      description: 'ورود موفق از طریق ایمیل',
      timestamp: '۱۴۰۳/۰۸/۱۰ - ۱۴:۳۰',
      device: 'Windows - Chrome',
      location: 'تهران، ایران',
      ip: '192.168.1.1',
      icon: CheckCircle,
      color: 'text-green-500 bg-green-50 dark:bg-green-950'
    },
    {
      id: 2,
      type: 'product',
      action: 'افزودن محصول',
      description: 'محصول "سرم ویتامین C" اضافه شد',
      timestamp: '۱۴۰۳/۰۸/۱۰ - ۱۳:۱۵',
      device: 'Windows - Chrome',
      location: 'تهران، ایران',
      ip: '192.168.1.1',
      icon: Plus,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950'
    },
    {
      id: 3,
      type: 'edit',
      action: 'ویرایش تنظیمات',
      description: 'تنظیمات عمومی فروشگاه به‌روزرسانی شد',
      timestamp: '۱۴۰۳/۰۸/۱۰ - ۱۲:۴۵',
      device: 'Windows - Chrome',
      location: 'تهران، ایران',
      ip: '192.168.1.1',
      icon: Edit,
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950'
    },
    {
      id: 4,
      type: 'delete',
      action: 'حذف سفارش',
      description: 'سفارش #۱۲۳۴۵ حذف شد',
      timestamp: '۱۴۰۳/۰۸/۱۰ - ۱۱:۲۰',
      device: 'Windows - Chrome',
      location: 'تهران، ایران',
      ip: '192.168.1.1',
      icon: Trash,
      color: 'text-red-500 bg-red-50 dark:bg-red-950'
    },
    {
      id: 5,
      type: 'view',
      action: 'مشاهده گزارش',
      description: 'گزارش فروش ماهانه مشاهده شد',
      timestamp: '۱۴۰۳/۰۸/۱۰ - ۱۰:۰۰',
      device: 'Windows - Chrome',
      location: 'تهران، ایران',
      ip: '192.168.1.1',
      icon: Eye,
      color: 'text-orange-500 bg-orange-50 dark:bg-orange-950'
    },
    {
      id: 6,
      type: 'export',
      action: 'دانلود فایل',
      description: 'گزارش محصولات به صورت Excel دانلود شد',
      timestamp: '۱۴۰۳/۰۸/۰۹ - ۱۶:۳۰',
      device: 'Windows - Chrome',
      location: 'تهران، ایران',
      ip: '192.168.1.1',
      icon: Download,
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950'
    },
    {
      id: 7,
      type: 'warning',
      action: 'تلاش ورود ناموفق',
      description: 'تلاش برای ورود با رمز عبور اشتباه',
      timestamp: '۱۴۰۳/۰۸/۰۹ - ۰۸:۱۵',
      device: 'Unknown - Unknown',
      location: 'ناشناخته',
      ip: '203.45.67.89',
      icon: AlertCircle,
      color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-950'
    }
  ];

  const stats = [
    { label: 'کل فعالیت‌ها', value: '۱۲۳۴', color: 'from-blue-500 to-cyan-500' },
    { label: 'امروز', value: '۲۳', color: 'from-green-500 to-emerald-500' },
    { label: 'این هفته', value: '۱۵۶', color: 'from-purple-500 to-pink-500' },
    { label: 'این ماه', value: '۸۹۲', color: 'from-orange-500 to-red-500' }
  ];

  const filters = [
    { value: 'all', label: 'همه فعالیت‌ها' },
    { value: 'login', label: 'ورود/خروج' },
    { value: 'product', label: 'محصولات' },
    { value: 'edit', label: 'ویرایش‌ها' },
    { value: 'delete', label: 'حذف‌ها' },
    { value: 'warning', label: 'هشدارها' }
  ];

  const filteredActivities = filter === 'all'
    ? activities
    : activities.filter(a => a.type === filter);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="w-8 h-8" />
                  <Badge className="bg-white/20 text-white border-0">
                    فعالیت‌های من
                  </Badge>
                </div>
                <h1 className="text-3xl font-black mb-2">تاریخچه فعالیت‌ها</h1>
                <p className="text-white/90">
                  مشاهده تمام اقدامات و تغییرات انجام شده در پنل مدیریت
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className={`text-3xl font-black mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {filters.map((f) => (
              <Button
                key={f.value}
                onClick={() => setFilter(f.value)}
                variant={filter === f.value ? 'default' : 'outline'}
                size="sm"
              >
                {f.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Timeline */}
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">تاریخچه فعالیت</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative flex gap-4 p-4 rounded-2xl hover:bg-secondary transition-colors group"
                >
                  <div className={`w-12 h-12 rounded-xl ${activity.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-bold">{activity.action}</h3>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                      </div>
                      <Badge variant="secondary" className="shrink-0">
                        {activity.timestamp}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Monitor className="w-3 h-3" />
                        {activity.device}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {activity.location}
                      </div>
                      <div className="flex items-center gap-1">
                        IP: {activity.ip}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
