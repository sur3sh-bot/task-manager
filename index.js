const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const fs = require('fs');

const tasksFilePath = path.join(__dirname, 'tasks.json');

app.use(express.static(path.join(__dirname, 'public')));

// MIDDLEWARE
app.use(express.json());

function readTasks() {
  if (!fs.existsSync(tasksFilePath)) {
    return [
      { id: 1, title: "Learn Backend Basics", completed: false, dueDate: null },
      { id: 2, title: "Eat Lunch", completed: true, dueDate: null }
    ];
  }

  const data = fs.readFileSync(tasksFilePath, 'utf8');
  return JSON.parse(data);
}

function saveTasks(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
}

// 1. GET ALL TASKS (Read)
app.get('/tasks', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// 2. GET A SINGLE TASK (Read specific)
app.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tasks = readTasks();
  const task = tasks.find(t => t.id === id);
  
  if (!task) return res.status(404).send("Task not found.");
  res.json(task);
});

// 3. CREATE A NEW TASK (Create)
app.post('/tasks', (req, res) => {
  const tasks = readTasks();
  const newTask = {
    id: Date.now(),
    title: req.body.title,         
    completed: false,
    dueDate: req.body.dueDate || null
  };

  tasks.push(newTask);
  saveTasks(tasks);
  res.status(201).json(newTask);
});

// 4. UPDATE A TASK
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tasks = readTasks();
  const task = tasks.find(t => t.id === id);

  if (!task) return res.status(404).send("Task not found.");

  task.title = req.body.title !== undefined ? req.body.title : task.title;
  task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
  task.dueDate = req.body.dueDate !== undefined ? req.body.dueDate : task.dueDate; 

  saveTasks(tasks);
  res.json(task);
});

// 5. DELETE A TASK
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tasks = readTasks();
  const taskExists = tasks.some(t => t.id === id);

  if (!taskExists) return res.status(404).send("Task not found.");

  const updatedTasks = tasks.filter(t => t.id !== id);
  saveTasks(updatedTasks);
  res.send(`Task ${id} deleted successfully.`);
});

// START THE SERVER
app.listen(PORT, () => {
  console.log(`TaskMaster API is live at http://localhost:${PORT}`);
}); // This code sets up a simple RESTful API for managing tasks, allowing clients to create, read, update, and delete tasks
