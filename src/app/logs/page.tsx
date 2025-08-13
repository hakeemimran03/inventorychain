'use client';
import { useEffect, useState } from 'react';
type Log = {
  id: number;
  item: string;
  qty: number;
  action: string;
  at: string;
  by: string;
};

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

export default function LogsPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  useEffect(() => {
    fetch('/api/logs')
      .then((r) => r.json())
      .then(setLogs);
  }, []);

  return (
    <div style={card}>
      <div style={cardHeader}>
        <b>Wastage / Logs</b>
      </div>
      <div style={cardBody}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Item</th>
              <th style={thStyle}>Qty</th>
              <th style={thStyle}>Action</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>By</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l) => {
              const isExpired = l.action.toLowerCase() === 'expired';
              return (
                <tr
                  key={l.id}
                  style={{ background: isExpired ? '#fee2e2' : 'transparent' }}
                >
                  <td style={tdStyle}>{l.item}</td>
                  <td style={tdStyle}>{l.qty}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 600,
                        background: isExpired ? '#fecaca' : '#e2e8f0',
                        color: isExpired ? '#7f1d1d' : '#334155',
                      }}
                    >
                      {l.action}
                    </span>
                  </td>
                  <td style={tdStyle}>{new Date(l.at).toLocaleString()}</td>
                  <td style={tdStyle}>{l.by}</td>
                </tr>
              );
            })}
            {logs.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  style={{ ...tdStyle, textAlign: 'center', color: '#64748b' }}
                >
                  No logs yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
