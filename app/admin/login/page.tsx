'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Leaf, Lock, User } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('admin_token', data.token);
        router.push('/admin/dashboard');
      } else {
        setError('Invalid password');
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #1a3a1a 0%, #2D4A2D 50%, #1a3a1a 100%)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <Leaf className="w-8 h-8 text-[#C5A55A]" />
          </div>
          <h1 className="font-logo text-2xl text-white mb-1">Green Elixir</h1>
          <p className="text-white/50 text-sm">Admin Panel</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-[#4A6741]" />
            <h2 className="text-lg font-semibold text-[#1E1E1E]">Sign In</h2>
          </div>

          <div className="mb-4">
            <label className="block text-[13px] font-medium text-[#6B6B6B] mb-1.5">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A6741] focus:border-transparent transition-all"
                required
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button type="submit" disabled={loading} className="w-full py-3 rounded-lg text-white font-medium text-sm transition-all duration-300 hover:shadow-lg disabled:opacity-50" style={{ background: 'linear-gradient(135deg, #4A6741, #5a7d4f)' }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
