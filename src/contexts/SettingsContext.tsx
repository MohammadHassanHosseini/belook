'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface MenuItem {
  id: string;
  labelFa: string;
  labelEn: string;
  labelAr: string;
  path: string;
  isVisible: boolean;
  order: number;
  icon?: string;
}

export interface SiteSettings {
  // عمومی
  siteName: string;
  siteNameEn: string;
  tagline: string;
  taglineEn: string;
  logo: string | null;
  logoDark: string | null;
  logoSize: number;
  siteEmail: string;
  sitePhone: string;
  siteAddress: string;
  
  // SEO
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  googleAnalytics: string;
  
  // ظاهری
  primaryColor: string;
  secondaryColor: string;
  darkModeEnabled: boolean;
  
  // شبکه‌های اجتماعی
  instagram: string;
  telegram: string;
  whatsapp: string;
  facebook: string;
  youtube: string;
  linkedin: string;
  twitter: string;
  rubika: string;
  eitaa: string;
  
  // پرداخت و ارسال
  freeShippingThreshold: number;
  shippingCost: number;
  taxRate: number;
  
  // ایمیل
  smtpHost: string;
  emailNotifications: boolean;
  
  // امنیت
  maintenanceMode: boolean;
  allowRegistration: boolean;
  
  // منوی هدر
  menuItems: MenuItem[];
  
  // زبان‌های فعال
  enabledLocales: {
    fa: boolean;
    en: boolean;
    ar: boolean;
  };
}

const defaultSettings: SiteSettings = {
  siteName: 'بی لوک',
  siteNameEn: 'Belook',
  tagline: 'زیبایی اصیل',
  taglineEn: 'PREMIUM BEAUTY',
  logo: null,
  logoDark: null,
  logoSize: 48,
  siteEmail: 'info@belook.ir',
  sitePhone: '۰۲۱-۱۲۳۴۵۶۷۸',
  siteAddress: 'تهران، خیابان ولیعصر',
  metaTitle: 'بی لوک - محصولات لوکس آرایشی و بهداشتی',
  metaDescription: 'خرید محصولات اصل آرایشی و بهداشتی با بهترین قیمت',
  metaKeywords: 'آرایشی، بهداشتی، لوکس، مراقبت پوست',
  googleAnalytics: '',
  primaryColor: '#EC4899',
  secondaryColor: '#F97316',
  darkModeEnabled: true,
  instagram: '',
  telegram: '',
  whatsapp: '',
  facebook: '',
  youtube: '',
  linkedin: '',
  twitter: '',
  rubika: '',
  eitaa: '',
  freeShippingThreshold: 500000,
  shippingCost: 30000,
  taxRate: 9,
  smtpHost: '',
  emailNotifications: true,
  maintenanceMode: false,
  allowRegistration: true,
  menuItems: [
    {
      id: 'home',
      labelFa: 'خانه',
      labelEn: 'Home',
      labelAr: 'الرئيسية',
      path: '/',
      isVisible: true,
      order: 1,
    },
    {
      id: 'products',
      labelFa: 'محصولات',
      labelEn: 'Products',
      labelAr: 'المنتجات',
      path: '/products',
      isVisible: true,
      order: 2,
    },
    {
      id: 'brands',
      labelFa: 'برندها',
      labelEn: 'Brands',
      labelAr: 'العلامات التجارية',
      path: '/brands',
      isVisible: true,
      order: 3,
    },
    {
      id: 'blog',
      labelFa: 'بلاگ',
      labelEn: 'Blog',
      labelAr: 'المدونة',
      path: '/blog',
      isVisible: true,
      order: 4,
    },
    {
      id: 'about',
      labelFa: 'درباره ما',
      labelEn: 'About',
      labelAr: 'معلومات عنا',
      path: '/about',
      isVisible: true,
      order: 5,
    },
    {
      id: 'contact',
      labelFa: 'تماس با ما',
      labelEn: 'Contact',
      labelAr: 'اتصل بنا',
      path: '/contact',
      isVisible: true,
      order: 6,
    },
  ],
  enabledLocales: {
    fa: true,
    en: true,
    ar: true,
  },
};

interface SettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  // بارگذاری تنظیمات از localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('siteSettings');
      if (savedSettings) {
        try {
          setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
        } catch (error) {
          console.error('Error loading settings:', error);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // اعمال رنگ‌ها در CSS
  useEffect(() => {
    if (isLoaded && typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--primary-color', settings.primaryColor);
      root.style.setProperty('--secondary-color', settings.secondaryColor);
      
      // اعمال Dark Mode
      if (settings.darkModeEnabled) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [settings.primaryColor, settings.secondaryColor, settings.darkModeEnabled, isLoaded]);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    
    // ذخیره در localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('siteSettings', JSON.stringify(updated));
    }
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('siteSettings');
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
