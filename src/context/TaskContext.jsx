import { createContext, useReducer, useEffect } from "react";

const DEFAULT_TASKS = [
  {
    id: "1",
    title: "Research competitor pricing models",
    desc: "Analyze the top 5 competitors in the fintech space and document their tier structures.",
    priority: "medium",
    due: "2024-10-24",
    tags: ["Strategy", "Q4"],
    column: "todo",
    createdAt: Date.now(),
  },
  {
    id: "2",
    title: "Update user onboarding flow",
    desc: "Current drop-off rate is 45%. We need to simplify the initial setup steps.",
    priority: "high",
    due: "2024-10-15",
    tags: ["UX"],
    column: "todo",
    createdAt: Date.now(),
  },
  {
    id: "3",
    title: "Draft newsletter content",
    desc: "",
    priority: "low",
    due: "",
    tags: ["Marketing"],
    column: "todo",
    createdAt: Date.now(),
  },
  {
    id: "4",
    title: "Implement Dark Mode",
    desc: "Add toggle in settings and apply dark theme variables across all components.",
    priority: "medium",
    due: "tomorrow",
    tags: ["Dev", "UI"],
    column: "doing",
    createdAt: Date.now(),
  },
  {
    id: "5",
    title: "API Integration for Analytics",
    desc: "",
    priority: "high",
    due: "2024-10-28",
    tags: ["Backend"],
    column: "doing",
    createdAt: Date.now(),
  },
  {
    id: "6",
    title: "Setup project repository",
    desc: "",
    priority: "low",
    due: "",
    tags: ["DevOps"],
    column: "done",
    createdAt: Date.now(),
  },
];

const DEFAULT_LOG = [
  {
    id: "l1",
    text: 'Task "Fix navbar" moved to <strong>Done</strong>',
    time: Date.now() - 120000,
    color: "green",
  },
  {
    id: "l2",
    text: "New task created in <strong>Todo</strong>",
    time: Date.now() - 900000,
    color: "blue",
  },
  {
    id: "l3",
    text: 'Priority updated on <strong>"Q3 Goals"</strong>',
    time: Date.now() - 3600000,
    color: "orange",
  },
  {
    id: "l4",
    text: 'Task deleted <strong>"Old prototype"</strong>',
    time: Date.now() - 10800000,
    color: "red",
  },
];

function loadState() {
  try {
    const tasks = localStorage.getItem("tf_tasks");
    const log = localStorage.getItem("tf_log");
    return {
      tasks: tasks ? JSON.parse(tasks) : DEFAULT_TASKS,
      log: log ? JSON.parse(log) : DEFAULT_LOG,
    };
  } catch {
    return { tasks: DEFAULT_TASKS, log: DEFAULT_LOG };
  }
}

function reducer(state, action) {
  const { tasks, log } = state;

  function addLog(text, color) {
    const entry = { id: "l" + Date.now(), text, time: Date.now(), color };
    return [entry, ...log].slice(0, 20);
  }

  switch (action.type) {
    case "CREATE_TASK": {
      const newTask = {
        ...action.payload,
        id: "T" + Date.now() + Math.floor(Math.random() * 1000),
        createdAt: Date.now(),
      };
      const newTasks = [...tasks, newTask];
      const newLog = addLog(
        `New task created in <strong>${colLabel(newTask.column)}</strong>: <strong>${newTask.title}</strong>`,
        "blue",
      );
      return { tasks: newTasks, log: newLog };
    }
    case "EDIT_TASK": {
      const newTasks = tasks.map((t) =>
        t.id === action.payload.id ? { ...t, ...action.payload } : t,
      );
      const newLog = addLog(
        `Task edited: <strong>${action.payload.title}</strong>`,
        "orange",
      );
      return { tasks: newTasks, log: newLog };
    }
    case "DELETE_TASK": {
      const task = tasks.find((t) => t.id === action.id);
      const newTasks = tasks.filter((t) => t.id !== action.id);
      const newLog = addLog(
        `Task deleted: <strong>${task?.title}</strong>`,
        "red",
      );
      return { tasks: newTasks, log: newLog };
    }
    case "MOVE_TASK": {
      const task = tasks.find((t) => t.id === action.id);
      const newTasks = tasks.map((t) =>
        t.id === action.id ? { ...t, column: action.col } : t,
      );
      const newLog = addLog(
        `Task "<strong>${task?.title}</strong>" moved to <strong>${colLabel(action.col)}</strong>`,
        "green",
      );
      return { tasks: newTasks, log: newLog };
    }
    case "RESET": {
      const newLog = addLog("Board was reset to defaults", "orange");
      return { tasks: JSON.parse(JSON.stringify(DEFAULT_TASKS)), log: newLog };
    }
    default:
      return state;
  }
}

function colLabel(c) {
  return c === "todo" ? "Todo" : c === "doing" ? "Doing" : "Done";
}

export const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    localStorage.setItem("tf_tasks", JSON.stringify(state.tasks));
    localStorage.setItem("tf_log", JSON.stringify(state.log));
  }, [state]);

  const createTask = (data) => dispatch({ type: "CREATE_TASK", payload: data });
  const editTask = (data) => dispatch({ type: "EDIT_TASK", payload: data });
  const deleteTask = (id) => dispatch({ type: "DELETE_TASK", id });
  const moveTask = (id, col) => dispatch({ type: "MOVE_TASK", id, col });
  const resetBoard = () => dispatch({ type: "RESET" });

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        log: state.log,
        createTask,
        editTask,
        deleteTask,
        moveTask,
        resetBoard,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
