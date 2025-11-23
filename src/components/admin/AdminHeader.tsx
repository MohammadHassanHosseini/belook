'use client';

import React, { useState } from 'react';
import { Bell, User, Menu, Search, Palette, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import NotificationsCenter from './NotificationsCenter';
import ProfileDropdown from './ProfileDropdown';
import ThemeSwitcher from './ThemeSwitcher';
import { useNotifications } from '@/contexts/NotificationsContext';

interface AdminHeaderProps {
  onMenuClick?: () => void;
  onCommandPaletteOpen?: () => void;
  locale: string;
}

export default function AdminHeader({ onMenuClick, onCommandPaletteOpen, locale }: AdminHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showTheme, setShowTheme] = useState(false);
  
  const { unreadCount } = useNotifications();

  return (
    <>
      <header className="bg-card/95 backdrop-blur-md border-b px-4 md:px-8 py-4 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden hover:bg-primary/10"
              onClick={onMenuClick}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                فروشگاه بی لوک
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">پنل مدیریت</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Command Palette Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onCommandPaletteOpen}
              className="hidden md:flex items-center gap-2 px-3"
            >
              <Search className="w-4 h-4" />
              <span className="text-muted-foreground">جستجو...</span>
              <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-semibold text-muted-foreground bg-muted rounded border">
                <Command className="w-3 h-3" />K
              </kbd>
            </Button>

            {/* Mobile Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onCommandPaletteOpen}
              className="md:hidden hover:bg-primary/10"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Theme Switcher */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowTheme(!showTheme)}
              className="hover:bg-primary/10 hidden sm:flex"
            >
              <Palette className="w-5 h-5" />
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative hover:bg-primary/10"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1"
                >
                  <Badge className="h-5 min-w-[20px] px-1 flex items-center justify-center bg-red-500 text-white text-xs border-2 border-background">
                    {unreadCount}
                  </Badge>
                </motion.div>
              )}
            </Button>

            {/* Profile */}
            <Button
              variant="ghost"
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 px-2 md:px-3 hover:bg-primary/10"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                م
              </div>
              <span className="text-sm font-medium hidden md:inline">مدیر سیستم</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Dropdowns */}
      <NotificationsCenter 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
      <ProfileDropdown 
        isOpen={showProfile} 
        onClose={() => setShowProfile(false)}
        locale={locale}
      />
      <ThemeSwitcher
        isOpen={showTheme}
        onClose={() => setShowTheme(false)}
      />
    </>
  );
}
