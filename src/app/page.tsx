'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type Item = { id: number; name: string; quantity: number; expiry: string };
type Status = 'OK' | 'LOW' | 'EXPIRED';

const card: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #e2e8f0',
  borderRadius: 12,
  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
};
const cardHeader: React.CSSProperties = {
  padding: '12px 16px',
  borderBottom: '1px solid #e2e8f0',
};
const cardBody: React.CSSProperties = { padding: '16px' };
const btn: React.CSSProperties = {
  border: '1px solid #cbd5e1',
  background: '#fff',
  padding: '8px 12px',
  borderRadius: 8,
  fontSize: 14,
  cursor: 'pointer',
};
const btnPrimary: React.CSSProperties = {
  ...btn,
  background: '#0f172a',
  color: '#fff',
  border: '1px solid #0f172a',
};
const actionsRow: React.CSSProperties = {
  display: 'flex',
  gap: 8,
  marginBottom: 12,
  justifyContent: 'flex-start',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: 14,
};
const thStyle: React.CSSProperties = {
  textAlign: 'left',
  color: '#64748b',
  padding: '8px 12px',
  borderBottom: '1px solid #e2e8f0',
};
const tdStyle: React.CSSProperties = {
  padding: '12px',
  borderBottom: '1px solid #e2e8f0',
};

function statusOf(it: Item): Status {
  const today = new Date().toISOString().slice(0, 10);
  if (it.expiry <= today) return 'EXPIRED';
  if (it.quantity < 10) return 'LOW';
  return 'OK';
}
function StatusBadge({ s }: { s: Status }) {
  const styles: Record<Status, React.CSSProperties> = {
    OK: { background: '#dcfce7', color: '#065f46' },
    LOW: { background: '#fef3c7', color: '#92400e' },
    EXPIRED: { background: '#fee2e2', color: '#991b1b' },
  };
  return (
    <span
      style={{
        ...styles[s],
        padding: '4px 8px',
        borderRadius: 6,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {s}
    </span>
  );
}

export default function Dashboard() {
  const [items, setItems] = useState<Item[]>([]);
  const [role, setRole] = useState('Staff');

  useEffect(() => {
    setRole(localStorage.getItem('role') || 'Staff');
    fetch('/api/items')
      .then((r) => r.json())
      .then(setItems);
  }, []);

  const rows = useMemo(
    () => items.map((i) => ({ ...i, status: statusOf(i) as Status })),
    [items]
  );

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 style={{ margin: 0, fontSize: 28 }}>Inventory Dashboard</h2>
        <div style={{ fontSize: 14, color: '#475569' }}>
          Signed in as: <b style={{ color: '#0f172a' }}>{role}</b> &nbsp;|&nbsp;{' '}
          <Link href="/login">Switch</Link>
        </div>
      </div>

      <div style={actionsRow}>
        <Link href="/logs">
          <button style={btn}>View Wastage Logs</button>
        </Link>
        {role === 'Manager' && (
          <>
            <Link href="/add">
              <button style={btnPrimary}>+ Add New Item</button>
            </Link>
            <button
              style={btn}
              onClick={async () => {
                const data = await fetch('/api/items').then((r) => r.json());
                setItems(data);
              }}
            >
              Sync
            </button>
          </>
        )}
      </div>

      <div style={card}>
        <div style={cardHeader}>
          <b>Inventory</b>
        </div>
        <div style={cardBody}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Item</th>
                <th style={thStyle}>Quantity</th>
                <th style={thStyle}>Expiry</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td style={tdStyle}>{r.name}</td>
                  <td style={tdStyle}>{r.quantity}</td>
                  <td style={tdStyle}>{r.expiry}</td>
                  <td style={tdStyle}>
                    <StatusBadge s={r.status} />
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    style={{
                      ...tdStyle,
                      textAlign: 'center',
                      color: '#64748b',
                    }}
                  >
                    No items yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
