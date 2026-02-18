import { useAuth } from "../context/AuthContext";

export default function Topbar() {
  const { logout } = useAuth();
  return (
    <div
      style={{
        height: 56,
        background: "white",
        borderBottom: "1px solid #E5E7EB",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        flexShrink: 0,
        zIndex: 100,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 32,
            height: 32,
            background: "#4F46E5",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
          }}
        >
          ⚡
        </div>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>
          TaskFlow
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          style={{
            width: 34,
            height: 34,
            border: "none",
            background: "transparent",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 18,
          }}
          title="Settings"
        >
          ⚙️
        </button>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#1F2937" }}>
            Alex Designer
          </div>
          <div style={{ fontSize: 11, color: "#6B7280" }}>intern@demo.com</div>
        </div>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#E5E7EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 13,
            color: "#4B5563",
          }}
        >
          AD
        </div>
        <button
          onClick={logout}
          style={{
            width: 34,
            height: 34,
            border: "none",
            background: "transparent",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 18,
          }}
          title="Logout"
        >
        ↩️
        </button>
      </div>
    </div>
  );
}
