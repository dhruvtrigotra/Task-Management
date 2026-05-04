# 🚀 TaskFlow – Role-Based Task Manager

TaskFlow is a full-stack role-based task management system built for teams to manage projects, assign tasks, and track progress efficiently. It supports **Admin** and **Member** roles with secure authentication and dynamic dashboards.

---

## ✨ Features

### 👨‍💼 Admin
- Create and manage projects
- Assign members to projects
- Create and assign tasks
- Monitor overall project progress

### 👨‍💻 Member
- View assigned projects
- Update task status (In Progress / Done)
- Track personal task progress
- View task statistics

### 🔐 Authentication
- JWT-based login system
- Role-based dashboard rendering
- Secure protected routes

---

## 🧠 Tech Stack

### Frontend
- React.js (Vite)
- React Router DOM
- Axios
- Inline CSS styling (custom UI)

### Backend
- Spring Boot
- Spring Security (JWT Authentication)
- Hibernate / JPA
- REST APIs

### Database
- MySQL

---

## 📊 Dashboard Highlights

- 📌 Total Tasks
- ⏳ Pending Tasks
- ✅ Completed Tasks
- 📂 Project-wise task filtering
- ⚡ Real-time status updates

---

## 🏗️ Project Structure

```
TaskManager/
│
├── backend/ (Spring Boot)
│ ├── controller/
│ ├── service/
│ ├── repository/
│ ├── entity/
│ └── security/
│
├── frontend/ (React)
│ ├── pages/
│ │ ├── AdminDashboard.jsx
│ │ ├── MemberDashboard.jsx
│ │ ├── Login.jsx
│ │ └── Signup.jsx
│ ├── api/
│ └── App.jsx
```

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/taskflow.git
```
### 2. Backend setup
```cd backend
mvn clean install
mvn spring-boot:run
```
### 3. Frontend setup
```cd frontend
npm install
npm run dev
```
## 🔑 Environment Variables

Backend (application.properties)

spring.datasource.url=jdbc:mysql://localhost:3306/taskdb
spring.datasource.username=root
spring.datasource.password=yourpassword
jwt.secret=yourSecretKey

## 🎯 Future Improvements
Drag & drop task board (Kanban style)
Real-time updates using WebSockets
Notifications system
File attachments in tasks
Advanced analytics dashboard

##🧑‍💻 Author

Built with 💻 by Dhruv
