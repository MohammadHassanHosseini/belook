'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Eye,
  Sparkles,
  TrendingUp,
  Zap,
  Crown,
  Flame,
  ArrowRight,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toPersianDigits } from '@/lib/utils/numbers';

export default function FeaturedProducts() {
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'همه محصولات', icon: Sparkles },
    { id: 'bestseller', label: 'پرفروش‌ترین', icon: TrendingUp },
    { id: 'new', label: 'جدیدترین', icon: Zap },
    { id: 'luxury', label: 'لوکس', icon: Crown },
  ];

  const products = [
    {
      id: '1',
      name: 'سرم ویتامین C طلایی',
      category: 'new',
      price: 850000,
      comparePrice: 1200000,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 245,
      badge: 'جدید',
      badgeColor: 'from-blue-500 to-cyan-500',
      sold: 189,
      inStock: true,
      tags: ['ضد چروک', 'روشن کننده']
    },
    {
      id: '2',
      name: 'کرم مرطوب‌کننده هیالورونیک',
      category: 'bestseller',
      price: 680000,
      comparePrice: 890000,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop',
      rating: 5.0,
      reviews: 432,
      badge: 'پرفروش',
      badgeColor: 'from-orange-500 to-red-500',
      sold: 567,
      inStock: true,
      tags: ['مرطوب کننده', 'ضد پیری']
    },
    {
      id: '3',
      name: 'ماسک صورت طلا و کلاژن',
      category: 'luxury',
      price: 1250000,
      comparePrice: 1650000,
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 156,
      badge: 'لوکس',
      badgeColor: 'from-yellow-500 to-orange-500',
      sold: 234,
      inStock: true,
      tags: ['طلا', 'کلاژن']
    },
    {
      id: '4',
      name: 'کرم دور چشم ضد چروک',
      category: 'bestseller',
      price: 590000,
      comparePrice: 780000,
      image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 198,
      badge: '۲۵٪ تخفیف',
      badgeColor: 'from-pink-500 to-purple-500',
      sold: 345,
      inStock: true,
      tags: ['ضد چروک', 'محافظت']
    },
    {
      id: '5',
      name: 'تونر پاک‌کننده چای سبز',
      category: 'new',
      price: 450000,
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=500&fit=crop',
      rating: 4.6,
      reviews: 123,
      badge: 'جدید',
      badgeColor: 'from-green-500 to-emerald-500',
      sold: 167,
      inStock: true,
      tags: ['پاک کننده', 'طبیعی']
    },
    {
      id: '6',
      name: 'سرم رتینول شبانه',
      category: 'luxury',
      price: 980000,
      comparePrice: 1280000,
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 267,
      badge: 'محبوب',
      badgeColor: 'from-purple-500 to-pink-500',
      sold: 423,
      inStock: true,
      tags: ['رتینول', 'ضد پیری']
    },
    {
      id: '7',
      name: 'کرم ضد آفتاب SPF 50',
      category: 'bestseller',
      price: 520000,
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 312,
      badge: 'ضروری',
      badgeColor: 'from-cyan-500 to-blue-500',
      sold: 512,
      inStock: true,
      tags: ['SPF 50', 'محافظت']
    },
    {
      id: '8',
      name: 'لایه بردار اسکراب انار',
      category: 'new',
      price: 380000,
      comparePrice: 480000,
      image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=500&h=500&fit=crop',
      rating: 4.5,
      reviews: 145,
      badge: 'جدید',
      badgeColor: 'from-rose-500 to-pink-500',
      sold: 198,
      inStock: true,
      tags: ['لایه بردار', 'طبیعی']
    },
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const calculateDiscount = (price: number, comparePrice?: number) => {
    if (!comparePrice) return 0;
    return Math.round(((comparePrice - price) / comparePrice) * 100);
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 rounded-full">
            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
              محصولات ویژه
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
            محبوب‌ترین محصولات
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            با کیفیت‌ترین محصولات آرایشی و بهداشتی را کشف کنید
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {categories.map((category, idx) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] will-change-transform ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl shadow-purple-500/50'
                    : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600 shadow-lg'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                onHoverStart={() => setHoveredProduct(product.id)}
                onHoverEnd={() => setHoveredProduct(null)}
                className="group relative"
              >
                <div className="relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800">
                  
                  {/* Product Image */}
                  <Link href={`/${locale}/product/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-800">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-500"
                      />
                      
                      {/* Gradient Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Badge */}
                      <div className="absolute top-3 right-3">
                        <Badge className={`bg-gradient-to-r ${product.badgeColor} text-white border-0 px-3 py-1.5 text-xs font-bold shadow-xl backdrop-blur-xl`}>
                          {product.badge}
                        </Badge>
                      </div>

                      {/* Discount Badge */}
                      {product.comparePrice && (
                        <div className="absolute top-3 left-3">
                          <div className="bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-xl">
                            {toPersianDigits(calculateDiscount(product.price, product.comparePrice))}٪
                          </div>
                        </div>
                      )}

                      {/* Quick Action Buttons */}
                      <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <Button
                          size="sm"
                          className="flex-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-800 shadow-xl"
                        >
                          <ShoppingCart className="w-4 h-4 me-1" />
                          افزودن
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-0 hover:bg-white dark:hover:bg-gray-800 shadow-xl"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-0 hover:bg-white dark:hover:bg-gray-800 shadow-xl"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-5">
                    {/* Tags */}
                    <div className="flex gap-2 mb-3">
                      {product.tags.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Name */}
                    <Link href={`/${locale}/product/${product.id}`}>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300 dark:text-gray-700'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {toPersianDigits(product.rating.toString())}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({toPersianDigits(product.reviews.toString())})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {toPersianDigits(new Intl.NumberFormat('en-US').format(product.price))}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">تومان</span>
                        </div>
                        {product.comparePrice && (
                          <div className="text-sm text-gray-400 dark:text-gray-600 line-through">
                            {toPersianDigits(new Intl.NumberFormat('en-US').format(product.comparePrice))}
                          </div>
                        )}
                      </div>

                      {/* Sold Count */}
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Flame className="w-3 h-3 text-orange-500" />
                        <span>{toPersianDigits(product.sold)} فروش</span>
                      </div>
                    </div>

                    {/* Stock Status */}
                    {product.inStock && (
                      <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span>موجود در انبار</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${product.badgeColor} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl shadow-purple-500/50 px-8 py-6 text-lg group"
          >
            <Link href={`/${locale}/products`}>
              <span>مشاهده همه محصولات</span>
              <ArrowRight className="w-5 h-5 ms-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
