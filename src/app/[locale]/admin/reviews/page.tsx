'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Star,
  Check,
  X,
  Trash2,
  Search,
  Filter,
  Grid3x3,
  List,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  RefreshCw,
  ChevronDown,
  MoreVertical,
  CheckSquare,
  Square,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Reply,
  User,
  Package,
  Calendar,
  BarChart3,
  Award,
  Flag,
  Edit,
  Send,
  Image as ImageIcon,
  ShoppingBag,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDate } from '@/lib/utils';
import { toPersianDigits } from '@/lib/utils/numbers';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function AdminReviewsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const reviews = [
    {
      id: '1',
      product: { name: 'سرم ویتامین C', id: 'p1', image: '/products/serum.jpg' },
      user: { name: 'علی احمدی', id: 'u1', avatar: '' },
      rating: 5,
      comment: 'محصول عالی بود، کاملا راضی هستم. پوستم بعد از استفاده روشن‌تر شد و لکه‌ها کم‌رنگ‌تر.',
      status: 'pending',
      createdAt: new Date('2024-01-20'),
      helpful: 12,
      notHelpful: 2,
      hasImages: true,
      images: ['/reviews/1-1.jpg', '/reviews/1-2.jpg'],
      verified: true,
      reply: null
    },
    {
      id: '2',
      product: { name: 'کرم مرطوب کننده', id: 'p2', image: '/products/cream.jpg' },
      user: { name: 'مریم محمدی', id: 'u2', avatar: '' },
      rating: 4,
      comment: 'خوب بود اما قیمت کمی بالا است. کیفیت خوبی داره ولی انتظار بیشتری داشتم.',
      status: 'approved',
      createdAt: new Date('2024-01-18'),
      helpful: 8,
      notHelpful: 1,
      hasImages: false,
      images: [],
      verified: true,
      reply: { text: 'متشکریم از نظر شما. تخفیف‌های ویژه در راه است.', date: new Date('2024-01-19') }
    },
    {
      id: '3',
      product: { name: 'ماسک صورت', id: 'p3', image: '/products/mask.jpg' },
      user: { name: 'رضا کریمی', id: 'u3', avatar: '' },
      rating: 5,
      comment: 'عااااالی! بهترین ماسکی که تا حالا استفاده کردم. پوستم خیلی نرم شد.',
      status: 'approved',
      createdAt: new Date('2024-01-22'),
      helpful: 15,
      notHelpful: 0,
      hasImages: true,
      images: ['/reviews/3-1.jpg'],
      verified: true,
      reply: { text: 'خوشحالیم که راضی هستید 🌟', date: new Date('2024-01-23') }
    },
    {
      id: '4',
      product: { name: 'تونر پوست', id: 'p4', image: '/products/toner.jpg' },
      user: { name: 'سارا احمدی', id: 'u4', avatar: '' },
      rating: 2,
      comment: 'متاسفانه برای پوست من مناسب نبود. حساسیت ایجاد کرد.',
      status: 'pending',
      createdAt: new Date('2024-01-21'),
      helpful: 3,
      notHelpful: 8,
      hasImages: false,
      images: [],
      verified: false,
      reply: null
    },
    {
      id: '5',
      product: { name: 'کرم ضد آفتاب', id: 'p5', image: '/products/sunscreen.jpg' },
      user: { name: 'حسین رضایی', id: 'u5', avatar: '' },
      rating: 5,
      comment: 'محافظت عالی در برابر آفتاب. روی پوست چرب نمی‌شه و سفیدی نمی‌زنه.',
      status: 'approved',
      createdAt: new Date('2024-01-19'),
      helpful: 20,
      notHelpful: 1,
      hasImages: true,
      images: ['/reviews/5-1.jpg', '/reviews/5-2.jpg'],
      verified: true,
      reply: null
    },
    {
      id: '6',
      product: { name: 'شامپو تقویت کننده', id: 'p6', image: '/products/shampoo.jpg' },
      user: { name: 'فاطمه نوری', id: 'u6', avatar: '' },
      rating: 3,
      comment: 'معمولی بود. نه خوب نه بد.',
      status: 'rejected',
      createdAt: new Date('2024-01-17'),
      helpful: 5,
      notHelpful: 4,
      hasImages: false,
      images: [],
      verified: true,
      reply: null
    },
    {
      id: '7',
      product: { name: 'رژ لب مات', id: 'p7', image: '/products/lipstick.jpg' },
      user: { name: 'زهرا امینی', id: 'u7', avatar: '' },
      rating: 4,
      comment: 'رنگ خیلی قشنگه و ماندگاری خوبی داره. فقط کمی خشک کننده است.',
      status: 'pending',
      createdAt: new Date('2024-01-23'),
      helpful: 6,
      notHelpful: 0,
      hasImages: true,
      images: ['/reviews/7-1.jpg'],
      verified: true,
      reply: null
    },
    {
      id: '8',
      product: { name: 'اسانس آبرسان', id: 'p8', image: '/products/essence.jpg' },
      user: { name: 'محمد صادقی', id: 'u8', avatar: '' },
      rating: 5,
      comment: 'محصول فوق‌العاده‌ای! پوستم الان خیلی شاداب‌تره. قطعا دوباره خرید می‌کنم.',
      status: 'approved',
      createdAt: new Date('2024-01-16'),
      helpful: 18,
      notHelpful: 2,
      hasImages: false,
      images: [],
      verified: true,
      reply: { text: 'ممنون از اعتماد شما! منتظر خرید بعدی‌تان هستیم.', date: new Date('2024-01-17') }
    },
  ];

  const stats = [
    {
      title: 'کل نظرات',
      value: toPersianDigits(reviews.length.toString()),
      change: '+18%',
      icon: MessageSquare,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950'
    },
    {
      title: 'در انتظار تایید',
      value: toPersianDigits(reviews.filter(r => r.status === 'pending').length.toString()),
      change: '-5%',
      icon: Clock,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950'
    },
    {
      title: 'تایید شده',
      value: toPersianDigits(reviews.filter(r => r.status === 'approved').length.toString()),
      change: '+12%',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950'
    },
    {
      title: 'میانگین امتیاز',
      value: toPersianDigits((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)),
      change: '+0.3',
      icon: Star,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950'
    },
  ];

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.user.name.includes(searchTerm) ||
      review.comment.includes(searchTerm);
    
    const matchesStatus =
      statusFilter === 'all' ||
      review.status === statusFilter;

    const matchesRating =
      ratingFilter === 'all' ||
      review.rating === parseInt(ratingFilter);

    return matchesSearch && matchesStatus && matchesRating;
  });

  const toggleReviewSelection = (id: string) => {
    setSelectedReviews(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedReviews.length === filteredReviews.length) {
      setSelectedReviews([]);
    } else {
      setSelectedReviews(filteredReviews.map(r => r.id));
    }
  };

  const handleApprove = (id: string) => {
    toast.success('نظر تایید شد');
    setSelectedReviews([]);
  };

  const handleReject = (id: string) => {
    toast.success('نظر رد شد');
    setSelectedReviews([]);
  };

  const handleBulkApprove = () => {
    toast.success(`${toPersianDigits(selectedReviews.length.toString())} نظر تایید شد`);
    setSelectedReviews([]);
  };

  const handleBulkReject = () => {
    toast.success(`${toPersianDigits(selectedReviews.length.toString())} نظر رد شد`);
    setSelectedReviews([]);
  };

  const handleBulkDelete = () => {
    toast.success(`${toPersianDigits(selectedReviews.length.toString())} نظر حذف شد`);
    setSelectedReviews([]);
  };

  const handleExport = () => {
    toast.success('فایل نظرات در حال دانلود است');
  };

  const handleReply = (reviewId: string) => {
    if (replyText.trim()) {
      toast.success('پاسخ شما ارسال شد');
      setReplyingTo(null);
      setReplyText('');
    }
  };

  const getStatusBadge = (status: string) => {
    const configs: Record<string, { label: string; className: string; icon: any }> = {
      pending: {
        label: 'در انتظار',
        className: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
        icon: Clock
      },
      approved: {
        label: 'تایید شده',
        className: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
        icon: CheckCircle
      },
      rejected: {
        label: 'رد شده',
        className: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
        icon: XCircle
      },
    };

    const config = configs[status] || configs.pending;
    const Icon = config.icon;
    return (
      <Badge className={config.className}>
        <Icon className="w-3 h-3 me-1" />
        {config.label}
      </Badge>
    );
  };

  const renderStars = (rating: number, size: string = 'w-4 h-4') => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${size} ${
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Modern Header با Gradient */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-white shadow-2xl"
      >
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
        <div className="absolute top-10 right-10 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-6 h-6" />
                <span className="text-sm font-semibold tracking-wider uppercase opacity-90">
                  Reviews Management
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">مدیریت نظرات</h1>
              <p className="text-sm md:text-base opacity-90">
                {toPersianDigits(filteredReviews.length.toString())} نظر از {toPersianDigits(reviews.length.toString())}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={handleExport}
                variant="secondary"
                className="gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">خروجی</span>
              </Button>
              <Button 
                variant="secondary"
                className="gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">به‌روزرسانی</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all">
                <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bgColor} opacity-10 rounded-full blur-2xl`} />
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 md:p-3 rounded-xl ${stat.bgColor} shadow-md`}>
                      <Icon className={`h-5 w-5 md:h-6 md:w-6 ${stat.color}`} />
                    </div>
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      <TrendingUp className="w-3 h-3 me-1" />
                      {stat.change}
                    </Badge>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-xl md:text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="جستجوی نظر، محصول، کاربر..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pe-10 h-11"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant={showFilters ? 'default' : 'outline'}
                    onClick={() => setShowFilters(!showFilters)}
                    className="gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    فیلترها
                    {showFilters && <ChevronDown className="w-4 h-4" />}
                  </Button>

                  <div className="flex border rounded-lg p-1 bg-gray-100 dark:bg-gray-800">
                    <Button
                      variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="px-3"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="px-3"
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid md:grid-cols-4 gap-3 pt-4 border-t">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                      >
                        <option value="all">همه وضعیت‌ها</option>
                        <option value="pending">در انتظار</option>
                        <option value="approved">تایید شده</option>
                        <option value="rejected">رد شده</option>
                      </select>

                      <select
                        value={ratingFilter}
                        onChange={(e) => setRatingFilter(e.target.value)}
                        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                      >
                        <option value="all">همه امتیازها</option>
                        <option value="5">⭐⭐⭐⭐⭐ (5 ستاره)</option>
                        <option value="4">⭐⭐⭐⭐ (4 ستاره)</option>
                        <option value="3">⭐⭐⭐ (3 ستاره)</option>
                        <option value="2">⭐⭐ (2 ستاره)</option>
                        <option value="1">⭐ (1 ستاره)</option>
                      </select>

                      <select className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm">
                        <option value="recent">جدیدترین</option>
                        <option value="oldest">قدیمی‌ترین</option>
                        <option value="highest">بالاترین امتیاز</option>
                        <option value="lowest">پایین‌ترین امتیاز</option>
                      </select>

                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          setSearchTerm('');
                          setStatusFilter('all');
                          setRatingFilter('all');
                        }}
                      >
                        <RefreshCw className="w-4 h-4 me-2" />
                        پاک کردن فیلترها
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bulk Actions */}
              {selectedReviews.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20"
                >
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-primary" />
                    <span className="font-semibold">
                      {toPersianDigits(selectedReviews.length.toString())} نظر انتخاب شده
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => setSelectedReviews([])}>
                      <X className="w-4 h-4 me-1" />
                      لغو
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleBulkApprove}>
                      <Check className="w-4 h-4 me-1" />
                      تایید همه
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleBulkReject}>
                      <XCircle className="w-4 h-4 me-1" />
                      رد همه
                    </Button>
                    <Button size="sm" variant="destructive" onClick={handleBulkDelete}>
                      <Trash2 className="w-4 h-4 me-1" />
                      حذف
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Reviews List/Grid */}
      {viewMode === 'list' ? (
        <div className="space-y-4">
          {filteredReviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
            >
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Left Side - User & Product Info */}
                    <div className="md:w-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 border-b md:border-b-0 md:border-l">
                      <div className="flex items-center gap-2 mb-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleReviewSelection(review.id)}
                          className="w-6 h-6 p-0"
                        >
                          {selectedReviews.includes(review.id) ? (
                            <CheckSquare className="w-4 h-4 text-primary" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </Button>
                        {getStatusBadge(review.status)}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <p className="font-semibold text-sm">{review.user.name}</p>
                          </div>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs">
                              <CheckCircle className="w-3 h-3 me-1" />
                              خرید تایید شده
                            </Badge>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Package className="w-4 h-4 text-muted-foreground" />
                            <Link href={`/products/${review.product.id}`} className="text-sm hover:text-primary font-medium">
                              {review.product.name}
                            </Link>
                          </div>
                        </div>

                        <div>
                          {renderStars(review.rating)}
                          <p className="text-xs text-muted-foreground mt-1">
                            <Calendar className="w-3 h-3 inline me-1" />
                            {formatDate(review.createdAt, 'fa-IR')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Review Content */}
                    <div className="flex-1 p-6">
                      <div className="space-y-4">
                        <p className="text-sm leading-relaxed">{review.comment}</p>

                        {review.hasImages && review.images.length > 0 && (
                          <div className="flex gap-2">
                            {review.images.map((img, i) => (
                              <div key={i} className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                <ImageIcon className="w-6 h-6 text-gray-400" />
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            <span>{toPersianDigits(review.helpful.toString())}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsDown className="w-3 h-3" />
                            <span>{toPersianDigits(review.notHelpful.toString())}</span>
                          </div>
                        </div>

                        {review.reply && (
                          <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 border-r-4 border-blue-500">
                            <div className="flex items-center gap-2 mb-2">
                              <Reply className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-semibold text-blue-600">پاسخ شما</span>
                            </div>
                            <p className="text-sm">{review.reply.text}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {formatDate(review.reply.date, 'fa-IR')}
                            </p>
                          </div>
                        )}

                        {replyingTo === review.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            className="space-y-2"
                          >
                            <Input
                              placeholder="پاسخ خود را بنویسید..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                            />
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleReply(review.id)}>
                                <Send className="w-3 h-3 me-1" />
                                ارسال
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setReplyingTo(null)}>
                                لغو
                              </Button>
                            </div>
                          </motion.div>
                        )}

                        <div className="flex flex-wrap gap-2 pt-2 border-t">
                          {review.status === 'pending' && (
                            <>
                              <Button size="sm" variant="outline" onClick={() => handleApprove(review.id)}>
                                <Check className="w-3 h-3 me-1" />
                                تایید
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleReject(review.id)}>
                                <X className="w-3 h-3 me-1" />
                                رد
                              </Button>
                            </>
                          )}
                          {!review.reply && (
                            <Button size="sm" variant="outline" onClick={() => setReplyingTo(review.id)}>
                              <Reply className="w-3 h-3 me-1" />
                              پاسخ
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3 me-1" />
                            ویرایش
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-3 h-3 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredReviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <Card className="border-0 shadow-lg h-full">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleReviewSelection(review.id)}
                        className="w-6 h-6 p-0"
                      >
                        {selectedReviews.includes(review.id) ? (
                          <CheckSquare className="w-4 h-4 text-primary" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </Button>
                      {getStatusBadge(review.status)}
                    </div>

                    <div className="space-y-2">
                      <p className="font-semibold text-sm">{review.user.name}</p>
                      {renderStars(review.rating, 'w-3 h-3')}
                      <Link href={`/products/${review.product.id}`} className="text-xs text-muted-foreground hover:text-primary">
                        {review.product.name}
                      </Link>
                    </div>

                    <p className="text-sm line-clamp-3">{review.comment}</p>

                    <div className="flex gap-2 pt-2 border-t">
                      {review.status === 'pending' && (
                        <>
                          <Button size="sm" variant="outline" className="flex-1" onClick={() => handleApprove(review.id)}>
                            <Check className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1" onClick={() => handleReject(review.id)}>
                            <X className="w-3 h-3" />
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredReviews.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <MessageSquare className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-bold mb-2">نظری یافت نشد</h3>
          <p className="text-muted-foreground mb-4">لطفاً فیلترهای دیگری امتحان کنید</p>
          <Button 
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setRatingFilter('all');
            }}
          >
            <RefreshCw className="w-4 h-4 me-2" />
            پاک کردن فیلترها
          </Button>
        </motion.div>
      )}
    </div>
  );
}
