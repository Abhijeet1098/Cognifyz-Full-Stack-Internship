// server.js
// Cognifyz Full Stack Internship - Task 5: API Integration and Front-End Interaction
// Objective: Introduce server-client communication through a RESTful API.

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Middleware ----------
app.use(express.json());                          // parse JSON request bodies
app.use(express.static(path.join(__dirname, 'public'))); // serve the front-end

// ---------- "Database" (in-memory for this task) ----------
// In a real app this would be MongoDB/MySQL (that's Task 6).
let tasks = [
  { id: 1, title: 'Learn Express basics', completed: true },
  { id: 2, title: 'Build REST API endpoints', completed: false },
  { id: 3, title: 'Connect front-end with fetch()', completed: false }
];
let nextId = 4;

// ---------- Step 1: RESTful API endpoints for CRUD operations ----------

// READ (all) - GET /api/tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// READ (single) - GET /api/tasks/:id
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// CREATE - POST /api/tasks
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// UPDATE - PUT /api/tasks/:id
app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });

  const { title, completed } = req.body;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

// DELETE - DELETE /api/tasks/:id
app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Task not found' });

  const deleted = tasks.splice(index, 1);
  res.json({ message: 'Task deleted', task: deleted[0] });
});

// ---------- Fallback for unknown API routes ----------
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

// ---------- Start server ----------
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
