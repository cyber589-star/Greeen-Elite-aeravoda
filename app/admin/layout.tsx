'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, CreditCard, BarChart3, LogOut, Menu, X, Leaf } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Payments', href: '/admin/payments', icon: CreditCard },
  { label: 'Statistics', href: '/admin/statistics', icon: BarChart3 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authed, setAuthed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else if (token) {
      setAuthed(true);
    }
  }, [pathname, router]);

  if (pathname === '/admin/login') return <>{children}</>;
  if (!authed) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-[260px] bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-[#4A6741]" />
            <span className="font-logo text-[17px] font-semibold text-[#4A6741]">Admin Panel</span>
          </Link>
          <button className="lg:hidden p-1" onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></button>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${active ? 'bg-[#4A6741] text-white shadow-md' : 'text-[#6B6B6B] hover:bg-gray-100 hover:text-[#1E1E1E]'}`}>
                <item.icon className="w-[18px] h-[18px]" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-gray-100">
          <button onClick={() => { localStorage.removeItem('admin_token'); router.push('/admin/login'); }} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-red-500 hover:bg-red-50 transition-all w-full">
            <LogOut className="w-[18px] h-[18px]" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 h-14 flex items-center px-4 sm:px-6 gap-4">
          <button className="lg:hidden p-1" onClick={() => setSidebarOpen(true)}><Menu className="w-5 h-5" /></button>
          <h1 className="text-[15px] font-semibold text-[#1E1E1E]">{navItems.find((n) => n.href === pathname)?.label || 'Admin'}</h1>
        </header>
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
