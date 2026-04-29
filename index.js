const express = require('express'); //backend framework 
const app = express(); //web framework 
const PORT = 3000; //port number 
const path = require('path'); //path module 
const fs = require('fs'); //file system module 

const tasksFilePath = path.join(__dirname, 'tasks.json'); //path to tasks.json 

app.use(express.static(path.join(__dirname, 'public'))); //this serves the static files 

// MIDDLEWARE
app.use(express.json());

function readTasks() {
  if (!fs.existsSync(tasksFilePath)) {
    return [
      { id: 1, title: "Learn Backend Basics", completed: false, dueDate: null, priority: "High" },
      { id: 2, title: "Eat Lunch", completed: true, dueDate: null, priority: "Medium" }
    ];
  }

  const data = fs.readFileSync(tasksFilePath, 'utf8');
  return JSON.parse(data); 
}

function saveTasks(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
}

// 1. GET ALL TASKS
app.get('/tasks', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// 2. GET A SINGLE TASK
app.get('/tasks/:id', (req, res) => { //gets a single task 
  const id = parseInt(req.params.id);
  const tasks = readTasks();
  const task = tasks.find(t => t.id === id);
  
  if (!task) return res.status(404).send("Task not found.");
  res.json(task);
});

// 3. CREATE A NEW TASK
app.post('/tasks', (req, res) => {  //creates a new task
  const tasks = readTasks();
  const newTask = {
    id: Date.now(),
    title: req.body.title,         
    completed: false,
    dueDate: req.body.dueDate || null,
    priority: req.body.priority || 'Medium'
  };

  tasks.push(newTask);
  saveTasks(tasks);
  res.status(201).json(newTask);
});

// 4. UPDATE A TASK
app.put('/tasks/:id', (req, res) => { //updates a task
  const id = parseInt(req.params.id);
  const tasks = readTasks();
  const task = tasks.find(t => t.id === id);

  if (!task) return res.status(404).send("Task not found.");

  task.title = req.body.title !== undefined ? req.body.title : task.title;
  task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
  task.dueDate = req.body.dueDate !== undefined ? req.body.dueDate : task.dueDate; 
  task.priority = req.body.priority !== undefined ? req.body.priority : task.priority;

  saveTasks(tasks);
  res.json(task);
});

// 5. DELETE A TASK
app.delete('/tasks/:id', (req, res) => {  //deletes a task
  const id = parseInt(req.params.id);
  const tasks = readTasks();
  const taskExists = tasks.some(t => t.id === id);

  if (!taskExists) return res.status(404).send("Task not found.");

  const updatedTasks = tasks.filter(t => t.id !== id);
  saveTasks(updatedTasks);
  res.send(`Task ${id} deleted successfully.`); //this runs the server 
});

// START THE SERVER
app.listen(PORT, () => {
  console.log(`TaskMaster API is live at http://localhost:${PORT}`); //this runs the server 
}); // This code sets up a simple RESTful API for managing tasks, allowing clients to create, read, update, and delete tasks
