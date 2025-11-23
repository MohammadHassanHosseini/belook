import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { redirect } from 'next/navigation';

/**
 * Get the redirect path based on user role
 */
export function getRedirectPath(role: string, locale: string = 'fa'): string {
  switch (role) {
    case 'SUPER_ADMIN':
    case 'ADMIN':
      return `/${locale}/admin`;
    case 'CUSTOMER':
    default:
      return `/${locale}`;
  }
}

/**
 * Check if user has required role
 */
export function hasRole(userRole: string, requiredRoles: string[]): boolean {
  return requiredRoles.includes(userRole);
}

/**
 * Check if user is admin or super admin
 */
export function isAdmin(userRole: string): boolean {
  return userRole === 'ADMIN' || userRole === 'SUPER_ADMIN';
}

/**
 * Check if user is super admin
 */
export function isSuperAdmin(userRole: string): boolean {
  return userRole === 'SUPER_ADMIN';
}

/**
 * Get user role from session
 */
export async function getUserRole(): Promise<string | null> {
  const session = await getServerSession(authOptions);
  return (session?.user as any)?.role || null;
}

/**
 * Require authentication - redirect to login if not authenticated
 */
export async function requireAuth(locale: string = 'fa') {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect(`/${locale}/auth/login`);
  }
  
  return session;
}

/**
 * Require admin role - redirect if not admin
 */
export async function requireAdmin(locale: string = 'fa') {
  const session = await requireAuth(locale);
  const userRole = (session.user as any)?.role;
  
  if (!isAdmin(userRole)) {
    redirect(`/${locale}`);
  }
  
  return session;
}

/**
 * Require super admin role - redirect if not super admin
 */
export async function requireSuperAdmin(locale: string = 'fa') {
  const session = await requireAuth(locale);
  const userRole = (session.user as any)?.role;
  
  if (!isSuperAdmin(userRole)) {
    redirect(`/${locale}/admin`);
  }
  
  return session;
}

/**
 * Get user permissions based on role
 */
export function getPermissions(role: string) {
  const permissions = {
    // Product permissions
    canViewProducts: true,
    canCreateProducts: isSuperAdmin(role),
    canEditProducts: isAdmin(role),
    canDeleteProducts: isSuperAdmin(role),
    
    // Order permissions
    canViewOrders: isAdmin(role),
    canEditOrders: isAdmin(role),
    canCancelOrders: isAdmin(role),
    canRefundOrders: isSuperAdmin(role),
    
    // User permissions
    canViewUsers: isAdmin(role),
    canEditUsers: isSuperAdmin(role),
    canDeleteUsers: isSuperAdmin(role),
    canChangeUserRoles: isSuperAdmin(role),
    
    // Category & Brand permissions
    canManageCategories: isSuperAdmin(role),
    canManageBrands: isSuperAdmin(role),
    
    // Review permissions
    canViewReviews: isAdmin(role),
    canApproveReviews: isAdmin(role),
    canDeleteReviews: isAdmin(role),
    
    // Coupon permissions
    canViewCoupons: isAdmin(role),
    canManageCoupons: isSuperAdmin(role),
    
    // Report permissions
    canViewReports: isAdmin(role),
    canExportReports: isAdmin(role),
    canViewAdvancedReports: isSuperAdmin(role),
    
    // Settings permissions
    canViewSettings: isAdmin(role),
    canEditSettings: isSuperAdmin(role),
    
    // Support permissions
    canViewTickets: isAdmin(role),
    canReplyToTickets: isAdmin(role),
    
    // Newsletter permissions
    canViewNewsletter: isAdmin(role),
    canSendNewsletter: isSuperAdmin(role),
  };
  
  return permissions;
}

/**
 * Role display names in Persian
 */
export const ROLE_LABELS: Record<string, string> = {
  CUSTOMER: 'مشتری',
  ADMIN: 'ادمین',
  SUPER_ADMIN: 'مدیر کل',
};

/**
 * Role descriptions in Persian
 */
export const ROLE_DESCRIPTIONS: Record<string, string> = {
  CUSTOMER: 'کاربر عادی با امکان خرید و ثبت نظر',
  ADMIN: 'پشتیبان با دسترسی به مدیریت سفارشات و محتوا',
  SUPER_ADMIN: 'مدیر کل با دسترسی کامل به تمام بخش‌ها',
};
