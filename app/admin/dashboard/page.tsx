'use client';

import { useEffect, useState } from 'react';
import { Package, ShoppingCart, DollarSign, Clock, TrendingUp, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#4A6741', '#C5A55A', '#8FB573', '#2D4A2D', '#D4B76A'];

export default function DashboardPage() {
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
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#4A6741] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = data?.stats || { totalRevenue: 0, totalOrders: 0, totalProducts: 0, pendingOrders: 0 };
  const monthlyData = data?.monthlyData || [];
  const categoryData = data?.categoryData || [];

  const statCards = [
    { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: '#4A6741', change: '+12%' },
    { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart, color: '#C5A55A', change: '+8%' },
    { label: 'Products', value: stats.totalProducts, icon: Package, color: '#8FB573', change: '+3%' },
    { label: 'Pending Orders', value: stats.pendingOrders, icon: Clock, color: '#2D4A2D', change: '0%' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${s.color}15` }}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <span className="flex items-center gap-0.5 text-[11px] font-medium text-green-600">
                <ArrowUpRight className="w-3 h-3" />
                {s.change}
              </span>
            </div>
            <p className="text-[22px] sm:text-[26px] font-bold text-[#1E1E1E]">{s.value}</p>
            <p className="text-[12px] text-[#6B6B6B] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-gray-100">
          <h3 className="text-[15px] font-semibold text-[#1E1E1E] mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#4A6741]" />
            Monthly Revenue
          </h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="revenue" fill="#4A6741" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <h3 className="text-[15px] font-semibold text-[#1E1E1E] mb-4">Categories</h3>
          {categoryData.length > 0 ? (
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                    {categoryData.map((_: any, i: number) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[280px] flex items-center justify-center text-sm text-gray-400">No data yet</div>
          )}
          <div className="flex flex-wrap gap-3 mt-2">
            {categoryData.map((c: any, i: number) => (
              <div key={c.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                <span className="text-[11px] text-[#6B6B6B]">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-[15px] font-semibold text-[#1E1E1E]">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-5 py-3 text-[12px] font-medium text-[#6B6B6B] uppercase tracking-wider">Order ID</th>
                <th className="text-left px-5 py-3 text-[12px] font-medium text-[#6B6B6B] uppercase tracking-wider">Customer</th>
                <th className="text-left px-5 py-3 text-[12px] font-medium text-[#6B6B6B] uppercase tracking-wider">Amount</th>
                <th className="text-left px-5 py-3 text-[12px] font-medium text-[#6B6B6B] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {(data?.recentOrders || []).length > 0 ? (
                data.recentOrders.map((order: any) => (
                  <tr key={order.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                    <td className="px-5 py-3 font-medium text-[#1E1E1E]">#{order.id?.slice(0, 8)}</td>
                    <td className="px-5 py-3 text-[#6B6B6B]">{order.customer_name || 'N/A'}</td>
                    <td className="px-5 py-3 font-medium text-[#4A6741]">₹{order.total || 0}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                        order.status === 'delivered' ? 'bg-green-50 text-green-700' :
                        order.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-blue-50 text-blue-700'
                      }`}>
                        {order.status || 'pending'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-gray-400 text-sm">No orders yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
