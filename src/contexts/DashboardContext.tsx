'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DashboardStats {
  todaySales: number;
  todayOrders: number;
  newUsers: number;
  totalProducts: number;
  salesChange: number;
  ordersChange: number;
  usersChange: number;
  productsChange: number;
}

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: string;
  date: string;
}

interface Product {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  stock: number;
  trend: 'up' | 'down';
}

interface Customer {
  id: string;
  name: string;
  orders: number;
  total: number;
  badge: string;
}

interface DashboardContextType {
  stats: DashboardStats;
  recentOrders: Order[];
  topProducts: Product[];
  topCustomers: Customer[];
  lowStockProducts: Product[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
  exportReport: (type: 'pdf' | 'excel') => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<DashboardStats>({
    todaySales: 0,
    todayOrders: 0,
    newUsers: 0,
    totalProducts: 0,
    salesChange: 0,
    ordersChange: 0,
    usersChange: 0,
    productsChange: 0,
  });

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [topCustomers, setTopCustomers] = useState<Customer[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    
    try {
      // در production اینجا API call می‌زنیم
      // const response = await fetch('/api/admin/dashboard');
      // const data = await response.json();
      
      // شبیه‌سازی API call با داده‌های واقعی
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // آمار واقعی از localStorage یا API
      const mockStats: DashboardStats = {
        todaySales: 12345000,
        todayOrders: 45,
        newUsers: 23,
        totalProducts: 234,
        salesChange: 12.5,
        ordersChange: 8.2,
        usersChange: 15.3,
        productsChange: -2.1,
      };

      const mockOrders: Order[] = [
        { id: '#12345', customer: 'علی احمدی', amount: 1230000, status: 'در حال پردازش', date: '۱۴۰۳/۰۸/۱۰' },
        { id: '#12344', customer: 'مریم محمدی', amount: 850000, status: 'تکمیل شده', date: '۱۴۰۳/۰۸/۱۰' },
        { id: '#12343', customer: 'حسین رضایی', amount: 2150000, status: 'ارسال شده', date: '۱۴۰۳/۰۸/۰۹' },
        { id: '#12342', customer: 'زهرا کریمی', amount: 980000, status: 'تکمیل شده', date: '۱۴۰۳/۰۸/۰۹' },
        { id: '#12341', customer: 'محمد رضایی', amount: 1450000, status: 'در حال پردازش', date: '۱۴۰۳/۰۸/۰۸' },
      ];

      const mockTopProducts: Product[] = [
        { id: '1', name: 'سرم ویتامین C', sales: 156, revenue: 70200000, stock: 45, trend: 'up' },
        { id: '2', name: 'کرم مرطوب کننده', sales: 134, revenue: 50920000, stock: 23, trend: 'up' },
        { id: '3', name: 'ماسک صورت', sales: 98, revenue: 28420000, stock: 8, trend: 'down' },
        { id: '4', name: 'تونر صورت', sales: 87, revenue: 22360000, stock: 5, trend: 'up' },
        { id: '5', name: 'کرم ضد آفتاب', sales: 76, revenue: 19840000, stock: 32, trend: 'up' },
      ];

      const mockTopCustomers: Customer[] = [
        { id: '1', name: 'علی احمدی', orders: 45, total: 12500000, badge: 'VIP' },
        { id: '2', name: 'سارا محمدی', orders: 38, total: 9800000, badge: 'Premium' },
        { id: '3', name: 'رضا کریمی', orders: 32, total: 8200000, badge: 'Premium' },
        { id: '4', name: 'فاطمه رضایی', orders: 28, total: 7100000, badge: 'Gold' },
        { id: '5', name: 'حسین محمدی', orders: 25, total: 6500000, badge: 'Gold' },
      ];

      const mockLowStock: Product[] = [
        { id: '4', name: 'تونر صورت', sales: 87, revenue: 0, stock: 5, trend: 'down' },
        { id: '3', name: 'ماسک صورت', sales: 98, revenue: 0, stock: 8, trend: 'down' },
        { id: '6', name: 'کرم دور چشم', sales: 65, revenue: 0, stock: 12, trend: 'down' },
      ];

      setStats(mockStats);
      setRecentOrders(mockOrders);
      setTopProducts(mockTopProducts);
      setTopCustomers(mockTopCustomers);
      setLowStockProducts(mockLowStock);
      
    } catch (error) {
      console.error('خطا در دریافت داده‌های داشبورد:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = async () => {
    await fetchDashboardData();
  };

  const exportReport = async (type: 'pdf' | 'excel') => {
    try {
      // در production اینجا API call برای export می‌زنیم
      // const response = await fetch(`/api/admin/dashboard/export?type=${type}`);
      // const blob = await response.blob();
      // downloadFile(blob, `dashboard-report.${type}`);
      
      console.log(`Exporting report as ${type}...`);
      
      // شبیه‌سازی download
      const reportData = {
        stats,
        orders: recentOrders,
        products: topProducts,
        customers: topCustomers,
        generatedAt: new Date().toISOString()
      };
      
      const dataStr = JSON.stringify(reportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `dashboard-report-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      return Promise.resolve();
    } catch (error) {
      console.error('خطا در export گزارش:', error);
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        stats,
        recentOrders,
        topProducts,
        topCustomers,
        lowStockProducts,
        isLoading,
        refreshData,
        exportReport,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
