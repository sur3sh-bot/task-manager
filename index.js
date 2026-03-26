const express = require('express');
const app = express();
const PORT = 3000;

// MIDDLEWARE: This allows our server to read JSON sent in a request body
app.use(express.json());

// OUR DATA: A simple array acting as a temporary database
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
  if (!req.body.title) return res.status(400).send("Title is required!");

  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// 4. UPDATE A TASK (Update)
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) return res.status(404).send("Task not found."); // Check if task exists

  task.title = req.body.title || task.title;
  task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;

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
}); // This code sets up a simple RESTful API for managing tasks, allowing clients to create, read, update, and delete tasks.