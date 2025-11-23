'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { X, SlidersHorizontal } from 'lucide-react';
import { toPersianDigits } from '@/lib/utils/numbers';

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  inStock: boolean;
  onSale: boolean;
  rating: number | null;
  sortBy: string;
}

export default function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: [0, 5000000],
    inStock: false,
    onSale: false,
    rating: null,
    sortBy: 'newest',
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Mock data - در production از API می‌آید
  const categories = [
    { id: '1', name: 'مراقبت پوست', count: 156 },
    { id: '2', name: 'آرایش', count: 234 },
    { id: '3', name: 'مراقبت مو', count: 98 },
    { id: '4', name: 'عطر و ادکلن', count: 87 },
    { id: '5', name: 'مراقبت بدن', count: 145 },
    { id: '6', name: 'محصولات آقایان', count: 76 },
  ];

  const brands = [
    { id: '1', name: 'لورآل', count: 89 },
    { id: '2', name: 'لاروش پوزای', count: 67 },
    { id: '3', name: 'ویشی', count: 54 },
    { id: '4', name: 'نیوا', count: 43 },
    { id: '5', name: 'گارنیه', count: 38 },
  ];

  const priceRanges = [
    { label: 'زیر 200 هزار تومان', min: 0, max: 200000 },
    { label: '200 تا 500 هزار تومان', min: 200000, max: 500000 },
    { label: '500 هزار تا 1 میلیون تومان', min: 500000, max: 1000000 },
    { label: '1 تا 2 میلیون تومان', min: 1000000, max: 2000000 },
    { label: 'بالای 2 میلیون تومان', min: 2000000, max: 5000000 },
  ];

  const sortOptions = [
    { value: 'newest', label: 'جدیدترین' },
    { value: 'oldest', label: 'قدیمی‌ترین' },
    { value: 'price-asc', label: 'ارزان‌ترین' },
    { value: 'price-desc', label: 'گران‌ترین' },
    { value: 'popular', label: 'محبوب‌ترین' },
    { value: 'bestseller', label: 'پرفروش‌ترین' },
  ];

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((id) => id !== categoryId)
      : [...filters.categories, categoryId];
    
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleBrandToggle = (brandId: string) => {
    const newBrands = filters.brands.includes(brandId)
      ? filters.brands.filter((id) => id !== brandId)
      : [...filters.brands, brandId];
    
    const newFilters = { ...filters, brands: newBrands };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    const newFilters = { ...filters, priceRange: range };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleQuickPriceSelect = (min: number, max: number) => {
    const newFilters = { ...filters, priceRange: [min, max] as [number, number] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleInStockToggle = () => {
    const newFilters = { ...filters, inStock: !filters.inStock };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleOnSaleToggle = () => {
    const newFilters = { ...filters, onSale: !filters.onSale };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRatingChange = (rating: number) => {
    const newRating = filters.rating === rating ? null : rating;
    const newFilters = { ...filters, rating: newRating };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (sortBy: string) => {
    const newFilters = { ...filters, sortBy };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const defaultFilters: FilterState = {
      categories: [],
      brands: [],
      priceRange: [0, 5000000],
      inStock: false,
      onSale: false,
      rating: null,
      sortBy: 'newest',
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const activeFiltersCount = 
    filters.categories.length + 
    filters.brands.length + 
    (filters.inStock ? 1 : 0) + 
    (filters.onSale ? 1 : 0) + 
    (filters.rating ? 1 : 0);

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Active Filters Summary */}
      {activeFiltersCount > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">
                فیلترهای فعال ({activeFiltersCount})
              </span>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                <X className="h-4 w-4 me-1" />
                حذف همه
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.categories.map((catId) => {
                const cat = categories.find((c) => c.id === catId);
                return (
                  <Badge key={catId} variant="secondary" className="gap-1">
                    {cat?.name}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleCategoryToggle(catId)}
                    />
                  </Badge>
                );
              })}
              {filters.brands.map((brandId) => {
                const brand = brands.find((b) => b.id === brandId);
                return (
                  <Badge key={brandId} variant="secondary" className="gap-1">
                    {brand?.name}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleBrandToggle(brandId)}
                    />
                  </Badge>
                );
              })}
              {filters.inStock && (
                <Badge variant="secondary" className="gap-1">
                  فقط موجود
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={handleInStockToggle}
                  />
                </Badge>
              )}
              {filters.onSale && (
                <Badge variant="secondary" className="gap-1">
                  تخفیف‌دار
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={handleOnSaleToggle}
                  />
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sort By */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">مرتب‌سازی</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">دسته‌بندی</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer flex-1">
                <Checkbox
                  checked={filters.categories.includes(category.id)}
                  onCheckedChange={() => handleCategoryToggle(category.id)}
                />
                <span className="text-sm">{category.name}</span>
              </label>
              <span className="text-xs text-muted-foreground">
                ({toPersianDigits(category.count.toString())})
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Brands */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">برند</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer flex-1">
                <Checkbox
                  checked={filters.brands.includes(brand.id)}
                  onCheckedChange={() => handleBrandToggle(brand.id)}
                />
                <span className="text-sm">{brand.name}</span>
              </label>
              <span className="text-xs text-muted-foreground">
                ({toPersianDigits(brand.count.toString())})
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">محدوده قیمت</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="px-2">
            <Slider
              min={0}
              max={5000000}
              step={100000}
              value={filters.priceRange}
              onValueChange={(value) => handlePriceRangeChange(value as [number, number])}
              className="mb-4"
            />
            <div className="flex items-center justify-between text-sm">
              <span>{toPersianDigits(filters.priceRange[0].toLocaleString('en-US'))} تومان</span>
              <span>{toPersianDigits(filters.priceRange[1].toLocaleString('en-US'))} تومان</span>
            </div>
          </div>

          <div className="space-y-2">
            {priceRanges.map((range, index) => (
              <button
                key={index}
                onClick={() => handleQuickPriceSelect(range.min, range.max)}
                className={`w-full text-start px-3 py-2 rounded-lg text-sm transition-colors ${
                  filters.priceRange[0] === range.min && filters.priceRange[1] === range.max
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stock Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">وضعیت موجودی</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox checked={filters.inStock} onCheckedChange={handleInStockToggle} />
            <span className="text-sm">فقط کالاهای موجود</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox checked={filters.onSale} onCheckedChange={handleOnSaleToggle} />
            <span className="text-sm">فقط کالاهای تخفیف‌دار</span>
          </label>
        </CardContent>
      </Card>

      {/* Rating */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">امتیاز</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                filters.rating === rating
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-secondary'
              }`}
            >
              <div className="flex gap-1">
                {[...Array(rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
                {[...Array(5 - rating)].map((_, i) => (
                  <span key={i} className="text-gray-300">★</span>
                ))}
              </div>
              <span className="text-sm">و بالاتر</span>
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <FiltersContent />
      </div>

      {/* Mobile Filters Button */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
        <Button
          onClick={() => setShowMobileFilters(true)}
          size="lg"
          className="w-full shadow-lg"
        >
          <SlidersHorizontal className="h-5 w-5 me-2" />
          فیلترها {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </Button>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50">
          <div className="absolute inset-y-0 end-0 w-full max-w-sm bg-background overflow-y-auto">
            <div className="sticky top-0 bg-background border-b p-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">فیلترها</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMobileFilters(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4">
              <FiltersContent />
            </div>
            <div className="sticky bottom-0 bg-background border-t p-4">
              <Button
                onClick={() => setShowMobileFilters(false)}
                className="w-full"
                size="lg"
              >
                اعمال فیلترها
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
