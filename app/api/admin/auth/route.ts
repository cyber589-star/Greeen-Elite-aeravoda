import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const body = await req.json();
  if (body.password !== 'admin123') {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  return NextResponse.json({ success: true, token: btoa('admin:authenticated') });
}
