// script.js
// Step 2 & 3: Front-end interacts with the API, fetches and displays data.

const API_URL = '/api/tasks';

const form = document.getElementById('task-form');
const titleInput = document.getElementById('title-input');
const taskList = document.getElementById('task-list');
const statusMsg = document.getElementById('status-msg');

// ---- READ: fetch all tasks and render them ----
async function loadTasks() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to load tasks');
    const tasks = await res.json();
    renderTasks(tasks);
  } catch (err) {
    statusMsg.textContent = err.message;
  }
}

function renderTasks(tasks) {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    taskList.innerHTML = '<li>No tasks yet. Add one above.</li>';
    return;
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
      <span class="title">${escapeHtml(task.title)}</span>
      <span class="task-actions">
        <button class="toggle-btn" data-id="${task.id}" data-completed="${task.completed}">
          ${task.completed ? 'Undo' : 'Done'}
        </button>
        <button class="delete-btn" data-id="${task.id}">Delete</button>
      </span>
    `;
    taskList.appendChild(li);
  });
}

// ---- CREATE: add a new task ----
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusMsg.textContent = '';

  const title = titleInput.value.trim();
  if (!title) return;

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to add task');
    }

    titleInput.value = '';
    await loadTasks();
  } catch (err) {
    statusMsg.textContent = err.message;
  }
});

// ---- UPDATE / DELETE: event delegation on the list ----
taskList.addEventListener('click', async (e) => {
  const id = e.target.dataset.id;
  if (!id) return;

  try {
    if (e.target.classList.contains('toggle-btn')) {
      const completed = e.target.dataset.completed === 'true';
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed })
      });
      if (!res.ok) throw new Error('Failed to update task');
    }

    if (e.target.classList.contains('delete-btn')) {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete task');
    }

    await loadTasks();
  } catch (err) {
    statusMsg.textContent = err.message;
  }
});

// Basic escaping to avoid rendering raw HTML from user input
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Initial load
loadTasks();
