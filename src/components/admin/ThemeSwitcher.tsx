'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark' | 'system';

interface ThemeSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThemeSwitcher({ isOpen, onClose }: ThemeSwitcherProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>('system');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme || 'system';
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }
  };

  const changeTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
    applyTheme(theme);
    setTimeout(onClose, 300);
  };

  const themes = [
    {
      value: 'light' as Theme,
      label: 'روشن',
      icon: Sun,
      description: 'تم روشن برای روز'
    },
    {
      value: 'dark' as Theme,
      label: 'تاریک',
      icon: Moon,
      description: 'تم تاریک برای شب'
    },
    {
      value: 'system' as Theme,
      label: 'سیستم',
      icon: Monitor,
      description: 'تنظیمات سیستم'
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 lg:hidden"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        className="fixed top-16 md:top-[4.5rem] right-4 md:right-auto md:left-36 lg:left-44 w-[calc(100%-2rem)] md:w-72 z-50"
      >
        <div className="bg-background border shadow-2xl rounded-2xl overflow-hidden p-3">
          <div className="px-3 py-2 mb-2">
            <h3 className="font-bold text-sm">انتخاب تم</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              ظاهر پنل را تغییر دهید
            </p>
          </div>

          <div className="space-y-2">
            {themes.map((theme) => {
              const Icon = theme.icon;
              const isActive = currentTheme === theme.value;

              return (
                <motion.button
                  key={theme.value}
                  onClick={() => changeTheme(theme.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "hover:bg-secondary"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg",
                    isActive ? "bg-primary-foreground/20" : "bg-secondary"
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-right">
                    <div className="font-semibold text-sm">{theme.label}</div>
                    <div className={cn(
                      "text-xs",
                      isActive ? "opacity-90" : "text-muted-foreground"
                    )}>
                      {theme.description}
                    </div>
                  </div>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="shrink-0"
                    >
                      <Check className="w-5 h-5" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
}
