'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Heart, 
  Tag, 
  Truck, 
  Shield, 
  Clock, 
  Gift,
  CreditCard,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Package,
  Star,
  Zap,
  Award,
  AlertCircle,
  Info,
  Percent,
  MessageSquare,
  Eye,
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
  Home,
  Building2,
  Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/lib/utils';
import { toPersianDigits } from '@/lib/utils/numbers';
import { toast } from 'react-hot-toast';

export default function CartPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();

  const getProductName = (item: any) => {
    if (locale === 'fa') return item.nameFa;
    if (locale === 'ar') return item.nameAr;
    return item.nameEn;
  };

  // Cart calculations
  const subtotal = getTotal();
  const [shippingMethod, setShippingMethod] = React.useState('standard');
  const [discountCode, setDiscountCode] = React.useState('');
  const [appliedDiscount, setAppliedDiscount] = React.useState(0);
  const [isGift, setIsGift] = React.useState(false);
  const [hasInsurance, setHasInsurance] = React.useState(false);
  const [couponInput, setCouponInput] = React.useState('');
  
  const shippingCosts = {
    standard: subtotal > 500000 ? 0 : 30000,
    express: 50000,
    super_express: 100000,
  };
  
  const shipping = shippingCosts[shippingMethod as keyof typeof shippingCosts];
  const insuranceCost = hasInsurance ? Math.floor(subtotal * 0.02) : 0;
  const giftWrapCost = isGift ? 15000 : 0;
  const discount = Math.floor(subtotal * (appliedDiscount / 100));
  const earnedPoints = Math.floor((subtotal - discount) / 10000);
  const total = subtotal + shipping + insuranceCost + giftWrapCost - discount;

  // Sample data for features
  const suggestedProducts = [
    { id: 1, name: 'محصول پیشنهادی ۱', price: 250000, image: '/products/1.jpg', rating: 4.5 },
    { id: 2, name: 'محصول پیشنهادی ۲', price: 180000, image: '/products/2.jpg', rating: 4.8 },
    { id: 3, name: 'محصول پیشنهادی ۳', price: 320000, image: '/products/3.jpg', rating: 4.3 },
  ];

  const availableCoupons = [
    { code: 'WELCOME10', discount: 10, minPurchase: 200000, description: 'تخفیف ۱۰٪ برای خرید اول' },
    { code: 'SUMMER20', discount: 20, minPurchase: 500000, description: 'تخفیف ۲۰٪ تابستانه' },
    { code: 'VIP15', discount: 15, minPurchase: 300000, description: 'تخفیف ویژه اعضا' },
  ];

  const applyDiscount = (code: string, discountPercent: number) => {
    setDiscountCode(code);
    setAppliedDiscount(discountPercent);
    setCouponInput('');
    toast.success(`کد تخفیف ${toPersianDigits(discountPercent.toString())}٪ اعمال شد!`);
  };

  const handleApplyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code.toUpperCase() === couponInput.toUpperCase());
    if (!coupon) {
      toast.error('کد تخفیف نامعتبر است');
      return;
    }
    if (subtotal < coupon.minPurchase) {
      toast.error(`حداقل خرید برای این کد ${formatCurrency(coupon.minPurchase, 'fa')} تومان است`);
      return;
    }
    applyDiscount(coupon.code, coupon.discount);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                ease: "easeInOut"
              }}
              className="relative mb-8"
            >
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center">
                <ShoppingBag className="w-16 h-16 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </div>
            </motion.div>
            <h2 className="text-3xl font-black mb-3">سبد خرید شما خالی است</h2>
            <p className="text-muted-foreground mb-8">محصولات مورد علاقه خود را به سبد اضافه کنید</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-pink-500 gap-2">
                <Link href={`/${locale}/products`}>
                  <ShoppingBag className="w-5 h-5" />
                  مشاهده محصولات
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-4 md:py-6 lg:py-8 bg-gradient-to-br from-gray-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center text-white shadow-lg">
                <ShoppingBag className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black">سبد خرید</h1>
                <p className="text-xs md:text-sm text-muted-foreground">{toPersianDigits(items.length.toString())} محصول در سبد</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                clearCart();
                toast.success('سبد خرید خالی شد');
              }}
              className="gap-2 w-full sm:w-auto"
              size="sm"
            >
              <Trash2 className="w-4 h-4" />
              خالی کردن سبد
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-xl hover:shadow-2xl transition-all group overflow-hidden">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Image */}
                        <motion.div 
                          className="relative w-full sm:w-24 md:w-28 h-40 sm:h-24 md:h-28 rounded-xl overflow-hidden bg-secondary flex-shrink-0 mx-auto sm:mx-0"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <img
                            src={item.image}
                            alt={getProductName(item)}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>

                        {/* Info */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <h3 className="font-bold text-base md:text-lg mb-2 line-clamp-2">{getProductName(item)}</h3>
                              <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs">
                                <CheckCircle2 className="w-3 h-3 me-1" />
                                موجود
                              </Badge>
                            </div>
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 10 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900 h-8 w-8 sm:h-10 sm:w-10"
                                onClick={() => {
                                  removeItem(item.productId);
                                  toast.success('محصول از سبد حذف شد');
                                }}
                              >
                                <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                              </Button>
                            </motion.div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-primary" />
                            <span className="text-base md:text-lg font-bold bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                              {formatCurrency(item.price, 'fa')}
                            </span>
                            <span className="text-xs md:text-sm text-muted-foreground">تومان</span>
                          </div>

                          {/* Quantity Controls & Total - Mobile */}
                          <div className="flex items-center justify-between gap-3 sm:hidden">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">تعداد:</span>
                              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 rounded-lg"
                                  onClick={() => {
                                    updateQuantity(item.productId, Math.max(1, item.quantity - 1));
                                    toast.success('تعداد کاهش یافت');
                                  }}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                
                                <span className="w-8 text-center font-bold text-sm">
                                  {toPersianDigits(item.quantity.toString())}
                                </span>
                                
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 rounded-lg"
                                  onClick={() => {
                                    updateQuantity(item.productId, item.quantity + 1);
                                    toast.success('تعداد افزایش یافت');
                                  }}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            
                            <div className="text-end">
                              <p className="text-xs text-muted-foreground">مجموع:</p>
                              <p className="text-lg font-black bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                                {formatCurrency(item.price * item.quantity, 'fa')}
                              </p>
                            </div>
                          </div>

                          {/* Quantity Controls - Desktop */}
                          <div className="hidden sm:flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">تعداد:</span>
                            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-lg"
                                  onClick={() => {
                                    updateQuantity(item.productId, Math.max(1, item.quantity - 1));
                                    toast.success('تعداد کاهش یافت');
                                  }}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                              </motion.div>
                              
                              <motion.span 
                                key={item.quantity}
                                initial={{ scale: 1.2, color: '#ec4899' }}
                                animate={{ scale: 1, color: 'inherit' }}
                                className="w-10 text-center font-bold text-lg"
                              >
                                {toPersianDigits(item.quantity.toString())}
                              </motion.span>
                              
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-lg"
                                  onClick={() => {
                                    updateQuantity(item.productId, item.quantity + 1);
                                    toast.success('تعداد افزایش یافت');
                                  }}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            </div>
                          </div>
                        </div>

                        {/* Total Price - Desktop */}
                        <div className="hidden sm:flex flex-col items-end justify-between">
                          <div className="text-end">
                            <p className="text-xs text-muted-foreground mb-1">مبلغ کل:</p>
                            <motion.p 
                              key={item.price * item.quantity}
                              initial={{ scale: 1.2 }}
                              animate={{ scale: 1 }}
                              className="text-xl md:text-2xl font-black bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent"
                            >
                              {formatCurrency(item.price * item.quantity, 'fa')}
                            </motion.p>
                            <p className="text-xs text-muted-foreground">تومان</p>
                          </div>

                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden lg:block"
                          >
                            <Button variant="outline" size="sm" className="gap-2">
                              <Heart className="w-4 h-4" />
                              علاقه‌مندی
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Shipping Method Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Truck className="w-5 h-5 text-primary" />
                    انتخاب روش ارسال
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { 
                      id: 'standard', 
                      name: 'ارسال عادی', 
                      time: '۳-۵ روز کاری', 
                      cost: subtotal > 500000 ? 0 : 30000,
                      icon: Truck,
                      badge: subtotal > 500000 ? 'رایگان' : null
                    },
                    { 
                      id: 'express', 
                      name: 'ارسال سریع', 
                      time: '۱-۲ روز کاری', 
                      cost: 50000,
                      icon: Zap,
                      badge: 'پیشنهاد ویژه'
                    },
                    { 
                      id: 'super_express', 
                      name: 'ارسال فوری', 
                      time: 'امروز', 
                      cost: 100000,
                      icon: Sparkles,
                      badge: null
                    },
                  ].map((method) => {
                    const Icon = method.icon;
                    const isSelected = shippingMethod === method.id;
                    return (
                      <motion.div
                        key={method.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div
                          onClick={() => setShippingMethod(method.id)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            isSelected
                              ? 'border-primary bg-primary/10'
                              : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                isSelected 
                                  ? 'bg-gradient-to-br from-primary to-pink-500 text-white' 
                                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                              }`}>
                                <Icon className="w-6 h-6" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-bold">{method.name}</p>
                                  {method.badge && (
                                    <Badge className={
                                      method.badge === 'رایگان' 
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs'
                                        : 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 text-xs'
                                    }>
                                      {method.badge}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {method.time}
                                </p>
                              </div>
                            </div>
                            <div className="text-end">
                              {method.cost === 0 ? (
                                <p className="font-bold text-green-600">رایگان</p>
                              ) : (
                                <>
                                  <p className="font-bold">{formatCurrency(method.cost, 'fa')}</p>
                                  <p className="text-xs text-muted-foreground">تومان</p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>

            {/* Gift & Insurance Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-xl">
                <CardContent className="p-4 space-y-3">
                  {/* Gift Option */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      onClick={() => setIsGift(!isGift)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        isGift
                          ? 'border-pink-500 bg-pink-50 dark:bg-pink-950'
                          : 'border-gray-200 dark:border-gray-700 hover:border-pink-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            isGift
                              ? 'bg-gradient-to-br from-pink-500 to-purple-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600'
                          }`}>
                            <Gift className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-bold">بسته‌بندی هدیه</p>
                            <p className="text-sm text-muted-foreground">با کارت تبریک رایگان</p>
                          </div>
                        </div>
                        <div className="text-end">
                          <p className="font-bold">+{formatCurrency(15000, 'fa')}</p>
                          <p className="text-xs text-muted-foreground">تومان</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Insurance Option */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      onClick={() => setHasInsurance(!hasInsurance)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        hasInsurance
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            hasInsurance
                              ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600'
                          }`}>
                            <Shield className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-bold">بیمه محصول</p>
                            <p className="text-sm text-muted-foreground">پوشش کامل تا ۳۰ روز</p>
                          </div>
                        </div>
                        <div className="text-end">
                          <p className="font-bold">+{formatCurrency(insuranceCost, 'fa')}</p>
                          <p className="text-xs text-muted-foreground">۲٪ ارزش کالا</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-xl lg:sticky lg:top-24">
                <CardHeader className="border-b border-white/20">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center text-white">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    خلاصه سفارش
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                    <div className="flex justify-between items-center p-3 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl">
                      <span className="text-muted-foreground flex items-center gap-2 text-sm md:text-base">
                        <Package className="w-4 h-4" />
                        جمع محصولات ({toPersianDigits(items.length.toString())})
                      </span>
                      <span className="font-bold text-sm md:text-base">{formatCurrency(subtotal, 'fa')}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl">
                      <span className="text-muted-foreground flex items-center gap-2 text-sm md:text-base">
                        <Truck className="w-4 h-4" />
                        هزینه ارسال
                      </span>
                      {shipping === 0 ? (
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs">
                          <Truck className="w-3 h-3 me-1" />
                          رایگان
                        </Badge>
                      ) : (
                        <span className="font-bold text-sm md:text-base">{formatCurrency(shipping, 'fa')}</span>
                      )}
                    </div>

                    {/* Discount */}
                    {appliedDiscount > 0 && (
                      <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800">
                        <span className="text-green-700 dark:text-green-300 flex items-center gap-2 text-sm md:text-base">
                          <Percent className="w-4 h-4" />
                          تخفیف ({discountCode})
                        </span>
                        <span className="font-bold text-green-600 text-sm md:text-base">-{formatCurrency(discount, 'fa')}</span>
                      </div>
                    )}

                    {/* Gift Wrap */}
                    {isGift && (
                      <div className="flex justify-between items-center p-3 bg-pink-50 dark:bg-pink-950 rounded-xl border border-pink-200 dark:border-pink-800">
                        <span className="text-pink-700 dark:text-pink-300 flex items-center gap-2 text-sm md:text-base">
                          <Gift className="w-4 h-4" />
                          بسته‌بندی هدیه
                        </span>
                        <span className="font-bold text-sm md:text-base">{formatCurrency(giftWrapCost, 'fa')}</span>
                      </div>
                    )}

                    {/* Insurance */}
                    {hasInsurance && (
                      <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
                        <span className="text-blue-700 dark:text-blue-300 flex items-center gap-2 text-sm md:text-base">
                          <Shield className="w-4 h-4" />
                          بیمه محصول
                        </span>
                        <span className="font-bold text-sm md:text-base">{formatCurrency(insuranceCost, 'fa')}</span>
                      </div>
                    )}

                    {/* Earned Points */}
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-xl border border-amber-200 dark:border-amber-800">
                      <span className="text-amber-700 dark:text-amber-300 flex items-center gap-2 text-sm md:text-base">
                        <Award className="w-4 h-4" />
                        امتیاز دریافتی
                      </span>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="font-bold text-amber-600">{toPersianDigits(earnedPoints.toString())}</span>
                      </div>
                    </div>
                    
                    {subtotal < 500000 && shipping > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 md:p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-xl border-2 border-dashed border-orange-300 dark:border-orange-700"
                      >
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-orange-500 flex items-center justify-center text-white flex-shrink-0">
                            <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs md:text-sm font-semibold text-orange-900 dark:text-orange-100">
                              {formatCurrency(500000 - subtotal, 'fa')} تا ارسال رایگان
                            </p>
                            <div className="mt-2 h-2 bg-orange-200 dark:bg-orange-800 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${(subtotal / 500000) * 100}%` }}
                                transition={{ duration: 1, delay: 0.3 }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    <div className="border-t-2 border-dashed border-gray-200 dark:border-gray-700 pt-3 md:pt-4">
                      <div className="flex justify-between items-center p-3 md:p-4 bg-gradient-to-r from-primary/10 to-pink-500/10 rounded-xl">
                        <span className="text-base md:text-lg font-bold">مبلغ نهایی</span>
                        <div className="text-end">
                          <motion.p 
                            key={total}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            className="text-2xl md:text-3xl font-black bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent"
                          >
                            {formatCurrency(total, 'fa')}
                          </motion.p>
                          <p className="text-xs md:text-sm text-muted-foreground">تومان</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button asChild className="w-full bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 h-12 md:h-14 text-base md:text-lg">
                      <Link href={`/${locale}/checkout`} className="gap-2">
                        <CreditCard className="w-4 h-4 md:w-5 md:h-5" />
                        تکمیل خرید و پرداخت
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                      </Link>
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button asChild variant="outline" className="w-full mt-3 gap-2">
                      <Link href={`/${locale}/products`}>
                        <ShoppingBag className="w-4 h-4" />
                        ادامه خرید
                      </Link>
                    </Button>
                  </motion.div>

                  {/* Trust Badges */}
                  <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/20">
                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                      {[
                        { icon: Shield, text: 'پرداخت امن', color: 'blue' },
                        { icon: Truck, text: 'ارسال سریع', color: 'green' },
                        { icon: CheckCircle2, text: 'ضمانت اصالت', color: 'purple' },
                        { icon: Gift, text: 'بسته‌بندی زیبا', color: 'pink' },
                      ].map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="flex items-center gap-2 p-2 md:p-3 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg"
                          >
                            <div className={`w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 flex items-center justify-center text-white flex-shrink-0`}>
                              <Icon className="w-3 h-3 md:w-4 md:h-4" />
                            </div>
                            <span className="text-xs font-medium">{item.text}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Coupon Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="backdrop-blur-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center gap-2 md:gap-3 mb-3">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-green-500 flex items-center justify-center text-white flex-shrink-0">
                      <Tag className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm md:text-base text-green-900 dark:text-green-100">کد تخفیف دارید؟</h3>
                      <p className="text-xs text-green-700 dark:text-green-300">کد تخفیف خود را وارد کنید</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="کد تخفیف" 
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                      disabled={!!appliedDiscount}
                      className="flex-1 px-3 py-2 rounded-lg border border-green-300 dark:border-green-700 bg-white/50 dark:bg-gray-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700 text-xs md:text-sm px-3 md:px-4"
                      onClick={handleApplyCoupon}
                      disabled={!couponInput || !!appliedDiscount}
                    >
                      اعمال
                    </Button>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="mt-2 flex items-center justify-between p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                      <p className="text-xs text-green-700 dark:text-green-300">
                        کد <code className="font-mono font-bold">{discountCode}</code> اعمال شد
                      </p>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="h-6 text-xs text-red-600 hover:text-red-700"
                        onClick={() => {
                          setAppliedDiscount(0);
                          setDiscountCode('');
                          toast.success('کد تخفیف حذف شد');
                        }}
                      >
                        حذف
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Available Coupons */}
            {!appliedDiscount && availableCoupons.some(c => subtotal >= c.minPurchase) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="backdrop-blur-xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 border-purple-200 dark:border-purple-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      کدهای تخفیف پیشنهادی
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {availableCoupons.filter(c => subtotal >= c.minPurchase).map((coupon, index) => (
                      <motion.div
                        key={coupon.code}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-purple-300 dark:border-purple-700 cursor-pointer hover:border-purple-500 transition-all"
                          onClick={() => applyDiscount(coupon.code, coupon.discount)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <code className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded font-mono text-sm font-bold">
                                  {coupon.code}
                                </code>
                                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                  {toPersianDigits(coupon.discount.toString())}٪
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">{coupon.description}</p>
                            </div>
                            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>

        {/* Suggested Products */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black">محصولات پیشنهادی</h2>
                <p className="text-sm text-muted-foreground">برای تکمیل سفارش شما</p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-xl hover:shadow-2xl transition-all group overflow-hidden">
                  <CardContent className="p-4">
                    <div className="relative mb-3">
                      <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <Badge className="absolute top-2 right-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                        جدید
                      </Badge>
                    </div>

                    <h3 className="font-bold mb-2 line-clamp-2">{product.name}</h3>

                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) 
                              ? 'text-amber-400 fill-amber-400' 
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground mr-1">
                        ({toPersianDigits(product.rating.toString())})
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-black bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                          {formatCurrency(product.price, 'fa')}
                        </p>
                        <p className="text-xs text-muted-foreground">تومان</p>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        افزودن
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                    <MessageSquare className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-blue-900 dark:text-blue-100">نیاز به کمک دارید؟</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">پشتیبانی ۲۴/۷ آماده پاسخگویی به شماست</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="gap-2 border-blue-300 dark:border-blue-700">
                    <Phone className="w-4 h-4" />
                    تماس
                  </Button>
                  <Button className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                    <MessageSquare className="w-4 h-4" />
                    چت آنلاین
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
