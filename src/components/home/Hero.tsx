'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Sparkles, 
  Star, 
  Zap,
  ShoppingBag,
  Heart,
  TrendingUp,
  Award,
  Shield,
  Truck,
  ChevronRight,
  Check,
  Flame,
  Crown,
  Gem
} from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { toPersianDigits } from '@/lib/utils/numbers';

export default function Hero() {
  const locale = useLocale();
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const products = [
    {
      name: 'سرم ویتامین C',
      price: '۴۵۰,۰۰۰',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=500&fit=crop',
      badge: 'پرفروش',
      color: 'from-orange-500 to-pink-500'
    },
    {
      name: 'کرم ضد چروک',
      price: '۷۸۰,۰۰۰',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=500&fit=crop',
      badge: 'محبوب',
      color: 'from-purple-500 to-blue-500'
    },
    {
      name: 'ماسک طلا',
      price: '۹۲۰,۰۰۰',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=500&fit=crop',
      badge: 'لوکس',
      color: 'from-yellow-500 to-orange-500'
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProductIndex((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[currentProductIndex];

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-b from-white via-purple-50/30 to-pink-50/20 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950">
      
      {/* Ultra Advanced Background */}
      <div className="absolute inset-0">
        {/* Mesh Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100/40 via-pink-50/20 to-transparent dark:from-purple-900/20 dark:via-pink-900/10" />
        
        {/* Animated Mesh Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgb(236 72 153 / 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(168 85 247 / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
        
        {/* Dynamic Gradient Orbs with 3D Effect */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 0],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] bg-gradient-to-br from-purple-400/30 via-pink-400/30 to-orange-400/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, -180, 0],
            opacity: [0.12, 0.3, 0.12],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute -bottom-1/2 -left-1/2 w-[900px] h-[900px] bg-gradient-to-tr from-blue-400/25 via-cyan-400/25 to-teal-400/25 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 10 }}
          className="absolute top-1/3 left-1/2 w-[700px] h-[700px] bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-full blur-3xl"
        />
        
        {/* Interactive Mouse Gradient */}
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%'
          }}
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl pointer-events-none"
        />

        {/* Floating Particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
            initial={{
              x: Math.random() * 1920,
              y: 1080 + 100,
            }}
            animate={{
              y: -100,
              x: Math.random() * 1920,
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-4 py-12 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8"
          >
            
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2"
            >
              <Badge className="gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-2xl shadow-purple-500/50">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                <span className="font-bold">محصولات اورجینال و لوکس</span>
                <Crown className="w-4 h-4" />
              </Badge>
            </motion.div>

            {/* Main Heading با Typography پیشرفته */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="overflow-hidden"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-4 flex flex-col gap-4">
                <motion.span 
                  className="block bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent pb-2"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  زیبایی بی‌نظیر
                </motion.span>
                
                <motion.span 
                  className="block bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent pt-2"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: 0.5,
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  مراقبت حرفه‌ای
                </motion.span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl"
            >
              مجموعه کامل محصولات آرایشی و بهداشتی با{' '}
              <span className="font-bold text-purple-600">کیفیت اصل</span>
              {' '}و{' '}
              <span className="font-bold text-pink-600">قیمت استثنایی</span>
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              {[
                { icon: Check, text: 'تضمین اصالت کالا', color: 'from-green-500 to-emerald-500' },
                { icon: Truck, text: 'ارسال رایگان', color: 'from-blue-500 to-cyan-500' },
                { icon: Award, text: '۷ روز ضمانت بازگشت', color: 'from-purple-500 to-pink-500' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r ${item.color} bg-opacity-10 backdrop-blur-xl border border-white/20 shadow-lg hover:-translate-y-1 hover:scale-[1.02] transition-transform duration-300 ease-out will-change-transform`}
                >
                  <item.icon className="w-4 h-4 text-white" />
                  <span className="text-sm font-semibold text-white">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="pt-4"
            >
              <div>
                <Button asChild size="lg" className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white shadow-2xl shadow-purple-500/50 px-8 py-6 text-lg font-bold hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-out will-change-transform">
                  <Link href={`/${locale}/shop`}>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                      animate={{
                        x: ['-200%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    <ShoppingBag className="w-5 h-5 me-2" />
                    شروع خرید
                    <ArrowRight className="w-5 h-5 ms-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-800"
            >
              {[
                { value: '500+', label: 'محصول', icon: Gem },
                { value: '50+', label: 'برند', icon: Crown },
                { value: '10K+', label: 'مشتری', icon: TrendingUp },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + idx * 0.1 }}
                  className="text-center hover:scale-[1.02] transition-transform duration-300 will-change-transform"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {toPersianDigits(stat.value)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Elegant Product Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative max-w-lg mx-auto">
              
              {/* Main Featured Product */}
              <motion.div
                key={currentProductIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className="relative group"
                >
                  {/* Card Container */}
                  <div className="relative rounded-2xl overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                    
                    {/* Product Badge - Floating */}
                    <div className="absolute top-3 right-3 z-10">
                      <Badge className={`bg-gradient-to-r ${currentProduct.color} text-white border-0 px-3 py-1 text-xs font-bold shadow-lg`}>
                        <Sparkles className="w-3 h-3 me-1" />
                        {currentProduct.badge}
                      </Badge>
                    </div>

                    {/* Product Image */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <motion.img
                        src={currentProduct.image}
                        alt={currentProduct.name}
                        className="w-full h-full object-cover transition-all duration-500"
                      />
                      {/* Subtle Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Product Info - Clean & Minimal */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {currentProduct.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {toPersianDigits(currentProduct.price)}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">تومان</div>
                        </div>
                        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg">
                          <ShoppingBag className="w-4 h-4 me-1" />
                          خرید
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Soft Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${currentProduct.color} opacity-0 group-hover:opacity-20 blur-2xl -z-10 transition-opacity duration-500`} />
                </motion.div>
              </motion.div>

              {/* Small Product Thumbnails */}
              <div className="mt-6 flex items-center justify-center gap-3">
                {products.map((product, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setCurrentProductIndex(idx)}
                    whileTap={{ scale: 0.95 }}
                    className="relative group hover:scale-[1.02] transition-transform duration-300 will-change-transform"
                  >
                    <div className={`relative w-16 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                      idx === currentProductIndex 
                        ? 'shadow-2xl' 
                        : 'opacity-50 hover:opacity-100'
                    }`}>
                      {/* Active indicator - glow effect */}
                      {idx === currentProductIndex && (
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-orange-500/30 rounded-xl" />
                      )}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Decorative Elements - Subtle & Elegant */}
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 5, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 z-0"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400/20 to-pink-400/20 backdrop-blur-xl border border-purple-200/30 dark:border-purple-700/30 flex items-center justify-center">
                  <Star className="w-8 h-8 text-purple-400" />
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [10, -10, 10],
                  rotate: [0, -5, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-6 z-0"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-400/20 to-orange-400/20 backdrop-blur-xl border border-pink-200/30 dark:border-pink-700/30 flex items-center justify-center">
                  <Heart className="w-7 h-7 text-pink-400" />
                </div>
              </motion.div>

              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/3 -left-8 z-0"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-400/20 backdrop-blur-xl border border-cyan-200/30 dark:border-cyan-700/30 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </div>
              </motion.div>

              {/* Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 rounded-full blur-3xl -z-20" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path
            fill="currentColor"
            className="text-white dark:text-gray-950"
            fillOpacity="1"
            d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,128C672,128,768,160,864,165.3C960,171,1056,149,1152,133.3C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
}
