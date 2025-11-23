'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import {
  BookOpen,
  PlayCircle,
  CheckCircle,
  ChevronRight,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  BarChart3,
  Sparkles,
  Zap,
  Target,
  TrendingUp,
  Search,
  Filter,
  Download,
  Upload,
  Bell,
  MessageSquare,
  Star,
  Award,
  Lightbulb,
  Rocket,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { toPersianDigits } from '@/lib/utils/numbers';

export default function TutorialPage() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const tutorials = [
    {
      id: 1,
      category: 'شروع کار',
      title: 'آشنایی با داشبورد',
      description: 'نحوه استفاده از داشبورد اصلی و مشاهده آمار کلی',
      icon: LayoutDashboard,
      duration: '۵ دقیقه',
      level: 'مقدماتی',
      color: 'from-blue-500 to-cyan-500',
      steps: [
        'مشاهده آمار فروش و سفارشات',
        'بررسی نمودارها و گزارش‌ها',
        'استفاده از فیلترهای زمانی',
        'دانلود گزارشات'
      ]
    },
    {
      id: 2,
      category: 'مدیریت محصولات',
      title: 'افزودن و ویرایش محصولات',
      description: 'نحوه افزودن محصول جدید، ویرایش و مدیریت موجودی',
      icon: Package,
      duration: '۱۰ دقیقه',
      level: 'مقدماتی',
      color: 'from-purple-500 to-pink-500',
      steps: [
        'افزودن محصول جدید',
        'آپلود تصاویر محصول',
        'تنظیم قیمت و موجودی',
        'دسته‌بندی محصولات',
        'تنظیم ویژگی‌های محصول'
      ]
    },
    {
      id: 3,
      category: 'مدیریت سفارشات',
      title: 'پردازش سفارشات',
      description: 'نحوه مشاهده، پردازش و ارسال سفارشات',
      icon: ShoppingCart,
      duration: '۸ دقیقه',
      level: 'متوسط',
      color: 'from-green-500 to-emerald-500',
      steps: [
        'مشاهده سفارشات جدید',
        'تغییر وضعیت سفارش',
        'ثبت کد رهگیری',
        'ارسال اعلان به مشتری',
        'مدیریت مرجوعی‌ها'
      ]
    },
    {
      id: 4,
      category: 'مدیریت کاربران',
      title: 'کاربران و مشتریان',
      description: 'مدیریت کاربران، نقش‌ها و دسترسی‌ها',
      icon: Users,
      duration: '۷ دقیقه',
      level: 'متوسط',
      color: 'from-orange-500 to-red-500',
      steps: [
        'مشاهده لیست کاربران',
        'تنظیم نقش و دسترسی',
        'مدیریت مشتریان VIP',
        'ارسال پیام به کاربران'
      ]
    },
    {
      id: 5,
      category: 'گزارشات و تحلیل',
      title: 'تحلیل فروش و عملکرد',
      description: 'استفاده از ابزارهای تحلیلی و گزارش‌گیری',
      icon: BarChart3,
      duration: '۱۲ دقیقه',
      level: 'پیشرفته',
      color: 'from-indigo-500 to-purple-500',
      steps: [
        'تحلیل روند فروش',
        'شناسایی محصولات پرفروش',
        'بررسی رفتار مشتریان',
        'پیش‌بینی فروش',
        'صادرات گزارشات'
      ]
    },
    {
      id: 6,
      category: 'تنظیمات',
      title: 'پیکربندی فروشگاه',
      description: 'تنظیمات پیشرفته و سفارشی‌سازی',
      icon: Settings,
      duration: '۱۵ دقیقه',
      level: 'پیشرفته',
      color: 'from-pink-500 to-rose-500',
      steps: [
        'تنظیمات عمومی',
        'پیکربندی پرداخت',
        'تنظیم روش‌های ارسال',
        'مدیریت کوپن تخفیف',
        'اتصال به API'
      ]
    }
  ];

  const quickTips = [
    {
      icon: Lightbulb,
      title: 'میانبرهای کیبورد',
      description: 'از Ctrl+K برای جستجوی سریع استفاده کنید',
      color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-950'
    },
    {
      icon: Zap,
      title: 'اقدامات سریع',
      description: 'دکمه‌های شناور در گوشه صفحه برای دسترسی سریع',
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950'
    },
    {
      icon: Bell,
      title: 'اعلانات هوشمند',
      description: 'با کلیک روی زنگ اعلانات، از تمام رویدادها مطلع شوید',
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950'
    },
    {
      icon: Star,
      title: 'نشانه‌گذاری',
      description: 'محصولات و سفارشات مهم را با ستاره نشان‌گذاری کنید',
      color: 'text-orange-500 bg-orange-50 dark:bg-orange-950'
    }
  ];

  const features = [
    { icon: Target, title: 'داشبورد هوشمند', description: 'مشاهده آمار لحظه‌ای' },
    { icon: TrendingUp, title: 'تحلیل پیشرفته', description: 'گزارش‌های تخصصی' },
    { icon: Search, title: 'جستجوی سریع', description: 'دسترسی آسان به همه بخش‌ها' },
    { icon: Award, title: 'بهینه‌سازی شده', description: 'عملکرد سریع و روان' }
  ];

  const toggleStep = (tutorialId: number) => {
    setCompletedSteps(prev =>
      prev.includes(tutorialId)
        ? prev.filter(id => id !== tutorialId)
        : [...prev, tutorialId]
    );
  };

  const progress = Math.round((completedSteps.length / tutorials.length) * 100);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 md:p-12 text-white"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-8 h-8" />
                <Badge className="bg-white/20 text-white border-0">
                  آموزش جامع
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-black mb-3">
                آموزش کار با پنل مدیریت بی لوک
              </h1>
              <p className="text-lg text-white/90 max-w-2xl">
                راهنمای کامل و گام به گام برای استفاده حرفه‌ای از پنل مدیریت فروشگاه
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-center">
                <div className="text-4xl font-black mb-2">{toPersianDigits(progress.toString())}٪</div>
                <div className="text-sm text-white/80">پیشرفت شما</div>
                <div className="text-xs text-white/60 mt-1">
                  {toPersianDigits(completedSteps.length.toString())} از {toPersianDigits(tutorials.length.toString())} درس
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Quick Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickTips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl ${tip.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold mb-2">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Tutorial Cards */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">دروس آموزشی</h2>
          <Badge variant="secondary" className="gap-2">
            <Rocket className="w-4 h-4" />
            {toPersianDigits(tutorials.length.toString())} درس
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tutorials.map((tutorial, index) => {
            const Icon = tutorial.icon;
            const isCompleted = completedSteps.includes(tutorial.id);

            return (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${isCompleted ? 'ring-2 ring-green-500' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tutorial.color} flex items-center justify-center text-white shadow-lg`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      {isCompleted && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-green-500 text-white rounded-full p-1"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </motion.div>
                      )}
                    </div>
                    <Badge variant="secondary" className="w-fit mb-2">
                      {tutorial.category}
                    </Badge>
                    <CardTitle className="text-xl mb-2">{tutorial.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-4">
                      {tutorial.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {tutorial.duration}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {tutorial.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {tutorial.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start gap-2 text-sm">
                          <ChevronRight className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={() => toggleStep(tutorial.id)}
                      variant={isCompleted ? 'outline' : 'default'}
                      className="w-full gap-2"
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          تکمیل شده
                        </>
                      ) : (
                        <>
                          <PlayCircle className="w-4 h-4" />
                          شروع آموزش
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-background to-secondary/20">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-500" />
            امکانات ویژه پنل
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white shadow-lg">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Help CTA */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <CardContent className="p-8 text-center">
          <MessageSquare className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">نیاز به کمک دارید؟</h3>
          <p className="text-white/90 mb-6">
            تیم پشتیبانی ما ۲۴/۷ آماده پاسخگویی به سوالات شماست
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="secondary" size="lg" className="gap-2">
              <MessageSquare className="w-5 h-5" />
              شروع گفتگو
            </Button>
            <Link href={`/admin/settings`}>
              <Button variant="outline" size="lg" className="gap-2 bg-white/10 hover:bg-white/20 text-white border-white/30">
                <Settings className="w-5 h-5" />
                تنظیمات پنل
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
