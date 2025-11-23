'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  Star,
  CheckCircle,
  Instagram,
  Twitter,
  Linkedin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { toast } from 'react-hot-toast';
import { toPersianDigits } from '@/lib/utils/numbers';

interface ContactClientProps {
  locale: string;
}

export default function ContactClient({ locale }: ContactClientProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('پیام شما با موفقیت ارسال شد! به زودی با شما تماس خواهیم گرفت.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'تلفن تماس',
      value: '021-12345678',
      link: 'tel:02112345678',
      color: 'from-green-500 to-emerald-500',
      description: 'پاسخگویی 24/7'
    },
    {
      icon: Mail,
      title: 'ایمیل',
      value: 'info@belook.ir',
      link: 'mailto:info@belook.ir',
      color: 'from-blue-500 to-cyan-500',
      description: 'پاسخ در کمتر از 24 ساعت'
    },
    {
      icon: MapPin,
      title: 'آدرس',
      value: 'تهران، خیابان ولیعصر، پلاک 1234',
      link: '#',
      color: 'from-orange-500 to-red-500',
      description: 'بازدید با هماهنگی قبلی'
    },
    {
      icon: Clock,
      title: 'ساعت کاری',
      value: 'شنبه تا پنجشنبه: 9-18',
      link: '#',
      color: 'from-purple-500 to-pink-500',
      description: 'جمعه‌ها تعطیل'
    },
  ];

  const socialLinks = [
    { icon: Instagram, name: 'اینستاگرام', link: '#', color: 'from-pink-500 to-purple-500' },
    { icon: Twitter, name: 'توییتر', link: '#', color: 'from-blue-400 to-cyan-400' },
    { icon: Linkedin, name: 'لینکدین', link: '#', color: 'from-blue-600 to-blue-700' },
  ];

  const features = [
    { icon: Headphones, title: 'پشتیبانی 24/7', description: 'همیشه در کنار شما' },
    { icon: MessageSquare, title: 'مشاوره رایگان', description: 'کارشناسان ما آماده پاسخگویی' },
    { icon: CheckCircle, title: 'پاسخ سریع', description: 'کمتر از 2 ساعت' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500">
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
                  <Headphones className="w-5 h-5 me-2" />
                  تماس با بی لوک
                </Badge>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">
                ما همیشه
                <br />
                <span className="bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
                  در کنار شما هستیم
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-10">
                پشتیبانی 24 ساعته، مشاوره رایگان و پاسخگویی سریع
              </p>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-6 flex-wrap"
              >
                {features.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + idx * 0.1, type: 'spring' }}
                      className="flex items-center gap-2 bg-white/20 backdrop-blur-xl rounded-full px-5 py-3 border border-white/30"
                    >
                      <Icon className="w-5 h-5 text-white" />
                      <span className="text-white font-bold text-sm">{feature.title}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 -mt-16 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={idx}
                    href={info.link}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all border border-gray-200 dark:border-gray-800"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-black mb-2">{info.title}</h3>
                    <p className="text-gray-900 dark:text-white font-semibold mb-1">{info.value}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{info.description}</p>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Form & Map Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-800">
                  <div className="mb-8">
                    <Badge className="mb-4">
                      <Send className="w-4 h-4 me-2" />
                      فرم تماس
                    </Badge>
                    <h2 className="text-3xl font-black mb-2">پیام خود را بفرستید</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      در کمتر از 2 ساعت به شما پاسخ خواهیم داد
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">نام و نام خانوادگی *</label>
                        <Input
                          placeholder="نام خود را وارد کنید"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="h-12"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">ایمیل *</label>
                        <Input
                          type="email"
                          placeholder="example@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">شماره تماس</label>
                        <Input
                          placeholder="09123456789"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="h-12"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">موضوع *</label>
                        <Input
                          placeholder="موضوع پیام"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">پیام شما *</label>
                      <textarea
                        placeholder="پیام خود را اینجا بنویسید..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        className="w-full min-h-[150px] resize-none rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black text-lg py-6 rounded-xl shadow-lg"
                    >
                      {isSubmitting ? (
                        <span>در حال ارسال...</span>
                      ) : (
                        <>
                          <Send className="w-5 h-5 me-2" />
                          ارسال پیام
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>

              {/* Map & Social */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {/* Map */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-800 relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12959.558395242954!2d51.42076!3d35.69439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00491ff3dcd9%3A0xf0a77c5d03fb8df!2sValiasr%20St%2C%20Tehran!5e0!3m2!1sen!2s!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      className="absolute inset-0"
                    />
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-xl">
                  <h3 className="text-2xl font-black mb-4">ما را در شبکه‌های اجتماعی دنبال کنید</h3>
                  <p className="mb-6 text-white/90">آخرین اخبار، تخفیف‌ها و نکات زیبایی</p>
                  
                  <div className="space-y-3">
                    {socialLinks.map((social, idx) => {
                      const Icon = social.icon;
                      return (
                        <motion.a
                          key={idx}
                          href={social.link}
                          whileHover={{ scale: 1.05, x: 5 }}
                          className="flex items-center gap-4 bg-white/20 backdrop-blur-xl rounded-2xl p-4 hover:bg-white/30 transition-all border border-white/30"
                        >
                          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="font-bold text-lg">{social.name}</span>
                        </motion.a>
                      );
                    })}
                  </div>
                </div>

                {/* FAQ Link */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-800">
                  <MessageSquare className="w-12 h-12 text-purple-600 mb-4" />
                  <h3 className="text-2xl font-black mb-2">سوالات متداول</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    شاید پاسخ سوال شما در بخش سوالات متداول باشد
                  </p>
                  <Button variant="outline" className="w-full">
                    مشاهده سوالات متداول
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-16 bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { icon: Star, title: '10,000+', subtitle: 'مشتری راضی' },
                { icon: CheckCircle, title: '99%', subtitle: 'رضایت مشتری' },
                { icon: Headphones, title: '24/7', subtitle: 'پشتیبانی' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Icon className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                    <div className="text-4xl font-black text-gray-900 dark:text-white mb-2">
                      {toPersianDigits(item.title)}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 font-semibold">
                      {item.subtitle}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
