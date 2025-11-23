'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toPersianDigits } from '@/lib/utils/numbers';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'سارا احمدی',
      role: 'مشتری وفادار',
      avatar: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      text: 'کیفیت محصولات فوق‌العاده است! سرم ویتامین C که خریدم واقعاً تاثیرگذار بود. پوستم بعد از ۲ هفته مصرف کاملاً متحول شد. خیلی راضی‌ام و حتماً دوباره خرید می‌کنم.',
      product: 'سرم ویتامین C',
      date: '۲ هفته پیش'
    },
    {
      id: 2,
      name: 'مریم کریمی',
      role: 'خریدار جدید',
      avatar: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      text: 'سرویس‌دهی عالی و ارسال سریع. محصولات اصل و با کیفیت. کرم ضد چروکی که گرفتم دقیقاً همون چیزی بود که می‌خواستم. قیمت‌ها هم خیلی مناسب‌تر از فروشگاه‌های دیگه است.',
      product: 'کرم ضد چروک',
      date: '۱ ماه پیش'
    },
    {
      id: 3,
      name: 'زهرا محمدی',
      role: 'مشتری همیشگی',
      avatar: 'https://i.pravatar.cc/150?img=9',
      rating: 5,
      text: 'از اولین خریدم تا الان همیشه از کیفیت و خدمات این فروشگاه راضی بودم. پشتیبانی فوق‌العاده‌ای دارند و به تمام سوالات پاسخ می‌دن. محصولاتشون هم همه اورجینال و با گارانتی است.',
      product: 'ماسک صورت',
      date: '۳ هفته پیش'
    },
    {
      id: 4,
      name: 'فاطمه رضایی',
      role: 'مشتری راضی',
      avatar: 'https://i.pravatar.cc/150?img=25',
      rating: 5,
      text: 'پکیج‌بندی محصولات حرفه‌ای و مرتب بود. همه چیز درست و سالم رسید. من که از خرید آنلاین می‌ترسیدم ولی اینجا تجربه خیلی خوبی داشتم. حتماً به دوستام معرفی می‌کنم.',
      product: 'تونر پاک‌کننده',
      date: '۵ روز پیش'
    },
  ];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const previous = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/10 dark:to-gray-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-full border border-purple-200 dark:border-purple-800">
            <Heart className="w-5 h-5 text-pink-500" fill="currentColor" />
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">نظرات مشتریان</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
            مشتریان ما چه می‌گویند؟
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            رضایت شما، افتخار ماست
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                {/* Quote Icon */}
                <div className="absolute -top-6 right-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
                    <Quote className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-6 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star
                        className={`w-6 h-6 ${
                          i < current.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 text-center leading-relaxed mb-8">
                  "{current.text}"
                </p>

                {/* Customer Info */}
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
                  />
                  <div className="text-center">
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                      {current.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {current.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-950 rounded-full text-purple-600 dark:text-purple-400 font-medium">
                      {current.product}
                    </span>
                    <span>{current.date}</span>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl -z-10" />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              onClick={previous}
              size="icon"
              variant="outline"
              className="rounded-full border-2 hover:bg-purple-50 dark:hover:bg-purple-950"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'w-8 bg-gradient-to-r from-purple-500 to-pink-500'
                      : 'w-2 bg-gray-300 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={next}
              size="icon"
              variant="outline"
              className="rounded-full border-2 hover:bg-purple-50 dark:hover:bg-purple-950"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-6 mt-12"
          >
            {[
              { value: '۱۰K+', label: 'مشتری راضی' },
              { value: '۴.۹', label: 'امتیاز میانگین' },
              { value: '۹۸٪', label: 'رضایت کلی' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                  {toPersianDigits(stat.value)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
