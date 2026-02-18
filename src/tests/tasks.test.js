import { describe, it, expect, beforeEach } from 'vitest';

// Simulated task state (mirrors TaskContext reducer logic)
let tasks = [];
let log = [];

let idCounter = 0;
function createTask(data) {
  const task = { ...data, id: 'T' + Date.now() + (idCounter++), createdAt: Date.now() };
  tasks = [...tasks, task];
  log = [{ id: 'l' + Date.now(), text: `New task created`, time: Date.now() }, ...log];
  return task;
}
function editTask(updated) {
  tasks = tasks.map(t => t.id === updated.id ? { ...t, ...updated } : t);
}
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
}
function filterByPriority(p) {
  return p ? tasks.filter(t => t.priority === p) : tasks;
}
function sortByDue(list) {
  return [...list].sort((a, b) => {
    if (!a.due && !b.due) return 0;
    if (!a.due) return 1;
    if (!b.due) return -1;
    return new Date(a.due) - new Date(b.due);
  });
}

describe('Task CRUD', () => {
  beforeEach(() => { tasks = []; log = []; });

  it('should create a task with required fields', () => {
    const t = createTask({ title: 'Test Task', priority: 'high', column: 'todo', due: '', tags: [] });
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe('Test Task');
    expect(tasks[0].id).toBeTruthy();
  });

  it('should edit an existing task', () => {
    const t = createTask({ title: 'Old Title', priority: 'low', column: 'todo', due: '', tags: [] });
    editTask({ id: t.id, title: 'New Title', priority: 'high' });
    expect(tasks[0].title).toBe('New Title');
    expect(tasks[0].priority).toBe('high');
  });

  it('should delete a task', () => {
    const t = createTask({ title: 'To Delete', priority: 'medium', column: 'todo', due: '', tags: [] });
    expect(tasks).toHaveLength(1);
    deleteTask(t.id);
    expect(tasks).toHaveLength(0);
  });

  it('should not delete tasks with other IDs', () => {
    createTask({ title: 'A', priority: 'low', column: 'todo', due: '', tags: [] });
    const b = createTask({ title: 'B', priority: 'high', column: 'todo', due: '', tags: [] });
    deleteTask(b.id);
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe('A');
  });
});

describe('Task Filter & Sort', () => {
  beforeEach(() => {
    tasks = [];
    createTask({ title: 'High Task', priority: 'high', column: 'todo', due: '2025-01-15', tags: [] });
    createTask({ title: 'Low Task', priority: 'low', column: 'todo', due: '2025-01-01', tags: [] });
    createTask({ title: 'No Due', priority: 'medium', column: 'todo', due: '', tags: [] });
  });

  it('should filter by priority correctly', () => {
    const high = filterByPriority('high');
    expect(high).toHaveLength(1);
    expect(high[0].title).toBe('High Task');
  });

  it('should return all tasks when no filter is applied', () => {
    const all = filterByPriority('');
    expect(all).toHaveLength(3);
  });

  it('should sort by due date with empty values last', () => {
    const sorted = sortByDue(tasks);
    expect(sorted[0].due).toBe('2025-01-01');
    expect(sorted[1].due).toBe('2025-01-15');
    expect(sorted[2].due).toBe('');
  });
});
