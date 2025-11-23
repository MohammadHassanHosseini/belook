'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Package,
  TrendingUp,
  AlertCircle,
  MoreVertical,
  Filter,
  Grid3x3,
  List,
  Download,
  Upload,
  Copy,
  Star,
  BarChart3,
  Tag,
  Zap,
  Heart,
  ShoppingCart,
  CheckSquare,
  Square,
  ChevronDown,
  X,
  ArrowUpDown,
  ImageIcon,
  Percent,
  DollarSign,
  Box,
  Sparkles,
  TrendingDown,
  Clock,
  Users,
  Activity,
  Settings,
  RefreshCw,
  SlidersHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '@/lib/utils';
import { toPersianDigits } from '@/lib/utils/numbers';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [stockFilter, setStockFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');

  // Mock data - در production از API می‌آید
  const products = [
    {
      id: '1',
      nameFa: 'سرم ویتامین C روشن کننده',
      nameEn: 'Vitamin C Brightening Serum',
      sku: 'SKU-001',
      category: 'مراقبت پوست',
      brand: 'La Roche-Posay',
      price: 450000,
      comparePrice: 550000,
      stock: 25,
      sales: 156,
      status: 'active',
      rating: 4.8,
      reviews: 45,
      views: 1250,
      revenue: 70200000,
      trend: 'up',
      image: 'https://images.unsplash.com/photo-1620916297803-be2bd5580e4b?w=400&h=400&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1620916297803-be2bd5580e4b?w=100&h=100&fit=crop',
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&h=100&fit=crop',
      ],
    },
    {
      id: '2',
      nameFa: 'کرم مرطوب کننده هیالورونیک اسید',
      nameEn: 'Hyaluronic Acid Moisturizer',
      sku: 'SKU-002',
      category: 'مراقبت پوست',
      brand: 'CeraVe',
      price: 380000,
      comparePrice: 480000,
      stock: 15,
      sales: 134,
      status: 'active',
      rating: 4.6,
      reviews: 38,
      views: 980,
      revenue: 50920000,
      trend: 'up',
      image: 'https://images.unsplash.com/photo-1556228852-80f3c5145c7d?w=400&h=400&fit=crop',
      gallery: [],
    },
    {
      id: '3',
      nameFa: 'ماسک لایه بردار صورت',
      nameEn: 'Exfoliating Face Mask',
      sku: 'SKU-003',
      category: 'مراقبت پوست',
      brand: 'Neutrogena',
      price: 290000,
      comparePrice: null,
      stock: 0,
      sales: 98,
      status: 'out_of_stock',
      rating: 4.3,
      reviews: 28,
      views: 650,
      revenue: 28420000,
      trend: 'down',
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
      gallery: [],
    },
    {
      id: '4',
      nameFa: 'کرم دور چشم ضد چروک',
      nameEn: 'Anti-Wrinkle Eye Cream',
      sku: 'SKU-004',
      category: 'مراقبت پوست',
      brand: 'Olay',
      price: 520000,
      comparePrice: 620000,
      stock: 32,
      sales: 87,
      status: 'active',
      rating: 4.7,
      reviews: 52,
      views: 1100,
      revenue: 45240000,
      trend: 'up',
      image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop',
      gallery: [],
    },
    {
      id: '5',
      nameFa: 'تونر آبرسان صورت',
      nameEn: 'Hydrating Face Toner',
      sku: 'SKU-005',
      category: 'مراقبت پوست',
      brand: 'Bioderma',
      price: 320000,
      comparePrice: 400000,
      stock: 8,
      sales: 76,
      status: 'active',
      rating: 4.5,
      reviews: 31,
      views: 720,
      revenue: 24320000,
      trend: 'stable',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      gallery: [],
    },
    {
      id: '6',
      nameFa: 'اسکراب لب شفاف کننده',
      nameEn: 'Clarifying Lip Scrub',
      sku: 'SKU-006',
      category: 'مراقبت لب',
      brand: 'Fresh',
      price: 180000,
      comparePrice: null,
      stock: 42,
      sales: 145,
      status: 'active',
      rating: 4.9,
      reviews: 67,
      views: 1450,
      revenue: 26100000,
      trend: 'up',
      image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop',
      gallery: [],
    },
  ];

  const stats = [
    {
      title: 'کل محصولات',
      value: toPersianDigits('234'),
      icon: Package,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      title: 'محصولات فعال',
      value: toPersianDigits('189'),
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950',
    },
    {
      title: 'ناموجود',
      value: toPersianDigits('12'),
      icon: AlertCircle,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
    },
    {
      title: 'پیش‌نویس',
      value: toPersianDigits('33'),
      icon: Eye,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      active: { label: 'فعال', className: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
      out_of_stock: { label: 'ناموجود', className: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' },
      draft: { label: 'پیش‌نویس', className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },
    };

    const config = statusConfig[status] || statusConfig.draft;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Activity className="w-4 h-4 text-gray-500" />;
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.nameFa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesBrand = brandFilter === 'all' || product.brand === brandFilter;
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    
    const matchesStock = 
      stockFilter === 'all' ||
      (stockFilter === 'in_stock' && product.stock > 0) ||
      (stockFilter === 'low_stock' && product.stock > 0 && product.stock < 20) ||
      (stockFilter === 'out_of_stock' && product.stock === 0);

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesStock;
  });

  const handleDelete = (id: string) => {
    toast.success('محصول حذف شد');
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) {
      toast.error('هیچ محصولی انتخاب نشده');
      return;
    }
    toast.success(`${toPersianDigits(selectedProducts.length.toString())} محصول حذف شد`);
    setSelectedProducts([]);
  };

  const toggleProductSelection = (id: string) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  const handleExport = () => {
    toast.success('فایل محصولات در حال دانلود است');
  };

  const brands = Array.from(new Set(products.map(p => p.brand)));
  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Header با طراحی مدرن */}
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
                <Package className="w-6 h-6" />
                <span className="text-sm font-semibold tracking-wider uppercase opacity-90">
                  Products Management
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">مدیریت محصولات</h1>
              <p className="text-sm md:text-base opacity-90">
                {toPersianDigits(filteredProducts.length.toString())} محصول از {toPersianDigits(products.length.toString())}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={handleExport}
                variant="secondary"
                className="gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/20"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">خروجی Excel</span>
              </Button>
              <Button 
                variant="secondary"
                className="gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/20"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">وارد کردن</span>
              </Button>
              <Link href="/admin/products/new">
                <Button className="gap-2 bg-white text-purple-600 hover:bg-gray-100">
                  <Plus className="w-4 h-4" />
                  محصول جدید
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards با Animation */}
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
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bgColor} opacity-10 rounded-full blur-2xl`} />
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 md:p-3 rounded-xl ${stat.bgColor} shadow-md`}>
                      <Icon className={`h-5 w-5 md:h-6 md:w-6 ${stat.color}`} />
                    </div>
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

      {/* Toolbar با Filters و View Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 md:p-6">
            {/* Search و Quick Filters */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="جستجوی نام محصول، SKU، برند..."
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
                    <SlidersHorizontal className="w-4 h-4" />
                    فیلترها
                    {showFilters && <ChevronDown className="w-4 h-4" />}
                  </Button>
                  
                  <div className="flex border rounded-lg p-1 bg-gray-100 dark:bg-gray-800">
                    <Button
                      variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="px-3"
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="px-3"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Advanced Filters */}
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
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                      >
                        <option value="all">همه دسته‌ها</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>

                      <select
                        value={brandFilter}
                        onChange={(e) => setBrandFilter(e.target.value)}
                        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                      >
                        <option value="all">همه برندها</option>
                        {brands.map(brand => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>

                      <select
                        value={stockFilter}
                        onChange={(e) => setStockFilter(e.target.value)}
                        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                      >
                        <option value="all">همه موجودی‌ها</option>
                        <option value="in_stock">موجود</option>
                        <option value="low_stock">موجودی کم</option>
                        <option value="out_of_stock">ناموجود</option>
                      </select>

                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                      >
                        <option value="recent">جدیدترین</option>
                        <option value="price_low">ارزان‌ترین</option>
                        <option value="price_high">گران‌ترین</option>
                        <option value="best_selling">پرفروش‌ترین</option>
                      </select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bulk Actions */}
              {selectedProducts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20"
                >
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-primary" />
                    <span className="font-semibold">
                      {toPersianDigits(selectedProducts.length.toString())} محصول انتخاب شده
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setSelectedProducts([])}>
                      <X className="w-4 h-4 me-1" />
                      لغو
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 me-1" />
                      ویرایش دسته‌جمع
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

      {/* Products Grid/List View */}
      {viewMode === 'grid' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
        >
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all">
                {/* Selection Checkbox */}
                <div className="absolute top-3 right-3 z-10">
                  <Button
                    size="sm"
                    variant={selectedProducts.includes(product.id) ? 'default' : 'secondary'}
                    className="w-8 h-8 p-0 rounded-full shadow-lg"
                    onClick={() => toggleProductSelection(product.id)}
                  >
                    {selectedProducts.includes(product.id) ? (
                      <CheckSquare className="w-4 h-4" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={product.image}
                    alt={product.nameFa}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.comparePrice && (
                    <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                      {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}٪ تخفیف
                    </Badge>
                  )}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Badge variant="destructive" className="text-lg px-4 py-2">
                        ناموجود
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  {/* Product Info */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-bold line-clamp-1 group-hover:text-primary transition-colors">
                        {product.nameFa}
                      </h3>
                      <p className="text-xs text-muted-foreground">{product.brand} • {product.sku}</p>
                    </div>

                    {/* Price */}
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                          {formatCurrency(product.price, 'fa')}
                        </span>
                        {product.comparePrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            {formatCurrency(product.comparePrice, 'fa')}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">تومان</span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{toPersianDigits(product.rating.toString())}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ShoppingCart className="w-3 h-3" />
                          <span>{toPersianDigits(product.sales.toString())}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Box className={`w-3 h-3 ${product.stock < 10 ? 'text-red-500' : 'text-green-500'}`} />
                        <span className={product.stock < 10 ? 'text-red-500 font-semibold' : ''}>
                          {toPersianDigits(product.stock.toString())}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 border-t">
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <Eye className="w-3 h-3" />
                        مشاهده
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <Edit className="w-3 h-3" />
                        ویرایش
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                        className="px-3"
                      >
                        <Trash2 className="w-3 h-3 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* List View */
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="p-4 text-start w-12">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={toggleSelectAll}
                        className="w-8 h-8 p-0"
                      >
                        {selectedProducts.length === filteredProducts.length ? (
                          <CheckSquare className="w-4 h-4" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </Button>
                    </th>
                    <th className="p-4 text-start font-semibold">محصول</th>
                    <th className="p-4 text-start font-semibold">قیمت</th>
                    <th className="p-4 text-start font-semibold">موجودی</th>
                    <th className="p-4 text-start font-semibold">فروش</th>
                    <th className="p-4 text-start font-semibold">رتبه</th>
                    <th className="p-4 text-start font-semibold">وضعیت</th>
                    <th className="p-4 text-center font-semibold">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, idx) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="p-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleProductSelection(product.id)}
                          className="w-8 h-8 p-0"
                        >
                          {selectedProducts.includes(product.id) ? (
                            <CheckSquare className="w-4 h-4" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </Button>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.nameFa}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-semibold">{product.nameFa}</p>
                            <p className="text-xs text-muted-foreground">
                              {product.sku} • {product.brand}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold">{formatCurrency(product.price, 'fa')}</div>
                        {product.comparePrice && (
                          <div className="text-xs text-muted-foreground line-through">
                            {formatCurrency(product.comparePrice, 'fa')}
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <Badge variant={product.stock < 10 ? 'destructive' : 'secondary'}>
                          {toPersianDigits(product.stock.toString())}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          {getTrendIcon(product.trend)}
                          <span className="font-semibold">{toPersianDigits(product.sales.toString())}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{toPersianDigits(product.rating.toString())}</span>
                        </div>
                      </td>
                      <td className="p-4">{getStatusBadge(product.status)}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Package className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-bold mb-2">محصولی یافت نشد</h3>
          <p className="text-muted-foreground mb-4">لطفاً فیلترهای دیگری امتحان کنید</p>
          <Button onClick={() => {
            setSearchTerm('');
            setCategoryFilter('all');
            setBrandFilter('all');
            setStockFilter('all');
          }}>
            <RefreshCw className="w-4 h-4 me-2" />
            پاک کردن فیلترها
          </Button>
        </motion.div>
      )}
    </div>
  );
}
