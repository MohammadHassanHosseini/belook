'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Upload,
  X,
  Image as ImageIcon,
  Save,
  RotateCcw,
  Eye,
  Moon,
  Sun,
  Check,
  Settings,
  Globe,
  Palette,
  Mail,
  CreditCard,
  Truck,
  Shield,
  Code,
  Search as SearchIcon,
  Sparkles,
  Bell,
  Facebook,
  Instagram as InstagramIcon,
  Send,
  MessageCircle,
  Youtube,
  Linkedin,
  Twitter,
  Hash,
  Smartphone,
  Menu,
  GripVertical,
  ChevronUp,
  ChevronDown,
  EyeOff,
  Plus,
  Edit,
  Trash2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { toPersianDigits } from '@/lib/utils/numbers';
import { useSettings } from '@/contexts/SettingsContext';

type SettingsTab = 'general' | 'seo' | 'appearance' | 'social' | 'menu' | 'email' | 'payment' | 'shipping' | 'security' | 'advanced';

export default function SettingsPage() {
  const { settings, updateSettings, resetSettings: resetContextSettings } = useSettings();
  
  const [currentTab, setCurrentTab] = useState<SettingsTab>('general');
  const [activeLogoTab, setActiveLogoTab] = useState<'light' | 'dark'>('light');
  
  // State برای پیش‌نمایش (قبل از ذخیره)
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoDarkPreview, setLogoDarkPreview] = useState<string | null>(null);
  const [siteName, setSiteName] = useState(settings.siteName);
  const [siteNameEn, setSiteNameEn] = useState(settings.siteNameEn);
  const [tagline, setTagline] = useState(settings.tagline);
  const [taglineEn, setTaglineEn] = useState(settings.taglineEn);
  const [logoSize, setLogoSize] = useState(settings.logoSize);
  const [siteEmail, setSiteEmail] = useState(settings.siteEmail);
  const [sitePhone, setSitePhone] = useState(settings.sitePhone);
  const [siteAddress, setSiteAddress] = useState(settings.siteAddress);
  const [metaTitle, setMetaTitle] = useState(settings.metaTitle);
  const [metaDescription, setMetaDescription] = useState(settings.metaDescription);
  const [metaKeywords, setMetaKeywords] = useState(settings.metaKeywords);
  const [googleAnalytics, setGoogleAnalytics] = useState(settings.googleAnalytics);
  const [primaryColor, setPrimaryColor] = useState(settings.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(settings.secondaryColor);
  const [darkModeEnabled, setDarkModeEnabled] = useState(settings.darkModeEnabled);
  const [instagram, setInstagram] = useState(settings.instagram);
  const [telegram, setTelegram] = useState(settings.telegram);
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp);
  const [facebook, setFacebook] = useState(settings.facebook);
  const [youtube, setYoutube] = useState(settings.youtube);
  const [linkedin, setLinkedin] = useState(settings.linkedin);
  const [twitter, setTwitter] = useState(settings.twitter);
  const [rubika, setRubika] = useState(settings.rubika);
  const [eitaa, setEitaa] = useState(settings.eitaa);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(settings.freeShippingThreshold);
  const [shippingCost, setShippingCost] = useState(settings.shippingCost);
  const [taxRate, setTaxRate] = useState(settings.taxRate);
  const [smtpHost, setSmtpHost] = useState(settings.smtpHost);
  const [emailNotifications, setEmailNotifications] = useState(settings.emailNotifications);
  const [maintenanceMode, setMaintenanceMode] = useState(settings.maintenanceMode);
  const [allowRegistration, setAllowRegistration] = useState(settings.allowRegistration);
  const [menuItems, setMenuItems] = useState(settings.menuItems);
  const [enabledLocales, setEnabledLocales] = useState(settings.enabledLocales);
  
  // States برای مدیریت منو
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<any>(null);
  const [newMenuLabelFa, setNewMenuLabelFa] = useState('');
  const [newMenuLabelEn, setNewMenuLabelEn] = useState('');
  const [newMenuLabelAr, setNewMenuLabelAr] = useState('');
  const [newMenuPath, setNewMenuPath] = useState('');

  // بارگذاری تنظیمات از context هنگام mount
  useEffect(() => {
    setLogoPreview(settings.logo);
    setLogoDarkPreview(settings.logoDark);
    setSiteName(settings.siteName);
    setSiteNameEn(settings.siteNameEn);
    setTagline(settings.tagline);
    setTaglineEn(settings.taglineEn);
    setLogoSize(settings.logoSize);
    setSiteEmail(settings.siteEmail);
    setSitePhone(settings.sitePhone);
    setSiteAddress(settings.siteAddress);
    setMetaTitle(settings.metaTitle);
    setMetaDescription(settings.metaDescription);
    setMetaKeywords(settings.metaKeywords);
    setGoogleAnalytics(settings.googleAnalytics);
    setPrimaryColor(settings.primaryColor);
    setSecondaryColor(settings.secondaryColor);
    setDarkModeEnabled(settings.darkModeEnabled);
    setInstagram(settings.instagram);
    setTelegram(settings.telegram);
    setWhatsapp(settings.whatsapp);
    setFacebook(settings.facebook);
    setYoutube(settings.youtube);
    setLinkedin(settings.linkedin);
    setTwitter(settings.twitter);
    setRubika(settings.rubika);
    setEitaa(settings.eitaa);
    setFreeShippingThreshold(settings.freeShippingThreshold);
    setShippingCost(settings.shippingCost);
    setTaxRate(settings.taxRate);
    setSmtpHost(settings.smtpHost);
    setEmailNotifications(settings.emailNotifications);
    setMaintenanceMode(settings.maintenanceMode);
    setAllowRegistration(settings.allowRegistration);
    setMenuItems(settings.menuItems);
    setEnabledLocales(settings.enabledLocales);
  }, [settings]);

  // آپلود لوگو
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>, mode: 'light' | 'dark') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('حجم فایل نباید بیشتر از ۲ مگابایت باشد');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (mode === 'light') {
          setLogoPreview(result);
        } else {
          setLogoDarkPreview(result);
        }
        toast.success('لوگو با موفقیت آپلود شد');
      };
      reader.readAsDataURL(file);
    }
  };

  // حذف لوگو
  const handleRemoveLogo = (mode: 'light' | 'dark') => {
    if (mode === 'light') {
      setLogoPreview(null);
    } else {
      setLogoDarkPreview(null);
    }
    toast.success('لوگو حذف شد');
  };

  // توابع مدیریت منو
  const handleAddMenu = () => {
    if (!newMenuLabelFa || !newMenuLabelEn || !newMenuPath) {
      toast.error('لطفاً تمام فیلدها را پر کنید');
      return;
    }

    const newMenu = {
      id: `menu-${Date.now()}`,
      labelFa: newMenuLabelFa,
      labelEn: newMenuLabelEn,
      labelAr: newMenuLabelAr || newMenuLabelEn,
      path: newMenuPath,
      isVisible: true,
      order: menuItems.length + 1,
    };

    setMenuItems([...menuItems, newMenu]);
    setNewMenuLabelFa('');
    setNewMenuLabelEn('');
    setNewMenuLabelAr('');
    setNewMenuPath('');
    setIsAddMenuOpen(false);
    toast.success('منوی جدید اضافه شد ✓');
  };

  const handleEditMenu = () => {
    if (!editingMenu) return;

    const updatedMenus = menuItems.map(item =>
      item.id === editingMenu.id
        ? {
            ...item,
            labelFa: newMenuLabelFa,
            labelEn: newMenuLabelEn,
            labelAr: newMenuLabelAr,
            path: newMenuPath,
          }
        : item
    );

    setMenuItems(updatedMenus);
    setIsEditMenuOpen(false);
    setEditingMenu(null);
    setNewMenuLabelFa('');
    setNewMenuLabelEn('');
    setNewMenuLabelAr('');
    setNewMenuPath('');
    toast.success('منو ویرایش شد ✓');
  };

  const handleDeleteMenu = (menuId: string) => {
    if (confirm('آیا از حذف این منو اطمینان دارید؟')) {
      const filtered = menuItems.filter(item => item.id !== menuId);
      // اصلاح order ها
      const reordered = filtered.map((item, index) => ({
        ...item,
        order: index + 1,
      }));
      setMenuItems(reordered);
      toast.success('منو حذف شد');
    }
  };

  const openEditDialog = (menu: any) => {
    setEditingMenu(menu);
    setNewMenuLabelFa(menu.labelFa);
    setNewMenuLabelEn(menu.labelEn);
    setNewMenuLabelAr(menu.labelAr);
    setNewMenuPath(menu.path);
    setIsEditMenuOpen(true);
  };

  // ذخیره تنظیمات
  const handleSave = () => {
    // ذخیره در Context (که خودش در localStorage ذخیره می‌کند)
    updateSettings({
      siteName,
      siteNameEn,
      tagline,
      taglineEn,
      logo: logoPreview,
      logoDark: logoDarkPreview,
      logoSize,
      siteEmail,
      sitePhone,
      siteAddress,
      metaTitle,
      metaDescription,
      metaKeywords,
      googleAnalytics,
      primaryColor,
      secondaryColor,
      darkModeEnabled,
      instagram,
      telegram,
      whatsapp,
      facebook,
      youtube,
      linkedin,
      twitter,
      rubika,
      eitaa,
      freeShippingThreshold,
      shippingCost,
      taxRate,
      smtpHost,
      emailNotifications,
      maintenanceMode,
      allowRegistration,
      menuItems,
      enabledLocales,
    });
    
    toast.success('تنظیمات با موفقیت ذخیره شد و در سایت اعمال می‌شود! ✓');
    
    // Refresh صفحه برای اعمال تغییرات
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // بازنشانی
  const handleReset = () => {
    if (confirm('آیا از بازنشانی تمام تنظیمات به مقادیر پیش‌فرض اطمینان دارید؟')) {
      resetContextSettings();
      toast.success('تنظیمات به حالت پیش‌فرض بازگشت');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const tabs = [
    { id: 'general' as SettingsTab, name: 'عمومی', icon: Settings, color: 'text-blue-500' },
    { id: 'seo' as SettingsTab, name: 'سئو', icon: SearchIcon, color: 'text-green-500' },
    { id: 'appearance' as SettingsTab, name: 'ظاهر', icon: Palette, color: 'text-purple-500' },
    { id: 'social' as SettingsTab, name: 'شبکه‌های اجتماعی', icon: Globe, color: 'text-pink-500' },
    { id: 'menu' as SettingsTab, name: 'مدیریت منو', icon: Menu, color: 'text-teal-500' },
    { id: 'email' as SettingsTab, name: 'ایمیل', icon: Mail, color: 'text-orange-500' },
    { id: 'payment' as SettingsTab, name: 'پرداخت', icon: CreditCard, color: 'text-indigo-500' },
    { id: 'shipping' as SettingsTab, name: 'ارسال', icon: Truck, color: 'text-cyan-500' },
    { id: 'security' as SettingsTab, name: 'امنیت', icon: Shield, color: 'text-red-500' },
    { id: 'advanced' as SettingsTab, name: 'پیشرفته', icon: Code, color: 'text-gray-500' },
  ];

  return (
    <div className="space-y-6 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-primary" />
            تنظیمات سایت
          </h1>
          <p className="text-muted-foreground">مدیریت کامل تنظیمات و پیکربندی سایت</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 me-2" />
            بازنشانی
          </Button>
          <Button onClick={handleSave} size="lg">
            <Save className="w-4 w-4 me-2" />
            ذخیره تنظیمات
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={currentTab === tab.id ? 'default' : 'ghost'}
                  className="flex items-center gap-2 whitespace-nowrap"
                  onClick={() => setCurrentTab(tab.id)}
                >
                  <Icon className={`w-4 h-4 ${currentTab === tab.id ? '' : tab.color}`} />
                  {tab.name}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {currentTab === 'general' && (
            <div className="space-y-6">
              {/* محتوای تب عمومی که قبلاً داشتیم */}
              {/* Logo Upload Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* لوگوی حالت روشن */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="w-5 h-5 text-yellow-500" />
                  لوگوی حالت روشن
                </CardTitle>
                <CardDescription>لوگو برای تم روشن سایت</CardDescription>
              </div>
              <Button
                variant={activeLogoTab === 'light' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveLogoTab('light')}
              >
                {activeLogoTab === 'light' && <Check className="w-4 h-4 me-2" />}
                فعال
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* پیش‌نمایش لوگو */}
            <div className="relative aspect-video rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 overflow-hidden">
              {logoPreview ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative"
                >
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    style={{ width: logoSize, height: logoSize }}
                    className="object-contain"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 rounded-full w-6 h-6"
                    onClick={() => handleRemoveLogo('light')}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </motion.div>
              ) : (
                <div className="text-center">
                  <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-muted-foreground">هنوز لوگویی آپلود نشده</p>
                </div>
              )}
            </div>

            {/* دکمه آپلود */}
            <div className="space-y-2">
              <Label htmlFor="logo-upload">آپلود لوگو</Label>
              <div className="flex gap-2">
                <label
                  htmlFor="logo-upload"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-primary/50 rounded-lg hover:bg-primary/5 cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span className="text-sm font-medium">انتخاب فایل</span>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleLogoUpload(e, 'light')}
                  />
                </label>
                {logoPreview && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveLogo('light')}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                فرمت‌های قابل قبول: PNG, JPG, SVG | حداکثر حجم: ۲ مگابایت
              </p>
            </div>
          </CardContent>
        </Card>

        {/* لوگوی حالت تاریک */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="w-5 h-5 text-blue-500" />
                  لوگوی حالت تاریک
                </CardTitle>
                <CardDescription>لوگو برای تم تاریک سایت</CardDescription>
              </div>
              <Button
                variant={activeLogoTab === 'dark' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveLogoTab('dark')}
              >
                {activeLogoTab === 'dark' && <Check className="w-4 h-4 me-2" />}
                فعال
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* پیش‌نمایش لوگو */}
            <div className="relative aspect-video rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border-2 border-dashed border-gray-600 overflow-hidden">
              {logoDarkPreview ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative"
                >
                  <img
                    src={logoDarkPreview}
                    alt="Logo Dark Preview"
                    style={{ width: logoSize, height: logoSize }}
                    className="object-contain"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 rounded-full w-6 h-6"
                    onClick={() => handleRemoveLogo('dark')}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </motion.div>
              ) : (
                <div className="text-center">
                  <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-400">هنوز لوگویی آپلود نشده</p>
                </div>
              )}
            </div>

            {/* دکمه آپلود */}
            <div className="space-y-2">
              <Label htmlFor="logo-dark-upload">آپلود لوگو</Label>
              <div className="flex gap-2">
                <label
                  htmlFor="logo-dark-upload"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-primary/50 rounded-lg hover:bg-primary/5 cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span className="text-sm font-medium">انتخاب فایل</span>
                  <input
                    id="logo-dark-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleLogoUpload(e, 'dark')}
                  />
                </label>
                {logoDarkPreview && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveLogo('dark')}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                برای نمایش بهتر در حالت تاریک، از لوگوی روشن استفاده کنید
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* تنظیمات لوگو */}
      <Card>
        <CardHeader>
          <CardTitle>تنظیمات لوگو</CardTitle>
          <CardDescription>تنظیمات نمایش و اندازه لوگو</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* اندازه لوگو */}
          <div className="space-y-2">
            <Label>اندازه لوگو (پیکسل)</Label>
            <div className="flex items-center gap-4">
              <Input
                type="range"
                min="32"
                max="80"
                value={logoSize}
                onChange={(e) => setLogoSize(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm font-bold bg-primary/10 px-3 py-1 rounded-lg min-w-[60px] text-center">
                {toPersianDigits(logoSize.toString())} px
              </span>
            </div>
          </div>

          {/* نام سایت */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="site-name-fa">نام سایت (فارسی)</Label>
              <Input
                id="site-name-fa"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="بی لوک"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site-name-en">نام سایت (انگلیسی)</Label>
              <Input
                id="site-name-en"
                value={siteNameEn}
                onChange={(e) => setSiteNameEn(e.target.value)}
                placeholder="Belook"
              />
            </div>
          </div>

          {/* تگ‌لاین */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tagline-fa">شعار (فارسی)</Label>
              <Input
                id="tagline-fa"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="زیبایی اصیل"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tagline-en">شعار (انگلیسی)</Label>
              <Input
                id="tagline-en"
                value={taglineEn}
                onChange={(e) => setTaglineEn(e.target.value)}
                placeholder="PREMIUM BEAUTY"
              />
            </div>
          </div>

          {/* پیش‌نمایش نهایی */}
          <div className="space-y-2">
            <Label>پیش‌نمایش در هدر</Label>
            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-purple-500/5 border-2 border-dashed border-primary/20">
              <div className="flex items-center gap-3">
                {(logoPreview || logoDarkPreview) ? (
                  <img
                    src={logoPreview || logoDarkPreview || ''}
                    alt="Logo"
                    style={{ width: logoSize, height: logoSize }}
                    className="object-contain"
                  />
                ) : (
                  <div
                    style={{ width: logoSize, height: logoSize }}
                    className="bg-gradient-to-br from-primary via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl"
                  >
                    B
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-2xl font-black bg-gradient-to-r from-primary via-pink-500 to-purple-600 bg-clip-text text-transparent">
                    {siteName}
                  </span>
                  <span className="text-[10px] font-medium text-muted-foreground tracking-widest">
                    {tagline}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* مدیریت زبان‌های سایت */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-500" />
            زبان‌های سایت
          </CardTitle>
          <CardDescription>
            زبان‌هایی که در سایت فعال و قابل انتخاب هستند
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* فارسی */}
            <div className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-xl">
                  🇮🇷
                </div>
                <div>
                  <Label className="text-base font-semibold">فارسی</Label>
                  <p className="text-sm text-muted-foreground">زبان پیش‌فرض سایت</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  پیش‌فرض
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className="cursor-not-allowed"
                >
                  <Check className="w-4 h-4 me-2" />
                  فعال
                </Button>
              </div>
            </div>

            {/* انگلیسی */}
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xl">
                  🇬🇧
                </div>
                <div>
                  <Label className="text-base font-semibold">English</Label>
                  <p className="text-sm text-muted-foreground">انگلیسی</p>
                </div>
              </div>
              <Button
                variant={enabledLocales.en ? 'default' : 'outline'}
                size="sm"
                onClick={() => setEnabledLocales({ ...enabledLocales, en: !enabledLocales.en })}
                className="gap-2"
              >
                {enabledLocales.en ? (
                  <>
                    <Check className="w-4 h-4" />
                    فعال
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4" />
                    غیرفعال
                  </>
                )}
              </Button>
            </div>

            {/* عربی */}
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center text-xl">
                  🇸🇦
                </div>
                <div>
                  <Label className="text-base font-semibold">العربية</Label>
                  <p className="text-sm text-muted-foreground">عربی</p>
                </div>
              </div>
              <Button
                variant={enabledLocales.ar ? 'default' : 'outline'}
                size="sm"
                onClick={() => setEnabledLocales({ ...enabledLocales, ar: !enabledLocales.ar })}
                className="gap-2"
              >
                {enabledLocales.ar ? (
                  <>
                    <Check className="w-4 h-4" />
                    فعال
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4" />
                    غیرفعال
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              💡 <strong>نکته:</strong> زبان فارسی به عنوان زبان پیش‌فرض همیشه فعال است. کاربران می‌توانند از بین زبان‌های فعال انتخاب کنند.
            </p>
          </div>
        </CardContent>
      </Card>
            </div>
          )}

          {/* تب SEO */}
          {currentTab === 'seo' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SearchIcon className="w-5 h-5 text-green-500" />
                  تنظیمات SEO و تحلیل
                </CardTitle>
                <CardDescription>بهینه‌سازی موتورهای جستجو</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>عنوان متا (Meta Title)</Label>
                  <Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>توضیحات متا (Meta Description)</Label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label>کلمات کلیدی (Keywords)</Label>
                  <Input value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} placeholder="با ویرگول جدا کنید" />
                </div>
                <div className="space-y-2">
                  <Label>Google Analytics ID</Label>
                  <Input value={googleAnalytics} onChange={(e) => setGoogleAnalytics(e.target.value)} placeholder="UA-XXXXXXXXX-X" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* تب ظاهر */}
          {currentTab === 'appearance' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-purple-500" />
                  تنظیمات ظاهری
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>رنگ اصلی</Label>
                    <div className="flex gap-2">
                      <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-12 h-12 rounded" />
                      <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>رنگ ثانویه</Label>
                    <div className="flex gap-2">
                      <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="w-12 h-12 rounded" />
                      <Input value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label>حالت تاریک</Label>
                    <p className="text-sm text-muted-foreground">فعال‌سازی Dark Mode</p>
                  </div>
                  <Button variant={darkModeEnabled ? 'default' : 'outline'} onClick={() => setDarkModeEnabled(!darkModeEnabled)}>
                    {darkModeEnabled ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* تب شبکه‌های اجتماعی */}
          {currentTab === 'social' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-pink-500" />
                  شبکه‌های اجتماعی
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* اینستاگرام */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <InstagramIcon className="w-4 h-4 text-pink-600" /> اینستاگرام
                    </Label>
                    <Input value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="username" />
                  </div>

                  {/* تلگرام */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Send className="w-4 h-4 text-blue-500" /> تلگرام
                    </Label>
                    <Input value={telegram} onChange={(e) => setTelegram(e.target.value)} placeholder="@username" />
                  </div>

                  {/* واتساپ */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-green-600" /> واتساپ
                    </Label>
                    <Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="09123456789" />
                  </div>

                  {/* فیسبوک */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Facebook className="w-4 h-4 text-blue-600" /> فیسبوک
                    </Label>
                    <Input value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="username" />
                  </div>

                  {/* یوتیوب */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Youtube className="w-4 h-4 text-red-600" /> یوتیوب
                    </Label>
                    <Input value={youtube} onChange={(e) => setYoutube(e.target.value)} placeholder="channel-name" />
                  </div>

                  {/* لینکدین */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-blue-700" /> لینکدین
                    </Label>
                    <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="company/username" />
                  </div>

                  {/* توییتر/ایکس */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Twitter className="w-4 h-4 text-sky-500" /> توییتر (ایکس)
                    </Label>
                    <Input value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="@username" />
                  </div>

                  {/* روبیکا */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-purple-600" /> روبیکا
                    </Label>
                    <Input value={rubika} onChange={(e) => setRubika(e.target.value)} placeholder="username" />
                  </div>

                  {/* ایتا */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-orange-600" /> ایتا
                    </Label>
                    <Input value={eitaa} onChange={(e) => setEitaa(e.target.value)} placeholder="@username" />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    💡 <strong>نکته:</strong> لینک‌های شبکه‌های اجتماعی در فوتر سایت نمایش داده می‌شوند.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* تب مدیریت منو */}
          {currentTab === 'menu' && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Menu className="w-5 h-5 text-teal-500" />
                      مدیریت منوی هدر
                    </CardTitle>
                    <CardDescription>
                      ترتیب و نمایش آیتم‌های منوی اصلی سایت را مدیریت کنید
                    </CardDescription>
                  </div>
                  <Dialog open={isAddMenuOpen} onOpenChange={setIsAddMenuOpen}>
                    <DialogTrigger asChild>
                      <Button variant="default" className="gap-2">
                        <Plus className="w-4 h-4" />
                        اضافه کردن منو
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* آمار منوها */}
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-950 dark:to-blue-950 rounded-lg border border-teal-200 dark:border-teal-800">
                  <div className="flex-1 text-center">
                    <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                      {toPersianDigits(menuItems.length.toString())}
                    </div>
                    <div className="text-xs text-muted-foreground">کل منوها</div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {toPersianDigits(menuItems.filter(m => m.isVisible).length.toString())}
                    </div>
                    <div className="text-xs text-muted-foreground">فعال</div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                      {toPersianDigits(menuItems.filter(m => !m.isVisible).length.toString())}
                    </div>
                    <div className="text-xs text-muted-foreground">مخفی</div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {toPersianDigits(menuItems.filter(m => m.id.startsWith('menu-')).length.toString())}
                    </div>
                    <div className="text-xs text-muted-foreground">سفارشی</div>
                  </div>
                </div>

                {menuItems
                  .sort((a, b) => a.order - b.order)
                  .map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 border rounded-lg ${
                        item.isVisible ? 'bg-background' : 'bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* آیکون Drag (نمایشی) */}
                        <GripVertical className="w-5 h-5 text-muted-foreground cursor-move" />

                        {/* ترتیب */}
                        <div className="flex flex-col gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            disabled={index === 0}
                            onClick={() => {
                              const newMenuItems = [...menuItems];
                              const currentIndex = newMenuItems.findIndex(m => m.id === item.id);
                              if (currentIndex > 0) {
                                // Swap با آیتم قبلی
                                const prevItem = newMenuItems[currentIndex - 1];
                                newMenuItems[currentIndex - 1] = { ...item, order: prevItem.order };
                                newMenuItems[currentIndex] = { ...prevItem, order: item.order };
                                setMenuItems(newMenuItems);
                              }
                            }}
                            className="h-6 w-6 p-0"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            disabled={index === menuItems.length - 1}
                            onClick={() => {
                              const newMenuItems = [...menuItems];
                              const currentIndex = newMenuItems.findIndex(m => m.id === item.id);
                              if (currentIndex < newMenuItems.length - 1) {
                                // Swap با آیتم بعدی
                                const nextItem = newMenuItems[currentIndex + 1];
                                newMenuItems[currentIndex + 1] = { ...item, order: nextItem.order };
                                newMenuItems[currentIndex] = { ...nextItem, order: item.order };
                                setMenuItems(newMenuItems);
                              }
                            }}
                            className="h-6 w-6 p-0"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* اطلاعات منو */}
                        <div className="flex-1">
                          <div className="font-medium flex items-center gap-2">
                            {item.labelFa}
                            <Badge variant="outline" className="text-xs">
                              {item.labelEn}
                            </Badge>
                            {item.id.startsWith('menu-') && (
                              <Badge variant="secondary" className="text-xs">
                                سفارشی
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            مسیر: <code className="text-xs bg-muted px-1 py-0.5 rounded">{item.path}</code>
                          </div>
                        </div>

                        {/* شماره ترتیب */}
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">ترتیب</div>
                          <div className="text-lg font-bold text-primary">
                            {toPersianDigits((index + 1).toString())}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          {/* Toggle Visibility */}
                          <Button
                            variant={item.isVisible ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => {
                              const newMenuItems = menuItems.map(m =>
                                m.id === item.id ? { ...m, isVisible: !m.isVisible } : m
                              );
                              setMenuItems(newMenuItems);
                            }}
                            className="gap-2"
                          >
                            {item.isVisible ? (
                              <>
                                <Eye className="w-4 h-4" />
                                نمایش
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-4 h-4" />
                                مخفی
                              </>
                            )}
                          </Button>

                          {/* Edit */}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(item)}
                            className="gap-2"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>

                          {/* Delete - فقط برای منوهای سفارشی */}
                          {item.id.startsWith('menu-') && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteMenu(item.id)}
                              className="gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                <div className="mt-6 p-4 bg-teal-50 dark:bg-teal-950 rounded-lg">
                  <p className="text-sm text-teal-800 dark:text-teal-200">
                    💡 <strong>راهنما:</strong>
                  </p>
                  <ul className="text-sm text-teal-700 dark:text-teal-300 mt-2 space-y-1 list-disc list-inside">
                    <li><strong>تغییر ترتیب:</strong> از دکمه‌های ↑↓ استفاده کنید</li>
                    <li><strong>نمایش/مخفی:</strong> برای فعال یا غیرفعال کردن منو در هدر</li>
                    <li><strong>ویرایش:</strong> تغییر نام و مسیر منو</li>
                    <li><strong>حذف:</strong> فقط منوهای سفارشی قابل حذف هستند (با برچسب "سفارشی")</li>
                    <li><strong>افزودن:</strong> از دکمه "اضافه کردن منو" در بالا استفاده کنید</li>
                    <li>آیتم‌های مخفی در هدر نمایش داده نمی‌شوند</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* تب ایمیل */}
          {currentTab === 'email' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-orange-500" />
                  تنظیمات ایمیل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>سرور SMTP</Label>
                  <Input value={smtpHost} onChange={(e) => setSmtpHost(e.target.value)} placeholder="smtp.gmail.com" />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label>اعلان‌های ایمیلی</Label>
                    <p className="text-sm text-muted-foreground">ارسال ایمیل برای سفارشات جدید</p>
                  </div>
                  <Button variant={emailNotifications ? 'default' : 'outline'} onClick={() => setEmailNotifications(!emailNotifications)}>
                    {emailNotifications ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* تب پرداخت */}
          {currentTab === 'payment' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-indigo-500" />
                  تنظیمات پرداخت
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>نرخ مالیات (%)</Label>
                  <Input type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} />
                </div>
                <p className="text-sm text-muted-foreground">درگاه‌های پرداخت به زودی...</p>
              </CardContent>
            </Card>
          )}

          {/* تب ارسال */}
          {currentTab === 'shipping' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-cyan-500" />
                  تنظیمات ارسال
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>هزینه ارسال (تومان)</Label>
                  <Input type="number" value={shippingCost} onChange={(e) => setShippingCost(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>حد آستانه ارسال رایگان (تومان)</Label>
                  <Input type="number" value={freeShippingThreshold} onChange={(e) => setFreeShippingThreshold(Number(e.target.value))} />
                  <p className="text-xs text-muted-foreground">برای خریدهای بالای این مبلغ، ارسال رایگان است</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* تب امنیت */}
          {currentTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-500" />
                  تنظیمات امنیتی
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label>حالت تعمیرات</Label>
                    <p className="text-sm text-muted-foreground">غیرفعال کردن موقت سایت</p>
                  </div>
                  <Button variant={maintenanceMode ? 'destructive' : 'outline'} onClick={() => setMaintenanceMode(!maintenanceMode)}>
                    {maintenanceMode ? 'فعال' : 'غیرفعال'}
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label>ثبت‌نام کاربران</Label>
                    <p className="text-sm text-muted-foreground">اجازه ثبت‌نام کاربران جدید</p>
                  </div>
                  <Button variant={allowRegistration ? 'default' : 'outline'} onClick={() => setAllowRegistration(!allowRegistration)}>
                    {allowRegistration ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* تب پیشرفته */}
          {currentTab === 'advanced' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-gray-500" />
                  تنظیمات پیشرفته
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">تنظیمات پیشرفته به زودی...</p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dialog برای اضافه کردن منو */}
      <Dialog open={isAddMenuOpen} onOpenChange={setIsAddMenuOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-teal-500" />
              اضافه کردن منوی جدید
            </DialogTitle>
            <DialogDescription>
              منوی جدید به هدر سایت اضافه خواهد شد
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="label-fa">عنوان فارسی *</Label>
              <Input
                id="label-fa"
                value={newMenuLabelFa}
                onChange={(e) => setNewMenuLabelFa(e.target.value)}
                placeholder="مثال: محصولات ویژه"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="label-en">عنوان انگلیسی *</Label>
              <Input
                id="label-en"
                value={newMenuLabelEn}
                onChange={(e) => setNewMenuLabelEn(e.target.value)}
                placeholder="Example: Special Products"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="label-ar">عنوان عربی</Label>
              <Input
                id="label-ar"
                value={newMenuLabelAr}
                onChange={(e) => setNewMenuLabelAr(e.target.value)}
                placeholder="مثال: منتجات خاصة"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="path">مسیر (Path) *</Label>
              <Input
                id="path"
                value={newMenuPath}
                onChange={(e) => setNewMenuPath(e.target.value)}
                placeholder="/special-products"
              />
              <p className="text-xs text-muted-foreground">
                مسیر باید با / شروع شود
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddMenuOpen(false)}>
              انصراف
            </Button>
            <Button onClick={handleAddMenu} className="gap-2">
              <Plus className="w-4 h-4" />
              افزودن منو
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog برای ویرایش منو */}
      <Dialog open={isEditMenuOpen} onOpenChange={setIsEditMenuOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5 text-blue-500" />
              ویرایش منو
            </DialogTitle>
            <DialogDescription>
              تغییرات در منوی انتخاب شده اعمال می‌شود
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-label-fa">عنوان فارسی *</Label>
              <Input
                id="edit-label-fa"
                value={newMenuLabelFa}
                onChange={(e) => setNewMenuLabelFa(e.target.value)}
                placeholder="مثال: محصولات ویژه"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-label-en">عنوان انگلیسی *</Label>
              <Input
                id="edit-label-en"
                value={newMenuLabelEn}
                onChange={(e) => setNewMenuLabelEn(e.target.value)}
                placeholder="Example: Special Products"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-label-ar">عنوان عربی</Label>
              <Input
                id="edit-label-ar"
                value={newMenuLabelAr}
                onChange={(e) => setNewMenuLabelAr(e.target.value)}
                placeholder="مثال: منتجات خاصة"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-path">مسیر (Path) *</Label>
              <Input
                id="edit-path"
                value={newMenuPath}
                onChange={(e) => setNewMenuPath(e.target.value)}
                placeholder="/special-products"
              />
              <p className="text-xs text-muted-foreground">
                مسیر باید با / شروع شود
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditMenuOpen(false)}>
              انصراف
            </Button>
            <Button onClick={handleEditMenu} className="gap-2">
              <Save className="w-4 h-4" />
              ذخیره تغییرات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
