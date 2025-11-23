'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Edit,
  Trash2,
  FolderTree,
  Folder,
  FolderOpen,
  Search,
  Filter,
  Grid3x3,
  List,
  Eye,
  EyeOff,
  Download,
  Upload,
  Image as ImageIcon,
  Tag,
  Link as LinkIcon,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  CheckSquare,
  Square,
  X,
  RefreshCw,
  TrendingUp,
  Package,
  Star,
  ArrowUpDown,
  Settings,
  Copy,
  Sparkles,
  Zap,
  Target,
  Activity,
  BarChart3,
  Clock,
  AlertCircle,
  Info,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toPersianDigits } from '@/lib/utils/numbers';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function AdminCategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'tree'>('grid');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [visibilityFilter, setVisibilityFilter] = useState('all');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const categories = [
    { 
      id: '1', 
      name: 'مراقبت پوست', 
      nameEn: 'Skincare', 
      productCount: 156, 
      slug: 'skincare',
      parentId: null,
      image: '/categories/skincare.jpg',
      icon: '🧴',
      description: 'محصولات مراقبت پوست و زیبایی',
      isVisible: true,
      order: 1,
      seo: {
        title: 'محصولات مراقبت پوست',
        metaDescription: 'بهترین محصولات مراقبت پوست'
      },
      createdAt: new Date('2024-01-10'),
      revenue: 45000000,
      trend: 'up'
    },
    { 
      id: '2', 
      name: 'سرم و اسانس', 
      nameEn: 'Serums & Essences', 
      productCount: 45, 
      slug: 'serums',
      parentId: '1',
      image: '/categories/serums.jpg',
      icon: '💧',
      description: 'سرم‌های تخصصی پوست',
      isVisible: true,
      order: 1,
      seo: null,
      createdAt: new Date('2024-01-15'),
      revenue: 15000000,
      trend: 'up'
    },
    { 
      id: '3', 
      name: 'کرم مرطوب کننده', 
      nameEn: 'Moisturizers', 
      productCount: 67, 
      slug: 'moisturizers',
      parentId: '1',
      image: '/categories/moisturizers.jpg',
      icon: '💦',
      description: 'کرم‌های مرطوب کننده',
      isVisible: true,
      order: 2,
      seo: null,
      createdAt: new Date('2024-01-18'),
      revenue: 20000000,
      trend: 'stable'
    },
    { 
      id: '4', 
      name: 'آرایش', 
      nameEn: 'Makeup', 
      productCount: 234, 
      slug: 'makeup',
      parentId: null,
      image: '/categories/makeup.jpg',
      icon: '💄',
      description: 'لوازم آرایشی و زیبایی',
      isVisible: true,
      order: 2,
      seo: {
        title: 'لوازم آرایشی',
        metaDescription: 'بهترین برندهای آرایشی'
      },
      createdAt: new Date('2024-01-12'),
      revenue: 68000000,
      trend: 'up'
    },
    { 
      id: '5', 
      name: 'رژ لب', 
      nameEn: 'Lipsticks', 
      productCount: 89, 
      slug: 'lipsticks',
      parentId: '4',
      image: '/categories/lipsticks.jpg',
      icon: '💋',
      description: 'رژ لب‌های مات و براق',
      isVisible: true,
      order: 1,
      seo: null,
      createdAt: new Date('2024-02-01'),
      revenue: 25000000,
      trend: 'up'
    },
    { 
      id: '6', 
      name: 'مراقبت مو', 
      nameEn: 'Haircare', 
      productCount: 98, 
      slug: 'haircare',
      parentId: null,
      image: '/categories/haircare.jpg',
      icon: '💇',
      description: 'محصولات مراقبت مو',
      isVisible: true,
      order: 3,
      seo: {
        title: 'محصولات مراقبت مو',
        metaDescription: 'شامپو، نرم کننده و ماسک مو'
      },
      createdAt: new Date('2024-01-20'),
      revenue: 32000000,
      trend: 'stable'
    },
    { 
      id: '7', 
      name: 'عطر و ادکلن', 
      nameEn: 'Fragrance', 
      productCount: 87, 
      slug: 'fragrance',
      parentId: null,
      image: '/categories/fragrance.jpg',
      icon: '🌸',
      description: 'عطر و ادکلن اورجینال',
      isVisible: true,
      order: 4,
      seo: {
        title: 'عطر و ادکلن اورجینال',
        metaDescription: 'بهترین برندهای عطر'
      },
      createdAt: new Date('2024-01-25'),
      revenue: 55000000,
      trend: 'up'
    },
    { 
      id: '8', 
      name: 'مراقبت بدن', 
      nameEn: 'Body Care', 
      productCount: 45, 
      slug: 'bodycare',
      parentId: null,
      image: '/categories/bodycare.jpg',
      icon: '🧖',
      description: 'محصولات مراقبت بدن',
      isVisible: false,
      order: 5,
      seo: null,
      createdAt: new Date('2024-02-10'),
      revenue: 18000000,
      trend: 'down'
    },
  ];

  const stats = [
    {
      title: 'کل دسته‌بندی‌ها',
      value: toPersianDigits(categories.length.toString()),
      change: '+15%',
      icon: FolderTree,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950'
    },
    {
      title: 'دسته اصلی',
      value: toPersianDigits(categories.filter(c => !c.parentId).length.toString()),
      change: '+8%',
      icon: Folder,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950'
    },
    {
      title: 'زیر دسته',
      value: toPersianDigits(categories.filter(c => c.parentId).length.toString()),
      change: '+23%',
      icon: FolderOpen,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950'
    },
    {
      title: 'کل محصولات',
      value: toPersianDigits(categories.reduce((sum, c) => sum + c.productCount, 0).toString()),
      change: '+12%',
      icon: Package,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950'
    },
  ];

  const getParentCategories = () => categories.filter(c => !c.parentId);
  
  const getChildCategories = (parentId: string) => 
    categories.filter(c => c.parentId === parentId);

  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.slug.includes(searchTerm.toLowerCase());
    
    const matchesVisibility =
      visibilityFilter === 'all' ||
      (visibilityFilter === 'visible' && category.isVisible) ||
      (visibilityFilter === 'hidden' && !category.isVisible);

    return matchesSearch && matchesVisibility;
  });

  const toggleCategorySelection = (id: string) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedCategories.length === filteredCategories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(filteredCategories.map(c => c.id));
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    toast.success(`${toPersianDigits(selectedCategories.length.toString())} دسته‌بندی حذف شد`);
    setSelectedCategories([]);
  };

  const handleExport = () => {
    toast.success('فایل دسته‌بندی‌ها در حال دانلود است');
  };

  const handleToggleVisibility = (id: string) => {
    toast.success('وضعیت نمایش تغییر کرد');
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3 text-green-500" />;
    if (trend === 'down') return <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />;
    return <Activity className="w-3 h-3 text-gray-500" />;
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Modern Header با Gradient */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500 via-emerald-500 to-green-500 p-8 text-white shadow-2xl"
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
                <FolderTree className="w-6 h-6" />
                <span className="text-sm font-semibold tracking-wider uppercase opacity-90">
                  Categories Management
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">مدیریت دسته‌بندی‌ها</h1>
              <p className="text-sm md:text-base opacity-90">
                {toPersianDigits(filteredCategories.length.toString())} دسته‌بندی از {toPersianDigits(categories.length.toString())}
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
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">وارد کردن</span>
              </Button>
              <Link href="/admin/categories/new">
                <Button className="gap-2 bg-white text-teal-600 hover:bg-gray-100">
                  <Plus className="w-4 h-4" />
                  دسته‌بندی جدید
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

      {/* Advanced Toolbar و Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col gap-4">
              {/* Search و View Toggle */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="جستجوی نام دسته، slug..."
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
                      variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="px-3"
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'tree' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('tree')}
                      className="px-3"
                    >
                      <FolderTree className="w-4 h-4" />
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
                        value={visibilityFilter}
                        onChange={(e) => setVisibilityFilter(e.target.value)}
                        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                      >
                        <option value="all">همه دسته‌ها</option>
                        <option value="visible">قابل نمایش</option>
                        <option value="hidden">مخفی</option>
                      </select>

                      <select className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm">
                        <option value="all">همه سطوح</option>
                        <option value="parent">دسته اصلی</option>
                        <option value="child">زیر دسته</option>
                      </select>

                      <select className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm">
                        <option value="order">مرتب‌سازی: ترتیب</option>
                        <option value="name">مرتب‌سازی: نام</option>
                        <option value="products">مرتب‌سازی: تعداد محصول</option>
                        <option value="revenue">مرتب‌سازی: درآمد</option>
                      </select>

                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          setSearchTerm('');
                          setVisibilityFilter('all');
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
              {selectedCategories.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20"
                >
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-primary" />
                    <span className="font-semibold">
                      {toPersianDigits(selectedCategories.length.toString())} دسته‌بندی انتخاب شده
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => setSelectedCategories([])}>
                      <X className="w-4 h-4 me-1" />
                      لغو
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 me-1" />
                      نمایش/مخفی
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

      {/* Categories Grid/Tree View */}
      {viewMode === 'grid' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
        >
          {filteredCategories.map((category, idx) => (
            <motion.div
              key={category.id}
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
                    variant={selectedCategories.includes(category.id) ? 'default' : 'secondary'}
                    className="w-8 h-8 p-0 rounded-full shadow-lg"
                    onClick={() => toggleCategorySelection(category.id)}
                  >
                    {selectedCategories.includes(category.id) ? (
                      <CheckSquare className="w-4 h-4" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {/* Category Icon/Emoji */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950 dark:to-emerald-950 flex items-center justify-center">
                  <div className="text-6xl">{category.icon}</div>
                  {!category.isVisible && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Badge variant="secondary" className="text-sm px-3 py-1">
                        <EyeOff className="w-3 h-3 me-1" />
                        مخفی
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Category Info */}
                    <div>
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-bold line-clamp-1 group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        {getTrendIcon(category.trend)}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">{category.nameEn}</p>
                      {category.parentId && (
                        <Badge variant="outline" className="text-xs mt-1">
                          <FolderOpen className="w-3 h-3 me-1" />
                          زیر دسته
                        </Badge>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <Package className="w-3 h-3 text-muted-foreground" />
                        <span>{toPersianDigits(category.productCount.toString())} محصول</span>
                      </div>
                      <div className="text-muted-foreground">
                        {toPersianDigits((category.revenue / 1000000).toFixed(1))}M
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 border-t">
                      <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => handleToggleVisibility(category.id)}>
                        {category.isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <Edit className="w-3 h-3" />
                        ویرایش
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
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
        /* Tree View */
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b bg-gray-50/50 dark:bg-gray-800/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">
                ساختار درختی دسته‌بندی‌ها
              </CardTitle>
              <Button size="sm" variant="ghost" onClick={toggleSelectAll}>
                {selectedCategories.length === filteredCategories.length ? 'لغو انتخاب همه' : 'انتخاب همه'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-2">
              {getParentCategories().map((parent, idx) => (
                <motion.div
                  key={parent.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  {/* Parent Category */}
                  <div className="rounded-lg border bg-white dark:bg-gray-800 overflow-hidden">
                    <div className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleCategorySelection(parent.id)}
                        className="w-8 h-8 p-0"
                      >
                        {selectedCategories.includes(parent.id) ? (
                          <CheckSquare className="w-4 h-4 text-primary" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </Button>

                      {getChildCategories(parent.id).length > 0 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleExpanded(parent.id)}
                          className="w-8 h-8 p-0"
                        >
                          <ChevronRight
                            className={`w-4 h-4 transition-transform ${
                              expandedCategories.includes(parent.id) ? 'rotate-90' : ''
                            }`}
                          />
                        </Button>
                      )}

                      <div className="text-3xl">{parent.icon}</div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold">{parent.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {parent.nameEn}
                          </Badge>
                          {!parent.isVisible && (
                            <Badge variant="secondary" className="text-xs">
                              <EyeOff className="w-3 h-3 me-1" />
                              مخفی
                            </Badge>
                          )}
                          {getTrendIcon(parent.trend)}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Package className="w-3 h-3" />
                            {toPersianDigits(parent.productCount.toString())} محصول
                          </span>
                          <span>درآمد: {toPersianDigits((parent.revenue / 1000000).toFixed(1))}M</span>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => handleToggleVisibility(parent.id)}>
                          {parent.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>

                    {/* Child Categories */}
                    <AnimatePresence>
                      {expandedCategories.includes(parent.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="bg-gray-50 dark:bg-gray-900 border-t"
                        >
                          {getChildCategories(parent.id).map((child) => (
                            <div
                              key={child.id}
                              className="flex items-center gap-3 p-4 pr-16 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-t first:border-t-0"
                            >
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => toggleCategorySelection(child.id)}
                                className="w-8 h-8 p-0"
                              >
                                {selectedCategories.includes(child.id) ? (
                                  <CheckSquare className="w-4 h-4 text-primary" />
                                ) : (
                                  <Square className="w-4 h-4" />
                                )}
                              </Button>

                              <div className="text-2xl">{child.icon}</div>

                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h5 className="font-semibold text-sm">{child.name}</h5>
                                  <Badge variant="outline" className="text-xs">
                                    {child.nameEn}
                                  </Badge>
                                  {!child.isVisible && (
                                    <Badge variant="secondary" className="text-xs">
                                      <EyeOff className="w-3 h-3 me-1" />
                                      مخفی
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                  <span className="flex items-center gap-1">
                                    <Package className="w-3 h-3" />
                                    {toPersianDigits(child.productCount.toString())} محصول
                                  </span>
                                  <span>درآمد: {toPersianDigits((child.revenue / 1000000).toFixed(1))}M</span>
                                </div>
                              </div>

                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm" onClick={() => handleToggleVisibility(child.id)}>
                                  {child.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <FolderTree className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-bold mb-2">دسته‌بندی یافت نشد</h3>
          <p className="text-muted-foreground mb-4">لطفاً فیلترهای دیگری امتحان کنید</p>
          <Button 
            onClick={() => {
              setSearchTerm('');
              setVisibilityFilter('all');
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
