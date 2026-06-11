import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  if (body.password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  return NextResponse.json({ success: true, token: btoa('admin:authenticated') });
}
