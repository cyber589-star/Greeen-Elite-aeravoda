'use client';

import { useEffect, useState } from 'react';
import { Search, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';
const supabase = getSupabase();

interface Payment {
  id: string;
  order_id: string;
  amount: number;
  method: string;
  status: string;
  created_at: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('payments').select('*').order('created_at', { ascending: false });
    setPayments(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = payments.filter((p) =>
    p.order_id?.toLowerCase().includes(search.toLowerCase()) ||
    p.method?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPaid = payments.filter((p) => p.status === 'completed').reduce((s, p) => s + (p.amount || 0), 0);
  const totalPending = payments.filter((p) => p.status === 'pending').reduce((s, p) => s + (p.amount || 0), 0);
  const totalFailed = payments.filter((p) => p.status === 'failed').reduce((s, p) => s + (p.amount || 0), 0);

  const methodColors: Record<string, string> = {
    upi: 'bg-purple-50 text-purple-700',
    card: 'bg-blue-50 text-blue-700',
    cod: 'bg-orange-50 text-orange-700',
    netbanking: 'bg-green-50 text-green-700',
  };

  const statusColors: Record<string, string> = {
    completed: 'bg-green-50 text-green-700',
    pending: 'bg-yellow-50 text-yellow-700',
    failed: 'bg-red-50 text-red-700',
    refunded: 'bg-gray-100 text-gray-600',
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <ArrowUpRight className="w-4 h-4 text-green-600" />
            <span className="text-[12px] text-[#6B6B6B]">Total Received</span>
          </div>
          <p className="text-[24px] font-bold text-green-600">₹{totalPaid.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-yellow-600" />
            <span className="text-[12px] text-[#6B6B6B]">Pending</span>
          </div>
          <p className="text-[24px] font-bold text-yellow-600">₹{totalPending.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <ArrowDownRight className="w-4 h-4 text-red-600" />
            <span className="text-[12px] text-[#6B6B6B]">Failed</span>
          </div>
          <p className="text-[24px] font-bold text-red-600">₹{totalFailed.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search payments..." className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#4A6741] focus:outline-none" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-5 py-3 text-[12px] font-medium text-[#6B6B6B] uppercase">Payment ID</th>
                <th className="text-left px-5 py-3 text-[12px] font-medium text-[#6B6B6B] uppercase">Order</th>
                <th className="text-left px-5 py-3 text-[12px] font-medium text-[#6B6B6B] uppercase">Amount</th>
                <th className="text-left px-5 py-3 text-[12px] font-medium text-[#6B6B6B] uppercase">Method</th>
                <th className="text-left px-5 py-3 text-[12px] font-medium text-[#6B6B6B] uppercase">Status</th>
                <th className="text-left px-5 py-3 text-[12px] font-medium text-[#6B6B6B] uppercase">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-gray-400">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-gray-400">No payments found</td></tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                    <td className="px-5 py-3 font-medium text-[#1E1E1E]">#{p.id?.slice(0, 8)}</td>
                    <td className="px-5 py-3 text-[#6B6B6B]">#{p.order_id?.slice(0, 8)}</td>
                    <td className="px-5 py-3 font-medium text-[#4A6741]">₹{p.amount}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ${methodColors[p.method] || 'bg-gray-100 text-gray-600'}`}>
                        {p.method || 'N/A'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ${statusColors[p.status] || 'bg-gray-100 text-gray-600'}`}>
                        {p.status || 'N/A'}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-[#6B6B6B]">{p.created_at ? new Date(p.created_at).toLocaleDateString() : 'N/A'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
