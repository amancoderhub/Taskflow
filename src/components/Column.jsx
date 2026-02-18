import { Droppable } from "@hello-pangea/dnd";
import { MoreHorizontal } from "lucide-react";
import TaskCard from "./TaskCard";

export default function Column({ id, label, tasks, onEdit, onDelete }) {
  const countColors = {
    todo: { bg: "var(--primary-light)", color: "var(--primary)" },
    doing: { bg: "var(--warning-bg)", color: "var(--warning)" },
    done: { bg: "var(--success-bg)", color: "var(--success)" },
  };
  const cc = countColors[id] || countColors.todo;

  return (
    <div
      className="column"
      style={{
        // specific generic styles moved to CSS, keep only if dynamic
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--text-muted)",
            }}
          >
            {label}
          </span>
          <span
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: cc.bg,
              color: cc.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {tasks.length}
          </span>
        </div>
        <button
          style={{
            width: 28,
            height: 28,
            border: "none",
            background: "transparent",
            borderRadius: 6,
            cursor: "pointer",
            color: "var(--text-muted)",
          }}
          className="hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              flex: 1,
              minHeight: 150,
              borderRadius: 12,
              background: snapshot.isDraggingOver
                ? "var(--bg-hover)"
                : "transparent",
              transition: "background-color 0.2s",
              padding: 4,
            }}
          >
            {tasks.map((t, index) => (
              <TaskCard
                key={t.id}
                task={t}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
                isDone={id === "done"}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
