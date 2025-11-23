'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Palette, Sun, Moon, Monitor, Check, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function AppearancePage() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' || 'system';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (selectedTheme: 'light' | 'dark' | 'system') => {
    const root = document.documentElement;
    
    if (selectedTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      root.classList.toggle('dark', selectedTheme === 'dark');
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
    toast.success(`تم ${newTheme === 'light' ? 'روشن' : newTheme === 'dark' ? 'تاریک' : 'سیستم'} فعال شد`);
  };

  const themes = [
    {
      id: 'light',
      name: 'روشن',
      icon: Sun,
      description: 'رنگ‌های روشن و نورانی',
      color: 'from-yellow-400 to-orange-400',
      preview: 'bg-white border border-gray-200'
    },
    {
      id: 'dark',
      name: 'تاریک',
      icon: Moon,
      description: 'رنگ‌های تیره و آرامش‌بخش',
      color: 'from-blue-600 to-purple-600',
      preview: 'bg-gray-900 border border-gray-700'
    },
    {
      id: 'system',
      name: 'سیستم',
      icon: Monitor,
      description: 'تنظیمات خودکار بر اساس سیستم',
      color: 'from-green-500 to-teal-500',
      preview: 'bg-gradient-to-r from-white to-gray-900'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-3">
              <Palette className="w-8 h-8" />
              <Badge className="bg-white/20 text-white border-0">
                سفارشی‌سازی
              </Badge>
            </div>
            <h1 className="text-3xl font-black mb-2">ظاهر و تم</h1>
            <p className="text-white/90">
              انتخاب تم مورد علاقه خود برای تجربه بهتر
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Theme Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {themes.map((themeOption, index) => {
          const Icon = themeOption.icon;
          const isActive = theme === themeOption.id;

          return (
            <motion.div
              key={themeOption.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer ${
                  isActive ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleThemeChange(themeOption.id as any)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${themeOption.color} flex items-center justify-center text-white shadow-lg`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-green-500 text-white rounded-full p-1"
                      >
                        <Check className="w-4 h-4" />
                      </motion.div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-2">{themeOption.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {themeOption.description}
                  </p>

                  {/* Preview */}
                  <div className={`h-24 rounded-xl ${themeOption.preview} p-4 flex items-center justify-center`}>
                    <div className="text-xs font-semibold opacity-50">پیش‌نمایش</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Additional Settings */}
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            تنظیمات بیشتر
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-secondary">
            <div>
              <div className="font-semibold">اعمال خودکار تم</div>
              <div className="text-sm text-muted-foreground">تم به صورت خودکار اعمال می‌شود</div>
            </div>
            <Badge variant="outline" className="gap-1">
              <Check className="w-3 h-3" />
              فعال
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
