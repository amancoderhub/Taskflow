export default function SearchBar({ value, onChange }) {
  return (
    <div style={{ position: "relative", flex: 1, maxWidth: 360 }}>
      <span
        style={{
          position: "absolute",
          left: 11,
          top: "50%",
          transform: "translateY(-50%)",
          color: "#9CA3AF",
          fontSize: 15,
        }}
      >
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search tasks..."
        style={{
          width: "100%",
          padding: "9px 12px 9px 36px",
          border: "1px solid #E5E7EB",
          borderRadius: 8,
          fontSize: 14,
          outline: "none",
          background: "white",
          color: "#374151",
        }}
      />
    </div>
  );
}
