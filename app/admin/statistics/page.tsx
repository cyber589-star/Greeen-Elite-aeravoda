'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
const supabase = getSupabase();
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#4A6741', '#C5A55A', '#8FB573', '#2D4A2D', '#D4B76A', '#3d5635'];

export default function StatisticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [products, orders, payments] = await Promise.all([
        supabase.from('products').select('*'),
        supabase.from('orders').select('*'),
        supabase.from('payments').select('*'),
      ]);

      const allProducts = products.data || [];
      const allOrders = orders.data || [];
      const allPayments = payments.data || [];

      const monthlyRevenue = Array.from({ length: 12 }, (_, i) => {
        const d = new Date();
        d.setMonth(d.getMonth() - (11 - i));
        const month = d.toLocaleString('default', { month: 'short' });
        const monthPayments = allPayments.filter((p: any) => {
          const pd = new Date(p.created_at);
          return pd.getMonth() === d.getMonth() && pd.getFullYear() === d.getFullYear();
        });
        return { month, revenue: monthPayments.reduce((s: number, p: any) => s + (p.amount || 0), 0) };
      });

      const ordersByStatus = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => ({
        name: status.charAt(0).toUpperCase() + status.slice(1),
        value: allOrders.filter((o: any) => o.status === status).length,
      }));

      const paymentsByMethod = ['upi', 'card', 'cod', 'netbanking'].map((method) => ({
        name: method.toUpperCase(),
        value: allPayments.filter((p: any) => p.method === method).length,
      }));

      const topProducts = allProducts
        .sort((a: any, b: any) => (b.stock || 0) - (a.stock || 0))
        .slice(0, 5)
        .map((p: any) => ({ name: p.name?.slice(0, 15), stock: p.stock || 0, price: p.price || 0 }));

      setStats({ monthlyRevenue, ordersByStatus, paymentsByMethod, topProducts });
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#4A6741] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <h3 className="text-[15px] font-semibold text-[#1E1E1E] mb-4">Revenue Trend (12 Months)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats?.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#4A6741" strokeWidth={2} dot={{ fill: '#4A6741' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <h3 className="text-[15px] font-semibold text-[#1E1E1E] mb-4">Orders by Status</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.ordersByStatus}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {stats?.ordersByStatus?.map((_: any, i: number) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <h3 className="text-[15px] font-semibold text-[#1E1E1E] mb-4">Payment Methods</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stats?.paymentsByMethod} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {stats?.paymentsByMethod?.map((_: any, i: number) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <h3 className="text-[15px] font-semibold text-[#1E1E1E] mb-4">Top Products by Stock</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={100} />
                <Tooltip />
                <Bar dataKey="stock" fill="#C5A55A" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
