'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Headphones, 
  Shield, 
  Award,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  CreditCard,
  BadgeCheck
} from 'lucide-react';

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      icon: Truck,
      title: 'ارسال رایگان',
      description: 'برای خریدهای بالای ۵۰۰ هزار تومان',
      detail: 'ارسال سریع به سراسر کشور',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      darkBg: 'from-blue-950/50 to-cyan-950/50',
      glowColor: 'blue',
      particles: [
        { x: -10, y: -10, delay: 0 },
        { x: 10, y: -15, delay: 0.2 },
        { x: -15, y: 10, delay: 0.4 },
      ]
    },
    {
      icon: Headphones,
      title: 'پشتیبانی ۲۴/۷',
      description: 'همیشه در کنار شما هستیم',
      detail: 'پاسخگویی سریع و تخصصی',
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      bgGradient: 'from-green-50 to-emerald-50',
      darkBg: 'from-green-950/50 to-emerald-950/50',
      glowColor: 'green',
      particles: [
        { x: 12, y: -8, delay: 0.1 },
        { x: -8, y: -12, delay: 0.3 },
        { x: 15, y: 8, delay: 0.5 },
      ]
    },
    {
      icon: Shield,
      title: 'پرداخت امن',
      description: 'با درگاه‌های معتبر',
      detail: 'رمزنگاری و امنیت بالا',
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      bgGradient: 'from-purple-50 to-pink-50',
      darkBg: 'from-purple-950/50 to-pink-950/50',
      glowColor: 'purple',
      particles: [
        { x: -12, y: 10, delay: 0.15 },
        { x: 10, y: -10, delay: 0.35 },
        { x: -10, y: -15, delay: 0.55 },
      ]
    },
    {
      icon: Award,
      title: 'کیفیت تضمین شده',
      description: 'محصولات اصل و اورجینال',
      detail: 'گارانتی اصالت کالا',
      gradient: 'from-orange-500 via-amber-500 to-yellow-500',
      bgGradient: 'from-orange-50 to-yellow-50',
      darkBg: 'from-orange-950/50 to-yellow-950/50',
      glowColor: 'orange',
      particles: [
        { x: 10, y: 12, delay: 0.05 },
        { x: -15, y: -10, delay: 0.25 },
        { x: 12, y: -12, delay: 0.45 },
      ]
    },
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={{ y: -12 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full">
                  <div className={`relative h-full bg-gradient-to-br ${feature.bgGradient} dark:bg-gradient-to-br dark:${feature.darkBg} backdrop-blur-xl rounded-3xl p-8 border-2 border-white/50 dark:border-gray-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden`}>
                    
                    {/* Floating Particles */}
                    {isHovered && feature.particles.map((particle, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: particle.x,
                          y: particle.y,
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: particle.delay,
                        }}
                        className="absolute top-1/2 left-1/2"
                      >
                        <Sparkles className="w-4 h-4 text-white/60" />
                      </motion.div>
                    ))}

                    {/* Icon Container */}
                    <motion.div
                      animate={{
                        scale: isHovered ? 1.1 : 1,
                      }}
                      transition={{ 
                        scale: { duration: 0.3 }
                      }}
                      className="relative mb-6"
                    >
                      {/* Icon Background with Gradient */}
                      <div className={`relative w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-2xl flex items-center justify-center`}>
                        <Icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                      </div>

                      {/* Checkmark Badge */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ 
                          scale: isHovered ? 1 : 0,
                          rotate: isHovered ? 0 : -180,
                        }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="absolute -top-2 -right-2"
                      >
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}>
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                      </motion.div>

                      {/* Pulse Ring */}
                      <motion.div
                        animate={{
                          scale: isHovered ? [1, 1.3, 1] : 1,
                          opacity: isHovered ? [0.5, 0, 0.5] : 0,
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0`}
                      />
                    </motion.div>

                    {/* Content */}
                    <div className="text-center space-y-3">
                      {/* Title */}
                      <h3 className={`text-xl font-black bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Divider */}
                      <div className="relative h-px">
                        <motion.div
                          animate={{
                            scaleX: isHovered ? 1 : 0.5,
                          }}
                          className={`h-full bg-gradient-to-r ${feature.gradient} rounded-full`}
                        />
                      </div>

                      {/* Detail */}
                      <motion.div
                        animate={{
                          opacity: isHovered ? 1 : 0.7,
                          y: isHovered ? 0 : 5,
                        }}
                        className={`flex items-center justify-center gap-2 text-xs font-medium bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}
                      >
                        <ArrowRight className={`w-3 h-3 text-gray-600 dark:text-gray-400`} />
                        <span>{feature.detail}</span>
                      </motion.div>
                    </div>

                    {/* Bottom Shine Effect */}
                    <motion.div
                      animate={{
                        x: isHovered ? ['0%', '100%'] : '0%',
                      }}
                      transition={{ duration: 1, ease: 'easeInOut' }}
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient}`}
                    />

                    {/* Corner Decoration */}
                    <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-bl-full`} />
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <motion.div
                    animate={{
                      opacity: isHovered ? 0.4 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl blur-2xl -z-10`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-6 px-8 py-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl">
            {[
              { icon: BadgeCheck, text: '۱۰۰٪ اصالت', color: 'from-green-500 to-emerald-500' },
              { icon: Clock, text: 'پاسخگویی سریع', color: 'from-blue-500 to-cyan-500' },
              { icon: CreditCard, text: 'پرداخت آسان', color: 'from-purple-500 to-pink-500' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                className="flex items-center gap-2 hover:scale-[1.05] transition-transform duration-300 will-change-transform"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <span className={`text-sm font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
