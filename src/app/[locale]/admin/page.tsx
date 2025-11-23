'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Sparkles,
  Zap,
  Activity,
  Eye,
  Star,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Download,
  Upload,
  BarChart3,
  PieChart,
  Calendar,
  Bell,
  Settings,
  Search,
  Filter,
  Plus,
  Minus,
  TrendingDown as Down,
  ArrowDown,
  ArrowUp,
  Box,
  CreditCard,
  Target,
  Award,
  Heart,
  MessageSquare,
  ShoppingBag,
  Truck,
  RefreshCw,
  Globe,
  MapPin,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toPersianDigits } from '@/lib/utils/numbers';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import React from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { toast } from 'react-hot-toast';
import { useRouter, useParams } from 'next/navigation';

function AdminDashboardContent() {
  const router = useRouter();
  const params = useParams();
  const { stats, recentOrders, topProducts, topCustomers, lowStockProducts, isLoading, refreshData, exportReport } = useDashboard();
  
  // دریافت locale از URL params
  const currentLocale = (params?.locale as string) || 'fa';
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshData();
      toast.success('داده‌ها به‌روزرسانی شد');
    } catch (error) {
      toast.error('خطا در به‌روزرسانی داده‌ها');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportReport('excel');
      toast.success('گزارش با موفقیت دانلود شد');
    } catch (error) {
      toast.error('خطا در دانلود گزارش');
    } finally {
      setIsExporting(false);
    }
  };

  const statsData = [
    {
      title: 'فروش امروز',
      value: toPersianDigits(stats.todaySales.toLocaleString()),
      unit: 'تومان',
      change: `${stats.salesChange > 0 ? '+' : ''}${toPersianDigits(stats.salesChange.toFixed(1))}%`,
      trend: stats.salesChange >= 0 ? 'up' : 'down',
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950',
    },
    {
      title: 'سفارشات جدید',
      value: toPersianDigits(stats.todayOrders.toString()),
      unit: 'سفارش',
      change: `${stats.ordersChange > 0 ? '+' : ''}${toPersianDigits(stats.ordersChange.toFixed(1))}%`,
      trend: stats.ordersChange >= 0 ? 'up' : 'down',
      icon: ShoppingCart,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      title: 'کاربران جدید',
      value: toPersianDigits(stats.newUsers.toString()),
      unit: 'کاربر',
      change: `${stats.usersChange > 0 ? '+' : ''}${toPersianDigits(stats.usersChange.toFixed(1))}%`,
      trend: stats.usersChange >= 0 ? 'up' : 'down',
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
    },
    {
      title: 'محصولات',
      value: toPersianDigits(stats.totalProducts.toString()),
      unit: 'عدد',
      change: `${stats.productsChange > 0 ? '+' : ''}${toPersianDigits(stats.productsChange.toFixed(1))}%`,
      trend: stats.productsChange >= 0 ? 'up' : 'down',
      icon: Package,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
    },
  ];

  const quickActions = [
    { title: 'محصول جدید', icon: Plus, color: 'from-blue-500 to-cyan-500', href: `/${currentLocale}/admin/products/new` },
    { title: 'سفارشات', icon: ShoppingCart, color: 'from-purple-500 to-pink-500', href: `/${currentLocale}/admin/orders` },
    { title: 'گزارشات', icon: BarChart3, color: 'from-orange-500 to-red-500', href: `/${currentLocale}/admin/reports` },
    { title: 'تنظیمات', icon: Settings, color: 'from-green-500 to-emerald-500', href: `/${currentLocale}/admin/settings` },
  ];

  const salesData = [
    { month: 'فروردین', sales: 4500000, orders: 45 },
    { month: 'اردیبهشت', sales: 5200000, orders: 52 },
    { month: 'خرداد', sales: 4800000, orders: 48 },
    { month: 'تیر', sales: 6100000, orders: 61 },
    { month: 'مرداد', sales: 7300000, orders: 73 },
    { month: 'شهریور', sales: 6800000, orders: 68 },
  ];

  const notifications = [
    { id: 1, type: 'order', message: 'سفارش جدید ثبت شد', time: '۵ دقیقه پیش', icon: ShoppingBag, color: 'text-blue-500' },
    { id: 2, type: 'alert', message: 'موجودی محصول کم است', time: '۱۵ دقیقه پیش', icon: AlertCircle, color: 'text-orange-500' },
    { id: 3, type: 'review', message: 'نظر جدید ثبت شد', time: '۱ ساعت پیش', icon: Star, color: 'text-yellow-500' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Ultra Modern Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl md:rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white shadow-2xl"
      >
        {/* Animated Background Patterns */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          
          {/* Gradient Orbs with Animation */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 -right-20 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute -bottom-20 -left-20 w-[32rem] h-[32rem] bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-3xl opacity-25"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 md:p-12 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-6">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                </motion.div>
                <span className="text-sm font-semibold tracking-wide">
                  داشبورد مدیریت هوشمند
                </span>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-xs">
                  Live
                </Badge>
              </motion.div>

              {/* Main Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                  <span className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                    خوش آمدید
                  </span>
                  <span className="block mt-2 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    مدیر عزیز! 👋
                  </span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base md:text-lg text-purple-100 leading-relaxed max-w-xl"
              >
                کنترل کامل کسب‌وکار، تحلیل داده‌ها و مدیریت هوشمند فروشگاه در یک پلتفرم قدرتمند و زیبا
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  size="lg"
                  onClick={() => router.push(`/${currentLocale}/admin/reports`)}
                  className="group relative bg-white text-purple-900 hover:bg-white/90 shadow-2xl shadow-white/20 font-bold px-8 overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <span className="relative flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    مشاهده گزارشات
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleExport}
                  disabled={isExporting}
                  className="border-2 border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold px-8"
                >
                  {isExporting ? (
                    <Loader2 className="w-5 h-5 me-2 animate-spin" />
                  ) : (
                    <Download className="w-5 h-5 me-2" />
                  )}
                  {isExporting ? 'در حال دانلود...' : 'دانلود گزارش'}
                </Button>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-6 pt-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-green-500/20 backdrop-blur-sm border border-green-400/30">
                    <TrendingUp className="w-6 h-6 text-green-300" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{toPersianDigits(`+${stats.salesChange.toFixed(1)}%`)}</div>
                    <div className="text-xs text-purple-200">رشد فروش</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-500/20 backdrop-blur-sm border border-blue-400/30">
                    <Users className="w-6 h-6 text-blue-300" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{toPersianDigits(topCustomers.length.toString())}</div>
                    <div className="text-xs text-purple-200">مشتری برتر</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-purple-500/20 backdrop-blur-sm border border-purple-400/30">
                    <ShoppingCart className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{toPersianDigits(stats.todayOrders.toString())}</div>
                    <div className="text-xs text-purple-200">سفارش امروز</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Interactive Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="hidden lg:block relative"
            >
              <div className="relative">
                {/* Floating Cards */}
                <motion.div
                  animate={{
                    y: [-10, 10, -10],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-0 right-0 w-48 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <DollarSign className="w-5 h-5 text-green-300" />
                    </div>
                    <div>
                      <div className="text-xs text-purple-200">درآمد امروز</div>
                      <div className="text-lg font-bold">۱۲.۵M</div>
                    </div>
                  </div>
                  <div className="h-12 flex items-end gap-1">
                    {[40, 60, 45, 80, 55, 70, 85].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: 0.7 + i * 0.1, duration: 0.3 }}
                        className="flex-1 bg-gradient-to-t from-green-500 to-emerald-400 rounded-sm"
                      />
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [10, -10, 10],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute top-32 left-0 w-52 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-xs text-purple-200">محصولات</div>
                      <div className="text-2xl font-bold">۲۳۴</div>
                    </div>
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <Package className="w-6 h-6 text-purple-300" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <ArrowUpRight className="w-3 h-3 text-green-400" />
                    <span className="text-green-400 font-semibold">+۱۲٪</span>
                    <span className="text-purple-200">از ماه قبل</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [-5, 15, -5],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute bottom-0 right-12 w-56 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 rounded-full border-4 border-cyan-500/30 border-t-cyan-400"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-cyan-300" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-purple-200">عملکرد سیستم</div>
                      <div className="text-xl font-bold">۹۸٪</div>
                      <div className="flex items-center gap-1 text-xs text-cyan-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span>عالی</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Center Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-3xl" />
              </div>
            </motion.div>
          </div>

          {/* Bottom Status Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-green-400"
                  />
                  <span className="text-sm text-purple-100">سیستم آنلاین</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-purple-200">
                  <Clock className="w-4 h-4" />
                  <span>آخرین به‌روزرسانی: ۲ دقیقه پیش</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="text-purple-100 hover:bg-white/10"
                >
                  <RefreshCw className={`w-4 h-4 me-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? 'در حال به‌روزرسانی...' : 'به‌روزرسانی'}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => router.push(`/${currentLocale}/admin/settings`)}
                  className="text-purple-100 hover:bg-white/10"
                >
                  <Settings className="w-4 h-4 me-2" />
                  تنظیمات
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid با طراحی Glassmorphism */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                {/* Gradient Background */}
                <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 ${stat.bgColor.replace('dark:bg-', 'dark:from-').replace('bg-', 'from-')} bg-gradient-to-br rounded-full blur-2xl`} />
                
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`relative p-3 rounded-2xl ${stat.bgColor} shadow-lg`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-2xl" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2 bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">{stat.unit}</div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 w-fit">
                    <ArrowUpRight className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                    <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                      {stat.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">اقدامات سریع</h2>
          <Button variant="ghost" size="sm" className="gap-2">
            <Eye className="w-4 h-4" />
            مشاهده همه
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={action.href}>
                  <Card className="relative overflow-hidden cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                    <CardContent className="p-6 flex flex-col items-center gap-3">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${action.color} shadow-xl`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <p className="font-bold text-center">{action.title}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders با طراحی مدرن */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    سفارشات اخیر
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    آخرین تراکنش‌های ثبت شده
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-950">
                  <ShoppingCart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentOrders.map((order, idx) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="group relative flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    {/* Hover Gradient Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300" />
                    
                    <div className="relative z-10">
                      <p className="font-bold text-gray-900 dark:text-white">{order.id}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {order.customer}
                      </p>
                    </div>
                    <div className="text-end relative z-10">
                      <p className="font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        {order.amount} تومان
                      </p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Products با طراحی مدرن */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-900 dark:to-purple-950/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    پرفروش‌ترین محصولات
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    محصولات برتر این ماه
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-purple-100 dark:bg-purple-950">
                  <Package className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topProducts.map((product, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="group relative flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    {/* Ranking Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                      {toPersianDigits((idx + 1).toString())}
                    </div>

                    {/* Hover Gradient Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300" />
                    
                    <div className="relative z-10">
                      <p className="font-bold text-gray-900 dark:text-white">{product.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        {toPersianDigits(product.sales.toString())} فروش
                      </p>
                    </div>
                    <div className="text-end relative z-10">
                      <p className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {product.revenue}
                      </p>
                      <p className="text-xs text-muted-foreground">تومان</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* مشتریان برتر و هشدار موجودی */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top Customers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-green-50/30 dark:from-gray-900 dark:to-green-950/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    مشتریان برتر
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    بهترین مشتریان این ماه
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-green-100 dark:bg-green-950">
                  <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCustomers.map((customer, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="group relative flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/0 to-emerald-500/0 group-hover:from-green-500/5 group-hover:to-emerald-500/5 transition-all duration-300" />
                    
                    <div className="relative z-10 flex items-center gap-4 flex-1">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {customer.name.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold shadow">
                          {toPersianDigits((idx + 1).toString())}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-gray-900 dark:text-white">{customer.name}</p>
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs">
                            {customer.badge}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <ShoppingBag className="w-3 h-3" />
                          {toPersianDigits(customer.orders.toString())} سفارش
                        </p>
                      </div>
                      
                      <div className="text-end">
                        <p className="font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          {customer.total}
                        </p>
                        <p className="text-xs text-muted-foreground">تومان</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Low Stock Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-red-50/30 dark:from-gray-900 dark:to-red-950/20 h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-red-100 dark:bg-red-950">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-red-600 dark:text-red-400">
                    هشدار موجودی
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    محصولات رو به اتمام
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowStockProducts.map((product, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    className="p-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-red-200 dark:border-red-900"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-sm">{product.name}</p>
                      <Badge variant="destructive" className="text-xs">
                        کم
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">موجودی</span>
                        <span className="font-bold text-red-600">{toPersianDigits(product.stock.toString())}</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-500"
                          style={{ width: `${(product.stock / 20) * 100}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>حداقل: {toPersianDigits('20')}</span>
                        <span className="flex items-center gap-1 text-red-600">
                          <AlertCircle className="w-3 h-3" />
                          کمبود موجودی
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* نمودار فروش و اعلانات */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-2"
        >
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-indigo-50/30 dark:from-gray-900 dark:to-indigo-950/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    روند فروش
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    ۶ ماه اخیر
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Calendar className="w-4 h-4" />
                    این ماه
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesData.map((data, idx) => {
                  const maxSales = Math.max(...salesData.map(d => d.sales));
                  const percentage = (data.sales / maxSales) * 100;
                  
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + idx * 0.05 }}
                      className="group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold">{data.month}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-muted-foreground">
                            {toPersianDigits(data.orders.toString())} سفارش
                          </span>
                          <span className="font-bold text-sm bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            {toPersianDigits((data.sales / 1000000).toFixed(1))}M
                          </span>
                        </div>
                      </div>
                      <div className="relative h-12 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: 0.8 + idx * 0.05, duration: 0.5 }}
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl relative group-hover:from-indigo-600 group-hover:to-purple-600 transition-all"
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-yellow-50/30 dark:from-gray-900 dark:to-yellow-950/20 h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Bell className="w-5 h-5 text-yellow-600" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  </div>
                  <CardTitle className="text-lg font-bold">اعلان‌ها</CardTitle>
                </div>
                <Button variant="ghost" size="sm">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notif, idx) => {
                  const Icon = notif.icon;
                  return (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + idx * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 dark:border-gray-700"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${notif.color.replace('text-', 'bg-').replace('500', '100')} dark:${notif.color.replace('text-', 'bg-').replace('500', '950')}`}>
                          <Icon className={`w-4 h-4 ${notif.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium mb-1 line-clamp-2">
                            {notif.message}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {notif.time}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                مشاهده همه اعلان‌ها
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Performance Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Target className="w-6 h-6 text-primary" />
                  عملکرد کلی
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  آمار جامع سیستم
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="w-4 h-4" />
                  فیلتر
                </Button>
                <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-purple-600">
                  <Download className="w-4 h-4" />
                  گزارش PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { label: 'نرخ تبدیل', value: '۳.۲٪', icon: Target, color: 'from-blue-500 to-cyan-500' },
                { label: 'میانگین سفارش', value: '۸۵۰,۰۰۰', icon: CreditCard, color: 'from-green-500 to-emerald-500' },
                { label: 'مشتریان فعال', value: '۱,۲۳۴', icon: Users, color: 'from-purple-500 to-pink-500' },
                { label: 'رضایت مشتری', value: '۴.۸/۵', icon: Star, color: 'from-yellow-500 to-orange-500' },
              ].map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + idx * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-600"
                  >
                    <div className={`absolute top-4 right-4 p-3 rounded-xl bg-gradient-to-br ${metric.color} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="mt-16">
                      <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                      <p className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        {metric.value}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default AdminDashboardContent;
