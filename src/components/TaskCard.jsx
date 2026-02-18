import { Draggable } from "@hello-pangea/dnd";
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  MoreVertical,
  Edit2,
  Trash2,
  Tag,
} from "lucide-react";

function PriorityBadge({ priority }) {
  const map = {
    high: { color: "var(--danger)", bg: "var(--danger-bg)", icon: AlertCircle },
    medium: { color: "var(--warning)", bg: "var(--warning-bg)", icon: Clock },
    low: {
      color: "var(--success)",
      bg: "var(--success-bg)",
      icon: CheckCircle2,
    },
  };
  const config = map[priority] || map.low;
  const Icon = config.icon;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 8px",
        borderRadius: 6,
        fontSize: "0.75rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.02em",
        color: config.color,
        background: config.bg,
        border: `1px solid ${config.color}20`,
      }}
    >
      <Icon size={12} strokeWidth={3} />
      {priority}
    </div>
  );
}

function DueBadge({ due }) {
  if (!due) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let label = due;
  let isOverdue = false;
  let isTomorrow = false;

  if (due.toLowerCase() === "tomorrow") {
    isTomorrow = true;
    label = "Tomorrow";
  } else {
    const d = new Date(due);
    if (!isNaN(d.getTime())) {
      const dOnly = new Date(d);
      dOnly.setHours(0, 0, 0, 0);
      isOverdue = dOnly < today;
      label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
  }

  const color = isOverdue
    ? "var(--danger)"
    : isTomorrow
      ? "var(--primary)"
      : "var(--text-muted)";

  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        fontSize: 12,
        fontWeight: 500,
        color: color,
      }}
    >
      <Calendar size={12} />
      {isOverdue ? "Overdue!" : label}
    </span>
  );
}

export default function TaskCard({ task, index, onEdit, onDelete, isDone }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            background: "var(--bg-card)",
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            border: "1px solid var(--border)",
            boxShadow: snapshot.isDragging
              ? "var(--shadow-md)"
              : "var(--shadow-sm)",
            opacity: isDone ? 0.6 : 1,
            transform: snapshot.isDragging
              ? `${provided.draggableProps.style?.transform} scale(1.02)`
              : provided.draggableProps.style?.transform,
            transition:
              "background-color 0.2s, border-color 0.2s, box-shadow 0.2s",
            ...provided.draggableProps.style,
          }}
          className="task-card"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: isDone ? "var(--text-muted)" : "var(--text-main)",
                textDecoration: isDone ? "line-through" : "none",
                lineHeight: 1.4,
                flex: 1,
              }}
            >
              {task.title}
            </div>
            <div style={{ display: "flex", gap: 2 }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(task);
                }}
                onPointerDown={(e) => e.stopPropagation()}
                style={{
                  color: "var(--text-muted)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: 4,
                  borderRadius: 4,
                }}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(task);
                }}
                onPointerDown={(e) => e.stopPropagation()}
                style={{
                  color: "var(--danger)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: 4,
                  borderRadius: 4,
                }}
                className="hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {task.desc && (
            <div
              style={{
                fontSize: 13,
                color: "var(--text-muted)",
                lineHeight: 1.5,
                marginBottom: 12,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {task.desc}
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
              flexWrap: "wrap",
            }}
          >
            <PriorityBadge priority={task.priority} />
            <DueBadge due={task.due} />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {task.tags?.length > 0 ? (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "2px 8px",
                      background: "var(--bg-main)",
                      borderRadius: 4,
                      fontSize: 11,
                      color: "var(--text-muted)",
                      fontWeight: 500,
                      border: "1px solid var(--border)",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : (
              <div />
            )}

            {isDone && (
              <span
                style={{
                  fontSize: 11,
                  color: "var(--success)",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <CheckCircle2 size={12} />
                Completed
              </span>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
