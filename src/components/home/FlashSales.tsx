'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { Flame, Clock, Star, ShoppingCart, ArrowRight, Zap, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { toPersianDigits } from '@/lib/utils/numbers';

export default function FlashSales() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 34,
    seconds: 56
  });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashProducts = [
    {
      id: 1,
      name: 'سرم ویتامین C',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop',
      originalPrice: '۶۰۰,۰۰۰',
      salePrice: '۴۲۰,۰۰۰',
      discount: 30,
      rating: 4.8,
      sold: 145,
      stock: 23
    },
    {
      id: 2,
      name: 'کرم ضد چروک',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop',
      originalPrice: '۹۵۰,۰۰۰',
      salePrice: '۶۶۵,۰۰۰',
      discount: 30,
      rating: 4.9,
      sold: 98,
      stock: 15
    },
    {
      id: 3,
      name: 'ماسک صورت طلا',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&h=300&fit=crop',
      originalPrice: '۱,۲۰۰,۰۰۰',
      salePrice: '۸۴۰,۰۰۰',
      discount: 30,
      rating: 5.0,
      sold: 234,
      stock: 8
    },
    {
      id: 4,
      name: 'تونر پاک‌کننده',
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&h=300&fit=crop',
      originalPrice: '۴۵۰,۰۰۰',
      salePrice: '۳۱۵,۰۰۰',
      discount: 30,
      rating: 4.7,
      sold: 187,
      stock: 34
    },
  ];

  const stockPercentage = (sold: number, stock: number) => {
    return (sold / (sold + stock)) * 100;
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-orange-950/10 dark:to-red-950/10 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl" />
      </div>

      {/* Section Header */}
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 px-4 relative z-10"
        >
          {/* Floating Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(249, 115, 22, 0.5)",
                    "0 0 40px rgba(239, 68, 68, 0.7)",
                    "0 0 20px rgba(249, 115, 22, 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="w-5 h-5 text-white fill-white" />
                  </motion.div>
                  <span className="text-white font-black text-sm tracking-wide">⚡ فروش ویژه امروز ⚡</span>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <TrendingUp className="w-5 h-5 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* 3D Gradient Title */}
          <motion.h2 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 relative"
          >
            <span className="relative inline-block">
              <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 opacity-50"></span>
              <span className="relative bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                تخفیف‌های
              </span>
            </span>
            {' '}
            <span className="relative inline-block">
              <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-orange-600 opacity-50"></span>
              <span className="relative bg-gradient-to-r from-pink-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
                باورنکردنی
              </span>
            </span>
            <motion.div
              className="absolute -top-4 -right-4"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Flame className="w-12 h-12 md:w-16 md:h-16 text-orange-500 drop-shadow-2xl" />
            </motion.div>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 dark:text-gray-300 text-lg md:text-xl font-medium max-w-2xl mx-auto"
          >
            🎁 فرصت طلایی برای خرید هوشمندانه • تا 
            <span className="font-black text-orange-600"> ۷۰٪ </span>
            تخفیف!
          </motion.p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mt-8"
          >
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">باقیمانده:</span>
            </div>
            {[
              { value: timeLeft.seconds, label: 'ثانیه' },
              { value: timeLeft.minutes, label: 'دقیقه' },
              { value: timeLeft.hours, label: 'ساعت' }
            ].map((time, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl px-4 py-3 shadow-lg min-w-[80px]">
                  <motion.div
                    key={time.value}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-3xl font-black bg-gradient-to-br from-orange-600 to-red-600 bg-clip-text text-transparent"
                  >
                    {toPersianDigits(String(time.value).padStart(2, '0'))}
                  </motion.div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{time.label}</div>
                </div>
                {idx < 2 && <div className="text-2xl font-bold text-orange-500">:</div>}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Products Grid - 7 per row */}
        <div className="px-4 relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 md:gap-5 lg:gap-6">
            {flashProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="group relative w-full"
              >
                <div className="relative bg-gradient-to-br from-white via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 rounded-3xl overflow-hidden shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 ease-out border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm hover:-translate-y-2 hover:scale-[1.02] will-change-transform">
                  
                  {/* Premium Discount Badge */}
                  <div className="absolute top-3 left-3 z-20">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Badge className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white border-0 px-3 py-1 text-xs font-black shadow-2xl">
                        <Sparkles className="w-3 h-3 inline me-1" />
                        {toPersianDigits(product.discount)}٪
                      </Badge>
                    </motion.div>
                  </div>

                  {/* Trending Badge */}
                  <div className="absolute top-3 right-3 z-20">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full p-1.5 shadow-lg"
                    >
                      <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                    </motion.div>
                  </div>

                  {/* Product Image with Glass Effect */}
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                    {/* Premium Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                {/* Product Info - Premium Design */}
                <div className="p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                  {/* Rating with Stars */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <Star
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </motion.div>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                      {toPersianDigits(product.rating.toString())}
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3 className="font-black text-base text-gray-900 dark:text-white mb-3 line-clamp-1 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>

                  {/* Price Section with Animation */}
                  <div className="mb-3">
                    <div className="flex items-baseline gap-2 mb-1">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="text-2xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent"
                      >
                        {toPersianDigits(product.salePrice)}
                      </motion.div>
                      <span className="text-xs font-bold text-gray-500">تومان</span>
                    </div>
                    <div className="text-xs text-gray-400 line-through">
                      {toPersianDigits(product.originalPrice)} تومان
                    </div>
                  </div>

                  {/* Premium Stock Progress */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs font-bold text-gray-600 dark:text-gray-400 mb-2">
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        فروخته: {toPersianDigits(product.sold)}
                      </span>
                      <span className="text-orange-600">باقی: {toPersianDigits(product.stock)}</span>
                    </div>
                    <div className="h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stockPercentage(product.sold, product.stock)}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: idx * 0.05 }}
                        className="h-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Premium Add to Cart Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 hover:from-orange-700 hover:via-red-700 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl text-sm font-black py-5 rounded-xl transition-all">
                      <ShoppingCart className="w-4 h-4 me-2" />
                      افزودن به سبد
                      <ArrowRight className="w-4 h-4 ms-2" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>

        {/* Premium View All Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.3 }}
          className="text-center mt-16 px-4 relative z-10"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button asChild size="lg" className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 hover:from-orange-700 hover:via-red-700 hover:to-pink-700 text-white font-black text-lg px-12 py-7 rounded-2xl shadow-2xl hover:shadow-orange-500/50 border-0">
              <Link href="/shop/flash-sales" className="flex items-center gap-3">
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Sparkles className="w-6 h-6" />
                </motion.div>
                مشاهده همه پیشنهادات ویژه
                <motion.div
                  animate={{ x: [0, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
                {/* Animated shine */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
    </section>
  );
}
