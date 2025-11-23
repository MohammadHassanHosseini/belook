'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import CommandPalette from '@/components/admin/CommandPalette';
import QuickActions from '@/components/admin/QuickActions';
import Breadcrumbs from '@/components/admin/Breadcrumbs';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { DashboardProvider } from '@/contexts/DashboardContext';
import { NotificationsProvider } from '@/contexts/NotificationsContext';

interface AdminLayoutClientProps {
  children: React.ReactNode;
  locale: string;
}

export default function AdminLayoutClient({ children, locale }: AdminLayoutClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global keyboard shortcut for Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <DashboardProvider>
      <NotificationsProvider>
        <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
          <AdminHeader 
            onMenuClick={() => setIsMobileMenuOpen(true)} 
            onCommandPaletteOpen={() => setIsCommandPaletteOpen(true)}
            locale={locale}
          />
          
          <div className="flex">
            {/* Desktop Sidebar */}
            <AdminSidebar locale={locale} />
            
            {/* Mobile Sheet */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetContent side="right" className="p-0 w-72">
                <AdminSidebar 
                  locale={locale} 
                  isMobile 
                  onClose={() => setIsMobileMenuOpen(false)} 
                />
              </SheetContent>
            </Sheet>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-6 lg:p-8 w-full overflow-x-hidden">
              <Breadcrumbs locale={locale} />
              {children}
            </main>
          </div>

          {/* Global Components */}
          {isCommandPaletteOpen && (
            <CommandPalette 
              locale={locale} 
              onClose={() => setIsCommandPaletteOpen(false)}
            />
          )}
          <QuickActions locale={locale} />
        </div>
      </NotificationsProvider>
    </DashboardProvider>
  );
}
