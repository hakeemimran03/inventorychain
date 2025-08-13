import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    { id: 1, name: 'Milk', quantity: 20, expiry: '2025-08-31' },
    { id: 2, name: 'Bread', quantity: 9, expiry: '2025-07-27' },
    { id: 3, name: 'Sugar', quantity: 50, expiry: '2026-01-01' },
  ]);
}
