import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createClient(
      'https://bgeyvmgxkfuibgihorxi.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnZXl2bWd4a2Z1aWJnaWhvcnhpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTE4MjU2OSwiZXhwIjoyMDk2NzU4NTY5fQ.-QNxDd5T9vxrLjQAlAcdCvSPqF1EK2I-tW4Z7QIfYGk'
    );

    const [products, orders, payments] = await Promise.all([
      supabase.from('products').select('*'),
      supabase.from('orders').select('*'),
      supabase.from('payments').select('*'),
    ]);

    const allProducts = products.data || [];
    const allOrders = orders.data || [];
    const allPayments = payments.data || [];

    const totalRevenue = allPayments.reduce((sum: number, p: any) => sum + (p.amount || 0), 0);
    const totalOrders = allOrders.length;
    const totalProducts = allProducts.length;
    const pendingOrders = allOrders.filter((o: any) => o.status === 'pending').length;

    const monthlyData = Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - (5 - i));
      const month = d.toLocaleString('default', { month: 'short' });
      const monthOrders = allOrders.filter((o: any) => {
        const od = new Date(o.created_at);
        return od.getMonth() === d.getMonth() && od.getFullYear() === d.getFullYear();
      });
      return {
        month,
        orders: monthOrders.length,
        revenue: monthOrders.reduce((s: number, o: any) => s + (o.total || 0), 0),
      };
    });

    const categoryData = allProducts.reduce((acc: Record<string, number>, p: any) => {
      const cat = p.category || 'Other';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});

    return NextResponse.json({
      stats: { totalRevenue, totalOrders, totalProducts, pendingOrders },
      monthlyData,
      categoryData: Object.entries(categoryData).map(([name, value]) => ({ name, value })),
      recentOrders: allOrders.slice(0, 5),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
