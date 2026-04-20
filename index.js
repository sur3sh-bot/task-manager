const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

// MIDDLEWARE
app.use(express.json());

//A simple array acting as a temporary database
let tasks = [
  { id: 1, title: "Learn Backend Basics", completed: false },
  { id: 2, title: "Eat Lunch", completed: true }
];

// 1. GET ALL TASKS (Read)
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// 2. GET A SINGLE TASK (Read specific)
app.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  
  if (!task) return res.status(404).send("Task not found.");
  res.json(task);
});

// 3. CREATE A NEW TASK (Create)
app.post('/tasks', (req, res) => {
  const newTask = {
    id: Date.now(),
    title: req.body.title,          // ✅ valid here
    completed: false,
    dueDate: req.body.dueDate || null
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// 4. UPDATE A TASK (Update)
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) return res.status(404).send("Task not found.");

  task.title = req.body.title || task.title;
  task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
  task.dueDate = req.body.dueDate || task.dueDate; // ✅ MUST BE HERE

  res.json(task);
});

// 5. DELETE A TASK (Delete)
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.send(`Task ${id} deleted successfully.`);
});

// START THE SERVER
app.listen(PORT, () => {
  console.log(`TaskMaster API is live at http://localhost:${PORT}`);
}); // This code sets up a simple RESTful API for managing tasks, allowing clients to create, read, update, and delete tasks
