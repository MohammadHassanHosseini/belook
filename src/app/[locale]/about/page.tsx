import { Metadata } from 'next';
import AboutClient from '@/components/about/AboutClient';

export const metadata: Metadata = {
  title: 'درباره ما | داستان برند بی لوک - فروشگاه آرایشی و بهداشتی',
  description: 'آشنایی با داستان بی لوک، تیم ما، ارزش‌ها و ماموریت ما در ارائه بهترین محصولات آرایشی و بهداشتی اصل به مشتریان ایرانی.',
  keywords: 'درباره بی لوک, داستان برند, تیم بی لوک, ارزش‌های ما, ماموریت, چشم‌انداز',
  openGraph: {
    title: 'درباره ما - بی لوک',
    description: 'داستان ما، تیم ما و تعهد ما به کیفیت',
    type: 'website',
  },
};

export default function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return <AboutClient locale={locale} />;
}
