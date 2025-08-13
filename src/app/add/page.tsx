'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const card: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #e2e8f0',
  borderRadius: 12,
  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
  maxWidth: 520,
  padding: 16,
};
const label: React.CSSProperties = {
  display: 'block',
  fontSize: 14,
  marginBottom: 6,
};
const input: React.CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  borderRadius: 8,
  border: '1px solid #cbd5e1',
  background: '#fff',
  fontSize: 14,
  boxSizing: 'border-box',
};
const row: React.CSSProperties = { display: 'grid', gap: 8, marginBottom: 12 };
const actionRow: React.CSSProperties = { display: 'flex', gap: 8 };
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

export default function AddPage() {
  const router = useRouter();
  const [role, setRole] = useState('Staff');
  const [name, setName] = useState('');
  const [qty, setQty] = useState<number>(0);
  const [expiry, setExpiry] = useState('');
  const [tx, setTx] = useState('');

  useEffect(() => {
    setRole(localStorage.getItem('role') || 'Staff');
  }, []);
  if (role !== 'Manager') {
    return (
      <div
        style={{
          color: '#991b1b',
          background: '#fee2e2',
          border: '1px solid #fecaca',
          padding: 12,
          borderRadius: 8,
        }}
      >
        Access denied. Managers only.
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || qty <= 0 || !expiry) return alert('Fill all fields');
    // TODO: call contract.addItem(...)
    setTx('0x9fbd4f5a9c6b18dfbc7c0f35e84b82f6c764edbecc5a135ccfdc97e1d5c5bcdc'); // mock tx hash
    // TODO: POST to /api/items after real tx confirm
    alert('Item added');
    router.push('/');
  };

  return (
    <div style={card}>
      <h2 style={{ marginTop: 0, marginBottom: 12, fontSize: 18 }}>
        Add Inventory
      </h2>
      <form onSubmit={submit}>
        <div style={row}>
          <label style={label}>Item Name</label>
          <input
            style={input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div style={row}>
          <label style={label}>Quantity</label>
          <input
            type="number"
            style={input}
            value={qty}
            onChange={(e) => setQty(parseInt(e.target.value || '0'))}
            required
          />
        </div>
        <div style={row}>
          <label style={label}>Expiry</label>
          <input
            type="date"
            style={input}
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
          />
        </div>
        <div style={actionRow}>
          <button type="submit" style={btnPrimary}>
            Submit
          </button>
          <button type="button" onClick={() => router.push('/')} style={btn}>
            Cancel
          </button>
        </div>
      </form>

      {tx && (
        <div
          style={{
            marginTop: 12,
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            background: '#f8fafc',
            padding: 12,
          }}
        >
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>
            Transaction Hash
          </div>
          <code
            style={{ fontSize: 12, wordBreak: 'break-all', color: '#0f172a' }}
          >
            {tx}
          </code>
        </div>
      )}
    </div>
  );
}
