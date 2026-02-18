export default function Filter({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: "8px 12px",
        border: "1px solid #E5E7EB",
        borderRadius: 8,
        fontSize: 13,
        color: "#374151",
        background: "white",
        outline: "none",
        cursor: "pointer",
      }}
    >
      <option value="">All Priorities</option>
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>
  );
}
