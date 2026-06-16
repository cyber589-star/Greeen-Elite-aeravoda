import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bgeyvmgxkfuibgihorxi.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnZXl2bWd4a2Z1aWJnaWhvcnhpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTE4MjU2OSwiZXhwIjoyMDk2NzU4NTY5fQ.-QNxDd5T9vxrLjQAlAcdCvSPqF1EK2I-tW4Z7QIfYGk';
const supabase = createClient(supabaseUrl, serviceKey);

export async function POST(req: Request) {
  const body = await req.json();
  if (body.password !== 'admin123') {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  return NextResponse.json({ success: true, token: btoa('admin:authenticated') });
}
