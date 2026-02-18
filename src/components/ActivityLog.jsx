import { useTasks } from "../context/useTasks";

function timeAgo(ts) {
  const d = Date.now() - ts;
  if (d < 60000) return "just now";
  if (d < 3600000) return `${Math.floor(d / 60000)} mins ago`;
  if (d < 86400000)
    return `${Math.floor(d / 3600000)} hour${Math.floor(d / 3600000) > 1 ? "s" : ""} ago`;
  return `${Math.floor(d / 86400000)} days ago`;
}

const dotColors = {
  green: "var(--success)",
  blue: "var(--primary)",
  orange: "var(--warning)",
  red: "var(--danger)",
};

export default function ActivityLog({ onReset }) {
  const { log } = useTasks();
  return (
    <div className="activity-log">
      <div style={{ padding: "16px 16px 8px" }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--text-muted)",
          }}
        >
          Activity Log
        </div>
      </div>
      <div style={{ flex: 1 }}>
        {log.map((a) => (
          <div
            key={a.id}
            style={{
              padding: "10px 16px",
              borderBottom: "1px solid var(--bg-hover)",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: dotColors[a.color] || "var(--primary)",
                  display: "inline-block",
                  marginTop: 4,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  color: "var(--text-main)",
                  lineHeight: 1.4,
                }}
                dangerouslySetInnerHTML={{ __html: a.text }}
              />
            </div>
            <div
              style={{
                fontSize: 11,
                color: "var(--text-muted)",
                marginTop: 2,
                paddingLeft: 16,
              }}
            >
              {timeAgo(a.time)}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ padding: "12px 16px", borderTop: "1px solid var(--border)" }}
      >
        <button
          onClick={onReset}
          style={{
            width: "100%",
            padding: 9,
            background: "var(--bg-main)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            color: "var(--danger)",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
        Reset Board
        </button>
      </div>
    </div>
  );
}
