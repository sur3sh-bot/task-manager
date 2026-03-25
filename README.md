# Task Manager API

A simple backend project to learn core backend concepts by building a Task Management System. This API allows users to perform CRUD operations on tasks while demonstrating how servers, routing, and databases interact.

---

## 🚀 Features

* **Create Tasks** — Add new tasks to the system
* **View Tasks** — Retrieve all tasks or a specific task
* **Update Tasks** — Modify task details or mark as completed
* **Delete Tasks** — Remove tasks from the system
* **Data Validation** — Ensure required fields like title are present

---

## 🛠️ Tech Stack

* **Language:** Node.js
* **Framework:** Express.js 
* **Database:**  **JavaScript Array**   

### Installation

```bash
git clone https://github.com/your-username/task-manager-backend.git
cd task-manager-backend
```

Install dependencies:

```bash
# Node.js
npm install

# Python
pip install -r requirements.txt
```

---


### Run the Server

```bash
# Node.js
npm start

# Python
python main.py
```

Server will run at:

```
http://localhost:5000
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description         |
| ------ | -------- | ------------------- |
| GET    | /tasks   | Get all tasks       |
| POST   | /tasks   | Create a new task   |
| GET    | /tasks/  | Get a specific task |
| PUT    | /tasks/  | Update a task       |
| DELETE | /tasks/  | Delete a task       |

---

## 📦 Example Request

### Create Task

```json
POST /tasks
{
  "title": "Finish backend project",
  "completed": false
}
```

---

## 🧠 What I Learned

* Structuring a backend (Routes, Controllers, Models)
* Handling HTTP methods and status codes
* Connecting backend to a database
* Using middleware for request parsing
* Testing APIs using Postman

---

## 📌 Future Improvements

* Add user authentication (JWT)
* Add pagination for tasks
* Add due dates and priorities
* Deploy the API
* add a frontend
---

## 📄 License

This project is open-source and available under the MIT License.
