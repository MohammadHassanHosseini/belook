'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  UserPlus,
  Edit,
  Trash2,
  Mail,
  Shield,
  Users as UsersIcon,
  Crown,
  Star,
  TrendingUp,
  CheckCircle,
  XCircle,
  MoreVertical,
  Eye,
  Ban,
  Download,
  Upload,
  Filter,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  DollarSign,
  Clock,
  Activity,
  CheckSquare,
  Square,
  X,
  Award,
  Target,
  Zap,
  Heart,
  MessageSquare,
  Settings,
  Lock,
  Unlock,
  UserCheck,
  UserX,
  Copy,
  AlertCircle,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDate } from '@/lib/utils';
import { toPersianDigits } from '@/lib/utils/numbers';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  const users = [
    {
      id: '1',
      name: 'علی احمدی',
      email: 'ali@example.com',
      phone: '09123456789',
      role: 'customer',
      orders: 12,
      totalSpent: 5600000,
      status: 'active',
      createdAt: new Date('2024-01-15'),
      lastLogin: new Date('2024-03-20'),
      avatar: '/avatars/1.jpg',
      address: { city: 'تهران', province: 'تهران' },
      isVIP: false,
      rating: 4.5,
      reviews: 8,
      wishlist: 15
    },
    {
      id: '2',
      name: 'مریم محمدی',
      email: 'maryam@example.com',
      phone: '09121234567',
      role: 'customer',
      orders: 8,
      totalSpent: 3200000,
      status: 'active',
      createdAt: new Date('2024-02-10'),
      lastLogin: new Date('2024-03-22'),
      avatar: '/avatars/2.jpg',
      address: { city: 'مشهد', province: 'خراسان رضوی' },
      isVIP: false,
      rating: 4.8,
      reviews: 5,
      wishlist: 8
    },
    {
      id: '3',
      name: 'ادمین',
      email: 'admin@belook.ir',
      phone: '09131234567',
      role: 'admin',
      orders: 0,
      totalSpent: 0,
      status: 'active',
      createdAt: new Date('2023-12-01'),
      lastLogin: new Date('2024-03-23'),
      avatar: '/avatars/admin.jpg',
      address: { city: 'تهران', province: 'تهران' },
      isVIP: false,
      rating: 5,
      reviews: 0,
      wishlist: 0
    },
    {
      id: '4',
      name: 'حسین رضایی',
      email: 'hossein@example.com',
      phone: '09191234567',
      role: 'vip',
      orders: 24,
      totalSpent: 12400000,
      status: 'active',
      createdAt: new Date('2023-11-15'),
      lastLogin: new Date('2024-03-22'),
      avatar: '/avatars/4.jpg',
      address: { city: 'اصفهان', province: 'اصفهان' },
      isVIP: true,
      rating: 4.9,
      reviews: 12,
      wishlist: 25
    },
    {
      id: '5',
      name: 'زهرا کریمی',
      email: 'zahra@example.com',
      phone: '09171234567',
      role: 'customer',
      orders: 3,
      totalSpent: 890000,
      status: 'inactive',
      createdAt: new Date('2024-03-01'),
      lastLogin: new Date('2024-03-10'),
      avatar: '/avatars/5.jpg',
      address: { city: 'شیراز', province: 'فارس' },
      isVIP: false,
      rating: 4.2,
      reviews: 2,
      wishlist: 5
    },
    {
      id: '6',
      name: 'محمد امینی',
      email: 'mohammad@example.com',
      phone: '09151234567',
      role: 'customer',
      orders: 0,
      totalSpent: 0,
      status: 'banned',
      createdAt: new Date('2024-02-20'),
      lastLogin: new Date('2024-02-25'),
      avatar: '/avatars/6.jpg',
      address: { city: 'تبریز', province: 'آذربایجان شرقی' },
      isVIP: false,
      rating: 0,
      reviews: 0,
      wishlist: 0
    },
  ];

  const stats = [
    { 
      title: 'کل کاربران', 
      value: toPersianDigits('1,234'), 
      change: '+12%',
      icon: UsersIcon,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950'
    },
    { 
      title: 'کاربران فعال', 
      value: toPersianDigits('1,156'), 
      change: '+8%',
      icon: UserCheck,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950'
    },
    { 
      title: 'کاربران VIP', 
      value: toPersianDigits('89'), 
      change: '+15%',
      icon: Crown,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950'
    },
    { 
      title: 'کاربران جدید (این ماه)', 
      value: toPersianDigits('67'), 
      change: '+23%',
      icon: UserPlus,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950'
    },
  ];

  const getRoleBadge = (role: string) => {
    const roleConfig: Record<string, { label: string; className: string; icon: any }> = {
      admin: { 
        label: 'ادمین', 
        className: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
        icon: Shield
      },
      vip: { 
        label: 'VIP', 
        className: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
        icon: Crown
      },
      customer: { 
        label: 'مشتری', 
        className: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
        icon: UsersIcon
      },
    };

    const config = roleConfig[role] || roleConfig.customer;
    const Icon = config.icon;
    return (
      <Badge className={config.className}>
        <Icon className="w-3 h-3 me-1" />
        {config.label}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string; icon: any }> = {
      active: { 
        label: 'فعال', 
        className: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
        icon: CheckCircle
      },
      inactive: { 
        label: 'غیرفعال', 
        className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
        icon: Clock
      },
      banned: { 
        label: 'مسدود', 
        className: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
        icon: Ban
      },
    };

    const config = statusConfig[status] || statusConfig.inactive;
    const Icon = config.icon;
    return (
      <Badge className={config.className}>
        <Icon className="w-3 h-3 me-1" />
        {config.label}
      </Badge>
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const toggleUserSelection = (id: string) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(u => u.id));
    }
  };

  const handleBulkDelete = () => {
    toast.success(`${toPersianDigits(selectedUsers.length.toString())} کاربر حذف شد`);
    setSelectedUsers([]);
  };

  const handleExport = () => {
    toast.success('فایل کاربران در حال دانلود است');
  };

  const handleSendEmail = (userId?: string) => {
    if (userId) {
      toast.success('ایمیل ارسال شد');
    } else {
      toast.success(`ایمیل به ${toPersianDigits(selectedUsers.length.toString())} کاربر ارسال شد`);
    }
  };

  const handleStatusChange = (userId: string, newStatus: string) => {
    toast.success(`وضعیت کاربر به "${newStatus}" تغییر کرد`);
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Modern Header با Gradient */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 p-8 text-white shadow-2xl"
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
                <UsersIcon className="w-6 h-6" />
                <span className="text-sm font-semibold tracking-wider uppercase opacity-90">
                  Users Management
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">مدیریت کاربران</h1>
              <p className="text-sm md:text-base opacity-90">
                {toPersianDigits(filteredUsers.length.toString())} کاربر از {toPersianDigits(users.length.toString())}
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
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">وارد کردن</span>
              </Button>
              <Link href="/admin/users/new">
                <Button className="gap-2 bg-white text-purple-600 hover:bg-gray-100">
                  <UserPlus className="w-4 h-4" />
                  کاربر جدید
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards با Animation */}
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
                    placeholder="جستجوی نام، ایمیل، شماره تماس..."
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

              {/* Advanced Filters */}
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
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                      >
                        <option value="all">همه نقش‌ها</option>
                        <option value="admin">ادمین</option>
                        <option value="vip">VIP</option>
                        <option value="customer">مشتری</option>
                      </select>

                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                      >
                        <option value="all">همه وضعیت‌ها</option>
                        <option value="active">فعال</option>
                        <option value="inactive">غیرفعال</option>
                        <option value="banned">مسدود</option>
                      </select>

                      <select className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm">
                        <option value="all">همه تاریخ‌ها</option>
                        <option value="today">امروز</option>
                        <option value="week">این هفته</option>
                        <option value="month">این ماه</option>
                      </select>

                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          setSearchTerm('');
                          setRoleFilter('all');
                          setStatusFilter('all');
                        }}
                      >
                        <RefreshCw className="w-4 h-4 me-2" />
                        پاک کردن فیلترها
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bulk Actions */}
              {selectedUsers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20"
                >
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-primary" />
                    <span className="font-semibold">
                      {toPersianDigits(selectedUsers.length.toString())} کاربر انتخاب شده
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => setSelectedUsers([])}>
                      <X className="w-4 h-4 me-1" />
                      لغو
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleSendEmail()}>
                      <Mail className="w-4 h-4 me-1" />
                      ارسال ایمیل
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 me-1" />
                      تغییر نقش
                    </Button>
                    <Button size="sm" variant="outline">
                      <Lock className="w-4 h-4 me-1" />
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

      {/* Modern Users Table با Expandable Rows */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">
              لیست کاربران ({toPersianDigits(filteredUsers.length.toString())})
            </CardTitle>
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleSelectAll}
              className="text-xs"
            >
              {selectedUsers.length === filteredUsers.length ? 'لغو انتخاب همه' : 'انتخاب همه'}
            </Button>
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
                      {selectedUsers.length === filteredUsers.length && filteredUsers.length > 0 ? (
                        <CheckSquare className="w-4 h-4" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </Button>
                  </th>
                  <th className="p-4 text-start font-semibold text-sm">کاربر</th>
                  <th className="p-4 text-start font-semibold text-sm">نقش</th>
                  <th className="p-4 text-start font-semibold text-sm">وضعیت</th>
                  <th className="p-4 text-start font-semibold text-sm">سفارشات</th>
                  <th className="p-4 text-start font-semibold text-sm">خرید کل</th>
                  <th className="p-4 text-start font-semibold text-sm">آخرین ورود</th>
                  <th className="p-4 text-center font-semibold text-sm">عملیات</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredUsers.map((user, idx) => (
                    <React.Fragment key={user.id}>
                      <motion.tr
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: idx * 0.03 }}
                        className={`border-b hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                          expandedUser === user.id ? 'bg-purple-50/50 dark:bg-purple-950/20' : ''
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="p-4">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleUserSelection(user.id)}
                            className="w-8 h-8 p-0"
                          >
                            {selectedUsers.includes(user.id) ? (
                              <CheckSquare className="w-4 h-4 text-primary" />
                            ) : (
                              <Square className="w-4 h-4" />
                            )}
                          </Button>
                        </td>

                        {/* User Info */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}
                              className="p-0 h-6 w-6"
                            >
                              <ChevronRight 
                                className={`w-4 h-4 transition-transform ${
                                  expandedUser === user.id ? 'rotate-90' : ''
                                }`}
                              />
                            </Button>
                            <div className="relative">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${
                                user.role === 'admin' ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                                user.role === 'vip' ? 'bg-gradient-to-br from-amber-500 to-orange-500' :
                                'bg-gradient-to-br from-blue-500 to-cyan-500'
                              }`}>
                                {user.name.charAt(0)}
                              </div>
                              {user.isVIP && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow">
                                  <Crown className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-sm">{user.name}</p>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Mail className="w-3 h-3" />
                                <span>{user.email}</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Phone className="w-3 h-3" />
                                <span dir="ltr">{toPersianDigits(user.phone)}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Role */}
                        <td className="p-4">{getRoleBadge(user.role)}</td>

                        {/* Status */}
                        <td className="p-4">{getStatusBadge(user.status)}</td>

                        {/* Orders */}
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                            <span className="font-semibold">{toPersianDigits(user.orders.toString())}</span>
                          </div>
                        </td>

                        {/* Total Spent */}
                        <td className="p-4">
                          <div>
                            <p className="font-bold text-sm bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              {toPersianDigits(user.totalSpent.toLocaleString())}
                            </p>
                            <p className="text-xs text-muted-foreground">تومان</p>
                          </div>
                        </td>

                        {/* Last Login */}
                        <td className="p-4">
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-muted-foreground text-xs">
                              {formatDate(user.lastLogin, 'fa-IR')}
                            </span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleSendEmail(user.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Mail className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="w-4 h-4" />
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
                        {expandedUser === user.id && (
                          <motion.tr
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-purple-50/30 dark:bg-purple-950/10 border-b"
                          >
                            <td colSpan={8} className="p-0">
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="p-6 grid md:grid-cols-3 gap-6">
                                  {/* User Statistics */}
                                  <Card className="border-0 shadow-sm">
                                    <CardHeader className="pb-3">
                                      <CardTitle className="text-sm flex items-center gap-2">
                                        <Activity className="w-4 h-4" />
                                        آمار کاربر
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-sm">
                                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="flex items-center gap-2">
                                          <ShoppingBag className="w-4 h-4 text-blue-500" />
                                          <span className="text-muted-foreground">تعداد سفارشات:</span>
                                        </div>
                                        <span className="font-bold">{toPersianDigits(user.orders.toString())}</span>
                                      </div>
                                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="flex items-center gap-2">
                                          <DollarSign className="w-4 h-4 text-green-500" />
                                          <span className="text-muted-foreground">خرید کل:</span>
                                        </div>
                                        <span className="font-bold">{toPersianDigits(user.totalSpent.toLocaleString())}</span>
                                      </div>
                                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="flex items-center gap-2">
                                          <Star className="w-4 h-4 text-yellow-500" />
                                          <span className="text-muted-foreground">امتیاز:</span>
                                        </div>
                                        <span className="font-bold">{toPersianDigits(user.rating.toString())}</span>
                                      </div>
                                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="flex items-center gap-2">
                                          <MessageSquare className="w-4 h-4 text-purple-500" />
                                          <span className="text-muted-foreground">نظرات:</span>
                                        </div>
                                        <span className="font-bold">{toPersianDigits(user.reviews.toString())}</span>
                                      </div>
                                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="flex items-center gap-2">
                                          <Heart className="w-4 h-4 text-red-500" />
                                          <span className="text-muted-foreground">علاقه‌مندی:</span>
                                        </div>
                                        <span className="font-bold">{toPersianDigits(user.wishlist.toString())}</span>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Contact Info */}
                                  <Card className="border-0 shadow-sm">
                                    <CardHeader className="pb-3">
                                      <CardTitle className="text-sm flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        اطلاعات تماس
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2 text-sm">
                                      <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-muted-foreground" />
                                        <p className="text-muted-foreground">{user.email}</p>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-muted-foreground" />
                                        <p className="text-muted-foreground" dir="ltr">{toPersianDigits(user.phone)}</p>
                                      </div>
                                      {user.address && (
                                        <div className="flex items-start gap-2">
                                          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                                          <p className="text-muted-foreground">
                                            {user.address.province}، {user.address.city}
                                          </p>
                                        </div>
                                      )}
                                      <div className="flex items-center gap-2 pt-2 border-t">
                                        <Calendar className="w-4 h-4 text-muted-foreground" />
                                        <div>
                                          <p className="text-xs text-muted-foreground">عضویت:</p>
                                          <p className="font-semibold">{formatDate(user.createdAt, 'fa-IR')}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-muted-foreground" />
                                        <div>
                                          <p className="text-xs text-muted-foreground">آخرین ورود:</p>
                                          <p className="font-semibold">{formatDate(user.lastLogin, 'fa-IR')}</p>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Quick Actions */}
                                  <Card className="border-0 shadow-sm">
                                    <CardHeader className="pb-3">
                                      <CardTitle className="text-sm flex items-center gap-2">
                                        <Settings className="w-4 h-4" />
                                        عملیات سریع
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                      <Button size="sm" variant="outline" className="w-full justify-start gap-2">
                                        <Edit className="w-4 h-4" />
                                        ویرایش پروفایل
                                      </Button>
                                      <Button size="sm" variant="outline" className="w-full justify-start gap-2">
                                        <Mail className="w-4 h-4" />
                                        ارسال ایمیل
                                      </Button>
                                      <Button size="sm" variant="outline" className="w-full justify-start gap-2">
                                        <Eye className="w-4 h-4" />
                                        مشاهده سفارشات
                                      </Button>
                                      <Button size="sm" variant="outline" className="w-full justify-start gap-2">
                                        <Shield className="w-4 h-4" />
                                        تغییر نقش
                                      </Button>
                                      {user.status === 'active' ? (
                                        <Button size="sm" variant="outline" className="w-full justify-start gap-2">
                                          <Lock className="w-4 h-4" />
                                          غیرفعال کردن
                                        </Button>
                                      ) : (
                                        <Button size="sm" variant="outline" className="w-full justify-start gap-2">
                                          <Unlock className="w-4 h-4" />
                                          فعال کردن
                                        </Button>
                                      )}
                                      <Button size="sm" variant="outline" className="w-full justify-start gap-2" onClick={() => toast.success('لینک کپی شد')}>
                                        <Copy className="w-4 h-4" />
                                        کپی لینک پروفایل
                                      </Button>
                                    </CardContent>
                                  </Card>
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
          {filteredUsers.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <UsersIcon className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-2">کاربری یافت نشد</h3>
              <p className="text-muted-foreground mb-4">لطفاً فیلترهای دیگری امتحان کنید</p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setRoleFilter('all');
                  setStatusFilter('all');
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
