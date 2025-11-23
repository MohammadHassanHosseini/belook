import { Metadata } from 'next';
import BrandsClient from '@/components/brands/BrandsClient';

export const metadata: Metadata = {
  title: 'برندهای لوکس و معتبر | فروشگاه آرایشی و بهداشتی بی لوک',
  description: 'خرید از معتبرترین برندهای آرایشی و بهداشتی جهان. Dior, Chanel, Estée Lauder, MAC و بیش از 50 برند لوکس دیگر.',
  keywords: 'برندهای آرایشی, برندهای لوکس, Dior, Chanel, MAC, برندهای معتبر, خرید اصل',
  openGraph: {
    title: 'برندهای لوکس - فروشگاه بی لوک',
    description: 'بیش از 50 برند معتبر جهانی',
    type: 'website',
  },
};

export default function BrandsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return <BrandsClient locale={locale} />;
}
