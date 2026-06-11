'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from './layout';

export default function AdminRoot() {
  const [authed, setAuthed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    } else {
      setAuthed(true);
    }
  }, [router]);

  if (!authed) return null;

  return (
    <AdminLayout>
      <DashboardContent />
    </AdminLayout>
  );
}

function DashboardContent() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then((r) => r.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#4A6741] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const stats = data?.stats || { totalRevenue: 0, totalOrders: 0, totalProducts: 0, pendingOrders: 0 };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, color: '#4A6741' },
          { label: 'Orders', value: stats.totalOrders, color: '#C5A55A' },
          { label: 'Products', value: stats.totalProducts, color: '#8FB573' },
          { label: 'Pending', value: stats.pendingOrders, color: '#2D4A2D' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5 border border-gray-100">
            <p className="text-[12px] text-[#6B6B6B] mb-1">{s.label}</p>
            <p className="text-[24px] font-bold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500">Welcome to the Green Elixir Admin Panel. Use the sidebar to navigate.</p>
    </div>
  );
}
