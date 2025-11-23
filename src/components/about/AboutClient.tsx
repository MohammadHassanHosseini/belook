'use client';

import { motion } from 'framer-motion';
import {
  Award,
  Users,
  Package,
  Heart,
  Target,
  Eye,
  TrendingUp,
  Shield,
  Sparkles,
  Crown,
  CheckCircle,
  Star,
  Globe,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { toPersianDigits } from '@/lib/utils/numbers';

interface AboutClientProps {
  locale: string;
}

export default function AboutClient({ locale }: AboutClientProps) {
  const stats = [
    { value: '10,000+', label: 'مشتری راضی', icon: Users },
    { value: '500+', label: 'محصول اصل', icon: Package },
    { value: '50+', label: 'برند معتبر', icon: Crown },
    { value: '99%', label: 'رضایت مشتری', icon: Star },
  ];

  const values = [
    {
      icon: Award,
      title: 'کیفیت تضمین شده',
      description: 'تمام محصولات ما 100٪ اصل و با ضمانت بازگشت وجه هستند',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'اعتماد و امنیت',
      description: 'خرید امن با بهترین روش‌های پرداخت و حفظ حریم خصوصی',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Heart,
      title: 'رضایت مشتری',
      description: 'پشتیبانی 24/7 و خدمات پس از فروش عالی برای شما',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Zap,
      title: 'ارسال سریع',
      description: 'ارسال رایگان و سریع به سراسر کشور با بسته‌بندی مناسب',
      color: 'from-green-500 to-emerald-500'
    },
  ];

  const timeline = [
    { year: '1400', title: 'آغاز سفر', description: 'تاسیس بی لوک با هدف ارائه محصولات اصل' },
    { year: '1401', title: 'گسترش', description: 'افزودن برندهای لوکس جهانی' },
    { year: '1402', title: 'نوآوری', description: 'راه‌اندازی سیستم خرید آنلاین' },
    { year: '1403', title: 'رهبری', description: 'بزرگترین فروشگاه آنلاین زیبایی' },
  ];

  const team = [
    {
      name: 'دکتر سارا احمدی',
      role: 'مدیر عامل',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      description: 'متخصص پوست با 10 سال تجربه'
    },
    {
      name: 'محمد رضایی',
      role: 'مدیر فروش',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      description: '8 سال تجربه در صنعت زیبایی'
    },
    {
      name: 'مینا کریمی',
      role: 'مدیر محتوا',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      description: 'کارشناس ارشد بازاریابی دیجیتال'
    },
    {
      name: 'علی محمدی',
      role: 'مدیر فنی',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      description: 'توسعه‌دهنده ارشد وب'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="inline-block mb-6"
              >
                <Badge className="bg-white/20 backdrop-blur-xl text-white border-white/30 px-6 py-3 text-lg">
                  <Sparkles className="w-5 h-5 me-2" />
                  داستان بی لوک
                </Badge>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">
                زیبایی را با
                <br />
                <span className="bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
                  ما تجربه کنید
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
                بزرگترین فروشگاه آنلاین محصولات آرایشی و بهداشتی اصل در ایران
              </p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
              >
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + idx * 0.1, type: 'spring' }}
                      className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 border border-white/30"
                    >
                      <Icon className="w-8 h-8 text-white mx-auto mb-2" />
                      <div className="text-3xl font-black text-white mb-1">
                        {toPersianDigits(stat.value)}
                      </div>
                      <div className="text-sm text-white/80">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Badge className="mb-4">
                  <Target className="w-4 h-4 me-2" />
                  داستان ما
                </Badge>
                <h2 className="text-4xl md:text-5xl font-black mb-6">
                  سفری که با یک
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"> رویا </span>
                  شروع شد
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  بی لوک در سال 1400 با هدف ایجاد تحولی در صنعت زیبایی ایران آغاز به کار کرد. ما باور داشتیم که هر فرد ایرانی حق دارد به محصولات آرایشی و بهداشتی اصل و باکیفیت دسترسی داشته باشد.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  امروز، با بیش از 10,000 مشتری راضی و 500 محصول اصل از معتبرترین برندهای جهان، به یکی از پیشروان صنعت زیبایی آنلاین کشور تبدیل شده‌ایم.
                </p>
                <div className="flex gap-4">
                  <Link href={`/${locale}/products`}>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                      مشاهده محصولات
                    </Button>
                  </Link>
                  <Link href={`/${locale}/contact`}>
                    <Button variant="outline">تماس با ما</Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400"
                    alt="بی لوک"
                    className="rounded-3xl shadow-2xl"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=400"
                    alt="محصولات"
                    className="rounded-3xl shadow-2xl mt-8"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl -z-10 blur-3xl opacity-50" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-800"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black mb-4">ماموریت ما</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  ارائه بهترین و معتبرترین محصولات آرایشی و بهداشتی به مشتریان ایرانی با قیمت منصفانه، خدمات عالی و تجربه خرید بی‌نظیر.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-800"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black mb-4">چشم‌انداز ما</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  تبدیل شدن به بزرگترین و معتبرترین پلتفرم فروش آنلاین محصولات زیبایی در خاورمیانه و ایجاد استانداردهای جدید در صنعت.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4">
                <Star className="w-4 h-4 me-2" />
                ارزش‌های ما
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                چرا بی لوک؟
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                تعهد ما به کیفیت، اعتماد و رضایت شما
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-200 dark:border-gray-800"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-black mb-3">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4">
                <TrendingUp className="w-4 h-4 me-2" />
                مسیر رشد
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black">سفر ما</h2>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex items-center gap-6 mb-12 relative"
                >
                  {/* Line */}
                  {idx < timeline.length - 1 && (
                    <div className="absolute right-[2.4rem] top-16 w-0.5 h-20 bg-gradient-to-b from-purple-500 to-pink-500" />
                  )}

                  {/* Year Badge */}
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-black text-lg shadow-2xl">
                    {toPersianDigits(item.year)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-2xl font-black mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4">
                <Users className="w-4 h-4 me-2" />
                تیم ما
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                افراد پشت بی لوک
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                تیمی متخصص و متعهد به خدمات شما
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-200 dark:border-gray-800"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-black mb-1">{member.name}</h3>
                    <p className="text-purple-600 font-semibold mb-2">{member.role}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{member.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/30 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-white"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                آماده برای شروع خرید هستید؟
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                بیش از 500 محصول اصل از برندهای معتبر جهانی در انتظار شماست
              </p>
              <Link href={`/${locale}/products`}>
                <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 font-black text-lg px-12 py-7 rounded-2xl shadow-2xl">
                  <Package className="w-5 h-5 me-2" />
                  مشاهده محصولات
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
