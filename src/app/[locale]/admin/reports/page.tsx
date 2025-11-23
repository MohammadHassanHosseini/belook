'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Award,
  Sparkles,
  Eye,
  MousePointerClick,
  CreditCard,
  Percent,
  Clock,
  MapPin,
  Filter,
  FileText,
  Printer,
  Share2,
  RefreshCw,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { toPersianDigits } from '@/lib/utils/numbers';
import { motion } from 'framer-motion';
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
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function AdminReportsPage() {
  const [timeRange, setTimeRange] = React.useState('30d');
  const [activeTab, setActiveTab] = React.useState<'overview' | 'sales' | 'products' | 'customers'>('overview');

  // Mock data - در production از API می‌آید
  const stats = {
    revenue: {
      current: 458750000,
      previous: 382000000,
      change: 20.1,
      target: 500000000
    },
    orders: {
      current: 2458,
      previous: 1987,
      change: 23.7,
      target: 3000
    },
    customers: {
      current: 1892,
      previous: 1456,
      change: 29.9,
      target: 2000
    },
    avgOrderValue: {
      current: 1867000,
      previous: 1923000,
      change: -2.9,
      target: 2000000
    },
    conversionRate: {
      current: 3.8,
      previous: 3.2,
      change: 18.8
    },
    profit: {
      current: 125600000,
      previous: 98200000,
      change: 27.9
    }
  };

  const salesData = [
    { month: 'فروردین', revenue: 32500000, orders: 425, profit: 8900000, visitors: 12500 },
    { month: 'اردیبهشت', revenue: 41200000, orders: 562, profit: 11800000, visitors: 15200 },
    { month: 'خرداد', revenue: 38900000, orders: 498, profit: 10200000, visitors: 14100 },
    { month: 'تیر', revenue: 52300000, orders: 678, profit: 15600000, visitors: 18900 },
    { month: 'مرداد', revenue: 68200000, orders: 892, profit: 20100000, visitors: 23400 },
    { month: 'شهریور', revenue: 59800000, orders: 745, profit: 17300000, visitors: 20100 },
    { month: 'مهر', revenue: 73500000, orders: 958, profit: 22400000, visitors: 25800 },
  ];

  const categoryData = [
    { name: 'مراقبت پوست', value: 42.3, revenue: 125600000, color: '#8b5cf6' },
    { name: 'آرایش', value: 30.1, revenue: 89400000, color: '#3b82f6' },
    { name: 'مراقبت مو', value: 15.2, revenue: 45200000, color: '#10b981' },
    { name: 'عطر', value: 12.4, revenue: 37100000, color: '#f59e0b' },
  ];

  const topProducts = [
    {
      id: '1',
      name: 'سرم ویتامین C روشن کننده',
      sales: 156,
      revenue: 70200000,
      growth: 23.5,
    },
    {
      id: '2',
      name: 'کرم مرطوب کننده هیالورونیک',
      sales: 134,
      revenue: 50920000,
      growth: 18.2,
    },
    {
      id: '3',
      name: 'ماسک لایه بردار صورت',
      sales: 98,
      revenue: 28420000,
      growth: -5.3,
    },
    {
      id: '4',
      name: 'کرم ضد آفتاب SPF50',
      sales: 87,
      revenue: 33930000,
      growth: 45.8,
    },
    {
      id: '5',
      name: 'تونر صورت',
      sales: 76,
      revenue: 21280000,
      growth: 12.1,
    },
  ];

  const topCategories = [
    { name: 'مراقبت پوست', sales: 45.2, revenue: 120500000 },
    { name: 'آرایش', sales: 28.7, revenue: 85300000 },
    { name: 'مراقبت مو', sales: 15.3, revenue: 42100000 },
    { name: 'عطر و ادکلن', sales: 10.8, revenue: 31200000 },
  ];

  const recentOrders = [
    {
      id: '1',
      orderNumber: '#12345',
      customer: 'علی احمدی',
      amount: 1230000,
      status: 'DELIVERED',
      date: '۱۴۰۳/۰۸/۱۰',
    },
    {
      id: '2',
      orderNumber: '#12344',
      customer: 'مریم محمدی',
      amount: 850000,
      status: 'PROCESSING',
      date: '۱۴۰۳/۰۸/۰۹',
    },
    {
      id: '3',
      orderNumber: '#12343',
      customer: 'حسین رضایی',
      amount: 2150000,
      status: 'SHIPPED',
      date: '۱۴۰۳/۰۸/۰۹',
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-6 md:p-8 text-white shadow-2xl"
      >
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
        <div className="absolute top-10 right-10 w-32 md:w-72 h-32 md:h-72 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 md:w-96 h-48 md:h-96 bg-teal-400/30 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <BarChart3 className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-xs md:text-sm font-semibold tracking-wider uppercase opacity-90">
              Analytics & Reports
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3">
            گزارش‌ها و تحلیل‌ها 📊
          </h1>
          <p className="text-sm md:text-lg opacity-90 max-w-2xl">
            تحلیل جامع عملکرد فروشگاه، آمار فروش و رفتار مشتریان
          </p>
        </div>
      </motion.div>

      {/* Time Range Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                {['7d', '30d', '90d', '1y'].map((range) => (
                  <Button
                    key={range}
                    size="sm"
                    variant={timeRange === range ? 'default' : 'outline'}
                    onClick={() => setTimeRange(range)}
                    className={timeRange === range ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg' : ''}
                  >
                    {range === '7d' ? '۷ روز' : range === '30d' ? '۳۰ روز' : 
                     range === '90d' ? '۹۰ روز' : 'سال'}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="w-4 h-4" />
                  فیلترها
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  تاریخ
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <div className="h-6 w-px bg-border mx-1" />
                <Button className="gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-lg" size="sm">
                  <Download className="w-4 h-4" />
                  دانلود گزارش
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Printer className="w-4 h-4" />
                  چاپ
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  اشتراک‌گذاری
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-0 shadow-xl">
          <CardContent className="p-2">
            <div className="flex gap-2 overflow-x-auto">
              {[
                { id: 'overview', label: 'نمای کلی', icon: BarChart3 },
                { id: 'sales', label: 'فروش', icon: TrendingUp },
                { id: 'products', label: 'محصولات', icon: Package },
                { id: 'customers', label: 'مشتریان', icon: Users },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? 'default' : 'ghost'}
                    className={`gap-2 ${activeTab === tab.id ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg' : ''}`}
                    onClick={() => setActiveTab(tab.id as any)}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[
          { 
            title: 'فروش کل', 
            value: stats.revenue.current, 
            change: stats.revenue.change,
            icon: DollarSign,
            color: 'from-emerald-500 to-teal-500',
            format: 'currency' as const
          },
          { 
            title: 'تعداد سفارشات', 
            value: stats.orders.current, 
            change: stats.orders.change,
            icon: ShoppingCart,
            color: 'from-blue-500 to-cyan-500',
            format: 'number' as const
          },
          { 
            title: 'مشتریان جدید', 
            value: stats.customers.current, 
            change: stats.customers.change,
            icon: Users,
            color: 'from-purple-500 to-pink-500',
            format: 'number' as const
          },
          { 
            title: 'میانگین سفارش', 
            value: stats.avgOrderValue.current, 
            change: stats.avgOrderValue.change,
            icon: CreditCard,
            color: 'from-orange-500 to-red-500',
            format: 'currency' as const
          },
          { 
            title: 'نرخ تبدیل', 
            value: stats.conversionRate.current, 
            change: stats.conversionRate.change,
            icon: Percent,
            color: 'from-pink-500 to-rose-500',
            format: 'percent' as const
          },
          { 
            title: 'سود خالص', 
            value: stats.profit.current, 
            change: stats.profit.change,
            icon: Target,
            color: 'from-green-500 to-emerald-500',
            format: 'currency' as const
          },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 bg-gradient-to-br ${stat.color} rounded-full blur-2xl`} />
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`relative p-3 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold mb-2 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                    {stat.format === 'currency' ? formatCurrency(stat.value, 'fa') + ' تومان' :
                     stat.format === 'percent' ? toPersianDigits(stat.value.toString()) + '٪' :
                     toPersianDigits(stat.value.toLocaleString())}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 w-fit">
                    {stat.change >= 0 ? (
                      <ArrowUpRight className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                    ) : (
                      <ArrowDownRight className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                    )}
                    <span className={`text-xs font-semibold ${stat.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {toPersianDigits(Math.abs(stat.change).toFixed(1))}٪
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Sales & Revenue Chart */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-emerald-50/20 dark:from-gray-900 dark:to-emerald-950/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                تحلیل فروش و سود
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                روند فروش، سفارشات و سود در ۷ ماه گذشته
              </p>
            </div>
            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
              <Activity className="w-3 h-3 me-1" />
              زنده
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={salesData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="left" />
              <Tooltip />
              <Legend />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                fillOpacity={1} 
                fill="url(#colorRevenue)"
                name="فروش"
              />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="profit" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorProfit)"
                name="سود"
              />
              <Bar yAxisId="right" dataKey="orders" fill="#8b5cf6" name="سفارشات" radius={[8, 8, 0, 0]} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Products & Category Distribution */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">پرفروش‌ترین محصولات</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  محصولات برتر این دوره
                </p>
              </div>
              <Package className="w-6 h-6 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group relative flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700"
                >
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    {toPersianDigits((index + 1).toString())}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 dark:text-white">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {toPersianDigits(product.sales.toString())} فروش • {formatCurrency(product.revenue, 'fa')} تومان
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm font-bold px-3 py-1 rounded-full ${
                      product.growth >= 0 ? 'bg-green-50 text-green-600 dark:bg-green-950' : 'bg-red-50 text-red-600 dark:bg-red-950'
                    }`}
                  >
                    {product.growth >= 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {toPersianDigits(Math.abs(product.growth).toFixed(1))}٪
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">توزیع دسته‌بندی‌ها</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  سهم فروش هر دسته
                </p>
              </div>
              <PieChart className="w-6 h-6 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RePieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${toPersianDigits(value.toFixed(1))}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <span className="text-muted-foreground">
                    {formatCurrency(category.revenue, 'fa')} تومان
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">آخرین سفارشات</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                سفارشات اخیر ثبت شده
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Eye className="w-4 h-4" />
              مشاهده همه
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-start p-4 font-bold">شماره سفارش</th>
                  <th className="text-start p-4 font-bold">مشتری</th>
                  <th className="text-start p-4 font-bold">مبلغ</th>
                  <th className="text-start p-4 font-bold">وضعیت</th>
                  <th className="text-start p-4 font-bold">تاریخ</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, idx) => (
                  <motion.tr 
                    key={order.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="p-4 font-bold">{order.orderNumber}</td>
                    <td className="p-4">{order.customer}</td>
                    <td className="p-4 font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      {formatCurrency(order.amount, 'fa')} تومان
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'DELIVERED' ? 'bg-green-50 text-green-700 dark:bg-green-950' :
                        order.status === 'PROCESSING' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950' :
                        order.status === 'SHIPPED' ? 'bg-purple-50 text-purple-700 dark:bg-purple-950' :
                        'bg-gray-50 text-gray-700 dark:bg-gray-950'
                      }`}>
                        {order.status === 'DELIVERED' ? 'تحویل شده' :
                         order.status === 'PROCESSING' ? 'در حال پردازش' :
                         order.status === 'SHIPPED' ? 'ارسال شده' : order.status}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">{order.date}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
