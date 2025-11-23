'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  X,
  Package,
  ShoppingCart,
  Users,
  Ticket,
  Mail,
  MessageSquare,
  FileText,
  Tag,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface QuickActionsProps {
  locale: string;
}

export default function QuickActions({ locale }: QuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: Package,
      label: 'محصول جدید',
      href: `/${locale}/admin/products/new`,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: ShoppingCart,
      label: 'سفارش جدید',
      href: `/${locale}/admin/orders/new`,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Users,
      label: 'کاربر جدید',
      href: `/${locale}/admin/users/new`,
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Ticket,
      label: 'کد تخفیف',
      href: `/${locale}/admin/coupons/new`,
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Mail,
      label: 'کمپین خبرنامه',
      href: `/${locale}/admin/newsletter/new`,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Tag,
      label: 'برند جدید',
      href: `/${locale}/admin/brands/new`,
      color: 'from-pink-500 to-rose-500'
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="fixed bottom-6 left-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div className="mb-4 space-y-3">
              {actions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: { delay: index * 0.05 }
                    }}
                    exit={{ 
                      opacity: 0, 
                      y: 20, 
                      scale: 0.8,
                      transition: { delay: (actions.length - index) * 0.03 }
                    }}
                  >
                    <Link
                      href={action.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center gap-3 bg-background border shadow-lg rounded-2xl px-4 py-3 hover:shadow-xl transition-all"
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform",
                        action.color
                      )}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-sm whitespace-nowrap">
                        {action.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center text-white transition-all duration-300",
            isOpen 
              ? "bg-gradient-to-br from-red-500 to-pink-500 rotate-45" 
              : "bg-gradient-to-br from-primary to-purple-500"
          )}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </motion.div>
        </motion.button>

        {/* Sparkles Effect */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </motion.div>
        )}
      </div>
    </>
  );
}
