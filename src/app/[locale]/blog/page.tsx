import { Metadata } from 'next';
import BlogClient from '@/components/blog/BlogClient';

export const metadata: Metadata = {
  title: 'بلاگ و مجله زیبایی | مقالات تخصصی مراقبت از پوست - بی لوک',
  description: 'آخرین مقالات، راهنماها و نکات تخصصی مراقبت از پوست، آرایش و زیبایی. مجله آنلاین بی لوک با محتوای روزانه و کاربردی.',
  keywords: 'بلاگ زیبایی, مراقبت پوست, آرایش, مقالات تخصصی, نکات زیبایی, راهنمای خرید',
  openGraph: {
    title: 'مجله زیبایی بی لوک - مقالات و راهنماهای تخصصی',
    description: 'دنیای زیبایی را با مقالات تخصصی کشف کنید',
    type: 'website',
  },
};

export default function BlogPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return <BlogClient locale={locale} />;
}
