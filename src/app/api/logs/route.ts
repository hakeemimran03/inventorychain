import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    {
      id: 101,
      item: 'Milk',
      qty: 5,
      action: 'Expired',
      at: '2025-07-25T10:22:00Z',
      by: 'Staff01',
    },
    {
      id: 102,
      item: 'Bread',
      qty: 2,
      action: 'Damaged',
      at: '2025-07-24T09:00:00Z',
      by: 'Manager',
    },
  ]);
}
