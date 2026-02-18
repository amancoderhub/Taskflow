import { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { useTasks } from "../context/useTasks";
import Topbar from "../components/Topbar";
import ActivityLog from "../components/ActivityLog";
import Column from "../components/Column";
import TaskForm from "../components/TaskForm";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import { Sun, Moon, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const COLUMNS = [
  { id: "todo", label: "TO DO" },
  { id: "doing", label: "DOING" },
  { id: "done", label: "DONE" },
];

export default function Board() {
  const { tasks, createTask, editTask, deleteTask, moveTask, resetBoard } =
    useTasks();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [sortByDue, setSortByDue] = useState(false);
  const [modalTask, setModalTask] = useState(undefined); // undefined=closed, null=new, task=edit
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("tf_theme") === "dark",
  );

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("tf_theme", isDark ? "dark" : "light");
  }, [isDark]);

  function getColTasks(col) {
    let list = tasks.filter((t) => t.column === col);
    if (search)
      list = list.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase()),
      );
    if (priority) list = list.filter((t) => t.priority === priority);
    if (sortByDue) {
      list = [...list].sort((a, b) => {
        if (!a.due && !b.due) return 0;
        if (!a.due) return 1;
        if (!b.due) return -1;
        return new Date(a.due) - new Date(b.due);
      });
    }
    return list;
  }

  function handleSave(form) {
    if (form.id) editTask(form);
    else createTask(form);
  }

  function handleDelete(task) {
    if (window.confirm(`Delete "${task.title}"?`)) deleteTask(task.id);
  }

  function handleReset() {
    if (window.confirm("Reset the board to defaults?")) resetBoard();
  }

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
      
    if (destination.droppableId !== source.droppableId) {
      moveTask(draggableId, destination.droppableId);
    }
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="board-container">
      {/* Custom Topbar since I'm refactoring */}
      <div
        style={{
          height: 60,
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--bg-card)",
          borderBottom: "1px solid var(--border)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: "var(--primary)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 700,
            }}
          >
            ⚡
          </div>
          <h1 style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.5 }}>
            TaskFlow
          </h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={() => setIsDark(!isDark)}
            style={{
              background: "var(--bg-hover)",
              border: "1px solid var(--border)",
              cursor: "pointer",
              color: "var(--text-main)",
              borderRadius: 8,
              padding: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div style={{ width: 1, height: 24, background: "var(--border)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img
              src={`https://ui-avatars.com/api/?name=Intern&background=random`}
              alt="User"
              style={{ width: 32, height: 32, borderRadius: "50%" }}
            />
            <div style={{ fontSize: 13, fontWeight: 500 }}>Intern</div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              marginLeft: 8,
            }}
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      <div className="board-main">
        <ActivityLog onReset={handleReset} />

        <div className="board-content">
          <div
            style={{
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              borderBottom: "1px solid var(--border)",
              background: "var(--bg-card)",
              flexShrink: 0,
            }}
          >
            <SearchBar value={search} onChange={setSearch} />
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Filter value={priority} onChange={setPriority} />
              <Sort
                active={sortByDue}
                onToggle={() => setSortByDue((s) => !s)}
              />
              <button
                onClick={() => setModalTask(null)}
                style={{
                  padding: "8px 16px",
                  background: "var(--primary)",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "background-color 0.2s",
                }}
                className="hover:bg-indigo-700"
              >
                + New Task
              </button>
            </div>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <div className="columns-container">
              {COLUMNS.map((col) => (
                <Column
                  key={col.id}
                  id={col.id}
                  label={col.label}
                  tasks={getColTasks(col.id)}
                  onEdit={(t) => setModalTask(t)}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>

      {modalTask !== undefined && (
        <TaskForm
          task={modalTask || null}
          onSave={handleSave}
          onClose={() => setModalTask(undefined)}
        />
      )}
    </div>
  );
}
