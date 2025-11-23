'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Crown,
  Sparkles,
  TrendingUp,
  Award,
  ShoppingBag,
  X,
  Check,
  Star,
  ChevronRight,
  Filter,
  Globe,
  Heart,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { toPersianDigits } from '@/lib/utils/numbers';

interface BrandsClientProps {
  locale: string;
}

export default function BrandsClient({ locale }: BrandsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Mock brands data - در production از API می‌آید
  const brands = [
    {
      id: 1,
      name: 'Dior',
      logo: 'https://images.unsplash.com/photo-1583425423320-2386622cd2e4?w=400',
      category: 'luxury',
      country: 'France',
      countryFlag: '🇫🇷',
      productsCount: 145,
      rating: 4.9,
      description: 'برند لوکس فرانسوی',
      isPopular: true,
      isTrending: true,
      specialties: ['عطر', 'آرایش', 'پوست'],
      foundedYear: 1946,
      website: 'dior.com'
    },
    {
      id: 2,
      name: 'Chanel',
      logo: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?w=400',
      category: 'luxury',
      country: 'France',
      countryFlag: '🇫🇷',
      productsCount: 198,
      rating: 5.0,
      description: 'نماد لوکس و زیبایی',
      isPopular: true,
      isTrending: true,
      specialties: ['عطر', 'آرایش', 'مراقبت پوست'],
      foundedYear: 1910,
      website: 'chanel.com'
    },
    {
      id: 3,
      name: 'Estée Lauder',
      logo: 'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=400',
      category: 'premium',
      country: 'USA',
      countryFlag: '🇺🇸',
      productsCount: 234,
      rating: 4.8,
      description: 'پیشگام در مراقبت پوست',
      isPopular: true,
      isTrending: false,
      specialties: ['پوست', 'ضد پیری', 'سرم'],
      foundedYear: 1946,
      website: 'esteelauder.com'
    },
    {
      id: 4,
      name: 'MAC Cosmetics',
      logo: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400',
      category: 'professional',
      country: 'Canada',
      countryFlag: '🇨🇦',
      productsCount: 312,
      rating: 4.7,
      description: 'آرایش حرفه‌ای',
      isPopular: true,
      isTrending: true,
      specialties: ['رژلب', 'فونداسیون', 'آرایش چشم'],
      foundedYear: 1984,
      website: 'maccosmetics.com'
    },
    {
      id: 5,
      name: 'Lancôme',
      logo: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400',
      category: 'luxury',
      country: 'France',
      countryFlag: '🇫🇷',
      productsCount: 176,
      rating: 4.9,
      description: 'زیبایی فرانسوی',
      isPopular: true,
      isTrending: false,
      specialties: ['عطر', 'مراقبت پوست', 'آرایش'],
      foundedYear: 1935,
      website: 'lancome.com'
    },
    {
      id: 6,
      name: 'Shiseido',
      logo: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
      category: 'premium',
      country: 'Japan',
      countryFlag: '🇯🇵',
      productsCount: 189,
      rating: 4.8,
      description: 'زیبایی ژاپنی',
      isPopular: true,
      isTrending: true,
      specialties: ['پوست', 'ضد آفتاب', 'مراقبت'],
      foundedYear: 1872,
      website: 'shiseido.com'
    },
    {
      id: 7,
      name: 'Clinique',
      logo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400',
      category: 'dermatology',
      country: 'USA',
      countryFlag: '🇺🇸',
      productsCount: 156,
      rating: 4.6,
      description: 'مراقبت درمانی پوست',
      isPopular: false,
      isTrending: false,
      specialties: ['پوست حساس', 'آلرژی', 'درمانی'],
      foundedYear: 1968,
      website: 'clinique.com'
    },
    {
      id: 8,
      name: 'NARS',
      logo: 'https://images.unsplash.com/photo-1631214524020-7e18db7f7b11?w=400',
      category: 'professional',
      country: 'France',
      countryFlag: '🇫🇷',
      productsCount: 98,
      rating: 4.7,
      description: 'آرایش هنری',
      isPopular: false,
      isTrending: true,
      specialties: ['رژگونه', 'رژلب', 'پایه'],
      foundedYear: 1994,
      website: 'narscosmetics.com'
    },
    {
      id: 9,
      name: 'Tom Ford',
      logo: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
      category: 'luxury',
      country: 'USA',
      countryFlag: '🇺🇸',
      productsCount: 67,
      rating: 5.0,
      description: 'لوکس و اکسکلوزیو',
      isPopular: true,
      isTrending: true,
      specialties: ['عطر', 'رژلب', 'لوکس'],
      foundedYear: 2006,
      website: 'tomford.com'
    },
    {
      id: 10,
      name: 'Guerlain',
      logo: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400',
      category: 'luxury',
      country: 'France',
      countryFlag: '🇫🇷',
      productsCount: 134,
      rating: 4.9,
      description: 'تاریخچه عطرسازی',
      isPopular: false,
      isTrending: false,
      specialties: ['عطر', 'لوکس', 'مراقبت'],
      foundedYear: 1828,
      website: 'guerlain.com'
    },
    {
      id: 11,
      name: 'YSL Beauty',
      logo: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400',
      category: 'luxury',
      country: 'France',
      countryFlag: '🇫🇷',
      productsCount: 142,
      rating: 4.8,
      description: 'شیک و مدرن',
      isPopular: true,
      isTrending: true,
      specialties: ['رژلب', 'عطر', 'آرایش'],
      foundedYear: 1961,
      website: 'yslbeauty.com'
    },
    {
      id: 12,
      name: 'La Mer',
      logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      category: 'luxury',
      country: 'USA',
      countryFlag: '🇺🇸',
      productsCount: 45,
      rating: 5.0,
      description: 'مراقبت لوکس دریایی',
      isPopular: false,
      isTrending: false,
      specialties: ['کرم', 'ضد پیری', 'لوکس'],
      foundedYear: 1965,
      website: 'lamer.com'
    },
  ];

  const categories = [
    { id: 'all', label: 'همه برندها', icon: Crown, count: brands.length },
    { id: 'luxury', label: 'لوکس', icon: Crown, count: brands.filter(b => b.category === 'luxury').length },
    { id: 'premium', label: 'پریمیوم', icon: Award, count: brands.filter(b => b.category === 'premium').length },
    { id: 'professional', label: 'حرفه‌ای', icon: Star, count: brands.filter(b => b.category === 'professional').length },
    { id: 'dermatology', label: 'درمانی', icon: Award, count: brands.filter(b => b.category === 'dermatology').length },
  ];

  const countries = [
    { id: 'all', label: 'همه کشورها', flag: '🌍' },
    { id: 'France', label: 'فرانسه', flag: '🇫🇷' },
    { id: 'USA', label: 'آمریکا', flag: '🇺🇸' },
    { id: 'Japan', label: 'ژاپن', flag: '🇯🇵' },
    { id: 'Canada', label: 'کانادا', flag: '🇨🇦' },
  ];

  // Filtered brands
  const filteredBrands = useMemo(() => {
    let filtered = brands;

    // Search
    if (searchQuery) {
      filtered = filtered.filter(b => 
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.description.includes(searchQuery)
      );
    }

    // Category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(b => b.category === selectedCategory);
    }

    // Country
    if (selectedCountry !== 'all') {
      filtered = filtered.filter(b => b.country === selectedCountry);
    }

    return filtered;
  }, [brands, searchQuery, selectedCategory, selectedCountry]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      
      <main className="flex-1 relative">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-1/4 w-72 h-72 bg-white/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-1/3 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-white/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              {/* Crown Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', bounce: 0.6 }}
                className="inline-block mb-6"
              >
                <div className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border-4 border-white/30 shadow-2xl">
                  <Crown className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              {/* Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="block"
                >
                  برندهای لوکس
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="block mt-2 bg-gradient-to-r from-yellow-200 via-yellow-100 to-white bg-clip-text text-transparent"
                >
                  جهانی
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/95 text-xl md:text-2xl max-w-3xl mx-auto mb-4"
              >
                بیش از {toPersianDigits(brands.length)} برند معتبر و لوکس از سراسر جهان
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-6 flex-wrap"
              >
                {[
                  { icon: Award, text: '100٪ اصل', color: 'from-yellow-400 to-orange-400' },
                  { icon: Crown, text: 'برندهای لوکس', color: 'from-purple-400 to-pink-400' },
                  { icon: Globe, text: 'جهانی', color: 'from-blue-400 to-cyan-400' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + idx * 0.1, type: 'spring' }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-xl rounded-full border border-white/30"
                  >
                    <item.icon className="w-5 h-5 text-white" />
                    <span className="text-white font-bold">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-10 max-w-2xl mx-auto"
              >
                <div className="relative">
                  <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="جستجوی برند..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-7 px-16 text-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-0 focus:ring-4 focus:ring-white/50"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute left-5 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-y border-gray-200 dark:border-gray-800 sticky top-16 z-40">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              {/* Category Filters */}
              <div className="flex items-center gap-3 flex-wrap">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <motion.button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{cat.label}</span>
                      <Badge variant={selectedCategory === cat.id ? 'secondary' : 'outline'} className="text-xs">
                        {toPersianDigits(cat.count)}
                      </Badge>
                    </motion.button>
                  );
                })}
              </div>

              {/* Country Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 font-semibold cursor-pointer"
                >
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.flag} {country.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Brands Grid */}
        <div className="container mx-auto px-4 py-12">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center justify-between flex-wrap gap-4"
          >
            <div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">
                {toPersianDigits(filteredBrands.length)} برند یافت شد
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                برترین برندهای جهانی را کشف کنید
              </p>
            </div>
          </motion.div>

          {/* Bento Grid - Ultra Modern */}
          <AnimatePresence mode="wait">
            {filteredBrands.length > 0 ? (
              <motion.div
                key="brands"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[200px] gap-3 md:gap-4"
              >
                {filteredBrands.map((brand, idx) => (
                  <BrandCard
                    key={brand.id}
                    brand={brand}
                    locale={locale}
                    index={idx}
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
                  برندی یافت نشد
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  لطفاً جستجوی دیگری امتحان کنید
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Brand Bento Box Component
function BrandCard({ 
  brand, 
  locale, 
  index 
}: { 
  brand: any; 
  locale: string; 
  index: number;
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Dynamic sizing for bento grid
  const getSizeClass = () => {
    if (index % 7 === 0) return 'col-span-2 row-span-2'; // Large
    if (index % 5 === 0) return 'col-span-2 row-span-1'; // Wide
    if (index % 3 === 0) return 'col-span-1 row-span-2'; // Tall
    return 'col-span-1 row-span-1'; // Normal
  };

  const isLarge = index % 7 === 0;
  const isWide = index % 5 === 0;
  const isTall = index % 3 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03, type: 'spring' }}
      whileHover={{ scale: 1.02 }}
      className={`${getSizeClass()} group relative overflow-hidden cursor-pointer will-change-transform`}
    >
      <Link href={`/${locale}/brands/${brand.id}`} className="block h-full">
        <div className="relative h-full rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-[2px]">
          {/* Content Container */}
          <div className="relative h-full rounded-2xl md:rounded-3xl overflow-hidden bg-white dark:bg-gray-900">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 via-pink-600/90 to-orange-500/90 dark:from-purple-900/95 dark:via-pink-900/95 dark:to-orange-900/95" />
            </div>

            {/* Animated Gradient Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-500/50 via-pink-500/50 to-orange-500/50 opacity-0 group-hover:opacity-100"
              initial={false}
              transition={{ duration: 0.5 }}
            />

            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-4 md:p-6">
              {/* Top Section */}
              <div>
                {/* Badges & Actions */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex flex-col gap-1.5">
                    {brand.isPopular && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.03 + 0.1 }}
                      >
                        <Badge className="bg-yellow-400/90 backdrop-blur-sm text-yellow-900 border-0 shadow-lg">
                          <Crown className="w-3 h-3 me-1" />
                          {!isLarge && <span className="hidden md:inline">محبوب</span>}
                        </Badge>
                      </motion.div>
                    )}
                    {brand.isTrending && (
                      <motion.div
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.03 + 0.15 }}
                      >
                        <Badge className="bg-green-400/90 backdrop-blur-sm text-green-900 border-0 shadow-lg">
                          <TrendingUp className="w-3 h-3 me-1" />
                        </Badge>
                      </motion.div>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <motion.button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsFavorite(!isFavorite);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 md:w-9 md:h-9 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30"
                  >
                    <Heart className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-all ${isFavorite ? 'fill-red-400 text-red-400' : 'text-white'}`} />
                  </motion.button>
                </div>

                {/* Country Flag */}
                <div className="flex items-center gap-2 mb-2">
                  <span className={`${isLarge ? 'text-3xl' : 'text-2xl'}`}>{brand.countryFlag}</span>
                  {(isLarge || isWide) && (
                    <span className="text-xs md:text-sm font-semibold text-white/80">{brand.country}</span>
                  )}
                </div>

                {/* Brand Name */}
                <h3 className={`font-black text-white mb-1 ${
                  isLarge ? 'text-3xl md:text-4xl' : 
                  isWide ? 'text-2xl md:text-3xl' : 
                  'text-xl md:text-2xl'
                }`}>
                  {brand.name}
                </h3>

                {/* Description - Only on large */}
                {isLarge && (
                  <p className="text-sm md:text-base text-white/80 mb-3">
                    {brand.description}
                  </p>
                )}
              </div>

              {/* Bottom Section */}
              <div>
                {/* Stats */}
                <div className="flex items-center gap-3 md:gap-4 mb-3">
                  {/* Rating */}
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-white/20 backdrop-blur-xl rounded-full border border-white/30">
                    <Star className="w-3 h-3 md:w-3.5 md:h-3.5 text-yellow-300 fill-yellow-300" />
                    <span className="text-xs md:text-sm font-bold text-white">{toPersianDigits(brand.rating.toFixed(1))}</span>
                  </div>

                  {/* Products Count */}
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-white/20 backdrop-blur-xl rounded-full border border-white/30">
                    <ShoppingBag className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
                    <span className="text-xs md:text-sm font-bold text-white">{toPersianDigits(brand.productsCount)}</span>
                  </div>

                  {/* Year - Only on large/wide */}
                  {(isLarge || isWide) && (
                    <div className="px-2.5 py-1 bg-white/20 backdrop-blur-xl rounded-full border border-white/30">
                      <span className="text-xs md:text-sm font-bold text-white">{toPersianDigits(brand.foundedYear)}</span>
                    </div>
                  )}
                </div>

                {/* Specialties - Only on large boxes */}
                {isLarge && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {brand.specialties.map((spec: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-white/20 backdrop-blur-xl text-white text-xs font-bold rounded-lg border border-white/30"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                )}

                {/* Hover Action Indicator */}
                <div className="flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className={`font-bold ${isLarge ? 'text-sm' : 'text-xs'}`}>مشاهده محصولات</span>
                  <ChevronRight className={`${isLarge ? 'w-4 h-4' : 'w-3.5 h-3.5'}`} />
                </div>
              </div>
            </div>

            {/* Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
