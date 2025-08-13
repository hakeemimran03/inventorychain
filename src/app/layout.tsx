import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'InventoryChain',
  description: 'Blockchain inventory demo',
};

const headerStyle: React.CSSProperties = {
  borderBottom: '1px solid #e2e8f0',
  background: '#ffffff',
};
const headerInner: React.CSSProperties = {
  maxWidth: 960,
  margin: '0 auto',
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const navLink: React.CSSProperties = {
  textDecoration: 'none',
  marginLeft: 12,
  color: '#334155',
};
const mainStyle: React.CSSProperties = {
  maxWidth: 960,
  margin: '0 auto',
  padding: '24px 16px',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header style={headerStyle}>
          <div style={headerInner}>
            <h1 style={{ fontSize: 20, margin: 0 }}>InventoryChain</h1>
            <nav style={{ fontSize: 14 }}>
              <a href="/" style={navLink}>
                Dashboard
              </a>
              <a href="/logs" style={navLink}>
                Logs
              </a>
              <a href="/login" style={navLink}>
                Switch Role
              </a>
            </nav>
          </div>
        </header>
        <main style={mainStyle}>{children}</main>
      </body>
    </html>
  );
}
