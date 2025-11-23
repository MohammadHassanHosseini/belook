import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ثبت‌نام | بی لوک',
  description: 'عضویت رایگان در فروشگاه آنلاین بی لوک. ثبت‌نام سریع و آسان با ایمیل، گوگل یا مایکروسافت',
  keywords: ['ثبت‌نام', 'عضویت', 'رجیستر', 'بی لوک', 'حساب کاربری جدید', 'فروشگاه آنلاین'],
  openGraph: {
    title: 'ثبت‌نام | بی لوک',
    description: 'عضویت رایگان در فروشگاه آنلاین بی لوک',
    type: 'website',
    locale: 'fa_IR',
    siteName: 'بی لوک',
  },
  twitter: {
    card: 'summary',
    title: 'ثبت‌نام | بی لوک',
    description: 'عضویت رایگان در فروشگاه آنلاین بی لوک',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/auth/register',
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
