'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';
const supabase = getSupabase();

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image_url: string;
  description: string;
  created_at: string;
}

const defaultProduct = { name: '', price: 0, category: 'Skincare', stock: 0, image_url: '', description: '' };

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(defaultProduct);
  const [search, setSearch] = useState('');

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (editing) {
      await supabase.from('products').update(form).eq('id', editing.id);
    } else {
      await supabase.from('products').insert([{ ...form, created_at: new Date().toISOString() }]);
    }
    setShowModal(false);
    setEditing(null);
    setForm(defaultProduct);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await supabase.from('products').delete().eq('id', id);
    load();
  };

  const filtered = products.filter((p) => p.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A6741]"
          />
        </div>
        <button
          onClick={() => { setForm(defaultProduct); setEditing(null); setShowModal(true); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-medium"
          style={{ background: 'linear-gradient(135deg, #4A6741, #5a7d4f)' }}
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-5 py-3 text-[12px] font-medium text-[#6B6B6B] uppercase">Product</th>
                <th className="text-left px-5 py-3 text-[12px] font-medium text-[#6B6B6B] uppercase">Category</th>
                <th className="text-left px-5 py-3 text-[12px] font-medium text-[#6B6B6B] uppercase">Price</th>
                <th className="text-left px-5 py-3 text-[12px] font-medium text-[#6B6B6B] uppercase">Stock</th>
                <th className="text-right px-5 py-3 text-[12px] font-medium text-[#6B6B6B] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="px-5 py-10 text-center text-gray-400">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-5 py-10 text-center text-gray-400">No products found</td></tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        {p.image_url && <img src={p.image_url} alt="" className="w-9 h-9 rounded-lg object-cover bg-gray-100" />}
                        <span className="font-medium text-[#1E1E1E]">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-[#6B6B6B]">{p.category}</td>
                    <td className="px-5 py-3 font-medium text-[#4A6741]">₹{p.price}</td>
                    <td className="px-5 py-3">
                      <span className={`font-medium ${p.stock <= 5 ? 'text-red-500' : 'text-[#6B6B6B]'}`}>{p.stock}</span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button onClick={() => { setEditing(p); setForm(p); setShowModal(true); }} className="p-1.5 hover:bg-gray-100 rounded-md mr-1">
                        <Edit2 className="w-4 h-4 text-[#6B6B6B]" />
                      </button>
                      <button onClick={() => remove(p.id)} className="p-1.5 hover:bg-red-50 rounded-md">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold">{editing ? 'Edit Product' : 'Add Product'}</h3>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-md"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product name" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#4A6741] focus:outline-none" />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" value={form.price || ''} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} placeholder="Price (₹)" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#4A6741] focus:outline-none" />
                <input type="number" value={form.stock || ''} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} placeholder="Stock" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#4A6741] focus:outline-none" />
              </div>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#4A6741] focus:outline-none">
                <option>Skincare</option>
                <option>Health</option>
                <option>Men</option>
                <option>Hair Care</option>
                <option>Wellness</option>
              </select>
              <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="Image URL" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#4A6741] focus:outline-none" />
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={3} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#4A6741] focus:outline-none resize-none" />
            </div>
            <button onClick={save} className="w-full mt-5 py-2.5 rounded-lg text-white text-sm font-medium" style={{ background: 'linear-gradient(135deg, #4A6741, #5a7d4f)' }}>
              {editing ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
