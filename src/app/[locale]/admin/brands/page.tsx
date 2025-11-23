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
  Tag,
  Search,
  Filter,
  Grid3x3,
  List,
  Eye,
  EyeOff,
  Download,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  ChevronDown,
  MoreVertical,
  CheckSquare,
  Square,
  X,
  RefreshCw,
  TrendingUp,
  Package,
  Star,
  Award,
  Sparkles,
  Zap,
  Target,
  Activity,
  BarChart3,
  Globe,
  MapPin,
  Calendar,
  DollarSign,
  ShoppingBag,
  Users,
  Heart,
  TrendingDown,
  Copy,
  ExternalLink,
  Settings,
  Info,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toPersianDigits } from '@/lib/utils/numbers';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function AdminBrandsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');

  const brands = [
    { 
      id: '1', 
      name: 'La Roche-Posay', 
      nameLocal: 'لاروش پوزای',
      productCount: 45, 
      logo: '/brands/laroche.png',
      country: 'France',
      countryFlag: '🇫🇷',
      isActive: true,
      isFeatured: true,
      rating: 4.8,
      reviews: 245,
      sales: 1250,
      revenue: 56000000,
      trend: 'up',
      website: 'https://laroche-posay.com',
      description: 'برند پیشرو در مراقبت پوست درماتولوژیک',
      establishedYear: 1975,
      popularProducts: ['Effaclar', 'Anthelios', 'Cicaplast']
    },
    { 
      id: '2', 
      name: 'CeraVe', 
      nameLocal: 'سراوی',
      productCount: 38, 
      logo: '/brands/cerave.png',
      country: 'USA',
      countryFlag: '🇺🇸',
      isActive: true,
      isFeatured: true,
      rating: 4.7,
      reviews: 189,
      sales: 980,
      revenue: 42000000,
      trend: 'up',
      website: 'https://cerave.com',
      description: 'محصولات مراقبت پوست توصیه شده توسط متخصصان',
      establishedYear: 2005,
      popularProducts: ['Moisturizing Cream', 'Cleanser', 'AM Lotion']
    },
    { 
      id: '3', 
      name: 'Neutrogena', 
      nameLocal: 'نیتروژینا',
      productCount: 52, 
      logo: '/brands/neutrogena.png',
      country: 'USA',
      countryFlag: '🇺🇸',
      isActive: true,
      isFeatured: false,
      rating: 4.5,
      reviews: 312,
      sales: 1450,
      revenue: 68000000,
      trend: 'stable',
      website: 'https://neutrogena.com',
      description: 'برند معتبر آمریکایی محصولات بهداشتی',
      establishedYear: 1930,
      popularProducts: ['Hydro Boost', 'Makeup Remover', 'Rapid Wrinkle Repair']
    },
    { 
      id: '4', 
      name: 'Olay', 
      nameLocal: 'اولی',
      productCount: 29, 
      logo: '/brands/olay.png',
      country: 'USA',
      countryFlag: '🇺🇸',
      isActive: true,
      isFeatured: false,
      rating: 4.4,
      reviews: 156,
      sales: 720,
      revenue: 32000000,
      trend: 'up',
      website: 'https://olay.com',
      description: 'محصولات ضد پیری و مراقبت پوست',
      establishedYear: 1952,
      popularProducts: ['Regenerist', 'Total Effects', 'Retinol24']
    },
    { 
      id: '5', 
      name: 'Bioderma', 
      nameLocal: 'بیودرما',
      productCount: 34, 
      logo: '/brands/bioderma.png',
      country: 'France',
      countryFlag: '🇫🇷',
      isActive: true,
      isFeatured: true,
      rating: 4.9,
      reviews: 198,
      sales: 1120,
      revenue: 48000000,
      trend: 'up',
      website: 'https://bioderma.com',
      description: 'راه‌حل‌های درماتولوژیک پیشرفته',
      establishedYear: 1977,
      popularProducts: ['Sensibio', 'Hydrabio', 'Sebium']
    },
    { 
      id: '6', 
      name: 'The Ordinary', 
      nameLocal: 'دی اوردینری',
      productCount: 48, 
      logo: '/brands/ordinary.png',
      country: 'Canada',
      countryFlag: '🇨🇦',
      isActive: true,
      isFeatured: true,
      rating: 4.6,
      reviews: 423,
      sales: 1680,
      revenue: 72000000,
      trend: 'up',
      website: 'https://theordinary.com',
      description: 'مواد فعال با قیمت مناسب',
      establishedYear: 2016,
      popularProducts: ['Niacinamide', 'AHA BHA Peeling', 'Hyaluronic Acid']
    },
    { 
      id: '7', 
      name: 'Estée Lauder', 
      nameLocal: 'استه لودر',
      productCount: 41, 
      logo: '/brands/esteelauder.png',
      country: 'USA',
      countryFlag: '🇺🇸',
      isActive: false,
      isFeatured: false,
      rating: 4.3,
      reviews: 87,
      sales: 450,
      revenue: 28000000,
      trend: 'down',
      website: 'https://esteelauder.com',
      description: 'برند لوکس آرایشی و بهداشتی',
      establishedYear: 1946,
      popularProducts: ['Advanced Night Repair', 'Double Wear', 'Perfectionist']
    },
    { 
      id: '8', 
      name: 'Vichy', 
      nameLocal: 'ویشی',
      productCount: 36, 
      logo: '/brands/vichy.png',
      country: 'France',
      countryFlag: '🇫🇷',
      isActive: true,
      isFeatured: false,
      rating: 4.6,
      reviews: 176,
      sales: 890,
      revenue: 39000000,
      trend: 'stable',
      website: 'https://vichy.com',
      description: 'سلامت پوست با آب معدنی',
      establishedYear: 1931,
      popularProducts: ['Minéral 89', 'Liftactiv', 'Normaderm']
    },
  ];

  const stats = [
    {
      title: 'کل برندها',
      value: toPersianDigits(brands.length.toString()),
      change: '+12%',
      icon: Tag,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950'
    },
    {
      title: 'برندهای فعال',
      value: toPersianDigits(brands.filter(b => b.isActive).length.toString()),
      change: '+8%',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950'
    },
    {
      title: 'برندهای برتر',
      value: toPersianDigits(brands.filter(b => b.isFeatured).length.toString()),
      change: '+15%',
      icon: Award,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50 dark:bg-amber-950'
    },
    {
      title: 'کل فروش',
      value: toPersianDigits(brands.reduce((sum, b) => sum + b.sales, 0).toString()),
      change: '+23%',
      icon: ShoppingBag,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950'
    },
  ];

  const countries = Array.from(new Set(brands.map(b => b.country)));

  const filteredBrands = brands.filter((brand) => {
    const matchesSearch =
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.nameLocal.includes(searchTerm);
    
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && brand.isActive) ||
      (statusFilter === 'inactive' && !brand.isActive) ||
      (statusFilter === 'featured' && brand.isFeatured);

    const matchesCountry = countryFilter === 'all' || brand.country === countryFilter;

    return matchesSearch && matchesStatus && matchesCountry;
  });

  const toggleBrandSelection = (id: string) => {
    setSelectedBrands(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedBrands.length === filteredBrands.length) {
      setSelectedBrands([]);
    } else {
      setSelectedBrands(filteredBrands.map(b => b.id));
    }
  };

  const handleBulkDelete = () => {
    toast.success(`${toPersianDigits(selectedBrands.length.toString())} برند حذف شد`);
    setSelectedBrands([]);
  };

  const handleExport = () => {
    toast.success('فایل برندها در حال دانلود است');
  };

  const handleToggleStatus = (id: string) => {
    toast.success('وضعیت برند تغییر کرد');
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="w-3 h-3 text-red-500" />;
    return <Activity className="w-3 h-3 text-gray-500" />;
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Modern Header با Gradient */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-8 text-white shadow-2xl"
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
                <Tag className="w-6 h-6" />
                <span className="text-sm font-semibold tracking-wider uppercase opacity-90">
                  Brands Management
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">مدیریت برندها</h1>
              <p className="text-sm md:text-base opacity-90">
                {toPersianDigits(filteredBrands.length.toString())} برند از {toPersianDigits(brands.length.toString())}
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
              <Link href="/admin/brands/new">
                <Button className="gap-2 bg-white text-orange-600 hover:bg-gray-100">
                  <Plus className="w-4 h-4" />
                  برند جدید
                </Button>
              </Link>
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
                    placeholder="جستجوی نام برند..."
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
                        <option value="active">فعال</option>
                        <option value="inactive">غیرفعال</option>
                        <option value="featured">برتر</option>
                      </select>

                      <select
                        value={countryFilter}
                        onChange={(e) => setCountryFilter(e.target.value)}
                        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                      >
                        <option value="all">همه کشورها</option>
                        {countries.map(country => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>

                      <select className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm">
                        <option value="rating">مرتب‌سازی: امتیاز</option>
                        <option value="sales">مرتب‌سازی: فروش</option>
                        <option value="products">مرتب‌سازی: محصولات</option>
                        <option value="name">مرتب‌سازی: نام</option>
                      </select>

                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          setSearchTerm('');
                          setStatusFilter('all');
                          setCountryFilter('all');
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
              {selectedBrands.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20"
                >
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-primary" />
                    <span className="font-semibold">
                      {toPersianDigits(selectedBrands.length.toString())} برند انتخاب شده
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => setSelectedBrands([])}>
                      <X className="w-4 h-4 me-1" />
                      لغو
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 me-1" />
                      فعال/غیرفعال
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

      {/* Brands Grid/List */}
      {viewMode === 'grid' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
        >
          {filteredBrands.map((brand, idx) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all">
                <div className="absolute top-3 right-3 z-10">
                  <Button
                    size="sm"
                    variant={selectedBrands.includes(brand.id) ? 'default' : 'secondary'}
                    className="w-8 h-8 p-0 rounded-full shadow-lg"
                    onClick={() => toggleBrandSelection(brand.id)}
                  >
                    {selectedBrands.includes(brand.id) ? (
                      <CheckSquare className="w-4 h-4" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {brand.isFeatured && (
                  <div className="absolute top-3 left-3 z-10">
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                      <Award className="w-3 h-3 me-1" />
                      برتر
                    </Badge>
                  </div>
                )}

                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-8">
                  <div className="text-6xl font-bold text-gray-300 dark:text-gray-700">
                    {brand.name.charAt(0)}
                  </div>
                  {!brand.isActive && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Badge variant="secondary">
                        <XCircle className="w-3 h-3 me-1" />
                        غیرفعال
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="font-bold line-clamp-1 group-hover:text-primary transition-colors">
                            {brand.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">{brand.nameLocal}</p>
                        </div>
                        {getTrendIcon(brand.trend)}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xl">{brand.countryFlag}</span>
                        <span className="text-xs text-muted-foreground">{brand.country}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{toPersianDigits(brand.rating.toString())}</span>
                        <span className="text-muted-foreground">({toPersianDigits(brand.reviews.toString())})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="w-3 h-3 text-muted-foreground" />
                        <span>{toPersianDigits(brand.productCount.toString())}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2 border-t">
                      <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => handleToggleStatus(brand.id)}>
                        {brand.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <Edit className="w-3 h-3" />
                        ویرایش
                      </Button>
                      <Button variant="outline" size="sm" className="px-3">
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
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800 border-b">
                  <tr>
                    <th className="p-4 text-start w-12">
                      <Button size="sm" variant="ghost" onClick={toggleSelectAll} className="w-8 h-8 p-0">
                        {selectedBrands.length === filteredBrands.length && filteredBrands.length > 0 ? (
                          <CheckSquare className="w-4 h-4" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </Button>
                    </th>
                    <th className="p-4 text-start font-semibold text-sm">برند</th>
                    <th className="p-4 text-start font-semibold text-sm">کشور</th>
                    <th className="p-4 text-start font-semibold text-sm">محصولات</th>
                    <th className="p-4 text-start font-semibold text-sm">فروش</th>
                    <th className="p-4 text-start font-semibold text-sm">امتیاز</th>
                    <th className="p-4 text-start font-semibold text-sm">وضعیت</th>
                    <th className="p-4 text-center font-semibold text-sm">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBrands.map((brand, idx) => (
                    <motion.tr
                      key={brand.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <td className="p-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleBrandSelection(brand.id)}
                          className="w-8 h-8 p-0"
                        >
                          {selectedBrands.includes(brand.id) ? (
                            <CheckSquare className="w-4 h-4 text-primary" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </Button>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center font-bold text-lg">
                            {brand.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-sm">{brand.name}</p>
                              {brand.isFeatured && (
                                <Badge className="bg-amber-100 text-amber-700 text-xs">
                                  <Award className="w-3 h-3 me-1" />
                                  برتر
                                </Badge>
                              )}
                              {getTrendIcon(brand.trend)}
                            </div>
                            <p className="text-xs text-muted-foreground">{brand.nameLocal}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{brand.countryFlag}</span>
                          <span className="text-sm">{brand.country}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Package className="w-4 h-4 text-muted-foreground" />
                          <span className="font-semibold">{toPersianDigits(brand.productCount.toString())}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-sm">
                          {toPersianDigits(brand.sales.toString())}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{toPersianDigits(brand.rating.toString())}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {brand.isActive ? (
                          <Badge className="bg-green-100 text-green-700">
                            <CheckCircle className="w-3 h-3 me-1" />
                            فعال
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <XCircle className="w-3 h-3 me-1" />
                            غیرفعال
                          </Badge>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleToggleStatus(brand.id)}>
                            {brand.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
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
      {filteredBrands.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Tag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-bold mb-2">برندی یافت نشد</h3>
          <p className="text-muted-foreground mb-4">لطفاً فیلترهای دیگری امتحان کنید</p>
          <Button 
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setCountryFilter('all');
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
