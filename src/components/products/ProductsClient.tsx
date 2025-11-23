'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  SlidersHorizontal, 
  Grid3x3, 
  List, 
  ChevronDown,
  Star,
  ShoppingCart,
  Heart,
  Sparkles,
  TrendingUp,
  Flame,
  X,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { toPersianDigits } from '@/lib/utils/numbers';

interface ProductsClientProps {
  locale: string;
}

export default function ProductsClient({ locale }: ProductsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - در production از API می‌آید
  const products = [
    {
      id: 1,
      name: 'سرم ویتامین C',
      brand: 'Estée Lauder',
      category: 'skincare',
      price: 450000,
      originalPrice: 600000,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400',
      rating: 4.8,
      reviews: 124,
      inStock: true,
      isNew: true,
      isTrending: true,
      tags: ['پرفروش', 'ویژه']
    },
    {
      id: 2,
      name: 'کرم ضد چروک',
      brand: 'Lancôme',
      category: 'skincare',
      price: 780000,
      originalPrice: 950000,
      discount: 18,
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
      rating: 4.9,
      reviews: 89,
      inStock: true,
      isNew: false,
      isTrending: true,
      tags: ['لوکس']
    },
    {
      id: 3,
      name: 'رژلب مات',
      brand: 'MAC',
      category: 'makeup',
      price: 235000,
      originalPrice: 280000,
      discount: 16,
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400',
      rating: 4.7,
      reviews: 156,
      inStock: true,
      isNew: true,
      isTrending: false,
      tags: ['پرفروش']
    },
    {
      id: 4,
      name: 'ماسک مو',
      brand: 'Shiseido',
      category: 'haircare',
      price: 320000,
      originalPrice: 380000,
      discount: 16,
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400',
      rating: 4.6,
      reviews: 78,
      inStock: true,
      isNew: false,
      isTrending: false,
      tags: []
    },
    {
      id: 5,
      name: 'عطر زنانه',
      brand: 'Dior',
      category: 'fragrance',
      price: 1250000,
      originalPrice: 1500000,
      discount: 17,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
      rating: 5.0,
      reviews: 203,
      inStock: true,
      isNew: true,
      isTrending: true,
      tags: ['پرفروش', 'لوکس']
    },
    {
      id: 6,
      name: 'لوسیون بدن',
      brand: 'Clinique',
      category: 'bodycare',
      price: 185000,
      originalPrice: 220000,
      discount: 16,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
      rating: 4.5,
      reviews: 92,
      inStock: true,
      isNew: false,
      isTrending: false,
      tags: []
    },
  ];

  const categories = [
    { id: 'all', label: 'همه محصولات', count: products.length },
    { id: 'skincare', label: 'مراقبت پوست', count: 2 },
    { id: 'makeup', label: 'آرایش', count: 1 },
    { id: 'haircare', label: 'مراقبت مو', count: 1 },
    { id: 'fragrance', label: 'عطر', count: 1 },
    { id: 'bodycare', label: 'مراقبت بدن', count: 1 },
  ];

  const brands = [
    { id: 'all', label: 'همه برندها' },
    { id: 'estee', label: 'Estée Lauder' },
    { id: 'lancome', label: 'Lancôme' },
    { id: 'mac', label: 'MAC' },
    { id: 'dior', label: 'Dior' },
    { id: 'shiseido', label: 'Shiseido' },
    { id: 'clinique', label: 'Clinique' },
  ];

  const sortOptions = [
    { id: 'newest', label: 'جدیدترین' },
    { id: 'popular', label: 'محبوب‌ترین' },
    { id: 'price-low', label: 'ارزان‌ترین' },
    { id: 'price-high', label: 'گران‌ترین' },
    { id: 'discount', label: 'بیشترین تخفیف' },
  ];

  // Filtered products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Search
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.includes(searchQuery) || p.brand.includes(searchQuery)
      );
    }

    // Category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'discount':
          return b.discount - a.discount;
        case 'popular':
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      
      <main className="flex-1 relative">
        {/* Hero Section */}
        <section className="relative py-12 md:py-16 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="inline-block mb-4"
              >
                <Badge className="bg-white/20 backdrop-blur-xl text-white border-white/30 px-6 py-2 text-base">
                  <Sparkles className="w-5 h-5 me-2" />
                  {toPersianDigits(filteredProducts.length)} محصول
                </Badge>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
                فروشگاه محصولات
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
                بهترین محصولات آرایشی و بهداشتی با کیفیت تضمین شده
              </p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 max-w-2xl mx-auto"
              >
                <div className="relative">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="جستجوی محصول..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-6 px-14 text-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-white/20 focus:border-white"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="sticky top-24 space-y-4">
                {/* Categories */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-800"
                >
                  <h3 className="text-base font-black mb-3 flex items-center gap-2">
                    <Grid3x3 className="w-5 h-5 text-purple-600" />
                    دسته‌بندی
                  </h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-lg transition-all text-sm ${
                          selectedCategory === cat.id
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <span className="font-semibold">{cat.label}</span>
                        <Badge variant={selectedCategory === cat.id ? 'secondary' : 'outline'}>
                          {toPersianDigits(cat.count)}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Sort */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-800"
                >
                  <h3 className="text-base font-black mb-3 flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-purple-600" />
                    مرتب‌سازی
                  </h3>
                  <div className="space-y-2">
                    {sortOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSortBy(option.id)}
                        className={`w-full flex items-center gap-2 p-2.5 rounded-lg transition-all text-sm ${
                          sortBy === option.id
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        {sortBy === option.id && <Check className="w-4 h-4" />}
                        <span className="font-semibold">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                  >
                    <SlidersHorizontal className="w-4 h-4 me-2" />
                    فیلترها
                  </Button>
                  <p className="text-gray-600 dark:text-gray-400 font-semibold">
                    {toPersianDigits(filteredProducts.length)} محصول یافت شد
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Products */}
              <AnimatePresence mode="wait">
                {filteredProducts.length > 0 ? (
                  <motion.div
                    key="products"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`grid gap-4 md:gap-5 lg:gap-6 ${
                      viewMode === 'grid'
                        ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'
                        : 'grid-cols-1'
                    }`}
                  >
                    {filteredProducts.map((product, idx) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        locale={locale}
                        index={idx}
                        viewMode={viewMode}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="no-results"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-20"
                  >
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <Search className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                      محصولی یافت نشد
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      لطفاً فیلترهای دیگری امتحان کنید
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Product Card Component
function ProductCard({ 
  product, 
  locale, 
  index,
  viewMode 
}: { 
  product: any; 
  locale: string; 
  index: number;
  viewMode: 'grid' | 'list';
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-800 flex"
      >
        <div className="w-48 flex-shrink-0">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 p-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black mb-2">{product.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{product.brand}</p>
            <div className="flex items-center gap-4">
              <div className="text-2xl font-black text-purple-600">
                {toPersianDigits(product.price.toLocaleString())} تومان
              </div>
              {product.discount > 0 && (
                <Badge className="bg-red-500 text-white">
                  {toPersianDigits(product.discount)}٪ تخفیف
                </Badge>
              )}
            </div>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
            <ShoppingCart className="w-4 h-4 me-2" />
            افزودن به سبد
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative bg-gradient-to-br from-white via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 border border-purple-100/50 dark:border-purple-900/30 will-change-transform"
    >
      {/* Animated Border Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />

      {/* Badges */}
      <div className="absolute top-2 left-2 z-20 flex flex-col gap-1.5">
        {product.discount > 0 && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.05 + 0.1 }}
          >
            <Badge className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white border-0 shadow-xl px-2 py-1 text-xs font-black">
              <Flame className="w-3 h-3 me-1" />
              {toPersianDigits(product.discount)}٪
            </Badge>
          </motion.div>
        )}
        {product.isNew && (
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.05 + 0.15 }}
          >
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-xl px-2 py-1 text-xs font-black">
              <Sparkles className="w-3 h-3 me-1" />
              جدید
            </Badge>
          </motion.div>
        )}
        {product.isTrending && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.05 + 0.2 }}
          >
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 shadow-xl px-2 py-1 text-xs font-black">
              <TrendingUp className="w-3 h-3 me-1" />
              داغ
            </Badge>
          </motion.div>
        )}
      </div>

      {/* Favorite Button */}
      <motion.button
        onClick={() => setIsFavorite(!isFavorite)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-2 right-2 z-20 w-9 h-9 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-full flex items-center justify-center shadow-lg border border-gray-200/50 dark:border-gray-700/50"
      >
        <Heart className={`w-4 h-4 transition-all ${isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-600'}`} />
      </motion.button>

      {/* Image with Overlay Effect */}
      <Link href={`/${locale}/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-500"
          />
          {/* Multi-layer Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </Link>

      {/* Content with Enhanced Spacing */}
      <div className="p-3.5">
        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 transition-all ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
            {toPersianDigits(product.rating.toFixed(1))}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            ({toPersianDigits(product.reviews)})
          </span>
        </div>

        {/* Brand with Icon */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="w-1 h-1 rounded-full bg-purple-500" />
          <p className="text-xs font-semibold text-purple-600 dark:text-purple-400">{product.brand}</p>
        </div>

        {/* Product Name */}
        <Link href={`/${locale}/product/${product.id}`}>
          <h3 className="font-black text-sm leading-tight mb-2.5 line-clamp-2 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        {/* Price Section with Better Visual Hierarchy */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-baseline gap-1.5">
              <div className="text-xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                {toPersianDigits(product.price.toLocaleString())}
              </div>
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400">تومان</span>
            </div>
            {product.discount > 0 && (
              <div className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 rounded-full">
                <span className="text-xs font-black text-red-600 dark:text-red-400">
                  -{toPersianDigits(product.discount)}٪
                </span>
              </div>
            )}
          </div>
          {product.discount > 0 && (
            <div className="text-xs text-gray-400 dark:text-gray-500 line-through">
              {toPersianDigits(product.originalPrice.toLocaleString())} تومان
            </div>
          )}
        </div>

        {/* Add to Cart Button with Enhanced Style */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white font-black rounded-xl shadow-lg hover:shadow-xl transition-all text-xs py-5 relative overflow-hidden group">
            {/* Button Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            <ShoppingCart className="w-3.5 h-3.5 me-1.5" />
            <span>افزودن به سبد</span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
