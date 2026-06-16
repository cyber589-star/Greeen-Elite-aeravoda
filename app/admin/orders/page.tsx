'use client';

import { useEffect, useState } from 'react';
import { Search, Eye, X } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';
const supabase = getSupabase();

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total: number;
  status: string;
  items: any;
  address: string;
  created_at: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  const load = async () => {
    setLoading(true);
    let query = supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (filter !== 'all') query = query.eq('status', filter);
    const { data } = await query;
    setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [filter]);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('orders').update({ status }).eq('id', id);
    load();
    if (viewOrder?.id === id) setViewOrder({ ...viewOrder!, status });
  };

  const filtered = orders.filter((o) =>
    o.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
    o.id?.toLowerCase().includes(search.toLowerCase())
  );

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-50 text-yellow-700',
    processing: 'bg-blue-50 text-blue-700',
    shipped: 'bg-purple-50 text-purple-700',
    delivered: 'bg-green-50 text-green-700',
    cancelled: 'bg-red-50 text-red-700',
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search orders..." className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#4A6741] focus:outline-none" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${filter === s ? 'bg-[#4A6741] text-white' : 'bg-gray-100 text-[#6B6B6B] hover:bg-gray-200'}`}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-5 py-3 text-[12px] font-medium text-[#6B6B6B] uppercase">Order</th>
                <th className="text-left px-5 py-3 text-[12px] font-medium text-[#6B6B6B] uppercase">Customer</th>
                <th className="text-left px-5 py-3 text-[12px] font-medium text-[#6B6B6B] uppercase">Date</th>
                <th className="text-left px-5 py-3 text-[12px] font-medium text-[#6B6B6B] uppercase">Total</th>
                <th className="text-left px-5 py-3 text-[12px] font-medium text-[#6B6B6B] uppercase">Status</th>
                <th className="text-right px-5 py-3 text-[12px] font-medium text-[#6B6B6B] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-gray-400">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-gray-400">No orders found</td></tr>
              ) : (
                filtered.map((o) => (
                  <tr key={o.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                    <td className="px-5 py-3 font-medium text-[#1E1E1E]">#{o.id?.slice(0, 8)}</td>
                    <td className="px-5 py-3 text-[#6B6B6B]">{o.customer_name || 'N/A'}</td>
                    <td className="px-5 py-3 text-[#6B6B6B]">{o.created_at ? new Date(o.created_at).toLocaleDateString() : 'N/A'}</td>
                    <td className="px-5 py-3 font-medium text-[#4A6741]">₹{o.total || 0}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ${statusColors[o.status] || 'bg-gray-100 text-gray-600'}`}>
                        {o.status || 'pending'}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button onClick={() => setViewOrder(o)} className="p-1.5 hover:bg-gray-100 rounded-md">
                        <Eye className="w-4 h-4 text-[#6B6B6B]" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {viewOrder && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setViewOrder(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold">Order #{viewOrder.id?.slice(0, 8)}</h3>
              <button onClick={() => setViewOrder(null)} className="p-1 hover:bg-gray-100 rounded-md"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><span className="text-[#6B6B6B]">Customer:</span><p className="font-medium">{viewOrder.customer_name}</p></div>
                <div><span className="text-[#6B6B6B]">Email:</span><p className="font-medium">{viewOrder.customer_email}</p></div>
                <div><span className="text-[#6B6B6B]">Phone:</span><p className="font-medium">{viewOrder.customer_phone}</p></div>
                <div><span className="text-[#6B6B6B]">Total:</span><p className="font-bold text-[#4A6741]">₹{viewOrder.total}</p></div>
              </div>
              {viewOrder.address && <div><span className="text-[#6B6B6B]">Address:</span><p className="font-medium">{viewOrder.address}</p></div>}
              <div>
                <span className="text-[#6B6B6B]">Update Status:</span>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => (
                    <button key={s} onClick={() => updateStatus(viewOrder.id, s)} className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${viewOrder.status === s ? 'bg-[#4A6741] text-white' : 'bg-gray-100 text-[#6B6B6B] hover:bg-gray-200'}`}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
