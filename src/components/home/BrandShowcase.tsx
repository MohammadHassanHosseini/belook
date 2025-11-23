'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, Star, Crown, Sparkles } from 'lucide-react';

export default function BrandShowcase() {
  const [isHovered, setIsHovered] = useState(false);

  const brands = [
    { name: 'Chanel', logo: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=200', category: 'Luxury Fashion' },
    { name: 'Dior', logo: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=200', category: 'Haute Couture' },
    { name: 'Estée Lauder', logo: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=200', category: 'Premium Skincare' },
    { name: 'Lancôme', logo: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=200', category: 'French Beauty' },
    { name: 'YSL', logo: 'https://images.unsplash.com/photo-1583241800698-b47842efe9ad?w=200', category: 'Luxury Cosmetics' },
    { name: 'Guerlain', logo: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200', category: 'Classic French' },
    { name: 'Givenchy', logo: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200', category: 'High Fashion' },
    { name: 'Tom Ford', logo: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200', category: 'Modern Luxury' },
    { name: 'La Mer', logo: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200', category: 'Premium Cream' },
    { name: 'SK-II', logo: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200', category: 'Japanese Beauty' },
    { name: 'Sisley', logo: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200', category: 'Botanical Beauty' },
    { name: 'Shiseido', logo: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=200', category: 'Innovation' },
    { name: 'Clinique', logo: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200', category: 'Dermatology' },
    { name: 'MAC', logo: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=200', category: 'Pro Makeup' },
    { name: 'NARS', logo: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200', category: 'Artistic Beauty' },
    { name: 'Bobbi Brown', logo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200', category: 'Natural Makeup' },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-purple-50/30 to-white dark:from-gray-950 dark:via-purple-950/10 dark:to-gray-950 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-5 py-2.5 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 rounded-full border border-purple-200 dark:border-purple-800">
            <Crown className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-bold text-purple-600 dark:text-purple-400">برندهای لوکس جهان</span>
            <Sparkles className="w-5 h-5 text-pink-600 dark:text-pink-400" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              معتبرترین برندهای
            </span>
            {' '}زیبایی دنیا
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            همکاری مستقیم با بیش از <span className="font-bold text-purple-600">۵۰+ برند معتبر</span> بین‌المللی
          </p>
        </motion.div>

        {/* Auto-scrolling Brands Carousel */}
        <div className="relative mb-16">
          {/* Gradient Fades */}
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
          
          <motion.div
            className="flex gap-6"
            animate={!isHovered ? {
              x: ['-33.333%', '0%'],
            } : {}}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            {/* Triple brands for seamless loop */}
            {[...brands, ...brands, ...brands].map((brand, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group relative flex-shrink-0 w-[180px] md:w-[200px] hover:scale-[1.05] hover:-translate-y-2 transition-transform duration-300 will-change-transform"
              >
                <div className="relative">
                  {/* Circular Container */}
                  <div className="relative bg-white dark:bg-gray-900 rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-3 border-gray-100 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700 aspect-square">
                    {/* Brand Image */}
                    <div className="w-full h-full overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-8">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="w-full h-full object-cover rounded-full transition-all duration-500 filter grayscale-0"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Brand Info Overlay - Circular */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-center p-6 rounded-full">
                      <h3 className="font-black text-white text-base mb-1 text-center">{brand.name}</h3>
                      <p className="text-xs text-gray-200 font-medium text-center">{brand.category}</p>
                    </div>
                    
                    {/* Verified Badge */}
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    
                    {/* Inner Glow Ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-purple-500/30 transition-all duration-500" />
                  </div>
                  
                  {/* External Glow - Circular */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10 scale-90" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Trust Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { icon: CheckCircle2, title: '۱۰۰٪ اصالت کالا', desc: 'تضمین اصل بودن', color: 'from-green-500 to-emerald-500' },
            { icon: Award, title: 'برندهای لوکس', desc: 'بیش از ۵۰ برند معتبر', color: 'from-purple-500 to-pink-500' },
            { icon: Star, title: 'رضایت مشتری', desc: '۴.۹ از ۵ امتیاز', color: 'from-yellow-500 to-orange-500' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                      {stat.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.desc}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
