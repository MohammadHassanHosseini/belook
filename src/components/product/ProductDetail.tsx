'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Heart, ShoppingCart, Star, Truck, Shield, RefreshCw, Share2, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { toast } from 'react-hot-toast';
import { formatCurrency, calculateDiscountPercentage } from '@/lib/utils';
import { toPersianDigits } from '@/lib/utils/numbers';
import ShareButtons from '@/components/product/ShareButtons';

interface ProductDetailProps {
  product: any;
  locale: string;
}

export default function ProductDetail({ product, locale }: ProductDetailProps) {
  const t = useTranslations();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const addToCart = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));

  const productName = locale === 'fa' ? product.nameFa : 
                      locale === 'ar' ? product.nameAr : product.nameEn;
  
  const description = locale === 'fa' ? product.descriptionFa : 
                      locale === 'ar' ? product.descriptionAr : product.descriptionEn;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      productId: product.id,
      name: productName,
      nameEn: product.nameEn,
      nameFa: product.nameFa,
      nameAr: product.nameAr,
      image: product.thumbnail,
      price: product.price,
      quantity,
    });
    toast.success(t('common.addToCart') + ' ✓');
  };

  const handleAddToWishlist = () => {
    if (isInWishlist) {
      toast.error('محصول قبلاً به علاقه‌مندی‌ها اضافه شده');
      return;
    }
    addToWishlist({
      id: product.id,
      productId: product.id,
      name: productName,
      nameEn: product.nameEn,
      nameFa: product.nameFa,
      nameAr: product.nameAr,
      image: product.thumbnail,
      price: product.price,
    });
    toast.success('به علاقه‌مندی‌ها اضافه شد ♥');
  };

  const discount = product.comparePrice 
    ? calculateDiscountPercentage(product.comparePrice, product.price)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary">
            <img
              src={product.images[selectedImage]}
              alt={productName}
              className="w-full h-full object-cover"
            />
            {discount > 0 && (
              <Badge className="absolute top-4 end-4 bg-red-500 text-white">
                {toPersianDigits(discount.toString())}٪ تخفیف
              </Badge>
            )}
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === idx ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Brand */}
          {product.brand && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">برند:</span>
              <span className="font-semibold">{locale === 'fa' ? product.brand.nameFa : product.brand.nameEn}</span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold">{productName}</h1>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {toPersianDigits(product.rating.toString())} ({toPersianDigits(product.reviewCount.toString())} نظر)
            </span>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="text-3xl font-bold text-primary">
                  {formatCurrency(product.price, 'fa')}
                </span>
                <span className="text-base font-medium text-muted-foreground">تومان</span>
              </div>
              {product.comparePrice && (
                <div className="flex items-center gap-1">
                  <span className="text-xl text-muted-foreground line-through">
                    {formatCurrency(product.comparePrice, 'fa')}
                  </span>
                  <span className="text-xs text-muted-foreground">تومان</span>
                </div>
              )}
            </div>
            {product.stock > 0 ? (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {t('common.inStock')}
              </Badge>
            ) : (
              <Badge variant="destructive">{t('common.outOfStock')}</Badge>
            )}
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">{description}</p>

          {/* Quantity */}
          <div className="space-y-2">
            <label className="text-sm font-medium">تعداد:</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-semibold">{toPersianDigits(quantity.toString())}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              size="lg"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="me-2 h-5 w-5" />
              {t('common.addToCart')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleAddToWishlist}
            >
              <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <ShareButtons 
              productName={productName}
              productUrl={`/${locale}/products/${product.slug}`}
              productImage={product.thumbnail}
            />
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t">
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="h-6 w-6 text-primary" />
              <span className="text-sm">ارسال رایگان</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-sm">ضمانت اصالت</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RefreshCw className="h-6 w-6 text-primary" />
              <span className="text-sm">بازگشت کالا</span>
            </div>
          </div>

          {/* SKU */}
          <div className="text-sm text-muted-foreground pt-4 border-t">
            کد محصول: {product.sku}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="border-b">
          <div className="flex gap-8">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-medium transition-colors relative ${
                  activeTab === tab
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab === 'description' && 'توضیحات'}
                {tab === 'specifications' && 'مشخصات'}
                {tab === 'reviews' && 'نظرات'}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="py-8">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          )}
          {activeTab === 'specifications' && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">برند</span>
                <span>{product.brand?.nameFa}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">دسته‌بندی</span>
                <span>{product.category.nameFa}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">وزن</span>
                <span>{product.weight || 'نامشخص'}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">ابعاد</span>
                <span>{product.dimensions || 'نامشخص'}</span>
              </div>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="text-center py-8 text-muted-foreground">
              نظرات به زودی اضافه خواهند شد...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
