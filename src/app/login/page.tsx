'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const card: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #e2e8f0',
  borderRadius: 12,
  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
  maxWidth: 420,
  margin: '24px auto',
  padding: 16,
};

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'Manager' | 'Staff'>('Manager');

  return (
    <div style={card}>
      <h2 style={{ marginTop: 0, marginBottom: 12, fontSize: 18 }}>
        Sign in (Mock)
      </h2>
      <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>
        Role
      </label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as any)}
        style={{
          width: '100%',
          padding: '8px 10px',
          borderRadius: 8,
          border: '1px solid #cbd5e1',
          background: '#fff',
          fontSize: 14,
        }}
      >
        <option>Manager</option>
        <option>Staff</option>
      </select>

      <button
        onClick={() => {
          localStorage.setItem('role', role);
          router.push('/');
        }}
        style={{
          width: '100%',
          marginTop: 12,
          padding: '10px 12px',
          borderRadius: 8,
          background: '#0f172a',
          color: '#fff',
          fontSize: 14,
          border: '1px solid #0f172a',
          cursor: 'pointer',
        }}
      >
        Continue
      </button>
    </div>
  );
}
