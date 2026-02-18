import { describe, it, expect, beforeEach } from 'vitest';

let tasks = [];
let log = [];

function createTask(data) {
  const task = { ...data, id: 'T' + Date.now(), createdAt: Date.now() };
  tasks = [...tasks, task];
  return task;
}
function moveTask(id, newCol) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  tasks = tasks.map(t => t.id === id ? { ...t, column: newCol } : t);
  log = [{ id: 'l' + Date.now(), text: `Task moved to ${newCol}`, time: Date.now() }, ...log];
}
function getColTasks(col) {
  return tasks.filter(t => t.column === col);
}

describe('Board Columns', () => {
  beforeEach(() => { tasks = []; log = []; });

  it('should move a task from todo to doing', () => {
    const t = createTask({ title: 'Start Work', priority: 'high', column: 'todo', due: '', tags: [] });
    expect(getColTasks('todo')).toHaveLength(1);
    expect(getColTasks('doing')).toHaveLength(0);
    moveTask(t.id, 'doing');
    expect(getColTasks('todo')).toHaveLength(0);
    expect(getColTasks('doing')).toHaveLength(1);
  });

  it('should move a task from doing to done', () => {
    const t = createTask({ title: 'Finish Work', priority: 'medium', column: 'doing', due: '', tags: [] });
    moveTask(t.id, 'done');
    expect(getColTasks('done')[0].column).toBe('done');
  });

  it('should log activity when a task is moved', () => {
    const t = createTask({ title: 'Logged Move', priority: 'low', column: 'todo', due: '', tags: [] });
    moveTask(t.id, 'doing');
    expect(log).toHaveLength(1);
    expect(log[0].text).toContain('doing');
  });

  it('should correctly count tasks per column', () => {
    createTask({ title: 'A', priority: 'low', column: 'todo', due: '', tags: [] });
    createTask({ title: 'B', priority: 'low', column: 'todo', due: '', tags: [] });
    createTask({ title: 'C', priority: 'high', column: 'doing', due: '', tags: [] });
    expect(getColTasks('todo')).toHaveLength(2);
    expect(getColTasks('doing')).toHaveLength(1);
    expect(getColTasks('done')).toHaveLength(0);
  });

  it('should not move a task if ID does not exist', () => {
    const t = createTask({ title: 'Real Task', priority: 'low', column: 'todo', due: '', tags: [] });
    moveTask('nonexistent-id', 'done');
    expect(tasks[0].column).toBe('todo'); // unchanged
  });
});
