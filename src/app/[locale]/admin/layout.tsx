import AdminLayoutClient from '@/components/admin/AdminLayoutClient';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function AdminLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== 'SUPER_ADMIN') {
    redirect(`/${locale}/auth/login`);
  }

  return <AdminLayoutClient locale={locale}>{children}</AdminLayoutClient>;
}
