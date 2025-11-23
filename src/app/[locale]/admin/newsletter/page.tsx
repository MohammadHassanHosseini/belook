'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  Download,
  Send,
  Users,
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointerClick,
  UserPlus,
  UserMinus,
  Search,
  Filter,
  Plus,
  Settings,
  FileText,
  BarChart3,
  PieChart,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
  Zap,
  Target,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  MailOpen,
  MailCheck,
  Trash2,
  Edit,
  Copy,
  RefreshCw,
  Globe,
  Tag,
  Layers,
  Activity,
  MessageSquare,
  PlayCircle,
  PauseCircle,
  Archive,
  Printer
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { toPersianDigits } from '@/lib/utils/numbers';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function AdminNewsletterPage() {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'subscribers' | 'campaigns' | 'templates' | 'analytics'>('overview');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedSubscribers, setSelectedSubscribers] = React.useState<string[]>([]);
  const [showFilters, setShowFilters] = React.useState(false);
  const [timeRange, setTimeRange] = React.useState('30d');

  // Mock data - در production از API می‌آید
  const stats = {
    totalSubscribers: 12845,
    activeSubscribers: 11567,
    newThisMonth: 892,
    unsubscribedThisMonth: 45,
    openRate: 42.5,
    clickRate: 18.3,
    growthRate: 12.8,
    avgEngagement: 35.7
  };

  const subscribers = [
    { 
      id: '1', 
      email: 'ali.ahmadi@example.com', 
      name: 'علی احمدی',
      subscribedAt: new Date('2024-01-15'), 
      status: 'active',
      tags: ['VIP', 'خریدار فعال'],
      openRate: 85,
      clickRate: 45,
      totalOrders: 12,
      lastActivity: new Date('2024-10-25')
    },
    { 
      id: '2', 
      email: 'sara.mohammadi@example.com',
      name: 'سارا محمدی', 
      subscribedAt: new Date('2024-02-20'), 
      status: 'active',
      tags: ['خریدار جدید'],
      openRate: 62,
      clickRate: 28,
      totalOrders: 3,
      lastActivity: new Date('2024-10-28')
    },
    { 
      id: '3', 
      email: 'reza.karimi@example.com',
      name: 'رضا کریمی', 
      subscribedAt: new Date('2024-03-10'), 
      status: 'inactive',
      tags: ['غیرفعال'],
      openRate: 12,
      clickRate: 2,
      totalOrders: 1,
      lastActivity: new Date('2024-08-15')
    },
    { 
      id: '4', 
      email: 'maryam.rezaei@example.com',
      name: 'مریم رضایی', 
      subscribedAt: new Date('2024-04-05'), 
      status: 'active',
      tags: ['Premium'],
      openRate: 95,
      clickRate: 67,
      totalOrders: 25,
      lastActivity: new Date('2024-10-30')
    },
  ];

  const campaigns = [
    {
      id: '1',
      name: 'تخفیف ویژه پاییز',
      subject: '🍂 تخفیف ۳۰٪ ویژه فصل پاییز',
      status: 'sent',
      sentAt: new Date('2024-10-20'),
      recipients: 11234,
      opened: 4782,
      clicked: 1856,
      conversions: 342,
      revenue: '۱۲۴,۵۰۰,۰۰۰'
    },
    {
      id: '2',
      name: 'معرفی محصولات جدید',
      subject: '✨ محصولات جدید رسید!',
      status: 'scheduled',
      scheduledFor: new Date('2024-11-05'),
      recipients: 12500,
      template: 'new-products'
    },
    {
      id: '3',
      name: 'یادآوری سبد خرید',
      subject: 'سبد خرید شما منتظر است',
      status: 'draft',
      recipients: 0,
      template: 'cart-reminder'
    },
  ];

  const growthData = [
    { month: 'فروردین', subscribers: 8500, newSubs: 420, unsubscribed: 45 },
    { month: 'اردیبهشت', subscribers: 9200, newSubs: 740, unsubscribed: 40 },
    { month: 'خرداد', subscribers: 9800, newSubs: 650, unsubscribed: 50 },
    { month: 'تیر', subscribers: 10600, newSubs: 850, unsubscribed: 50 },
    { month: 'مرداد', subscribers: 11500, newSubs: 950, unsubscribed: 50 },
    { month: 'شهریور', subscribers: 12200, newSubs: 750, unsubscribed: 50 },
    { month: 'مهر', subscribers: 12845, newSubs: 892, unsubscribed: 45 },
  ];

  const engagementData = [
    { name: 'بازشده', value: 42.5, color: '#10b981' },
    { name: 'کلیک شده', value: 18.3, color: '#3b82f6' },
    { name: 'بی‌تفاوت', value: 39.2, color: '#6b7280' },
  ];

  const campaignPerformance = [
    { name: 'هفته ۱', sent: 3200, opened: 1350, clicked: 580 },
    { name: 'هفته ۲', sent: 3500, opened: 1480, clicked: 640 },
    { name: 'هفته ۳', sent: 2800, opened: 1190, clicked: 510 },
    { name: 'هفته ۴', sent: 4100, opened: 1740, clicked: 750 },
  ];

  const templates = [
    {
      id: '1',
      name: 'خوشامدگویی',
      description: 'ایمیل خوشامد برای مشترکین جدید',
      category: 'automation',
      thumbnail: '/templates/welcome.png',
      used: 245
    },
    {
      id: '2',
      name: 'تخفیف ویژه',
      description: 'قالب ارسال کد تخفیف',
      category: 'promotion',
      thumbnail: '/templates/discount.png',
      used: 182
    },
    {
      id: '3',
      name: 'محصول جدید',
      description: 'معرفی محصولات جدید',
      category: 'product',
      thumbnail: '/templates/new-product.png',
      used: 98
    },
  ];

  const segments = [
    { id: '1', name: 'مشتریان VIP', count: 1250, criteria: 'سفارش بیش از ۵ میلیون', color: 'from-purple-500 to-pink-500' },
    { id: '2', name: 'خریداران اخیر', count: 3420, criteria: 'خرید در ۳۰ روز گذشته', color: 'from-blue-500 to-cyan-500' },
    { id: '3', name: 'غیرفعال', count: 1278, criteria: 'بدون فعالیت ۹۰ روز', color: 'from-orange-500 to-red-500' },
    { id: '4', name: 'مشترکین جدید', count: 892, criteria: 'عضویت در ماه جاری', color: 'from-green-500 to-emerald-500' },
  ];

  const handleSelectAll = () => {
    if (selectedSubscribers.length === subscribers.length) {
      setSelectedSubscribers([]);
    } else {
      setSelectedSubscribers(subscribers.map(s => s.id));
    }
  };

  const handleSelectSubscriber = (id: string) => {
    setSelectedSubscribers(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 dark:bg-green-950';
      case 'inactive': return 'text-orange-600 bg-orange-50 dark:bg-orange-950';
      case 'unsubscribed': return 'text-red-600 bg-red-50 dark:bg-red-950';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-950';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'فعال';
      case 'inactive': return 'غیرفعال';
      case 'unsubscribed': return 'لغو اشتراک';
      default: return status;
    }
  };

  const getCampaignStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'text-green-600 bg-green-50 dark:bg-green-950';
      case 'scheduled': return 'text-blue-600 bg-blue-50 dark:bg-blue-950';
      case 'draft': return 'text-gray-600 bg-gray-50 dark:bg-gray-950';
      case 'sending': return 'text-purple-600 bg-purple-50 dark:bg-purple-950';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-950';
    }
  };

  const getCampaignStatusText = (status: string) => {
    switch (status) {
      case 'sent': return 'ارسال شده';
      case 'scheduled': return 'زمان‌بندی شده';
      case 'draft': return 'پیش‌نویس';
      case 'sending': return 'در حال ارسال';
      default: return status;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-6 md:p-8 text-white shadow-2xl"
      >
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
        <div className="absolute top-10 right-10 w-32 md:w-72 h-32 md:h-72 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 md:w-96 h-48 md:h-96 bg-pink-400/30 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <Mail className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-xs md:text-sm font-semibold tracking-wider uppercase opacity-90">
              Newsletter Management
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3">
            مدیریت خبرنامه ✉️
          </h1>
          <p className="text-sm md:text-lg opacity-90 max-w-2xl">
            مدیریت حرفه‌ای مشترکین، کمپین‌ها و تحلیل عملکرد ایمیل مارکتینگ
          </p>
        </div>
      </motion.div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -5 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/20">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10 bg-blue-500 rounded-full blur-2xl" />
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                کل مشترکین
              </CardTitle>
              <div className="relative p-3 rounded-2xl bg-blue-50 dark:bg-blue-950 shadow-lg">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                {toPersianDigits(stats.totalSubscribers.toLocaleString())}
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 w-fit">
                <ArrowUpRight className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                  {toPersianDigits(stats.growthRate.toString())}٪
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -5 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-green-50/30 dark:from-gray-900 dark:to-green-950/20">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10 bg-green-500 rounded-full blur-2xl" />
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                نرخ بازشدن
              </CardTitle>
              <div className="relative p-3 rounded-2xl bg-green-50 dark:bg-green-950 shadow-lg">
                <MailOpen className="h-5 w-5 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2 bg-gradient-to-br from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent">
                {toPersianDigits(stats.openRate.toString())}٪
              </div>
              <div className="text-xs text-muted-foreground">
                میانگین صنعت: {toPersianDigits('21.3')}٪
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -5 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-900 dark:to-purple-950/20">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10 bg-purple-500 rounded-full blur-2xl" />
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                نرخ کلیک
              </CardTitle>
              <div className="relative p-3 rounded-2xl bg-purple-50 dark:bg-purple-950 shadow-lg">
                <MousePointerClick className="h-5 w-5 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2 bg-gradient-to-br from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
                {toPersianDigits(stats.clickRate.toString())}٪
              </div>
              <div className="text-xs text-muted-foreground">
                میانگین صنعت: {toPersianDigits('8.7')}٪
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ y: -5 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-orange-50/30 dark:from-gray-900 dark:to-orange-950/20">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10 bg-orange-500 rounded-full blur-2xl" />
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                مشترکین جدید
              </CardTitle>
              <div className="relative p-3 rounded-2xl bg-orange-50 dark:bg-orange-950 shadow-lg">
                <UserPlus className="h-5 w-5 text-orange-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2 bg-gradient-to-br from-orange-600 to-orange-800 dark:from-orange-400 dark:to-orange-600 bg-clip-text text-transparent">
                {toPersianDigits(stats.newThisMonth.toString())}
              </div>
              <div className="text-xs text-muted-foreground">
                این ماه
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tabs Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex gap-2 overflow-x-auto">
                {[
                  { id: 'overview', label: 'نمای کلی', icon: BarChart3 },
                  { id: 'subscribers', label: 'مشترکین', icon: Users },
                  { id: 'campaigns', label: 'کمپین‌ها', icon: Send },
                  { id: 'templates', label: 'قالب‌ها', icon: FileText },
                  { id: 'analytics', label: 'تحلیل عملکرد', icon: Activity },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? 'default' : 'ghost'}
                      className={`gap-2 ${activeTab === tab.id ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg' : ''}`}
                      onClick={() => setActiveTab(tab.id as any)}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </Button>
                  );
                })}
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg" size="sm">
                  <Plus className="w-4 h-4" />
                  کمپین جدید
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  دانلود گزارش
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Printer className="w-4 h-4" />
                  چاپ
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Growth Chart */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/20 dark:from-gray-900 dark:to-blue-950/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    رشد مشترکین
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    روند رشد در ۷ ماه گذشته
                  </p>
                </div>
                <div className="flex gap-2">
                  {['7d', '30d', '90d', '1y'].map((range) => (
                    <Button
                      key={range}
                      size="sm"
                      variant={timeRange === range ? 'default' : 'outline'}
                      onClick={() => setTimeRange(range)}
                      className={timeRange === range ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
                    >
                      {range === '7d' ? '۷ روز' : range === '30d' ? '۳۰ روز' : range === '90d' ? '۹۰ روز' : 'سال'}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="colorSubscribers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="subscribers" 
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#colorSubscribers)"
                    name="کل مشترکین"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="newSubs" 
                    stroke="#10b981" 
                    fillOpacity={1} 
                    fill="url(#colorNew)"
                    name="مشترکین جدید"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Segments and Campaign Performance */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Segments */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold">بخش‌بندی مشترکین</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      دسته‌بندی مخاطبان
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Plus className="w-4 h-4" />
                    بخش جدید
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {segments.map((segment, idx) => (
                    <motion.div
                      key={segment.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="group relative p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700"
                    >
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${segment.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${segment.color} flex items-center justify-center shadow-lg`}>
                            <Layers className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-bold">{segment.name}</p>
                            <p className="text-xs text-muted-foreground">{segment.criteria}</p>
                          </div>
                        </div>
                        <div className="text-end">
                          <p className={`text-xl font-bold bg-gradient-to-r ${segment.color} bg-clip-text text-transparent`}>
                            {toPersianDigits(segment.count.toLocaleString())}
                          </p>
                          <p className="text-xs text-muted-foreground">مشترک</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Campaign Performance */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold">عملکرد کمپین‌ها</CardTitle>
                <p className="text-sm text-muted-foreground">
                  آمار ۴ هفته گذشته
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={campaignPerformance}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sent" fill="#3b82f6" name="ارسال شده" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="opened" fill="#10b981" name="بازشده" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="clicked" fill="#8b5cf6" name="کلیک شده" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}

      {/* Subscribers Tab */}
      {activeTab === 'subscribers' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl font-bold">
                    مشترکین ({toPersianDigits(subscribers.length.toString())})
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    مدیریت مشترکین خبرنامه
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <div className="relative flex-1 md:flex-initial md:w-64">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="جستجو..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                  <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
                    <Filter className="w-4 h-4" />
                    فیلتر
                  </Button>
                  <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
                    <Download className="w-4 h-4" />
                    دانلود
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {selectedSubscribers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      {toPersianDigits(selectedSubscribers.length.toString())} مورد انتخاب شده
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-2">
                        <Tag className="w-4 h-4" />
                        افزودن برچسب
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Send className="w-4 h-4" />
                        ارسال ایمیل
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2 text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                        حذف
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-start p-4">
                        <input
                          type="checkbox"
                          checked={selectedSubscribers.length === subscribers.length}
                          onChange={handleSelectAll}
                          className="rounded"
                        />
                      </th>
                      <th className="text-start p-4 font-bold">مشترک</th>
                      <th className="text-start p-4 font-bold">وضعیت</th>
                      <th className="text-start p-4 font-bold">برچسب‌ها</th>
                      <th className="text-start p-4 font-bold">نرخ بازشدن</th>
                      <th className="text-start p-4 font-bold">سفارشات</th>
                      <th className="text-start p-4 font-bold">عضویت</th>
                      <th className="text-start p-4 font-bold">عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((sub, idx) => (
                      <motion.tr
                        key={sub.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedSubscribers.includes(sub.id)}
                            onChange={() => handleSelectSubscriber(sub.id)}
                            className="rounded"
                          />
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-bold">{sub.name}</p>
                            <p className="text-sm text-muted-foreground">{sub.email}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(sub.status)}`}>
                            {getStatusText(sub.status)}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-1 flex-wrap">
                            {sub.tags.map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                                style={{ width: `${sub.openRate}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold">{toPersianDigits(sub.openRate.toString())}٪</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-bold">{toPersianDigits(sub.totalOrders.toString())}</span>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <p>{formatDate(sub.subscribedAt, 'fa-IR')}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="w-8 h-8 p-0 text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">کمپین‌های ایمیلی</h2>
              <p className="text-sm text-muted-foreground">مدیریت کمپین‌های خبرنامه</p>
            </div>
            <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
              <Plus className="w-4 h-4" />
              کمپین جدید
            </Button>
          </div>

          <div className="grid gap-4">
            {campaigns.map((campaign, idx) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all" />
                  <CardContent className="p-6 relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{campaign.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCampaignStatusColor(campaign.status)}`}>
                            {getCampaignStatusText(campaign.status)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{campaign.subject}</p>
                        {campaign.status === 'sent' && (
                          <p className="text-xs text-muted-foreground">
                            ارسال شده در {formatDate(campaign.sentAt!, 'fa-IR')}
                          </p>
                        )}
                        {campaign.status === 'scheduled' && (
                          <p className="text-xs text-blue-600 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            زمان‌بندی برای {formatDate(campaign.scheduledFor!, 'fa-IR')}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="gap-2">
                          <Eye className="w-4 h-4" />
                          پیش‌نمایش
                        </Button>
                        <Button size="sm" variant="outline" className="gap-2">
                          <Copy className="w-4 h-4" />
                          کپی
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {campaign.status === 'sent' && (
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">ارسال شده</p>
                          <p className="text-lg font-bold">{toPersianDigits(campaign.recipients!.toLocaleString())}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">بازشده</p>
                          <p className="text-lg font-bold text-green-600">
                            {toPersianDigits(campaign.opened!.toLocaleString())}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {toPersianDigits(((campaign.opened! / campaign.recipients!) * 100).toFixed(1))}٪
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">کلیک شده</p>
                          <p className="text-lg font-bold text-blue-600">
                            {toPersianDigits(campaign.clicked!.toLocaleString())}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {toPersianDigits(((campaign.clicked! / campaign.recipients!) * 100).toFixed(1))}٪
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">تبدیل</p>
                          <p className="text-lg font-bold text-purple-600">
                            {toPersianDigits(campaign.conversions!.toLocaleString())}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {toPersianDigits(((campaign.conversions! / campaign.clicked!) * 100).toFixed(1))}٪
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">درآمد</p>
                          <p className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            {campaign.revenue}
                          </p>
                          <p className="text-xs text-muted-foreground">تومان</p>
                        </div>
                      </div>
                    )}

                    {campaign.status === 'draft' && (
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="gap-2">
                          <Edit className="w-4 h-4" />
                          ویرایش
                        </Button>
                        <Button size="sm" className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
                          <Send className="w-4 h-4" />
                          ارسال
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">قالب‌های ایمیل</h2>
              <p className="text-sm text-muted-foreground">مدیریت قالب‌های خبرنامه</p>
            </div>
            <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
              <Plus className="w-4 h-4" />
              قالب جدید
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template, idx) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all overflow-hidden group cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FileText className="w-16 h-16 text-gray-400" />
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white">
                        {template.category === 'automation' ? 'اتوماسیون' : 
                         template.category === 'promotion' ? 'تبلیغاتی' : 'محصول'}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Eye className="w-4 h-4" />
                        <span>استفاده: {toPersianDigits(template.used.toString())}</span>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-2xl font-bold">تحلیل عملکرد</h2>
            <p className="text-sm text-muted-foreground">آمار و گزارش‌های تفصیلی</p>
          </div>

          {/* Engagement Metrics */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold">توزیع تعامل</CardTitle>
                <p className="text-sm text-muted-foreground">نمای کلی عملکرد</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <RePieChart>
                    <Pie
                      data={engagementData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${toPersianDigits(value.toString())}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {engagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Additional Metrics */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold">معیارهای کلیدی</CardTitle>
                <p className="text-sm text-muted-foreground">شاخص‌های مهم عملکرد</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">نرخ رشد</p>
                        <p className="text-2xl font-bold text-green-600">{toPersianDigits(stats.growthRate.toString())}٪</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">میانگین تعامل</p>
                        <p className="text-2xl font-bold text-blue-600">{toPersianDigits(stats.avgEngagement.toString())}٪</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">مشترکین فعال</p>
                        <p className="text-2xl font-bold text-purple-600">{toPersianDigits(stats.activeSubscribers.toLocaleString())}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
                        <UserMinus className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">لغو اشتراک (ماه)</p>
                        <p className="text-2xl font-bold text-orange-600">{toPersianDigits(stats.unsubscribedThisMonth.toString())}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Best Performing Times */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold">بهترین زمان ارسال</CardTitle>
              <p className="text-sm text-muted-foreground">بر اساس نرخ بازشدن</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-7 gap-3">
                {['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'].map((day, idx) => {
                  const rate = [65, 72, 68, 75, 70, 45, 38][idx];
                  return (
                    <div key={day} className="text-center">
                      <div className="mb-2 h-32 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex items-end justify-center p-2">
                        <div 
                          className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded transition-all"
                          style={{ height: `${rate}%` }}
                        />
                      </div>
                      <p className="text-sm font-semibold">{day}</p>
                      <p className="text-xs text-muted-foreground">{toPersianDigits(rate.toString())}٪</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
