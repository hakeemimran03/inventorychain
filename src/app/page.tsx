"use client";
import { useEffect, useMemo, useState } from "react";

// This is the updated Dashboard component.
// It now uses hardcoded, local state for staff management, including a username and password.

type Item = { id: number; name: string; quantity: number; expiry: string };
type Status = "OK" | "LOW" | "EXPIRED";
// Updated StaffMember type to include username and password
type StaffMember = { id: string; username: string; password?: string };

// Inline styles for the component
const card: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e2e8f0",
  borderRadius: 12,
  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
};
const cardHeader: React.CSSProperties = {
  padding: "12px 16px",
  borderBottom: "1px solid #e2e8f0",
};
const cardBody: React.CSSProperties = { padding: "16px" };
const btn: React.CSSProperties = {
  border: "1px solid #cbd5e1",
  background: "#fff",
  padding: "8px 12px",
  borderRadius: 8,
  fontSize: 14,
  cursor: "pointer",
  textDecoration: "none", // Ensure links don't have an underline
};
const btnPrimary: React.CSSProperties = {
  ...btn,
  background: "#0f172a",
  color: "#fff",
  border: "1px solid #0f172a",
};
const actionsRow: React.CSSProperties = {
  display: "flex",
  gap: 8,
  marginBottom: 12,
  justifyContent: "flex-start",
};
const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 14,
};
const thStyle: React.CSSProperties = {
  textAlign: "left",
  color: "#64748b",
  padding: "8px 12px",
  borderBottom: "1px solid #e2e8f0",
};
const tdStyle: React.CSSProperties = {
  padding: "12px",
  borderBottom: "1px solid #e2e8f0",
};
const staffItemStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 12px",
  background: "#f8fafc",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
};

// --- Helper Functions and Components ---

function statusOf(it: Item): Status {
  const today = new Date().toISOString().slice(0, 10);
  if (it.expiry <= today) return "EXPIRED";
  if (it.quantity < 10) return "LOW";
  return "OK";
}

function StatusBadge({ s }: { s: Status }) {
  const styles: Record<Status, React.CSSProperties> = {
    OK: { background: "#dcfce7", color: "#065f46" },
    LOW: { background: "#fef3c7", color: "#92400e" },
    EXPIRED: { background: "#fecaca", color: "#7f1d1d" },
  };
  return (
    <span
      style={{
        ...styles[s],
        padding: "4px 8px",
        borderRadius: 6,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {s}
    </span>
  );
}

// --- Main Dashboard Component ---

export default function Dashboard() {
  const [items, setItems] = useState<Item[]>([]);
  const [role, setRole] = useState("Staff");
  // Hardcoded staff data for front-end development
  const [staff, setStaff] = useState<StaffMember[]>([
    { id: "staff-1", username: "staff01", password: "password" },
    { id: "staff-2", username: "staff02", password: "password" },
  ]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Get user role from local storage.
    setRole(localStorage.getItem("role") || "Staff");

    // Fetch inventory items.
    fetch("/api/items")
      .then((r) => r.json())
      .then(setItems)
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const rows = useMemo(
    () => items.map((i) => ({ ...i, status: statusOf(i) as Status })),
    [items]
  );

  // Handlers for adding and removing staff
  const handleAddStaff = () => {
    // Generate the new staff name in the format "staff03", "staff04", etc.
    const newStaffNumber = staff.length + 1;
    const newStaffUsername = `staff${newStaffNumber
      .toString()
      .padStart(2, "0")}`;
    const newStaffId = `staff-${newStaffNumber}`; // Create a unique ID
    const newStaffPassword = "password"; // Hardcoded password as requested
    setStaff([
      ...staff,
      {
        id: newStaffId,
        username: newStaffUsername,
        password: newStaffPassword,
      },
    ]);
  };

  const handleRemoveStaff = (staffId: string) => {
    setStaff(staff.filter((staffMember) => staffMember.id !== staffId));
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {/* Header and User Info */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0, fontSize: 28 }}>Inventory Dashboard</h2>
        <div style={{ fontSize: 14, color: "#475569" }}>
          Signed in as: <b style={{ color: "#0f172a" }}>{role}</b> &nbsp;|&nbsp;{" "}
          <a
            href='/login'
            style={{
              ...btn,
              border: isHovering ? "1px solid #e2e8f0" : "1px solid #cbd5e1",
              background: isHovering ? "#f8fafc" : "#fff",
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Switch
          </a>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={actionsRow}>
        <a href='/logs' style={btn}>
          View Wastage Logs
        </a>
        {role === "Manager" && (
          <>
            <a href='/add' style={btnPrimary}>
              + Add New Item
            </a>
            <button
              style={btn}
              onClick={async () => {
                const data = await fetch("/api/items").then((r) => r.json());
                setItems(data);
              }}
            >
              Sync
            </button>
          </>
        )}
      </div>

      {/* Staff Management Section (Visible only to Manager) */}
      {role === "Manager" && (
        <div style={card}>
          <div style={cardHeader}>
            <b>Manage Staff</b>
          </div>
          <div style={cardBody}>
            {/* Add Staff Button */}
            <button onClick={handleAddStaff} style={btnPrimary}>
              + Add New Staff
            </button>

            {/* Staff List */}
            {staff.length > 0 ? (
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  marginTop: "16px",
                }}
              >
                {staff.map((staffMember) => (
                  <li key={staffMember.id} style={staffItemStyle}>
                    <span style={{ fontSize: "14px" }}>
                      Username: <b>{staffMember.username}</b> | Password:{" "}
                      <b>{staffMember.password}</b>
                    </span>
                    <button
                      onClick={() => handleRemoveStaff(staffMember.id)}
                      style={{
                        ...btn,
                        padding: "4px 8px",
                        fontSize: "12px",
                        borderColor: "#f87171",
                        color: "#dc2626",
                      }}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p
                style={{
                  textAlign: "center",
                  color: "#64748b",
                  marginTop: "16px",
                }}
              >
                No staff members added yet.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Inventory Table */}
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
                <tr
                  key={r.id}
                  style={{
                    background:
                      r.status === "EXPIRED" ? "#fee2e2" : "transparent",
                  }}
                >
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
                      textAlign: "center",
                      color: "#64748b",
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
