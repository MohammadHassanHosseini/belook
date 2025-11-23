'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, Gift, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 3000);
    }
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      {/* Animated Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            {/* Icon */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl mb-6"
            >
              <Mail className="w-10 h-10" />
            </motion.div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
              عضویت در خبرنامه
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              از جدیدترین محصولات، تخفیف‌های ویژه و پیشنهادات اختصاصی با خبر شوید
            </p>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                { icon: Gift, text: 'تخفیف ۱۰٪ خرید اول' },
                { icon: Sparkles, text: 'پیشنهادات اختصاصی' },
                { icon: CheckCircle2, text: 'اولین‌ها باشید' },
              ].map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center justify-center gap-2 text-white/90"
                >
                  <benefit.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
            >
              {!isSubscribed ? (
                <div className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="آدرس ایمیل شما"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/20 backdrop-blur-xl border-white/30 text-white placeholder:text-white/60 h-14 text-lg"
                    required
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-white/90 shadow-2xl px-8 h-14"
                  >
                    <Send className="w-5 h-5 me-2" />
                    عضویت
                  </Button>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur-xl rounded-2xl py-6 border-2 border-white/30"
                >
                  <CheckCircle2 className="w-6 h-6 text-white" />
                  <span className="text-lg font-bold">با موفقیت عضو شدید!</span>
                </motion.div>
              )}
            </motion.form>

            {/* Privacy Note */}
            <p className="text-sm text-white/70 mt-4">
              ایمیل شما نزد ما محفوظ است و هرگز به اشتراک گذاشته نمی‌شود
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
