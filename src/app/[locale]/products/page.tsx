import { Metadata } from 'next';
import ProductsClient from '@/components/products/ProductsClient';

export const metadata: Metadata = {
  title: 'محصولات | فروشگاه آرایشی و بهداشتی بی لوک',
  description: 'خرید محصولات آرایشی و بهداشتی با بهترین کیفیت و قیمت. بیش از 500 محصول اصل و معتبر از برندهای معتبر جهان.',
  keywords: 'محصولات آرایشی, لوازم آرایشی, محصولات بهداشتی, خرید آنلاین, برندهای معتبر',
  openGraph: {
    title: 'محصولات - فروشگاه بی لوک',
    description: 'بیش از 500 محصول آرایشی و بهداشتی اصل',
    type: 'website',
  },
};

export default function ProductsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return <ProductsClient locale={locale} />;
}
