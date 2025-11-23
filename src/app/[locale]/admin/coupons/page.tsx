'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Copy,
  Calendar,
  Percent,
  DollarSign,
  Filter,
  Grid3x3,
  List,
  Download,
  RefreshCw,
  ChevronDown,
  CheckSquare,
  Square,
  X,
  TrendingUp,
  Tag,
  Ticket,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap,
  MoreVertical,
  Eye,
  EyeOff,
  BarChart3,
  Target,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency, formatDate } from '@/lib/utils';
import { toast } from 'react-hot-toast';
import { toPersianDigits } from '@/lib/utils/numbers';
import Link from 'next/link';

export default function AdminCouponsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCoupons, setSelectedCoupons] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    type: 'PERCENTAGE',
    value: '',
    minPurchase: '',
    maxDiscount: '',
    usageLimit: '',
    expiresAt: '',
  });

  // Mock data
  const coupons = [
    {
      id: '1',
      code: 'SUMMER2024',
      type: 'PERCENTAGE',
      value: 20,
      minPurchase: 500000,
      maxDiscount: 100000,
      usageLimit: 100,
      usedCount: 45,
      isActive: true,
      startsAt: new Date('2024-06-01'),
      expiresAt: new Date('2024-08-31'),
      createdAt: new Date('2024-05-15'),
      description: 'تخفیف ویژه تابستان',
      totalDiscount: 4500000,
      applicableTo: 'all'
    },
    {
      id: '2',
      code: 'WELCOME50',
      type: 'FIXED',
      value: 50000,
      minPurchase: 200000,
      maxDiscount: null,
      usageLimit: null,
      usedCount: 234,
      isActive: true,
      startsAt: null,
      expiresAt: null,
      createdAt: new Date('2024-01-01'),
      description: 'کد تخفیف خوش‌آمدگویی',
      totalDiscount: 11700000,
      applicableTo: 'new'
    },
    {
      id: '3',
      code: 'NEWYEAR2024',
      type: 'PERCENTAGE',
      value: 30,
      minPurchase: 1000000,
      maxDiscount: 200000,
      usageLimit: 50,
      usedCount: 50,
      isActive: false,
      startsAt: new Date('2024-01-01'),
      expiresAt: new Date('2024-01-07'),
      createdAt: new Date('2023-12-20'),
      description: 'جشن سال نو',
      totalDiscount: 10000000,
      applicableTo: 'all'
    },
    {
      id: '4',
      code: 'FLASH15',
      type: 'PERCENTAGE',
      value: 15,
      minPurchase: 300000,
      maxDiscount: 75000,
      usageLimit: 200,
      usedCount: 87,
      isActive: true,
      startsAt: new Date('2024-01-15'),
      expiresAt: new Date('2024-12-31'),
      createdAt: new Date('2024-01-10'),
      description: 'فروش ویژه',
      totalDiscount: 6525000,
      applicableTo: 'all'
    },
    {
      id: '5',
      code: 'VIP100',
      type: 'FIXED',
      value: 100000,
      minPurchase: 1500000,
      maxDiscount: null,
      usageLimit: 30,
      usedCount: 12,
      isActive: true,
      startsAt: null,
      expiresAt: new Date('2024-12-31'),
      createdAt: new Date('2024-02-01'),
      description: 'ویژه مشتریان VIP',
      totalDiscount: 1200000,
      applicableTo: 'vip'
    },
    {
      id: '6',
      code: 'FIRST25',
      type: 'PERCENTAGE',
      value: 25,
      minPurchase: 400000,
      maxDiscount: 150000,
      usageLimit: 500,
      usedCount: 312,
      isActive: true,
      startsAt: null,
      expiresAt: null,
      createdAt: new Date('2024-01-05'),
      description: 'اولین خرید',
      totalDiscount: 46800000,
      applicableTo: 'first'
    },
  ];

  const stats = [
    {
      title: 'کل کدها',
      value: toPersianDigits(coupons.length.toString()),
      change: '+12%',
      icon: Ticket,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950'
    },
    {
      title: 'فعال',
      value: toPersianDigits(coupons.filter(c => c.isActive).length.toString()),
      change: '+8%',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950'
    },
    {
      title: 'استفاده شده',
      value: toPersianDigits(coupons.reduce((sum, c) => sum + c.usedCount, 0).toString()),
      change: '+34%',
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950'
    },
    {
      title: 'تخفیف داده شده',
      value: toPersianDigits((coupons.reduce((sum, c) => sum + c.totalDiscount, 0) / 1000000).toFixed(1)) + 'M',
      change: '+18%',
      icon: DollarSign,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950'
    },
  ];

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || coupon.type === typeFilter;
    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'active' && coupon.isActive) ||
      (statusFilter === 'inactive' && !coupon.isActive) ||
      (statusFilter === 'expired' && coupon.expiresAt && coupon.expiresAt < new Date());

    return matchesSearch && matchesType && matchesStatus;
  });

  const toggleCouponSelection = (id: string) => {
    setSelectedCoupons(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedCoupons.length === filteredCoupons.length) {
      setSelectedCoupons([]);
    } else {
      setSelectedCoupons(filteredCoupons.map(c => c.id));
    }
  };

  const handleBulkDelete = () => {
    toast.success(`${toPersianDigits(selectedCoupons.length.toString())} کد تخفیف حذف شد`);
    setSelectedCoupons([]);
  };

  const handleExport = () => {
    toast.success('فایل کدهای تخفیف در حال دانلود است');
  };

  const getUsagePercentage = (coupon: any) => {
    if (!coupon.usageLimit) return 0;
    return (coupon.usedCount / coupon.usageLimit) * 100;
  };

  const isExpired = (coupon: any) => {
    return coupon.expiresAt && coupon.expiresAt < new Date();
  };

  const isExpiringSoon = (coupon: any) => {
    if (!coupon.expiresAt) return false;
    const daysUntilExpiry = Math.ceil((coupon.expiresAt.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry > 0 && daysUntilExpiry <= 7;
  };

  const getStatusBadge = (coupon: any) => {
    if (isExpired(coupon)) {
      return (
        <Badge className="bg-red-100 text-red-700">
          <XCircle className="w-3 h-3 me-1" />
          منقضی شده
        </Badge>
      );
    }
    if (isExpiringSoon(coupon)) {
      return (
        <Badge className="bg-yellow-100 text-yellow-700">
          <AlertCircle className="w-3 h-3 me-1" />
          در حال انقضا
        </Badge>
      );
    }
    if (coupon.isActive) {
      return (
        <Badge className="bg-green-100 text-green-700">
          <CheckCircle className="w-3 h-3 me-1" />
          فعال
        </Badge>
      );
    }
    return (
      <Badge variant="secondary">
        <XCircle className="w-3 h-3 me-1" />
        غیرفعال
      </Badge>
    );
  };

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('کد تخفیف کپی شد');
  };

  const handleDeleteCoupon = (id: string) => {
    toast.success('کد تخفیف حذف شد');
  };

  const handleToggleActive = (id: string) => {
    toast.success('وضعیت تغییر کرد');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('کد تخفیف جدید ایجاد شد');
    setShowAddModal(false);
    setFormData({
      code: '',
      type: 'PERCENTAGE',
      value: '',
      minPurchase: '',
      maxDiscount: '',
      usageLimit: '',
      expiresAt: '',
    });
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Modern Header با Gradient */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 p-8 text-white shadow-2xl"
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
                <Ticket className="w-6 h-6" />
                <span className="text-sm font-semibold tracking-wider uppercase opacity-90">
                  Coupons Management
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">مدیریت کدهای تخفیف</h1>
              <p className="text-sm md:text-base opacity-90">
                {toPersianDigits(filteredCoupons.length.toString())} کد از {toPersianDigits(coupons.length.toString())}
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
                onClick={() => setShowAddModal(true)}
                className="gap-2 bg-white text-teal-600 hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" />
                کد جدید
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => {
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

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="جستجوی کد تخفیف..."
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

                  <div className="flex border rounded-lg p-1 bg-gray-100 dark:bg-gray-800">
                    <Button
                      variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="px-3"
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="px-3"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Filters */}
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
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                      >
                        <option value="all">همه انواع</option>
                        <option value="PERCENTAGE">درصدی</option>
                        <option value="FIXED">مقدار ثابت</option>
                      </select>

                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                      >
                        <option value="all">همه وضعیت‌ها</option>
                        <option value="active">فعال</option>
                        <option value="inactive">غیرفعال</option>
                        <option value="expired">منقضی شده</option>
                      </select>

                      <select className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm">
                        <option value="recent">جدیدترین</option>
                        <option value="oldest">قدیمی‌ترین</option>
                        <option value="most-used">پراستفاده‌ترین</option>
                      </select>

                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          setSearchTerm('');
                          setTypeFilter('all');
                          setStatusFilter('all');
                        }}
                      >
                        <RefreshCw className="w-4 h-4 me-2" />
                        پاک کردن
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bulk Actions */}
              {selectedCoupons.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20"
                >
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-primary" />
                    <span className="font-semibold">
                      {toPersianDigits(selectedCoupons.length.toString())} کد انتخاب شده
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => setSelectedCoupons([])}>
                      <X className="w-4 h-4 me-1" />
                      لغو
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 me-1" />
                      فعال/غیرفعال
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

      {/* Coupons Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredCoupons.map((coupon, idx) => (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <Card className="border-0 shadow-lg h-full overflow-hidden">
                <div className="relative h-32 bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                  <div className="absolute top-3 right-3">
                    <Button
                      size="sm"
                      variant={selectedCoupons.includes(coupon.id) ? 'default' : 'secondary'}
                      className="w-8 h-8 p-0 rounded-full"
                      onClick={() => toggleCouponSelection(coupon.id)}
                    >
                      {selectedCoupons.includes(coupon.id) ? (
                        <CheckSquare className="w-4 h-4" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <div className="text-center">
                    <div className="px-4 py-2 bg-white/90 backdrop-blur rounded-xl font-mono font-bold text-xl text-teal-600 shadow-lg">
                      {coupon.code}
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-8 h-8 p-0"
                      onClick={() => handleCopyCoupon(coupon.code)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      {getStatusBadge(coupon)}
                      {coupon.type === 'PERCENTAGE' ? (
                        <div className="flex items-center gap-1 text-sm font-bold text-primary">
                          <Percent className="w-4 h-4" />
                          {toPersianDigits(coupon.value.toString())}٪
                        </div>
                      ) : (
                        <div className="text-sm font-bold text-primary">
                          {formatCurrency(coupon.value, 'fa')} ت
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-1">{coupon.description}</p>

                    {coupon.usageLimit && (
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">استفاده شده</span>
                          <span className="font-semibold">
                            {toPersianDigits(coupon.usedCount.toString())} / {toPersianDigits(coupon.usageLimit.toString())}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all"
                            style={{ width: `${getUsagePercentage(coupon)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2 border-t">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => handleToggleActive(coupon.id)}>
                        {coupon.isActive ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </Button>
                      <Button variant="outline" size="sm" className="px-3" onClick={() => handleDeleteCoupon(coupon.id)}>
                        <Trash2 className="w-3 h-3 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCoupons.map((coupon, idx) => (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
            >
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Left Side */}
                    <div className="md:w-64 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950 dark:to-emerald-950 p-6 border-b md:border-b-0 md:border-l flex flex-col items-center justify-center gap-3">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleCouponSelection(coupon.id)}
                        className="absolute top-3 right-3 w-6 h-6 p-0"
                      >
                        {selectedCoupons.includes(coupon.id) ? (
                          <CheckSquare className="w-4 h-4 text-primary" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </Button>

                      <div className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-mono font-bold text-2xl shadow-lg">
                        {coupon.code}
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyCoupon(coupon.code)}
                        className="gap-2"
                      >
                        <Copy className="w-3 h-3" />
                        کپی کد
                      </Button>
                      {getStatusBadge(coupon)}
                    </div>

                    {/* Right Side */}
                    <div className="flex-1 p-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">{coupon.description}</p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">نوع تخفیف</p>
                            <div className="flex items-center gap-1 font-semibold">
                              {coupon.type === 'PERCENTAGE' ? (
                                <>
                                  <Percent className="w-4 h-4 text-primary" />
                                  {toPersianDigits(coupon.value.toString())}٪
                                </>
                              ) : (
                                <>
                                  <DollarSign className="w-4 h-4 text-primary" />
                                  {formatCurrency(coupon.value, 'fa')}
                                </>
                              )}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground mb-1">حداقل خرید</p>
                            <p className="font-semibold text-sm">{formatCurrency(coupon.minPurchase, 'fa')}</p>
                          </div>

                          {coupon.maxDiscount && (
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">حداکثر تخفیف</p>
                              <p className="font-semibold text-sm">{formatCurrency(coupon.maxDiscount, 'fa')}</p>
                            </div>
                          )}

                          <div>
                            <p className="text-xs text-muted-foreground mb-1">تخفیف داده شده</p>
                            <p className="font-semibold text-sm">{formatCurrency(coupon.totalDiscount, 'fa')}</p>
                          </div>
                        </div>

                        {coupon.usageLimit && (
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">میزان استفاده</span>
                              <span className="font-semibold">
                                {toPersianDigits(coupon.usedCount.toString())} / {toPersianDigits(coupon.usageLimit.toString())}
                              </span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all"
                                style={{ width: `${getUsagePercentage(coupon)}%` }}
                              />
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {coupon.expiresAt ? formatDate(coupon.expiresAt, 'fa-IR') : 'بدون انقضا'}
                          </span>
                        </div>

                        <div className="flex gap-2 pt-2 border-t">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3 me-1" />
                            ویرایش
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleToggleActive(coupon.id)}>
                            {coupon.isActive ? <EyeOff className="w-3 h-3 me-1" /> : <Eye className="w-3 h-3 me-1" />}
                            {coupon.isActive ? 'غیرفعال' : 'فعال'}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteCoupon(coupon.id)}>
                            <Trash2 className="w-3 h-3 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredCoupons.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Ticket className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-bold mb-2">کد تخفیفی یافت نشد</h3>
          <p className="text-muted-foreground mb-4">لطفاً فیلترهای دیگری امتحان کنید</p>
          <Button 
            onClick={() => {
              setSearchTerm('');
              setTypeFilter('all');
              setStatusFilter('all');
            }}
          >
            <RefreshCw className="w-4 h-4 me-2" />
            پاک کردن فیلترها
          </Button>
        </motion.div>
      )}

      {/* Add Coupon Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>افزودن کد تخفیف جدید</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    کد تخفیف *
                  </label>
                  <Input
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value.toUpperCase() })
                    }
                    placeholder="SUMMER2024"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    نوع تخفیف *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="PERCENTAGE">درصدی</option>
                    <option value="FIXED">مقدار ثابت</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {formData.type === 'PERCENTAGE' ? 'درصد تخفیف *' : 'مبلغ تخفیف (تومان) *'}
                  </label>
                  <Input
                    type="number"
                    value={formData.value}
                    onChange={(e) =>
                      setFormData({ ...formData, value: e.target.value })
                    }
                    placeholder={formData.type === 'PERCENTAGE' ? '20' : '50000'}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      حداقل خرید (تومان)
                    </label>
                    <Input
                      type="number"
                      value={formData.minPurchase}
                      onChange={(e) =>
                        setFormData({ ...formData, minPurchase: e.target.value })
                      }
                      placeholder="500000"
                    />
                  </div>

                  {formData.type === 'PERCENTAGE' && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        حداکثر تخفیف (تومان)
                      </label>
                      <Input
                        type="number"
                        value={formData.maxDiscount}
                        onChange={(e) =>
                          setFormData({ ...formData, maxDiscount: e.target.value })
                        }
                        placeholder="100000"
                      />
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      محدودیت استفاده
                    </label>
                    <Input
                      type="number"
                      value={formData.usageLimit}
                      onChange={(e) =>
                        setFormData({ ...formData, usageLimit: e.target.value })
                      }
                      placeholder="100"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      تاریخ انقضا
                    </label>
                    <Input
                      type="date"
                      value={formData.expiresAt}
                      onChange={(e) =>
                        setFormData({ ...formData, expiresAt: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    ایجاد کد تخفیف
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddModal(false)}
                  >
                    انصراف
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
