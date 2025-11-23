'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Search, ShoppingCart, Heart, User, Menu, X, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import { useSettings } from '@/contexts/SettingsContext';
import { toPersianDigits } from '@/lib/utils/numbers';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
// import UniqueLogo from './UniqueLogo'; // برای استفاده از لوگوی SVG یونیک
// import BelookLogo from './BelookLogo'; // برای استفاده از variants مختلف

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const { settings } = useSettings();
  const { items: cartItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock search function - در production از API استفاده کنید
  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        // Mock results
        const mockResults = [
          { id: 1, name: 'سرم ویتامین C', category: 'مراقبت پوست', price: '450,000', image: '' },
          { id: 2, name: 'کرم مرطوب کننده', category: 'مراقبت پوست', price: '380,000', image: '' },
          { id: 3, name: 'ماسک صورت', category: 'مراقبت پوست', price: '290,000', image: '' },
        ].filter(item => item.name.includes(searchQuery) || searchQuery.includes(item.name));
        setSearchResults(mockResults);
        setIsSearching(false);
        setShowResults(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // استفاده از menuItems از تنظیمات
  const navigation = settings.menuItems
    .filter(item => item.isVisible) // فقط منوهای فعال
    .sort((a, b) => a.order - b.order) // مرتب‌سازی بر اساس order
    .map(item => ({
      name: locale === 'fa' ? item.labelFa : locale === 'ar' ? item.labelAr : item.labelEn,
      href: `/${locale}${item.path}`,
    }));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-lg supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo با طراحی Premium */}
          <Link href={`/${locale}`} className="flex items-center gap-3 rtl:gap-3 group">
            {/* نمایش لوگوی کاستوم یا پیش‌فرض */}
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1, rotateY: 15 }}
              transition={{ duration: 0.3 }}
              style={{ perspective: 1000 }}
            >
              {settings.logo || settings.logoDark ? (
                // لوگوی آپلود شده
                <img
                  src={(settings.logo || settings.logoDark) as string}
                  alt="Logo"
                  style={{ width: settings.logoSize, height: settings.logoSize }}
                  className="object-contain"
                />
              ) : (
                // لوگوی پیش‌فرض
                <>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-pink-500 to-purple-500 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
                  
                  {/* حرف B با افکت 3D */}
                  <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary via-pink-500 to-purple-600 rounded-2xl shadow-2xl border-2 border-white/30 dark:border-white/20"
                       style={{ transformStyle: 'preserve-3d' }}>
                    <span className="text-2xl font-black text-white drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                      B
                    </span>
                    {/* Diamond در گوشه */}
                    <div className="absolute -top-1 -right-1 rtl:-left-1 rtl:right-auto w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-lg" />
                  </div>
                </>
              )}
            </motion.div>

            {/* Text Logo */}
            <div className="flex flex-col">
              <motion.span 
                className="text-2xl font-black bg-gradient-to-r from-primary via-pink-500 to-purple-600 bg-clip-text text-transparent tracking-tight leading-none"
                whileHover={{ scale: 1.02 }}
              >
                {locale === 'fa' ? settings.siteName : settings.siteNameEn}
              </motion.span>
              <span className="text-[10px] font-medium text-muted-foreground tracking-widest">
                {locale === 'fa' ? settings.tagline : settings.taglineEn}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar با Glassmorphism */}
          <div className="hidden md:flex flex-1 max-w-md mx-8" ref={searchRef}>
            <div className="relative w-full">
              <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-4 h-4 z-10" />
              <Input
                type="search"
                placeholder={t('common.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length > 2 && setShowResults(true)}
                className="pl-10 rtl:pl-4 rtl:pr-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border-white/20 dark:border-gray-700/20 focus:bg-white/80 dark:focus:bg-gray-800/80 transition-all"
              />
              {isSearching && (
                <Loader2 className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2 text-primary w-4 h-4 animate-spin" />
              )}
              
              {/* نتایج جستجو */}
              <AnimatePresence>
                {showResults && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden"
                  >
                    {searchResults.map((result) => (
                      <Link
                        key={result.id}
                        href={`/${locale}/products/${result.id}`}
                        className="flex items-center gap-4 p-4 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-200/50 dark:border-gray-700/50 last:border-b-0"
                        onClick={() => { setShowResults(false); setSearchQuery(''); }}
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                          <Search className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 dark:text-white">{result.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{result.category}</p>
                        </div>
                        <div className="text-end">
                          <p className="font-bold text-primary">{toPersianDigits(result.price)}</p>
                          <p className="text-xs text-gray-500">تومان</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Actions با Glassmorphism */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Wishlist Button */}
            <Link href={`/${locale}/profile?tab=wishlist`} className="inline-block">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <div className="relative inline-flex items-center justify-center h-10 w-10 rounded-md bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all cursor-pointer">
                  <Heart className={`h-5 w-5 ${wishlistItems.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                  {wishlistItems.length > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 rtl:-left-1 rtl:right-auto bg-gradient-to-r from-primary to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg"
                    >
                      {toPersianDigits(wishlistItems.length.toString())}
                    </motion.span>
                  )}
                </div>
              </motion.div>
            </Link>

            {/* Cart Button */}
            <Link href={`/${locale}/cart`} className="inline-block">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <div className="relative inline-flex items-center justify-center h-10 w-10 rounded-md bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all cursor-pointer">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems.length > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 rtl:-left-1 rtl:right-auto bg-gradient-to-r from-primary to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg"
                    >
                      {toPersianDigits(cartItems.length.toString())}
                    </motion.span>
                  )}
                </div>
              </motion.div>
            </Link>

            {/* User Profile Button */}
            <Link href={`/${locale}/profile`} className="inline-block">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all cursor-pointer">
                  <User className="h-5 w-5" />
                </div>
              </motion.div>
            </Link>

            {/* Mobile Menu Button با Glassmorphism */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Menu با Glassmorphism */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {/* Mobile Search با Glassmorphism */}
              <div className="relative">
                <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-4 h-4" />
                <Input
                  type="search"
                  placeholder={t('common.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rtl:pl-4 rtl:pr-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border-white/20 dark:border-gray-700/20"
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-2">
                {navigation.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="block text-sm font-medium transition-colors hover:text-primary py-3 px-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/80 dark:hover:bg-gray-800/80"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Language Switcher */}
              <div className="pt-4 border-t border-white/20">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
