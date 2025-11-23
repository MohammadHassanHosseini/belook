'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles,
  Droplet,
  Palette,
  Scissors,
  Flower2,
  Heart,
  User,
  TrendingUp,
  Package,
  Crown,
  Star,
  Search,
  X,
  Loader2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toPersianDigits } from '@/lib/utils/numbers';

export default function Categories() {
  const locale = useLocale();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      id: '1',
      name: 'مراقبت پوست',
      description: 'سرم، کرم و محصولات روشن‌کننده',
      icon: Droplet,
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=600&fit=crop',
      productCount: 156,
      slug: 'skincare',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      featured: true
    },
    {
      id: '2',
      name: 'آرایش',
      description: 'رژلب، سایه و لوازم آرایشی',
      icon: Palette,
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&h=600&fit=crop',
      productCount: 234,
      slug: 'makeup',
      gradient: 'from-pink-500 via-rose-500 to-purple-500',
      bgGradient: 'from-pink-50 to-purple-50',
      featured: true
    },
    {
      id: '3',
      name: 'مراقبت مو',
      description: 'شامپو، نرم‌کننده و ماسک مو',
      icon: Scissors,
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=600&fit=crop',
      productCount: 98,
      slug: 'haircare',
      gradient: 'from-purple-500 via-violet-500 to-indigo-500',
      bgGradient: 'from-purple-50 to-indigo-50'
    },
    {
      id: '4',
      name: 'عطر و ادکلن',
      description: 'عطرهای لوکس و ماندگار',
      icon: Flower2,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=600&fit=crop',
      productCount: 87,
      slug: 'fragrance',
      gradient: 'from-amber-500 via-orange-500 to-yellow-500',
      bgGradient: 'from-amber-50 to-orange-50'
    },
    {
      id: '5',
      name: 'مراقبت بدن',
      description: 'لوسیون، کرم و اسکراب بدن',
      icon: Heart,
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=600&fit=crop',
      productCount: 145,
      slug: 'bodycare',
      gradient: 'from-emerald-500 via-green-500 to-lime-500',
      bgGradient: 'from-emerald-50 to-green-50'
    },
    {
      id: '6',
      name: 'محصولات آقایان',
      description: 'مراقبت پوست و آرایش مردانه',
      icon: User,
      image: 'https://images.unsplash.com/photo-1602412502096-9675d4333da9?w=800&h=600&fit=crop',
      productCount: 76,
      slug: 'mens',
      gradient: 'from-slate-600 via-gray-700 to-zinc-800',
      bgGradient: 'from-slate-50 to-gray-50'
    },
  ];

  // Mock products for search
  const mockProducts = [
    { id: 1, name: 'سرم ویتامین C', category: 'مراقبت پوست', price: '۴۵۰,۰۰۰', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200', slug: 'vitamin-c-serum' },
    { id: 2, name: 'کرم ضد چروک', category: 'مراقبت پوست', price: '۷۸۰,۰۰۰', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200', slug: 'anti-wrinkle-cream' },
    { id: 3, name: 'رژلب مات', category: 'آرایش', price: '۲۳۵,۰۰۰', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200', slug: 'matte-lipstick' },
    { id: 4, name: 'ماسک مو', category: 'مراقبت مو', price: '۳۲۰,۰۰۰', image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=200', slug: 'hair-mask' },
    { id: 5, name: 'عطر زنانه', category: 'عطر و ادکلن', price: '۱,۲۵۰,۰۰۰', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200', slug: 'womens-perfume' },
    { id: 6, name: 'لوسیون بدن', category: 'مراقبت بدن', price: '۱۸۵,۰۰۰', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200', slug: 'body-lotion' },
    { id: 7, name: 'کرم پودر', category: 'آرایش', price: '۴۲۰,۰۰۰', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=200', slug: 'foundation' },
    { id: 8, name: 'شامپو ترمیم کننده', category: 'مراقبت مو', price: '۲۷۵,۰۰۰', image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=200', slug: 'repair-shampoo' },
  ];

  // Search functionality with debounce
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    
    // Simulate AJAX call with setTimeout
    const timeoutId = setTimeout(() => {
      const results = mockProducts.filter(product => 
        product.name.includes(searchQuery) || 
        product.category.includes(searchQuery)
      );
      setSearchResults(results);
      setShowResults(true);
      setIsSearching(false);
    }, 300); // Debounce delay

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 rounded-full">
            <Package className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
              دسته‌بندی محصولات
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
            کاوش در دنیای زیبایی
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            انتخاب از میان بهترین برندها و محصولات
          </p>

          {/* Smart Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
            ref={searchRef}
          >
            <div className="relative">
              {/* Search Input */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="relative flex items-center bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-800 focus-within:border-purple-500 dark:focus-within:border-purple-500 transition-all duration-300">
                  <div className="absolute right-4 flex items-center">
                    <Search className="w-5 h-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="جستجو در محصولات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-6 px-14 text-lg bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                    aria-label="Search products"
                  />
                  <div className="absolute left-4 flex items-center gap-2">
                    {isSearching && (
                      <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
                    )}
                    {searchQuery && !isSearching && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSearchResults([]);
                          setShowResults(false);
                        }}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                        aria-label="Clear search"
                      >
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {showResults && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-800 overflow-hidden z-50 max-h-[400px] overflow-y-auto"
                  >
                    <div className="p-2">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 py-2">
                        {toPersianDigits(searchResults.length.toString())} محصول یافت شد
                      </div>
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/${locale}/product/${product.slug}`}
                          onClick={() => setShowResults(false)}
                          className="block"
                        >
                          <motion.div
                            whileHover={{ x: -5 }}
                            className="flex items-center gap-4 p-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-950 dark:hover:to-pink-950 rounded-xl transition-all duration-200 cursor-pointer group"
                          >
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-all duration-500"
                                loading="lazy"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-gray-900 dark:text-white truncate">
                                {product.name}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {product.category}
                              </p>
                            </div>
                            <div className="text-left flex-shrink-0">
                              <div className="font-black text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                {product.price}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                تومان
                              </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                    
                    {/* View All Results Link */}
                    <div className="border-t border-gray-200 dark:border-gray-800 p-3 bg-gray-50 dark:bg-gray-950">
                      <Link
                        href={`/${locale}/search?q=${encodeURIComponent(searchQuery)}`}
                        onClick={() => setShowResults(false)}
                        className="block text-center py-2 text-sm font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                      >
                        مشاهده همه نتایج
                      </Link>
                    </div>
                  </motion.div>
                )}
                
                {/* No Results */}
                {showResults && searchResults.length === 0 && !isSearching && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-800 p-8 text-center z-50"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                      نتیجه‌ای یافت نشد
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      متاسفانه محصولی با این جستجو پیدا نشد
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        {/* Featured Categories - Large Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {categories.filter(cat => cat.featured).map((category, index) => {
            const Icon = category.icon;
            const isHovered = hoveredCategory === category.id;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredCategory(category.id)}
                onHoverEnd={() => setHoveredCategory(null)}
                className="group relative"
              >
                <Link href={`/${locale}/products/${category.slug}`}>
                  <div className="relative h-[400px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-2xl">
                    
                    {/* Background Image with Parallax */}
                    <motion.div
                      animate={{
                        scale: isHovered ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                    >
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-60 mix-blend-multiply`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    {/* Floating Particles */}
                    {isHovered && (
                      <>
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ y: 0, opacity: 0 }}
                            animate={{ y: -100, opacity: [0, 1, 0] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                            className="absolute bottom-0"
                            style={{ left: `${(i + 1) * 12}%` }}
                          >
                            <Sparkles className="w-4 h-4 text-white" />
                          </motion.div>
                        ))}
                      </>
                    )}

                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-between">
                      
                      {/* Top Section */}
                      <div className="flex items-start justify-between">
                        {/* Icon */}
                        <motion.div
                          className="p-4 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl hover:scale-[1.05] transition-transform duration-300 will-change-transform"
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.div>

                        {/* Badge */}
                        <Badge className="bg-white/20 backdrop-blur-xl border-white/30 text-white px-4 py-2">
                          <Crown className="w-4 h-4 me-1" />
                          ویژه
                        </Badge>
                      </div>

                      {/* Bottom Section */}
                      <div>
                        <motion.h3
                          animate={{ x: isHovered ? 5 : 0 }}
                          className="text-4xl md:text-5xl font-black text-white mb-2"
                        >
                          {category.name}
                        </motion.h3>
                        <p className="text-white/90 text-lg mb-4">
                          {category.description}
                        </p>
                        
                        {/* Stats */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-white/90">
                              <Package className="w-5 h-5" />
                              <span className="font-bold text-lg">
                                {toPersianDigits(category.productCount)} محصول
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-white/90">
                              <TrendingUp className="w-5 h-5" />
                              <span className="text-sm">پرفروش</span>
                            </div>
                          </div>

                          {/* CTA */}
                          <motion.div
                            animate={{ x: isHovered ? 5 : 0 }}
                            className="flex items-center gap-2 text-white font-bold text-lg"
                          >
                            <span>مشاهده</span>
                            <ArrowRight className="w-6 h-6" />
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Shine Effect */}
                    <motion.div
                      animate={{
                        x: isHovered ? ['-100%', '200%'] : '-100%',
                      }}
                      transition={{
                        duration: 1,
                        ease: 'easeInOut',
                      }}
                      className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                    />
                  </div>
                </Link>

                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`} />
              </motion.div>
            );
          })}
        </div>

        {/* Regular Categories - Small Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.filter(cat => !cat.featured).map((category, index) => {
            const Icon = category.icon;
            const isHovered = hoveredCategory === category.id;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredCategory(category.id)}
                onHoverEnd={() => setHoveredCategory(null)}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <Link href={`/${locale}/products/${category.slug}`}>
                  <div className="relative h-[320px] rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-800">
                    
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <motion.img
                        animate={{ scale: isHovered ? 1.15 : 1 }}
                        transition={{ duration: 0.6 }}
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50 mix-blend-multiply`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      
                      {/* Icon */}
                      <motion.div
                        className={`self-start p-3 rounded-xl bg-gradient-to-br ${category.gradient} shadow-2xl hover:scale-[1.05] transition-transform duration-300 will-change-transform`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>

                      {/* Info */}
                      <div>
                        <h3 className="text-2xl font-black text-white mb-2">
                          {category.name}
                        </h3>
                        <p className="text-white/80 text-sm mb-3">
                          {category.description}
                        </p>
                        
                        {/* Product Count */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-xl rounded-full border border-white/30">
                            <Package className="w-4 h-4 text-white" />
                            <span className="text-white text-sm font-bold">
                              {toPersianDigits(category.productCount)}
                            </span>
                          </div>

                          {/* Arrow */}
                          <motion.div
                            animate={{ x: isHovered ? 5 : 0 }}
                            className="p-2 bg-white/20 backdrop-blur-xl rounded-full border border-white/30"
                          >
                            <ArrowRight className="w-5 h-5 text-white" />
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Shimmer Effect */}
                    <motion.div
                      animate={{
                        x: isHovered ? ['-100%', '200%'] : '-100%',
                      }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    />
                  </div>
                </Link>

                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 -z-10`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
