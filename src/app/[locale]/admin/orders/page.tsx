'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Eye,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Package,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Download,
  Upload,
  Printer,
  RefreshCw,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  User,
  Edit,
  Trash2,
  MoreVertical,
  CheckSquare,
  Square,
  X,
  ArrowRight,
  Box,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Zap,
  Star,
  MessageSquare,
  FileText,
  ExternalLink,
  Copy,
  Ban
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency, formatDate } from '@/lib/utils';
import { toPersianDigits } from '@/lib/utils/numbers';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'timeline'>('table');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Mock data - در production از API می‌آید
  const orders = [
    {
      id: '1',
      orderNumber: '#12345',
      customer: {
        name: 'علی احمدی',
        email: 'ali@example.com',
        phone: '09123456789',
      },
      items: 3,
      total: 1230000,
      status: 'PROCESSING',
      paymentStatus: 'PAID',
      paymentMethod: 'CARD',
      createdAt: new Date('2024-01-15'),
      shippingAddress: {
        city: 'تهران',
        province: 'تهران',
        address: 'خیابان ولیعصر، پلاک ۱۲۳',
        postalCode: '1234567890'
      },
      tracking: 'TRK123456789',
      notes: 'تحویل سریع',
      products: [
        { name: 'سرم ویتامین C', quantity: 2, price: 450000 },
        { name: 'کرم مرطوب کننده', quantity: 1, price: 330000 }
      ]
    },
    {
      id: '2',
      orderNumber: '#12344',
      customer: {
        name: 'مریم محمدی',
        email: 'maryam@example.com',
        phone: '09121234567',
      },
      items: 2,
      total: 850000,
      status: 'DELIVERED',
      paymentStatus: 'PAID',
      createdAt: new Date('2024-01-14'),
      shippingAddress: {
        city: 'مشهد',
        province: 'خراسان رضوی',
      },
    },
    {
      id: '3',
      orderNumber: '#12343',
      customer: {
        name: 'حسین رضایی',
        email: 'hossein@example.com',
        phone: '09131234567',
      },
      items: 5,
      total: 2150000,
      status: 'SHIPPED',
      paymentStatus: 'PAID',
      createdAt: new Date('2024-01-13'),
      shippingAddress: {
        city: 'اصفهان',
        province: 'اصفهان',
      },
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: any }> = {
      PENDING: { label: 'در انتظار', variant: 'secondary' },
      CONFIRMED: { label: 'تأیید شده', variant: 'default' },
      PROCESSING: { label: 'در حال پردازش', variant: 'default' },
      SHIPPED: { label: 'ارسال شده', variant: 'default' },
      DELIVERED: { label: 'تحویل داده شده', variant: 'default' },
      CANCELLED: { label: 'لغو شده', variant: 'destructive' },
    };

    const config = statusConfig[status] || statusConfig.PENDING;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPaymentBadge = (status: string) => {
    return status === 'PAID' ? (
      <Badge className="bg-green-100 text-green-700">پرداخت شده</Badge>
    ) : (
      <Badge variant="destructive">پرداخت نشده</Badge>
    );
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const toggleOrderSelection = (id: string) => {
    setSelectedOrders(prev =>
      prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(o => o.id));
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    toast.success(`وضعیت سفارش به "${newStatus}" تغییر کرد`);
  };

  const handleBulkDelete = () => {
    toast.success(`${toPersianDigits(selectedOrders.length.toString())} سفارش حذف شد`);
    setSelectedOrders([]);
  };

  const handleExport = () => {
    toast.success('فایل سفارشات در حال دانلود است');
  };

  const handlePrint = (orderId: string) => {
    toast.success('در حال آماده‌سازی برای چاپ');
  };

  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Modern Header با Gradient */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 p-8 text-white shadow-2xl"
      >
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
        <div className="absolute top-10 right-10 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart className="w-6 h-6" />
                <span className="text-sm font-semibold tracking-wider uppercase opacity-90">
                  Orders Management
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">مدیریت سفارشات</h1>
              <p className="text-sm md:text-base opacity-90">
                {toPersianDigits(filteredOrders.length.toString())} سفارش • 
                درآمد: {formatCurrency(totalRevenue, 'fa')} تومان
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={handleExport}
                variant="secondary"
                className="gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">خروجی</span>
              </Button>
              <Button 
                variant="secondary"
                className="gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">به‌روزرسانی</span>
              </Button>
              <Button className="gap-2 bg-white text-cyan-600 hover:bg-gray-100">
                <Printer className="w-4 h-4" />
                چاپ
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards با Animation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[
          {
            title: 'کل سفارشات',
            value: '245',
            change: '+12%',
            icon: ShoppingCart,
            color: 'text-blue-500',
            bgColor: 'bg-blue-50 dark:bg-blue-950',
          },
          {
            title: 'در حال پردازش',
            value: '45',
            change: '+8%',
            icon: Clock,
            color: 'text-orange-500',
            bgColor: 'bg-orange-50 dark:bg-orange-950',
          },
          {
            title: 'تحویل شده',
            value: '189',
            change: '+15%',
            icon: CheckCircle,
            color: 'text-green-500',
            bgColor: 'bg-green-50 dark:bg-green-950',
          },
          {
            title: 'درآمد امروز',
            value: `${toPersianDigits((totalRevenue / 1000000).toFixed(1))}M`,
            change: '+23%',
            icon: DollarSign,
            color: 'text-purple-500',
            bgColor: 'bg-purple-50 dark:bg-purple-950',
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all">
                <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bgColor} opacity-10 rounded-full blur-2xl`} />
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 md:p-3 rounded-xl ${stat.bgColor} shadow-md`}>
                      <Icon className={`h-5 w-5 md:h-6 md:w-6 ${stat.color}`} />
                    </div>
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      <TrendingUp className="w-3 h-3 me-1" />
                      {stat.change}
                    </Badge>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-xl md:text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Advanced Toolbar و Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col gap-4">
              {/* Search و Quick Actions */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="جستجوی شماره سفارش، نام مشتری، شماره تماس..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pe-10 h-11"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant={showFilters ? 'default' : 'outline'}
                    onClick={() => setShowFilters(!showFilters)}
                    className="gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    فیلترها
                    {showFilters && <ChevronDown className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Advanced Filters با Animation */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid md:grid-cols-4 gap-3 pt-4 border-t">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                      >
                        <option value="all">همه وضعیت‌ها</option>
                        <option value="PENDING">در انتظار</option>
                        <option value="CONFIRMED">تأیید شده</option>
                        <option value="PROCESSING">در حال پردازش</option>
                        <option value="SHIPPED">ارسال شده</option>
                        <option value="DELIVERED">تحویل داده شده</option>
                        <option value="CANCELLED">لغو شده</option>
                      </select>

                      <select
                        value={paymentFilter}
                        onChange={(e) => setPaymentFilter(e.target.value)}
                        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                      >
                        <option value="all">همه پرداخت‌ها</option>
                        <option value="PAID">پرداخت شده</option>
                        <option value="UNPAID">پرداخت نشده</option>
                        <option value="REFUNDED">بازگشت داده شده</option>
                      </select>

                      <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                      >
                        <option value="all">همه تاریخ‌ها</option>
                        <option value="today">امروز</option>
                        <option value="week">این هفته</option>
                        <option value="month">این ماه</option>
                        <option value="custom">سفارشی...</option>
                      </select>

                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          setSearchTerm('');
                          setStatusFilter('all');
                          setPaymentFilter('all');
                          setDateRange('all');
                        }}
                      >
                        <RefreshCw className="w-4 h-4 me-2" />
                        پاک کردن فیلترها
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bulk Actions Toolbar */}
              {selectedOrders.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20"
                >
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-primary" />
                    <span className="font-semibold">
                      {toPersianDigits(selectedOrders.length.toString())} سفارش انتخاب شده
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => setSelectedOrders([])}>
                      <X className="w-4 h-4 me-1" />
                      لغو
                    </Button>
                    <Button size="sm" variant="outline">
                      <Printer className="w-4 h-4 me-1" />
                      چاپ
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 me-1" />
                      خروجی
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 me-1" />
                      تغییر وضعیت
                    </Button>
                    <Button size="sm" variant="destructive" onClick={handleBulkDelete}>
                      <Trash2 className="w-4 h-4 me-1" />
                      حذف
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modern Orders Table با Expandable Rows */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">
              لیست سفارشات ({toPersianDigits(filteredOrders.length.toString())})
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleSelectAll}
                className="text-xs"
              >
                {selectedOrders.length === filteredOrders.length ? 'لغو انتخاب همه' : 'انتخاب همه'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b">
                <tr>
                  <th className="p-4 text-start w-12">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={toggleSelectAll}
                      className="w-8 h-8 p-0"
                    >
                      {selectedOrders.length === filteredOrders.length && filteredOrders.length > 0 ? (
                        <CheckSquare className="w-4 h-4" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </Button>
                  </th>
                  <th className="p-4 text-start font-semibold text-sm">سفارش</th>
                  <th className="p-4 text-start font-semibold text-sm">مشتری</th>
                  <th className="p-4 text-start font-semibold text-sm">محصولات</th>
                  <th className="p-4 text-start font-semibold text-sm">مبلغ</th>
                  <th className="p-4 text-start font-semibold text-sm">وضعیت</th>
                  <th className="p-4 text-start font-semibold text-sm">پرداخت</th>
                  <th className="p-4 text-start font-semibold text-sm">تاریخ</th>
                  <th className="p-4 text-center font-semibold text-sm">عملیات</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredOrders.map((order, idx) => (
                    <React.Fragment key={order.id}>
                      <motion.tr
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: idx * 0.03 }}
                        className={`border-b hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                          expandedOrder === order.id ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="p-4">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleOrderSelection(order.id)}
                            className="w-8 h-8 p-0"
                          >
                            {selectedOrders.includes(order.id) ? (
                              <CheckSquare className="w-4 h-4 text-primary" />
                            ) : (
                              <Square className="w-4 h-4" />
                            )}
                          </Button>
                        </td>

                        {/* Order Number */}
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                              className="p-0 h-6 w-6"
                            >
                              <ChevronRight 
                                className={`w-4 h-4 transition-transform ${
                                  expandedOrder === order.id ? 'rotate-90' : ''
                                }`}
                              />
                            </Button>
                            <div>
                              <p className="font-bold text-sm">{order.orderNumber}</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatDate(order.createdAt, 'fa-IR')}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Customer */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                              {order.customer.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-sm">{order.customer.name}</p>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Phone className="w-3 h-3" />
                                <span dir="ltr">{toPersianDigits(order.customer.phone)}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Items Count */}
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-muted-foreground" />
                            <span className="font-semibold">{toPersianDigits(order.items.toString())}</span>
                            <span className="text-sm text-muted-foreground">محصول</span>
                          </div>
                        </td>

                        {/* Total Amount */}
                        <td className="p-4">
                          <div>
                            <p className="font-bold text-sm bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                              {formatCurrency(order.total, 'fa')}
                            </p>
                            <p className="text-xs text-muted-foreground">تومان</p>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="p-4">{getStatusBadge(order.status)}</td>

                        {/* Payment Status */}
                        <td className="p-4">{getPaymentBadge(order.paymentStatus)}</td>

                        {/* Shipping Address */}
                        <td className="p-4">
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="w-3 h-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{order.shippingAddress.city}</span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handlePrint(order.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Printer className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>

                      {/* Expanded Row Details */}
                      <AnimatePresence>
                        {expandedOrder === order.id && (
                          <motion.tr
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-blue-50/30 dark:bg-blue-950/10 border-b"
                          >
                            <td colSpan={9} className="p-0">
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="p-6 grid md:grid-cols-3 gap-6">
                                  {/* Customer Details */}
                                  <Card className="border-0 shadow-sm">
                                    <CardHeader className="pb-3">
                                      <CardTitle className="text-sm flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        اطلاعات مشتری
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2 text-sm">
                                      <div className="flex items-start gap-2">
                                        <User className="w-4 h-4 text-muted-foreground mt-0.5" />
                                        <div>
                                          <p className="font-semibold">{order.customer.name}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-muted-foreground" />
                                        <p className="text-muted-foreground">{order.customer.email}</p>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-muted-foreground" />
                                        <p className="text-muted-foreground" dir="ltr">{toPersianDigits(order.customer.phone)}</p>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Shipping Details */}
                                  {order.shippingAddress && (
                                    <Card className="border-0 shadow-sm">
                                      <CardHeader className="pb-3">
                                        <CardTitle className="text-sm flex items-center gap-2">
                                          <MapPin className="w-4 h-4" />
                                          آدرس تحویل
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-2 text-sm">
                                        <div className="flex items-start gap-2">
                                          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                                          <div>
                                            <p className="text-muted-foreground">
                                              {order.shippingAddress.province}، {order.shippingAddress.city}
                                            </p>
                                            {order.shippingAddress.address && (
                                              <p className="text-muted-foreground mt-1">
                                                {order.shippingAddress.address}
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                        {order.shippingAddress.postalCode && (
                                          <div className="flex items-center gap-2">
                                            <Package className="w-4 h-4 text-muted-foreground" />
                                            <p className="text-muted-foreground font-mono" dir="ltr">
                                              {toPersianDigits(order.shippingAddress.postalCode)}
                                            </p>
                                          </div>
                                        )}
                                        {order.tracking && (
                                          <div className="flex items-center gap-2 mt-3 p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
                                            <Truck className="w-4 h-4 text-blue-600" />
                                            <div>
                                              <p className="text-xs text-muted-foreground">کد رهگیری:</p>
                                              <p className="font-mono font-bold text-blue-600">{order.tracking}</p>
                                            </div>
                                          </div>
                                        )}
                                      </CardContent>
                                    </Card>
                                  )}

                                  {/* Payment Details */}
                                  <Card className="border-0 shadow-sm">
                                    <CardHeader className="pb-3">
                                      <CardTitle className="text-sm flex items-center gap-2">
                                        <CreditCard className="w-4 h-4" />
                                        جزئیات پرداخت
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-sm">
                                      <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">وضعیت:</span>
                                        {getPaymentBadge(order.paymentStatus)}
                                      </div>
                                      {order.paymentMethod && (
                                        <div className="flex items-center justify-between">
                                          <span className="text-muted-foreground">روش پرداخت:</span>
                                          <Badge variant="outline">
                                            {order.paymentMethod === 'CARD' ? 'کارت بانکی' : 'نقدی'}
                                          </Badge>
                                        </div>
                                      )}
                                      <div className="flex items-center justify-between pt-2 border-t">
                                        <span className="font-semibold">مبلغ کل:</span>
                                        <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                          {formatCurrency(order.total, 'fa')}
                                        </span>
                                      </div>
                                      {order.notes && (
                                        <div className="pt-2 border-t">
                                          <p className="text-xs text-muted-foreground mb-1">یادداشت:</p>
                                          <p className="text-sm">{order.notes}</p>
                                        </div>
                                      )}
                                    </CardContent>
                                  </Card>

                                  {/* Order Products */}
                                  {order.products && order.products.length > 0 && (
                                    <Card className="border-0 shadow-sm md:col-span-3">
                                      <CardHeader className="pb-3">
                                        <CardTitle className="text-sm flex items-center gap-2">
                                          <Box className="w-4 h-4" />
                                          محصولات سفارش
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="space-y-2">
                                          {order.products.map((product, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                              <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                                  <Package className="w-5 h-5 text-primary" />
                                                </div>
                                                <div>
                                                  <p className="font-semibold text-sm">{product.name}</p>
                                                  <p className="text-xs text-muted-foreground">
                                                    تعداد: {toPersianDigits(product.quantity.toString())}
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="text-end">
                                                <p className="font-bold text-sm">
                                                  {formatCurrency(product.price, 'fa')}
                                                </p>
                                                <p className="text-xs text-muted-foreground">تومان</p>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </CardContent>
                                    </Card>
                                  )}
                                </div>

                                {/* Quick Actions */}
                                <div className="px-6 pb-6 flex gap-2">
                                  <Button size="sm" className="gap-2">
                                    <Edit className="w-4 h-4" />
                                    ویرایش سفارش
                                  </Button>
                                  <Button size="sm" variant="outline" className="gap-2">
                                    <Printer className="w-4 h-4" />
                                    چاپ فاکتور
                                  </Button>
                                  <Button size="sm" variant="outline" className="gap-2">
                                    <MessageSquare className="w-4 h-4" />
                                    پیام به مشتری
                                  </Button>
                                  <Button size="sm" variant="outline" className="gap-2" onClick={() => toast.success('لینک کپی شد')}>
                                    <Copy className="w-4 h-4" />
                                    کپی لینک
                                  </Button>
                                </div>
                              </motion.div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <ShoppingCart className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-2">سفارشی یافت نشد</h3>
              <p className="text-muted-foreground mb-4">لطفاً فیلترهای دیگری امتحان کنید</p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setPaymentFilter('all');
                  setDateRange('all');
                }}
              >
                <RefreshCw className="w-4 h-4 me-2" />
                پاک کردن فیلترها
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
