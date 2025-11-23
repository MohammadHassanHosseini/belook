'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Tag, Flame, TrendingUp, Eye, Heart, Clock, Mail, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { toPersianDigits } from '@/lib/utils/numbers';

interface BlogClientProps {
  locale: string;
}

export default function BlogClient({ locale }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const posts = [
    {
      id: 1,
      title: 'راهنمای کامل انتخاب سرم مناسب برای پوست',
      slug: 'complete-guide-choosing-serum',
      excerpt: 'سرم‌ها یکی از مهم‌ترین محصولات مراقبت از پوست هستند.',
      image: 'https://images.unsplash.com/photo-1620916297803-be2bd5580e4b?w=800',
      author: { name: 'دکتر سارا احمدی', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
      category: 'مراقبت پوست',
      readTime: 8,
      views: 2450,
      featured: true,
      trending: true
    },
    {
      id: 2,
      title: '۱۰ اشتباه رایج در مراقبت از پوست',
      slug: '10-common-skincare-mistakes',
      excerpt: 'بسیاری از افراد اشتباهاتی مرتکب می‌شوند.',
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800',
      author: { name: 'دکتر مهسا کریمی', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
      category: 'مراقبت پوست',
      readTime: 6,
      views: 1890,
      featured: false,
      trending: true
    },
    {
      id: 3,
      title: 'بهترین محصولات ضد آفتاب',
      slug: 'best-sunscreen',
      excerpt: 'استفاده از ضد آفتاب ضروری است.',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800',
      author: { name: 'دکتر رضا محمدی', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
      category: 'محصولات',
      readTime: 7,
      views: 3200,
      featured: true,
      trending: false
    },
  ];

  const categories = [
    { id: 'all', label: 'همه', count: 3 },
    { id: 'مراقبت پوست', label: 'مراقبت پوست', count: 2 },
    { id: 'محصولات', label: 'محصولات', count: 1 },
  ];

  const filteredPosts = posts.filter(p => 
    (selectedCategory === 'all' || p.category === selectedCategory) &&
    (!searchQuery || p.title.includes(searchQuery))
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/30 rounded-full blur-3xl animate-pulse" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto">
              <Badge className="bg-white/20 backdrop-blur-xl text-white border-white/30 px-6 py-3 text-lg mb-6">
                <Tag className="w-5 h-5 me-2" />
                مجله زیبایی بی لوک
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
                دنیای زیبایی را کشف کنید
              </h1>
              
              <p className="text-xl text-white/90 mb-10">مقالات تخصصی مراقبت از پوست</p>
              
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <Input
                  type="text"
                  placeholder="جستجوی مقالات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-7 px-16 text-lg rounded-2xl shadow-2xl"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute left-5 top-1/2 -translate-y-1/2">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-y sticky top-16 z-40">
          <div className="container mx-auto px-4 py-5 flex gap-3 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl font-bold whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}
              >
                {cat.label} ({toPersianDigits(cat.count)})
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <Link href={`/${locale}/blog/${post.slug}`}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {post.featured && (
                      <Badge className="absolute top-3 left-3 bg-orange-500 text-white">
                        <Flame className="w-3 h-3 me-1" />
                        ویژه
                      </Badge>
                    )}
                    
                    <Badge className="absolute top-3 right-3">{post.category}</Badge>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-black mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full" />
                      <span className="text-sm font-semibold">{post.author.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {toPersianDigits(post.readTime)} دقیقه
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {toPersianDigits(post.views)}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
