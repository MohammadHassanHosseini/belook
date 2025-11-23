import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter, Playfair_Display } from 'next/font/google';
import { locales, rtlLocales } from '@/i18n';
import type { Locale } from '@/types';
import { Providers } from '@/app/providers';
import LiveChatWrapper from '@/components/layout/LiveChatWrapper';
import '@/app/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

// فونت Vazirmatn برای فارسی - بدون استفاده از next/font چون مشکل دارد
// به جای آن از CDN در head استفاده می‌کنیم

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const titles = {
    fa: 'بی لوک - محصولات لوکس آرایشی و بهداشتی',
    en: 'Belook - Premium Cosmetics & Skincare',
    ar: 'بيلوك - منتجات تجميل وعناية فاخرة',
  };

  const descriptions = {
    fa: 'خرید محصولات اصل آرایشی و بهداشتی با بهترین قیمت',
    en: 'Shop authentic cosmetics and skincare products',
    ar: 'تسوق منتجات التجميل والعناية بالبشرة الأصلية',
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    icons: {
      icon: '/icon.svg',
      apple: '/icon.svg',
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = rtlLocales.includes(locale as Locale);

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {/* فونت فارسی Vazirmatn */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
            <LiveChatWrapper />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
