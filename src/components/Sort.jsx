export default function Sort({ active, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        padding: "8px 12px",
        border: "1px solid #E5E7EB",
        borderRadius: 8,
        background: active ? "#EEF2FF" : "white",
        color: active ? "#4F46E5" : "#374151",
        fontSize: 13,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 5,
        borderColor: active ? "#4F46E5" : "#E5E7EB",
      }}
    >
      ↕ Sort
    </button>
  );
}
