"use client";

// Note: The `globals.css` import is commented out because it causes compilation
// errors in this specific environment. In your local Next.js project,
// you would want to keep this line.
// import './globals.css';

import { usePathname } from "next/navigation";

const headerStyle = {
  borderBottom: "1px solid #e2e8f0",
  background: "#ffffff",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 10,
};
const headerInner = {
  maxWidth: 960,
  margin: "0 auto",
  padding: "12px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const navLink = {
  textDecoration: "none",
  marginLeft: 12,
  color: "#334155",
};
const mainStyle = {
  maxWidth: 960,
  margin: "0 auto",
  padding: "24px 16px",
  paddingTop: "60px", // Add top padding to avoid content being hidden by the fixed header
};
const centeredHeaderInner = {
  maxWidth: 960,
  margin: "0 auto",
  padding: "12px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center", // Centering the content
};

const Header = () => {
  const pathname = usePathname();
  const showNav = pathname !== "/login";

  return (
    <header style={headerStyle}>
      <div style={showNav ? headerInner : centeredHeaderInner}>
        {/* The title remains, and the nav links are conditionally rendered */}
        <h1 style={{ fontSize: 20, margin: 0 }}>InventoryChain</h1>
        {showNav && (
          <nav style={{ fontSize: 14 }}>
            <a href='/' style={navLink}>
              Dashboard
            </a>
            <a href='/logs' style={navLink}>
              Logs
            </a>
            <a href='/login' style={navLink}>
              Switch Role
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mainStyle = {
    maxWidth: 960,
    margin: "0 auto",
    padding: "24px 16px",
    paddingTop: "60px",
  };

  return (
    <html lang='en'>
      <body>
        <Header />
        <main style={mainStyle}>{children}</main>
      </body>
    </html>
  );
}
