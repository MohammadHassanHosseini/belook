'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  User,
  Package,
  MapPin,
  Heart,
  Settings,
  LogOut,
  Edit,
  Trash2,
  Plus,
  Eye,
  Check,
  Star,
  X,
  TrendingUp,
  Clock,
  ShoppingBag,
  ShoppingCart,
  Gift,
  Award,
  Bell,
  Camera,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  Truck,
  Box,
  CheckCircle2,
  XCircle,
  Sparkles,
  Share2,
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { toast } from 'react-hot-toast';
import { useWishlistStore } from '@/store/wishlistStore';
import { toPersianDigits } from '@/lib/utils/numbers';

export default function ProfilePage() {
  // const { data: session } = useSession();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam || 'orders');
  const [isEditing, setIsEditing] = useState(false);
  const { items: wishlistItems, removeItem } = useWishlistStore();

  // تنظیم activeTab بر اساس query parameter
  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // موقتاً غیرفعال - برای تست
  // if (!session) {
  //   redirect('/auth/login');
  // }

  // Mock data - در production از API می‌آید
  const user = {
    name: 'علی احمدی',
    email: 'ali@example.com',
    phone: '09123456789',
    avatar: null,
  };

  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const orders = [
    {
      id: '1',
      orderNumber: '#12345',
      date: new Date('2024-01-15'),
      total: 1230000,
      status: 'DELIVERED',
      items: [
        {
          id: '1',
          name: 'سرم ویتامین C',
          image: 'https://images.unsplash.com/photo-1620916297803-be2bd5580e4b?w=100',
          price: 450000,
          quantity: 2,
        },
        {
          id: '2',
          name: 'کرم مرطوب کننده',
          image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=100',
          price: 330000,
          quantity: 1,
        },
      ],
    },
    {
      id: '2',
      orderNumber: '#12344',
      date: new Date('2024-01-10'),
      total: 850000,
      status: 'PROCESSING',
      items: [
        {
          id: '3',
          name: 'ماسک صورت',
          image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=100',
          price: 290000,
          quantity: 2,
        },
        {
          id: '4',
          name: 'کرم دور چشم',
          image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=100',
          price: 270000,
          quantity: 1,
        },
      ],
    },
  ];

  const addresses = [
    {
      id: '1',
      fullName: 'علی احمدی',
      phone: '09123456789',
      province: 'تهران',
      city: 'تهران',
      address: 'خیابان ولیعصر، نرسیده به میدان ونک، پلاک 123، واحد 45',
      postalCode: '1234567890',
      isDefault: true,
    },
    {
      id: '2',
      fullName: 'علی احمدی',
      phone: '09123456789',
      province: 'اصفهان',
      city: 'اصفهان',
      address: 'خیابان چهارباغ، کوچه گلستان، پلاک 56',
      postalCode: '9876543210',
      isDefault: false,
    },
  ];

  // استفاده از wishlistItems از store به جای mock data
  // const wishlist = [...];
  const wishlist = wishlistItems;

  const tabs = [
    { id: 'orders', label: 'سفارشات من', icon: Package, badge: orders.length },
    { id: 'tracking', label: 'پیگیری سفارش', icon: Truck },
    { id: 'addresses', label: 'آدرس‌های من', icon: MapPin, badge: addresses.length },
    { id: 'wishlist', label: 'علاقه‌مندی‌ها', icon: Heart, badge: wishlist.length },
    { id: 'notifications', label: 'اعلان‌ها', icon: Bell, badge: 3 },
    { id: 'wallet', label: 'کیف پول', icon: CreditCard },
    { id: 'loyalty', label: 'امتیازات', icon: Award },
    { id: 'reviews', label: 'نظرات من', icon: Star },
    { id: 'support', label: 'پشتیبانی', icon: Gift },
    { id: 'referral', label: 'دعوت دوستان', icon: TrendingUp },
    { id: 'settings', label: 'تنظیمات حساب', icon: Settings },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: any; color: string }> = {
      PENDING: { label: 'در انتظار', variant: 'secondary', color: 'bg-gray-100 text-gray-700' },
      CONFIRMED: { label: 'تأیید شده', variant: 'default', color: 'bg-blue-100 text-blue-700' },
      PROCESSING: { label: 'در حال پردازش', variant: 'default', color: 'bg-orange-100 text-orange-700' },
      SHIPPED: { label: 'ارسال شده', variant: 'default', color: 'bg-purple-100 text-purple-700' },
      DELIVERED: { label: 'تحویل داده شده', variant: 'default', color: 'bg-green-100 text-green-700' },
      CANCELLED: { label: 'لغو شده', variant: 'destructive', color: 'bg-red-100 text-red-700' },
    };

    const config = statusConfig[status] || statusConfig.PENDING;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const handleSaveProfile = () => {
    toast.success('اطلاعات با موفقیت ذخیره شد');
    setIsEditing(false);
  };

  const handleDeleteAddress = (id: string) => {
    toast.success('آدرس حذف شد');
  };

  const handleSetDefaultAddress = (id: string) => {
    toast.success('آدرس پیش‌فرض تغییر کرد');
  };

  const handleRemoveFromWishlist = (id: string) => {
    toast.success('از لیست علاقه‌مندی‌ها حذف شد');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header با Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-pink-500 to-purple-600 p-8 text-white shadow-2xl"
          >
            <div className="absolute inset-0 bg-black/10 backdrop-blur-xl"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative"
                >
                  <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-xl border-4 border-white/30 flex items-center justify-center text-4xl font-black shadow-2xl">
                    {user.name.charAt(0)}
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green-400 border-4 border-white flex items-center justify-center cursor-pointer hover:bg-green-500 transition-colors"
                  >
                    <Camera className="w-4 h-4 text-white" />
                  </motion.div>
                </motion.div>
                <div>
                  <h1 className="text-3xl font-black mb-2 flex items-center gap-2">
                    {user.name}
                    <Badge className="bg-white/20 text-white border-white/30">
                      <Star className="w-3 h-3 me-1 fill-current" />
                      VIP
                    </Badge>
                  </h1>
                  <p className="text-white/90 flex items-center gap-2 mb-1">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </p>
                  <p className="text-white/90 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {toPersianDigits(user.phone)}
                  </p>
                </div>
              </div>
              
              {/* Stats Cards */}
              <div className="hidden lg:flex gap-4">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 min-w-[120px]"
                >
                  <div className="text-center">
                    <ShoppingBag className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-2xl font-black">{toPersianDigits(orders.length.toString())}</p>
                    <p className="text-sm text-white/80">سفارش</p>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 min-w-[120px]"
                >
                  <div className="text-center">
                    <Heart className="w-6 h-6 mx-auto mb-2 fill-current" />
                    <p className="text-2xl font-black">{toPersianDigits(wishlist.length.toString())}</p>
                    <p className="text-sm text-white/80">علاقه‌مندی</p>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 min-w-[120px]"
                >
                  <div className="text-center">
                    <Award className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-2xl font-black">{toPersianDigits('250')}</p>
                    <p className="text-sm text-white/80">امتیاز</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar با Glassmorphism */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-xl sticky top-4">
                  <CardContent className="p-4">
                    {/* Navigation با Smooth Animations */}
                    <nav className="space-y-2">
                      {tabs.map((tab, index) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                          <motion.button
                            key={tab.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                              isActive
                                ? 'bg-gradient-to-r from-primary to-pink-500 text-white shadow-lg shadow-primary/50'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-muted-foreground'
                            }`}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-gradient-to-r from-primary to-pink-500 rounded-xl"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                              />
                            )}
                            <Icon className={`h-5 w-5 relative z-10 ${isActive ? 'text-white' : ''}`} />
                            <span className="relative z-10">{tab.label}</span>
                            {tab.badge !== undefined && tab.badge > 0 && (
                              <Badge className={`mr-auto relative z-10 ${isActive ? 'bg-white text-primary' : 'bg-primary'}`}>
                                {toPersianDigits(tab.badge.toString())}
                              </Badge>
                            )}
                            {isActive && !tab.badge && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="mr-auto relative z-10"
                              >
                                <Sparkles className="w-4 h-4" />
                              </motion.div>
                            )}
                          </motion.button>
                        );
                      })}
                    </nav>

                    {/* Logout Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full mt-6 border-2 hover:border-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                        size="lg"
                      >
                        <LogOut className="h-4 w-4 me-2" />
                        خروج از حساب
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Main Content with Animations */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {/* Orders Tab */}
                {activeTab === 'orders' && (
                  <motion.div
                    key="orders"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {orders.length > 0 ? (
                      orders.map((order, index) => (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-xl overflow-hidden hover:shadow-2xl transition-all group">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-pink-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            
                            <CardContent className="p-6 relative z-10">
                              {/* Order Header */}
                              <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                  <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center text-white shadow-lg"
                                  >
                                    <Package className="w-6 h-6" />
                                  </motion.div>
                                  <div>
                                    <p className="text-sm text-muted-foreground flex items-center gap-2 mb-1">
                                      <Box className="w-4 h-4" />
                                      شماره سفارش
                                    </p>
                                    <p className="font-black text-xl bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                                      {toPersianDigits(order.orderNumber)}
                                    </p>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                      <Calendar className="w-3 h-3" />
                                      {formatDate(order.date, 'fa-IR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                      })}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-end">
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                  >
                                    {getStatusBadge(order.status)}
                                  </motion.div>
                                </div>
                              </div>

                              {/* Order Items */}
                              <div className="space-y-3 mb-6 bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl p-4">
                                {order.items.map((item, itemIndex) => (
                                  <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: itemIndex * 0.05 }}
                                    className="flex items-center gap-4 p-3 bg-white/50 dark:bg-gray-900/50 rounded-xl hover:bg-white/80 dark:hover:bg-gray-900/80 transition-all"
                                  >
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-16 h-16 object-cover rounded-xl shadow-md"
                                    />
                                    <div className="flex-1">
                                      <p className="font-bold">{item.name}</p>
                                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                                        <Box className="w-3 h-3" />
                                        تعداد: {toPersianDigits(item.quantity.toString())}
                                      </p>
                                    </div>
                                    <p className="font-black text-primary">
                                      {formatCurrency(item.price * item.quantity, 'fa')} تومان
                                    </p>
                                  </motion.div>
                                ))}
                              </div>

                              {/* Order Footer */}
                              <div className="flex items-center justify-between pt-4 border-t-2 border-dashed">
                                <div>
                                  <p className="text-sm text-muted-foreground mb-1">مبلغ کل سفارش</p>
                                  <p className="text-2xl font-black bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-primary" />
                                    {formatCurrency(order.total, 'fa')} تومان
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button variant="outline" className="gap-2">
                                      <Eye className="h-4 w-4" />
                                      جزئیات
                                    </Button>
                                  </motion.div>
                                  {order.status === 'DELIVERED' && (
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                      <Button className="bg-gradient-to-r from-primary to-pink-500 gap-2">
                                        <ShoppingBag className="h-4 w-4" />
                                        خرید مجدد
                                      </Button>
                                    </motion.div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                      >
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="inline-block p-8 rounded-full bg-gradient-to-br from-primary/20 to-pink-500/20 mb-6"
                        >
                          <Package className="h-24 w-24 text-primary" />
                        </motion.div>
                        <h3 className="text-2xl font-bold mb-2">هنوز سفارشی ندارید!</h3>
                        <p className="text-muted-foreground mb-6">
                          اولین سفارش خود را ثبت کنید و از خرید لذت ببرید
                        </p>
                        <Button className="bg-gradient-to-r from-primary to-pink-500">
                          <ShoppingBag className="w-4 h-4 me-2" />
                          شروع خرید
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <motion.div
                  key="addresses"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black">آدرس‌های من</h2>
                        <p className="text-sm text-muted-foreground">مدیریت آدرس‌های ارسال</p>
                      </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 gap-2">
                        <Plus className="h-4 w-4" />
                        افزودن آدرس
                      </Button>
                    </motion.div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {addresses.map((address, index) => (
                      <motion.div
                        key={address.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className={`backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden ${
                          address.isDefault ? 'border-2 border-primary ring-2 ring-primary/20' : 'border-white/20'
                        }`}>
                          {address.isDefault && (
                            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-primary via-pink-500 to-purple-600"></div>
                          )}
                          
                          <CardContent className="p-6">
                            {address.isDefault && (
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring" }}
                              >
                                <Badge className="mb-4 bg-gradient-to-r from-primary to-pink-500 gap-1">
                                  <Star className="w-3 h-3 fill-current" />
                                  آدرس پیش‌فرض
                                </Badge>
                              </motion.div>
                            )}
                            
                            <div className="space-y-3 mb-4">
                              <p className="font-black text-lg flex items-center gap-2">
                                <User className="w-4 h-4 text-primary" />
                                {address.fullName}
                              </p>
                              <p className="text-muted-foreground flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                {toPersianDigits(address.phone)}
                              </p>
                              <div className="p-3 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl">
                                <p className="text-sm flex items-center gap-2 mb-1">
                                  <MapPin className="w-4 h-4 text-blue-500" />
                                  <span className="font-semibold">{address.province}، {address.city}</span>
                                </p>
                                <p className="text-sm text-muted-foreground mr-6">{address.address}</p>
                                <p className="text-sm text-muted-foreground mt-2 mr-6 flex items-center gap-1">
                                  <Box className="w-3 h-3" />
                                  کد پستی: {toPersianDigits(address.postalCode)}
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                                <Button variant="outline" size="sm" className="w-full gap-2">
                                  <Edit className="h-4 w-4" />
                                  ویرایش
                                </Button>
                              </motion.div>
                              {!address.isDefault && (
                                <>
                                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleSetDefaultAddress(address.id)}
                                      className="gap-1"
                                    >
                                      <Star className="h-3 w-3" />
                                      پیش‌فرض
                                    </Button>
                                  </motion.div>
                                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleDeleteAddress(address.id)}
                                      className="hover:border-red-500 hover:text-red-500"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </motion.div>
                                </>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <motion.div
                  key="wishlist"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white">
                      <Heart className="w-6 h-6 fill-current" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black">علاقه‌مندی‌های من</h2>
                      <p className="text-sm text-muted-foreground">
                        {wishlist.length > 0 ? `${toPersianDigits(wishlist.length.toString())} محصول در لیست` : 'لیست خالی است'}
                      </p>
                    </div>
                  </div>

                  {wishlist.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {wishlist.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-xl hover:shadow-2xl transition-all overflow-hidden group">
                            <div className="relative">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute top-3 right-3">
                                <motion.div
                                  whileHover={{ scale: 1.2 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Button
                                    size="icon"
                                    variant="secondary"
                                    className="rounded-full bg-white/90 hover:bg-white shadow-lg"
                                    onClick={() => {
                                      removeItem(item.productId);
                                      toast.success('از علاقه‌مندی‌ها حذف شد');
                                    }}
                                  >
                                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                                  </Button>
                                </motion.div>
                              </div>
                              <Badge className="absolute bottom-3 right-3 bg-green-500">
                                <CheckCircle2 className="w-3 h-3 me-1" />
                                موجود
                              </Badge>
                            </div>
                            
                            <CardContent className="p-4">
                              <h4 className="font-bold mb-2 line-clamp-1">{item.nameFa || item.name}</h4>
                              <p className="text-xl font-black bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent mb-3">
                                {formatCurrency(item.price, 'fa')} <span className="text-sm">تومان</span>
                              </p>

                              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button size="sm" className="w-full bg-gradient-to-r from-primary to-pink-500 gap-2">
                                  <ShoppingCart className="h-4 w-4" />
                                  افزودن به سبد خرید
                                </Button>
                              </motion.div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-20"
                    >
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="inline-block p-8 rounded-full bg-gradient-to-br from-red-500/20 to-pink-500/20 mb-6"
                      >
                        <Heart className="h-24 w-24 text-red-500" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-2">لیست علاقه‌مندی‌ها خالی است!</h3>
                      <p className="text-muted-foreground mb-6">
                        محصولات مورد علاقه خود را به لیست اضافه کنید
                      </p>
                      <Button className="bg-gradient-to-r from-red-500 to-pink-500">
                        <ShoppingBag className="w-4 h-4 me-2" />
                        کشف محصولات
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Order Tracking Tab */}
              {activeTab === 'tracking' && (
                <motion.div
                  key="tracking"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white">
                      <Truck className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black">پیگیری سفارش</h2>
                      <p className="text-sm text-muted-foreground">وضعیت سفارش خود را به صورت زنده پیگیری کنید</p>
                    </div>
                  </div>

                  {/* Tracking Input Card */}
                  <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-xl">
                    <CardContent className="p-6">
                      <Label className="text-base font-semibold mb-3 block">جستجوی سفارش</Label>
                      <div className="flex gap-3">
                        <Input 
                          placeholder="شماره سفارش یا کد پیگیری را وارد کنید..." 
                          className="bg-white/50 dark:bg-gray-900/50 flex-1"
                          defaultValue="#12345"
                        />
                        <Button className="bg-gradient-to-r from-orange-500 to-red-500 gap-2">
                          <Eye className="w-4 h-4" />
                          پیگیری
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Live Tracking Timeline */}
                  <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white/80 text-sm mb-1">شماره سفارش</p>
                          <h3 className="text-2xl font-black">{toPersianDigits('#12345')}</h3>
                        </div>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                          className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center"
                        >
                          <Truck className="w-8 h-8" />
                        </motion.div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="mb-6 p-4 bg-green-50 dark:bg-green-950 rounded-xl border-2 border-green-200 dark:border-green-800">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
                            <CheckCircle2 className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-bold text-green-700 dark:text-green-300">سفارش در حال ارسال است</p>
                            <p className="text-sm text-green-600 dark:text-green-400">زمان تحویل تقریبی: فردا، ۱۶:۰۰</p>
                          </div>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute right-[18px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-orange-500 to-gray-300"></div>
                        
                        <div className="space-y-6">
                          {[
                            { 
                              label: 'ثبت سفارش', 
                              time: '۱۴:۳۰ - ۱۴۰۲/۰۸/۱۵', 
                              status: 'completed', 
                              icon: CheckCircle2,
                              desc: 'سفارش شما با موفقیت ثبت شد'
                            },
                            { 
                              label: 'تایید و آماده‌سازی', 
                              time: '۱۵:۰۰ - ۱۴۰۲/۰۸/۱۵', 
                              status: 'completed', 
                              icon: CheckCircle2,
                              desc: 'محصولات بسته‌بندی شدند'
                            },
                            { 
                              label: 'تحویل به پست', 
                              time: '۱۶:۳۰ - ۱۴۰۲/۰۸/۱۵', 
                              status: 'completed', 
                              icon: Box,
                              desc: 'مرسوله به شرکت پست تحویل داده شد'
                            },
                            { 
                              label: 'در حال ارسال', 
                              time: 'در حال انجام...', 
                              status: 'active', 
                              icon: Truck,
                              desc: 'مرسوله در مسیر ارسال است'
                            },
                            { 
                              label: 'آماده تحویل', 
                              time: 'منتظر تحویل', 
                              status: 'pending', 
                              icon: MapPin,
                              desc: 'پیک در مقصد حضور دارد'
                            },
                            { 
                              label: 'تحویل داده شد', 
                              time: 'هنوز تحویل نشده', 
                              status: 'pending', 
                              icon: CheckCircle2,
                              desc: 'سفارش تحویل گیرنده می‌شود'
                            },
                          ].map((step, index) => {
                            const Icon = step.icon;
                            return (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex gap-4 relative"
                              >
                                <div className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                                  step.status === 'completed' ? 'bg-green-500 text-white shadow-lg shadow-green-500/50' :
                                  step.status === 'active' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/50' :
                                  'bg-gray-200 dark:bg-gray-700 text-gray-400'
                                }`}>
                                  <Icon className={`w-5 h-5 ${step.status === 'active' ? 'animate-pulse' : ''}`} />
                                </div>
                                
                                <div className="flex-1 pb-2">
                                  <div className={`p-4 rounded-xl transition-all ${
                                    step.status === 'completed' ? 'bg-green-50 dark:bg-green-950' :
                                    step.status === 'active' ? 'bg-orange-50 dark:bg-orange-950 border-2 border-orange-500' :
                                    'bg-gray-50 dark:bg-gray-800'
                                  }`}>
                                    <div className="flex items-start justify-between mb-2">
                                      <h4 className={`font-bold ${
                                        step.status === 'active' ? 'text-orange-600 dark:text-orange-400' : ''
                                      }`}>
                                        {step.label}
                                      </h4>
                                      {step.status === 'completed' && (
                                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                                          <Check className="w-3 h-3 me-1" />
                                          انجام شد
                                        </Badge>
                                      )}
                                      {step.status === 'active' && (
                                        <Badge className="bg-orange-500 animate-pulse">
                                          در حال انجام
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-1">{step.desc}</p>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {step.time}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Delivery Info */}
                      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-xl">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                          <div>
                            <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">آدرس تحویل:</p>
                            <p className="text-sm text-blue-700 dark:text-blue-300">تهران، خیابان ولیعصر، نرسیده به میدان ونک، پلاک ۱۲۳</p>
                            <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">گیرنده: علی احمدی - {toPersianDigits('09123456789')}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white">
                        <Bell className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black">اعلان‌ها</h2>
                        <p className="text-sm text-muted-foreground">{toPersianDigits('3')} اعلان خوانده نشده</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Check className="w-4 h-4" />
                        همه را خوانده شده علامت بزن
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Settings className="w-4 h-4" />
                        تنظیمات
                      </Button>
                    </div>
                  </div>

                  {/* Filter Tabs */}
                  <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-md">
                    <CardContent className="p-3">
                      <div className="flex gap-2">
                        {['همه', 'خوانده نشده', 'سفارشات', 'تخفیف‌ها', 'سیستم'].map((filter, index) => (
                          <Button
                            key={index}
                            variant={index === 0 ? 'default' : 'ghost'}
                            size="sm"
                            className={index === 0 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : ''}
                          >
                            {filter}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Notifications List */}
                  <div className="space-y-3">
                    {[
                      { 
                        icon: Package, 
                        title: 'سفارش شما ارسال شد', 
                        desc: 'سفارش #12345 به پست تحویل داده شد و در مسیر ارسال است', 
                        time: '۲ ساعت پیش', 
                        color: 'blue', 
                        unread: true,
                        actionText: 'پیگیری سفارش',
                        actionIcon: Truck
                      },
                      { 
                        icon: Gift, 
                        title: 'کد تخفیف جدید برای شما!', 
                        desc: 'کد تخفیف ۲۰٪ برای خرید بعدی شما فعال شد. از کد BELOOK20 استفاده کنید', 
                        time: '۵ ساعت پیش', 
                        color: 'green', 
                        unread: true,
                        actionText: 'مشاهده کد',
                        actionIcon: Eye
                      },
                      { 
                        icon: Star, 
                        title: 'نظر شما منتظر تایید است', 
                        desc: 'نظر شما برای محصول سرم ویتامین C ثبت شد و پس از تایید نمایش داده می‌شود', 
                        time: '۱ روز پیش', 
                        color: 'purple', 
                        unread: true,
                        actionText: 'مشاهده نظر',
                        actionIcon: Eye
                      },
                      { 
                        icon: CheckCircle2, 
                        title: 'سفارش با موفقیت تحویل شد', 
                        desc: 'سفارش #12344 با موفقیت تحویل داده شد. از خرید شما متشکریم!', 
                        time: '۲ روز پیش', 
                        color: 'green', 
                        unread: false,
                        actionText: 'ثبت نظر',
                        actionIcon: Star
                      },
                      { 
                        icon: Award, 
                        title: 'امتیاز جدید دریافت کردید', 
                        desc: 'شما ۵۰ امتیاز به دلیل خرید اخیر دریافت کردید', 
                        time: '۳ روز پیش', 
                        color: 'orange', 
                        unread: false,
                        actionText: 'مشاهده امتیازات',
                        actionIcon: TrendingUp
                      },
                      { 
                        icon: Heart, 
                        title: 'محصول علاقه‌مندی شما موجود شد', 
                        desc: 'کرم ضد آفتاب که در لیست علاقه‌مندی‌های شماست، اکنون موجود است', 
                        time: '۴ روز پیش', 
                        color: 'red', 
                        unread: false,
                        actionText: 'مشاهده محصول',
                        actionIcon: Eye
                      },
                    ].map((notif, index) => {
                      const Icon = notif.icon;
                      const ActionIcon = notif.actionIcon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Card className={`backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 shadow-md hover:shadow-xl transition-all cursor-pointer group ${
                            notif.unread 
                              ? 'border-l-4 border-l-primary border-white/20' 
                              : 'border-white/20'
                          }`}>
                            <CardContent className="p-4">
                              <div className="flex items-start gap-4">
                                {/* Icon */}
                                <motion.div
                                  whileHover={{ scale: 1.1, rotate: 5 }}
                                  className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${notif.color}-500 to-${notif.color}-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg`}
                                >
                                  <Icon className="w-6 h-6" />
                                </motion.div>
                                
                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2 mb-2">
                                    <h4 className={`font-bold ${notif.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                                      {notif.title}
                                    </h4>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                      {notif.unread && (
                                        <motion.div
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          className="w-2 h-2 rounded-full bg-primary"
                                        />
                                      )}
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <X className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                  
                                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                    {notif.desc}
                                  </p>
                                  
                                  <div className="flex items-center justify-between">
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {notif.time}
                                    </p>
                                    
                                    <motion.div
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Button variant="ghost" size="sm" className="gap-1 h-8">
                                        <ActionIcon className="w-3 h-3" />
                                        {notif.actionText}
                                      </Button>
                                    </motion.div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Load More */}
                  <div className="text-center">
                    <Button variant="outline" className="gap-2">
                      <TrendingUp className="w-4 h-4" />
                      بارگذاری اعلان‌های بیشتر
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Wallet Tab */}
              {activeTab === 'wallet' && (
                <motion.div
                  key="wallet"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black">کیف پول من</h2>
                      <p className="text-sm text-muted-foreground">مدیریت موجودی و تراکنش‌ها</p>
                    </div>
                  </div>

                  {/* Wallet Card */}
                  <Card className="backdrop-blur-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 border-0 shadow-2xl text-white overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    
                    <CardContent className="p-8 relative z-10">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <p className="text-white/80 text-sm mb-1 flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            موجودی کیف پول
                          </p>
                          <motion.p 
                            className="text-5xl font-black mb-2"
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                          >
                            {toPersianDigits('1,250,000')} <span className="text-2xl">تومان</span>
                          </motion.p>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-sm bg-white/20 px-2 py-1 rounded-full">
                              <TrendingUp className="w-3 h-3" />
                              <span>+{toPersianDigits('15')}٪ این ماه</span>
                            </div>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                          className="w-24 h-24 opacity-20"
                        >
                          <CreditCard className="w-full h-full" />
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4">
                          <p className="text-white/70 text-sm mb-1">کل دریافتی</p>
                          <p className="text-xl font-bold">{toPersianDigits('2,500,000')}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4">
                          <p className="text-white/70 text-sm mb-1">کل پرداختی</p>
                          <p className="text-xl font-bold">{toPersianDigits('1,250,000')}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                          <Button variant="secondary" className="w-full gap-2 bg-white hover:bg-white/90 text-emerald-600 font-bold shadow-lg">
                            <Plus className="w-4 h-4" />
                            افزایش موجودی
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button variant="secondary" className="gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-xl border-white/30">
                            <TrendingUp className="w-4 h-4" />
                            برداشت
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: Plus, label: 'شارژ کیف پول', color: 'emerald' },
                      { icon: ShoppingCart, label: 'خرید با کیف پول', color: 'blue' },
                      { icon: Gift, label: 'هدیه به دوستان', color: 'purple' },
                      { icon: Clock, label: 'تاریخچه تراکنش', color: 'orange' },
                    ].map((action, index) => {
                      const Icon = action.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Card className={`backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-md hover:shadow-xl transition-all cursor-pointer group`}>
                            <CardContent className="p-4 text-center">
                              <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-${action.color}-500 to-${action.color}-600 flex items-center justify-center text-white shadow-lg group-hover:shadow-${action.color}-500/50 transition-shadow`}>
                                <Icon className="w-6 h-6" />
                              </div>
                              <p className="text-sm font-semibold">{action.label}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Transactions */}
                  <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-xl">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>تراکنش‌های اخیر</CardTitle>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Eye className="w-4 h-4" />
                          مشاهده همه
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { 
                            type: 'add', 
                            amount: 500000, 
                            desc: 'شارژ کیف پول از درگاه بانک', 
                            date: '۱۴۰۲/۰۸/۱۵', 
                            time: '۱۴:۳۰',
                            status: 'success',
                            ref: '۱۲۳۴۵۶۷۸'
                          },
                          { 
                            type: 'subtract', 
                            amount: -120000, 
                            desc: 'خرید سرم ویتامین C', 
                            date: '۱۴۰۲/۰۸/۱۴', 
                            time: '۱۱:۲۰',
                            status: 'success',
                            ref: '۱۲۳۴۵۶۷۹'
                          },
                          { 
                            type: 'add', 
                            amount: 50000, 
                            desc: 'بازگشت وجه از سفارش لغو شده', 
                            date: '۱۴۰۲/۰۸/۱۳', 
                            time: '۱۶:۴۵',
                            status: 'success',
                            ref: '۱۲۳۴۵۶۸۰'
                          },
                          { 
                            type: 'subtract', 
                            amount: -85000, 
                            desc: 'خرید کرم مرطوب کننده', 
                            date: '۱۴۰۲/۰۸/۱۲', 
                            time: '۰۹:۱۵',
                            status: 'success',
                            ref: '۱۲۳۴۵۶۸۱'
                          },
                          { 
                            type: 'add', 
                            amount: 200000, 
                            desc: 'جایزه دعوت از دوستان', 
                            date: '۱۴۰۲/۰۸/۱۰', 
                            time: '۱۳:۰۰',
                            status: 'success',
                            ref: '۱۲۳۴۵۶۸۲'
                          },
                        ].map((trans, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/80 transition-all group"
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                trans.type === 'add' 
                                  ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' 
                                  : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                              }`}>
                                {trans.type === 'add' ? (
                                  <TrendingUp className="w-6 h-6" />
                                ) : (
                                  <ShoppingBag className="w-6 h-6" />
                                )}
                              </div>
                              <div>
                                <p className="font-bold mb-1">{trans.desc}</p>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {trans.date}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {trans.time}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Box className="w-3 h-3" />
                                    {trans.ref}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-end">
                              <p className={`font-black text-lg ${
                                trans.type === 'add' 
                                  ? 'text-green-600 dark:text-green-400' 
                                  : 'text-red-600 dark:text-red-400'
                              }`}>
                                {trans.type === 'add' ? '+' : ''}{formatCurrency(trans.amount, 'fa')}
                              </p>
                              <Badge className={`${
                                trans.status === 'success'
                                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {trans.status === 'success' ? 'موفق' : 'در حال بررسی'}
                              </Badge>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Wallet Info */}
                  <Card className="backdrop-blur-xl bg-blue-50/50 dark:bg-blue-950/50 border-blue-200/50 dark:border-blue-800/50">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
                          <Gift className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">راهنمای استفاده از کیف پول</h4>
                          <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                            <li className="flex items-center gap-2">
                              <Check className="w-4 h-4" />
                              با شارژ کیف پول، از تخفیف‌های ویژه بهره‌مند شوید
                            </li>
                            <li className="flex items-center gap-2">
                              <Check className="w-4 h-4" />
                              پرداخت سریع‌تر و راحت‌تر در هنگام خرید
                            </li>
                            <li className="flex items-center gap-2">
                              <Check className="w-4 h-4" />
                              امکان هدیه دادن اعتبار به دوستان
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Loyalty Program Tab */}
              {activeTab === 'loyalty' && (
                <motion.div
                  key="loyalty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black">برنامه وفاداری</h2>
                      <p className="text-sm text-muted-foreground">امتیازات و جوایز شما</p>
                    </div>
                  </div>

                  {/* Points Card */}
                  <Card className="backdrop-blur-xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600 border-0 shadow-2xl text-white overflow-hidden relative">
                    <div className="absolute inset-0 opacity-10">
                      <Award className="absolute top-0 right-0 w-40 h-40 -rotate-12" />
                      <Star className="absolute bottom-0 left-0 w-32 h-32 rotate-12" />
                      <Gift className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    
                    <CardContent className="p-8 relative z-10">
                      <div className="text-center mb-6">
                        <p className="text-white/80 mb-2">امتیاز فعلی شما</p>
                        <motion.div
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          <p className="text-7xl font-black mb-2">{toPersianDigits('2,450')}</p>
                        </motion.div>
                        <Badge className="bg-white/30 text-white text-base px-4 py-1">
                          <Star className="w-4 h-4 me-1 fill-current" />
                          سطح طلایی
                        </Badge>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                          <span>پیشرفت تا سطح پلاتینیوم:</span>
                          <span className="font-bold">{toPersianDigits('550')} امتیاز دیگر</span>
                        </div>
                        <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-white rounded-full shadow-lg"
                            initial={{ width: 0 }}
                            animate={{ width: '82%' }}
                            transition={{ duration: 1, delay: 0.3 }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white/20 backdrop-blur-xl rounded-xl p-3 text-center">
                          <ShoppingBag className="w-5 h-5 mx-auto mb-1" />
                          <p className="text-2xl font-bold">{toPersianDigits('24')}</p>
                          <p className="text-xs text-white/70">خرید</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-xl rounded-xl p-3 text-center">
                          <Star className="w-5 h-5 mx-auto mb-1 fill-current" />
                          <p className="text-2xl font-bold">{toPersianDigits('18')}</p>
                          <p className="text-xs text-white/70">نظر</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-xl rounded-xl p-3 text-center">
                          <TrendingUp className="w-5 h-5 mx-auto mb-1" />
                          <p className="text-2xl font-bold">{toPersianDigits('5')}</p>
                          <p className="text-xs text-white/70">دعوت</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Level Benefits */}
                  <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-xl">
                    <CardHeader>
                      <CardTitle>مزایای سطح فعلی شما</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { icon: Gift, title: 'تخفیف ۱۰٪ در همه خریدها', color: 'green' },
                          { icon: Truck, title: 'ارسال رایگان برای سفارش‌های بالای ۲۰۰ هزار تومان', color: 'blue' },
                          { icon: Star, title: 'دسترسی به محصولات ویژه', color: 'purple' },
                          { icon: Award, title: 'امتیاز دوبرابر در روزهای خاص', color: 'orange' },
                        ].map((benefit, index) => {
                          const Icon = benefit.icon;
                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-3 p-3 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl"
                            >
                              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${benefit.color}-500 to-${benefit.color}-600 flex items-center justify-center text-white`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <p className="text-sm font-medium">{benefit.title}</p>
                            </motion.div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Available Rewards */}
                  <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-xl">
                    <CardHeader>
                      <CardTitle>جوایز قابل دریافت</CardTitle>
                      <CardDescription>با امتیازات خود جوایز دریافت کنید</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { points: 500, title: 'کد تخفیف ۱۰٪', desc: 'برای یک خرید', icon: Gift, color: 'blue', available: true },
                          { points: 1000, title: 'کد تخفیف ۲۰٪', desc: 'برای یک خرید', icon: Gift, color: 'green', available: true },
                          { points: 2000, title: 'ارسال رایگان', desc: 'برای ۳ سفارش', icon: Truck, color: 'orange', available: true },
                          { points: 3000, title: 'کد تخفیف ۵۰٪', desc: 'برای یک خرید', icon: Gift, color: 'purple', available: false },
                          { points: 5000, title: 'محصول رایگان', desc: 'یک محصول به انتخاب', icon: ShoppingBag, color: 'pink', available: false },
                          { points: 10000, title: 'عضویت VIP', desc: 'برای ۶ ماه', icon: Award, color: 'yellow', available: false },
                        ].map((reward, index) => {
                          const Icon = reward.icon;
                          const canClaim = 2450 >= reward.points;
                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Card className={`border-2 transition-all hover:shadow-lg ${
                                canClaim 
                                  ? 'border-primary shadow-primary/20' 
                                  : 'opacity-60 border-gray-200 dark:border-gray-700'
                              }`}>
                                <CardContent className="p-4">
                                  <div className="flex items-start gap-3 mb-3">
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${reward.color}-500 to-${reward.color}-600 flex items-center justify-center text-white flex-shrink-0`}>
                                      <Icon className="w-7 h-7" />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-bold mb-1">{reward.title}</h4>
                                      <p className="text-xs text-muted-foreground">{reward.desc}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center justify-between mb-3">
                                    <Badge variant={canClaim ? 'default' : 'secondary'} className="gap-1">
                                      <Star className="w-3 h-3" />
                                      {toPersianDigits(reward.points.toString())} امتیاز
                                    </Badge>
                                    {canClaim && (
                                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                                        <Check className="w-3 h-3 me-1" />
                                        قابل دریافت
                                      </Badge>
                                    )}
                                  </div>
                                  
                                  <motion.div
                                    whileHover={{ scale: canClaim ? 1.02 : 1 }}
                                    whileTap={{ scale: canClaim ? 0.98 : 1 }}
                                  >
                                    <Button 
                                      size="sm" 
                                      className="w-full" 
                                      disabled={!canClaim}
                                      variant={canClaim ? 'default' : 'outline'}
                                    >
                                      {canClaim ? (
                                        <>
                                          <Gift className="w-4 h-4 me-2" />
                                          دریافت جایزه
                                        </>
                                      ) : (
                                        <>
                                          <XCircle className="w-4 h-4 me-2" />
                                          امتیاز کافی نیست
                                        </>
                                      )}
                                    </Button>
                                  </motion.div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Points History */}
                  <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-xl">
                    <CardHeader>
                      <CardTitle>تاریخچه امتیازات</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { type: 'add', points: 100, desc: 'خرید محصول', date: '۱۴۰۲/۰۸/۱۵', icon: ShoppingBag },
                          { type: 'add', points: 50, desc: 'ثبت نظر برای محصول', date: '۱۴۰۲/۰۸/۱۴', icon: Star },
                          { type: 'subtract', points: -500, desc: 'دریافت کد تخفیف ۱۰٪', date: '۱۴۰۲/۰۸/۱۳', icon: Gift },
                          { type: 'add', points: 200, desc: 'دعوت از دوست', date: '۱۴۰۲/۰۸/۱۲', icon: TrendingUp },
                          { type: 'add', points: 150, desc: 'تولد شما مبارک!', date: '۱۴۰۲/۰۸/۱۰', icon: Gift },
                        ].map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  item.type === 'add'
                                    ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                                    : 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400'
                                }`}>
                                  <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className="font-semibold text-sm">{item.desc}</p>
                                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {item.date}
                                  </p>
                                </div>
                              </div>
                              <p className={`font-bold text-lg ${
                                item.type === 'add' ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'
                              }`}>
                                {item.type === 'add' ? '+' : ''}{toPersianDigits(item.points.toString())}
                              </p>
                            </motion.div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* How to Earn Points */}
                  <Card className="backdrop-blur-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-purple-900 dark:text-purple-100 mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        چگونه امتیاز کسب کنیم؟
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          { action: 'هر ۱۰,۰۰۰ تومان خرید', points: 10 },
                          { action: 'ثبت نظر برای محصول', points: 50 },
                          { action: 'دعوت از دوست', points: 200 },
                          { action: 'اشتراک‌گذاری در شبکه‌های اجتماعی', points: 25 },
                          { action: 'تکمیل پروفایل', points: 100 },
                          { action: 'خرید در روز تولد', points: 150 },
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                            <span className="text-sm">{item.action}</span>
                            <Badge className="bg-purple-600">+{toPersianDigits(item.points.toString())}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white">
                      <Star className="w-6 h-6 fill-current" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black">نظرات من</h2>
                      <p className="text-sm text-muted-foreground">{toPersianDigits('5')} نظر ثبت شده</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'تایید شده', count: 3, color: 'green', icon: CheckCircle2 },
                      { label: 'در انتظار', count: 2, color: 'yellow', icon: Clock },
                      { label: 'امتیاز کسب شده', count: 150, color: 'purple', icon: Award },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-md">
                          <CardContent className="p-4 text-center">
                            <div className={`w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 flex items-center justify-center text-white`}>
                              <stat.icon className="w-6 h-6" />
                            </div>
                            <p className="text-2xl font-black">{toPersianDigits(stat.count.toString())}</p>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {[
                      { 
                        product: 'سرم ویتامین C روشن کننده',
                        image: 'https://images.unsplash.com/photo-1620916297803-be2bd5580e4b?w=100',
                        rating: 5, 
                        comment: 'محصول فوق‌العاده‌ای است! بعد از ۲ هفته استفاده تفاوت قابل توجهی در پوست صورتم دیدم. بافت محصول سبک و جذب سریع است. به شدت توصیه می‌کنم!', 
                        date: '۱۴۰۲/۰۸/۱۰', 
                        status: 'approved',
                        likes: 24,
                        helpful: true
                      },
                      { 
                        product: 'کرم مرطوب کننده هیالورونیک',
                        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=100',
                        rating: 4, 
                        comment: 'کرم خوبی است اما قیمتش کمی بالاست. برای پوست‌های خشک عالی کار می‌کند.', 
                        date: '۱۴۰۲/۰۸/۰۵', 
                        status: 'pending',
                        likes: 0,
                        helpful: false
                      },
                      { 
                        product: 'ماسک صورت آبرسان',
                        image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=100',
                        rating: 5, 
                        comment: 'عااالی! پوستم رو خیلی نرم و شاداب کرده. هر هفته استفاده می‌کنم.', 
                        date: '۱۴۰۲/۰۸/۰۳', 
                        status: 'approved',
                        likes: 18,
                        helpful: true
                      },
                      { 
                        product: 'کرم ضد آفتاب SPF 50',
                        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100',
                        rating: 3, 
                        comment: 'محصول خوبی است اما بعد از استفاده کمی چرب می‌شود.', 
                        date: '۱۴۰۲/۰۸/۰۱', 
                        status: 'approved',
                        likes: 5,
                        helpful: false
                      },
                      { 
                        product: 'تونر صورت گلاب',
                        image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=100',
                        rating: 4, 
                        comment: 'بوی خوبی دارد و پوست را تازه می‌کند. قیمت مناسب.', 
                        date: '۱۴۰۲/۰۷/۲۸', 
                        status: 'pending',
                        likes: 0,
                        helpful: false
                      },
                    ].map((review, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-xl hover:shadow-2xl transition-all">
                          <CardContent className="p-6">
                            <div className="flex gap-4 mb-4">
                              <img 
                                src={review.image} 
                                alt={review.product}
                                className="w-20 h-20 rounded-xl object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h4 className="font-bold mb-1">{review.product}</h4>
                                    <div className="flex gap-1 mb-2">
                                      {[...Array(5)].map((_, i) => (
                                        <Star 
                                          key={i} 
                                          className={`w-4 h-4 ${
                                            i < review.rating 
                                              ? 'fill-yellow-400 text-yellow-400' 
                                              : 'text-gray-300'
                                          }`} 
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <Badge className={
                                    review.status === 'approved' 
                                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                                  }>
                                    {review.status === 'approved' ? (
                                      <>
                                        <CheckCircle2 className="w-3 h-3 me-1" />
                                        تایید شده
                                      </>
                                    ) : (
                                      <>
                                        <Clock className="w-3 h-3 me-1" />
                                        در انتظار تایید
                                      </>
                                    )}
                                  </Badge>
                                </div>
                                
                                <p className="text-sm text-muted-foreground mb-3">
                                  {review.comment}
                                </p>
                                
                                <div className="flex items-center justify-between">
                                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {review.date}
                                  </p>
                                  
                                  {review.status === 'approved' && (
                                    <div className="flex items-center gap-3">
                                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                                        <TrendingUp className="w-4 h-4" />
                                        {toPersianDigits(review.likes.toString())} نفر مفید دانستند
                                      </span>
                                      <div className="flex gap-1">
                                        <Button variant="ghost" size="sm" className="h-8">
                                          <Edit className="w-3 h-3" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 text-red-600 hover:text-red-700">
                                          <Trash2 className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Support Tab */}
              {activeTab === 'support' && (
                <motion.div
                  key="support"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                        <Gift className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black">پشتیبانی</h2>
                        <p className="text-sm text-muted-foreground">تیکت‌ها و پیام‌های شما</p>
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 gap-2">
                      <Plus className="w-4 h-4" />
                      تیکت جدید
                    </Button>
                  </div>

                  {/* Ticket Stats */}
                  <div className="grid md:grid-cols-4 gap-4">
                    {[
                      { label: 'همه تیکت‌ها', count: 19, color: 'gray', icon: Gift },
                      { label: 'باز', count: 2, color: 'blue', icon: Clock },
                      { label: 'پاسخ داده شده', count: 5, color: 'green', icon: CheckCircle2 },
                      { label: 'بسته شده', count: 12, color: 'gray', icon: XCircle },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-md hover:shadow-lg transition-all">
                          <CardContent className="p-6 text-center">
                            <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 flex items-center justify-center text-white`}>
                              <stat.icon className="w-6 h-6" />
                            </div>
                            <p className="text-3xl font-black mb-1">{toPersianDigits(stat.count.toString())}</p>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {/* Active Tickets */}
                  <div className="space-y-3">
                    {[
                      { id: '#1234', title: 'مشکل در ارسال سفارش', status: 'open', priority: 'high', date: '۱۴۰۲/۰۸/۱۵', replies: 3, lastUpdate: '۲ ساعت پیش' },
                      { id: '#1233', title: 'سوال درباره نحوه استفاده از محصول', status: 'answered', priority: 'medium', date: '۱۴۰۲/۰۸/۱۴', replies: 2, lastUpdate: '۱ روز پیش' },
                      { id: '#1232', title: 'درخواست مرجوعی کالا', status: 'open', priority: 'high', date: '۱۴۰۲/۰۸/۱۳', replies: 5, lastUpdate: '۳ ساعت پیش' },
                      { id: '#1231', title: 'پیشنهاد برای بهبود سایت', status: 'closed', priority: 'low', date: '۱۴۰۲/۰۸/۱۰', replies: 1, lastUpdate: '۵ روز پیش' },
                    ].map((ticket, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-md hover:shadow-xl transition-all cursor-pointer group">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 flex-1">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                  ticket.status === 'open' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' :
                                  ticket.status === 'answered' ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' :
                                  'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                                }`}>
                                  <Gift className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-bold">{ticket.title}</h4>
                                    <Badge variant="outline" className="text-xs">{ticket.id}</Badge>
                                    <Badge className={
                                      ticket.priority === 'high' ? 'bg-red-100 text-red-700' :
                                      ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                      'bg-gray-100 text-gray-700'
                                    }>
                                      {ticket.priority === 'high' ? 'فوری' : ticket.priority === 'medium' ? 'متوسط' : 'عادی'}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Calendar className="w-3 h-3" />
                                      {ticket.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      آخرین به‌روزرسانی: {ticket.lastUpdate}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Gift className="w-3 h-3" />
                                      {toPersianDigits(ticket.replies.toString())} پاسخ
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <Button variant="outline" size="sm" className="gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Eye className="w-4 h-4" />
                                مشاهده
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick Help */}
                  <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        راهنمای سریع
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          'چگونه سفارش ثبت کنم؟',
                          'نحوه پیگیری سفارش',
                          'شرایط مرجوعی کالا',
                          'روش‌های پرداخت',
                        ].map((question, index) => (
                          <Button key={index} variant="ghost" className="justify-start h-auto py-2 text-right">
                            <Check className="w-4 h-4 me-2 flex-shrink-0" />
                            <span className="text-sm">{question}</span>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Referral Tab */}
              {activeTab === 'referral' && (
                <motion.div
                  key="referral"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black">دعوت از دوستان</h2>
                      <p className="text-sm text-muted-foreground">دوستان خود را دعوت کنید و جایزه بگیرید</p>
                    </div>
                  </div>

                  {/* Referral Card */}
                  <Card className="backdrop-blur-xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 border-0 shadow-2xl text-white overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    
                    <CardContent className="p-8 text-center relative z-10">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <Gift className="w-16 h-16 mx-auto mb-4" />
                      </motion.div>
                      
                      <h3 className="text-3xl font-black mb-3">هر دوست = ۱۰۰,۰۰۰ تومان!</h3>
                      <p className="text-white/90 mb-6 max-w-md mx-auto">
                        برای هر دوستی که با کد شما ثبت‌نام کند، هم شما و هم دوستتان ۱۰۰,۰۰۰ تومان اعتبار هدیه دریافت می‌کنید
                      </p>
                      
                      <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 mb-6 max-w-md mx-auto">
                        <p className="text-sm mb-3">کد دعوت شما:</p>
                        <div className="flex items-center justify-center gap-3">
                          <p className="text-4xl font-black tracking-widest">BELOOK2024</p>
                          <Button 
                            variant="secondary" 
                            size="icon"
                            className="bg-white hover:bg-white/90 text-purple-600"
                            onClick={() => {
                              navigator.clipboard.writeText('BELOOK2024');
                              toast.success('کد کپی شد!');
                            }}
                          >
                            <Check className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 justify-center">
                        <Button variant="secondary" className="gap-2 bg-white hover:bg-white/90 text-purple-600 font-bold">
                          <Share2 className="w-4 h-4" />
                          اشتراک‌گذاری لینک
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Referral Stats */}
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { label: 'دوستان دعوت شده', count: 12, icon: TrendingUp, color: 'blue' },
                      { label: 'درآمد کل', count: '1,200,000', icon: CreditCard, color: 'green' },
                      { label: 'در انتظار تایید', count: 3, icon: Clock, color: 'orange' },
                    ].map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-md">
                            <CardContent className="p-6 text-center">
                              <div className={`w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 flex items-center justify-center text-white`}>
                                <Icon className="w-7 h-7" />
                              </div>
                              <p className="text-3xl font-black mb-1">{toPersianDigits(stat.count.toString())}</p>
                              <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Referred Friends */}
                  <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-xl">
                    <CardHeader>
                      <CardTitle>دوستان دعوت شده</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { name: 'محمد رضایی', date: '۱۴۰۲/۰۸/۱۵', status: 'completed', reward: 100000 },
                          { name: 'سارا احمدی', date: '۱۴۰۲/۰۸/۱۲', status: 'completed', reward: 100000 },
                          { name: 'علی کریمی', date: '۱۴۰۲/۰۸/۱۰', status: 'pending', reward: 0 },
                          { name: 'فاطمه موسوی', date: '۱۴۰۲/۰۸/۰۸', status: 'completed', reward: 100000 },
                        ].map((friend, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                                {friend.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-bold">{friend.name}</p>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  عضویت: {friend.date}
                                </p>
                              </div>
                            </div>
                            <div className="text-end">
                              {friend.status === 'completed' ? (
                                <>
                                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 mb-1">
                                    <CheckCircle2 className="w-3 h-3 me-1" />
                                    تایید شده
                                  </Badge>
                                  <p className="text-sm font-bold text-green-600">+{formatCurrency(friend.reward, 'fa')}</p>
                                </>
                              ) : (
                                <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                                  <Clock className="w-3 h-3 me-1" />
                                  در انتظار خرید اول
                                </Badge>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* How it Works */}
                  <Card className="backdrop-blur-xl bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950 border-pink-200 dark:border-pink-800">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-pink-900 dark:text-pink-100 mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        چگونه کار می‌کند؟
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {[
                          { step: '۱', title: 'کد خود را به اشتراک بگذارید', icon: Share2 },
                          { step: '۲', title: 'دوست شما ثبت‌نام کند', icon: User },
                          { step: '۳', title: 'هر دو جایزه دریافت کنید', icon: Gift },
                        ].map((item, index) => (
                          <div key={index} className="text-center">
                            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-2xl font-black">
                              {item.step}
                            </div>
                            <p className="font-semibold text-sm">{item.title}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-xl">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center text-white">
                            <User className="w-6 h-6" />
                          </div>
                          <div>
                            <CardTitle>اطلاعات حساب کاربری</CardTitle>
                            <CardDescription>مشخصات شخصی خود را مدیریت کنید</CardDescription>
                          </div>
                        </div>
                        {!isEditing && (
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button onClick={() => setIsEditing(true)} className="gap-2">
                              <Edit className="h-4 w-4" />
                              ویرایش
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4" />
                          نام و نام خانوادگی
                        </Label>
                        <Input
                          value={profileData.name}
                          onChange={(e) =>
                            setProfileData({ ...profileData, name: e.target.value })
                          }
                          disabled={!isEditing}
                          className="bg-white/50 dark:bg-gray-900/50"
                        />
                      </div>

                      <div>
                        <Label className="flex items-center gap-2 mb-2">
                          <Mail className="w-4 h-4" />
                          ایمیل
                        </Label>
                        <Input
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData({ ...profileData, email: e.target.value })
                          }
                          disabled={!isEditing}
                          className="bg-white/50 dark:bg-gray-900/50"
                        />
                      </div>

                      <div>
                        <Label className="flex items-center gap-2 mb-2">
                          <Phone className="w-4 h-4" />
                          شماره موبایل
                        </Label>
                        <Input
                          value={toPersianDigits(profileData.phone)}
                          onChange={(e) =>
                            setProfileData({ ...profileData, phone: e.target.value })
                          }
                          disabled={!isEditing}
                          className="bg-white/50 dark:bg-gray-900/50"
                        />
                      </div>

                      {isEditing && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-2 pt-4"
                        >
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                            <Button onClick={handleSaveProfile} className="w-full bg-gradient-to-r from-primary to-pink-500 gap-2">
                              <CheckCircle2 className="w-4 h-4" />
                              ذخیره تغییرات
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline" onClick={() => setIsEditing(false)} className="gap-2">
                              <XCircle className="w-4 h-4" />
                              انصراف
                            </Button>
                          </motion.div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-xl">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                          <Settings className="w-6 h-6" />
                        </div>
                        <div>
                          <CardTitle>تغییر رمز عبور</CardTitle>
                          <CardDescription>رمز عبور خود را به‌روزرسانی کنید</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>رمز عبور فعلی</Label>
                        <Input type="password" className="mt-2 bg-white/50 dark:bg-gray-900/50" />
                      </div>

                      <div>
                        <Label>رمز عبور جدید</Label>
                        <Input type="password" className="mt-2 bg-white/50 dark:bg-gray-900/50" />
                      </div>

                      <div>
                        <Label>تکرار رمز عبور جدید</Label>
                        <Input type="password" className="mt-2 bg-white/50 dark:bg-gray-900/50" />
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          تغییر رمز عبور
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
